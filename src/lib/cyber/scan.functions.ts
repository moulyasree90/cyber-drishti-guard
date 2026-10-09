import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server';
import { z } from 'zod';
import { analyzeUrl, urlSchema, type Report } from './analysis';

export const scanUrl = createServerFn({method: 'POST'})
.inputValidator(z.object({url: urlSchema, shopping: z.boolean().default(false), reputationConsent: z.boolean().default(false), save: z.boolean().default(false)}))
.handler(async ({data}) => {
  setResponseHeader('Cache-Control', 'no-store');
  const result = analyzeUrl(data.url, data.shopping);
  const {supabaseAdmin} = await import('@/integrations/supabase/client.server');
  const ip = getRequestHeader('cf-connecting-ip') || 'shared-preview';
  const digest = async (s: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))).map(n => n.toString(16).padStart(2,'0')).join('');
  const {data: allowed, error: limitError} = await supabaseAdmin.rpc('consume_scan_limit', {p_key: await digest(ip)});
  if(limitError || !allowed) throw Error(limitError ? 'Scanner is temporarily unavailable. Please retry.' : 'Too many scans. Please wait one minute.');
  const key = process.env['GOOGLE_SAFE_BROWSING_API_KEY'];
  if (key && data.reputationConsent) {
    const hash = await digest(data.url);
    const {data: cached} = await supabaseAdmin.from('threat_cache').select('result').eq('key',hash).gt('expires_at',new Date().toISOString()).maybeSingle();
    if(cached) {
      const stored = cached.result as unknown as Report;
      result.lookup = stored.lookup; result.source = stored.source; result.score = stored.score; result.category = stored.category; result.signals = stored.signals;
      result.signals.push({title:'Cached provider lookup', reason:`Provider checked at ${stored.timestamp}.`, weight:0, kind:'positive'});
    } else {
      result.source = 'Google Safe Browsing';
      try {
        const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${encodeURIComponent(key)}`, {method:'POST', signal:AbortSignal.timeout(7000), headers:{'Content-Type':'application/json'}, body: JSON.stringify({client:{clientId:'cyber-drishti',clientVersion:'1.0'},threatInfo:{threatTypes:['MALWARE','SOCIAL_ENGINEERING','UNWANTED_SOFTWARE','POTENTIALLY_HARMFUL_APPLICATION'],platformTypes:['ANY_PLATFORM'],threatEntryTypes:['URL'],threatEntries:[{url:data.url}]}})});
        if(!response.ok) throw Error('Provider unavailable');
        const body = z.object({matches:z.array(z.object({threatType:z.string(),cacheDuration:z.string().optional()})).optional()}).parse(await response.json());
        result.signals = result.signals.filter(s => s.title !== 'Reputation not yet verified');
        if(body.matches?.length) {result.lookup = 'match';result.category='High';result.score=100;result.signals.push({title:'Confirmed provider match',reason:`Google Safe Browsing identifies: ${body.matches.map(m=>m.threatType).join(', ')}. Do not proceed.`,weight:100,kind:'confirmed'});}
        else {result.lookup='no-match'; if(result.score<25) result.category='Low';result.signals.push({title:'No provider threat match',reason:'Google Safe Browsing returned no listed threat. This is not a safety guarantee.',weight:0,kind:'positive'});}
        const duration = body.matches?.length ? Math.min(...body.matches.map(m=>Number.parseFloat(m.cacheDuration || '300s'))) : 300;
        await supabaseAdmin.from('threat_cache').upsert({key:hash,result:JSON.parse(JSON.stringify(result)),expires_at:new Date(Date.now()+Math.max(1, Number.isFinite(duration)?duration:300)*1000).toISOString()});
      } catch {result.lookup='unavailable';result.signals.push({title:'Provider unable to verify',reason:'The reputation service did not return usable evidence. Local warnings remain available.',weight:0,kind:'unavailable'});}
    }
  }
  if(data.save) {
    const token = getRequestHeader('authorization')?.replace(/^Bearer /,'');
    if(!token) throw Error('Sign in to save this scan.');
    const {data: identity, error} = await supabaseAdmin.auth.getUser(token);
    if(error || !identity.user) throw Error('Sign in again to save this scan.');
    const {error: saveError} = await supabaseAdmin.from('scan_history').insert({user_id:identity.user.id,kind:result.kind,target:result.target,result:JSON.parse(JSON.stringify(result))});
    if(saveError) throw Error('The scan could not be saved. Retry without saving.');
  }
  return result;
});
