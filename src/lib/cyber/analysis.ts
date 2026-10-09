import { z } from 'zod';
export type Risk = 'Low' | 'Medium' | 'High' | 'Unknown';
export type Signal = { title: string; reason: string; weight: number; kind: 'warning' | 'positive' | 'unavailable' | 'confirmed' };
export type Report = { id: string; target: string; kind: 'url' | 'message' | 'shopping'; score: number; category: Risk; signals: Signal[]; timestamp: string; source: string; lookup: 'unconfigured' | 'unavailable' | 'no-match' | 'match'; recommendations: string[]; urls: string[] };
export const urlSchema = z.string().trim().min(1, 'Enter a URL.').max(2048, 'URL must be under 2,048 characters.').transform((s, ctx) => {
  try {
    if (/\s|[\u0000-\u001f]/u.test(s)) throw Error();
    const u = new URL(/^[a-z][a-z\d+.-]*:/i.test(s) ? s : `https://${s}`);
    if (!['https:', 'http:'].includes(u.protocol) || !u.hostname || (!u.hostname.includes('.') && !u.hostname.includes(':') && u.hostname !== 'localhost')) throw Error();
    u.hash = ''; return u.href;
  } catch { ctx.addIssue({code: z.ZodIssueCode.custom, message: 'Enter a valid HTTP or HTTPS URL.'}); return z.NEVER; }
});
export const messageSchema = z.string().trim().min(3, 'Enter at least three characters.').max(12000, 'Text must be under 12,000 characters.');
export function extractUrls(text: string) { return [...new Set((text.match(/https?:\/\/[^\s<>"']+/gi) ?? []).map(s => s.replace(/[),.;!?]+$/, '')))]; }
export function classify(score: number, verified = false): Risk { return score >= 60 ? 'High' : score >= 25 ? 'Medium' : verified ? 'Low' : 'Unknown'; }
function report(target: string, kind: Report['kind'], signals: Signal[], urls: string[] = []): Report {
  const score = Math.min(100, signals.reduce((s, a) => s + a.weight, 0));
  return {id: crypto.randomUUID(), target, kind, score, category: classify(score), signals, urls, timestamp: new Date().toISOString(), source: 'Local explainable checks', lookup: 'unconfigured', recommendations: ['Verify the sender or seller using an independently found official contact.', 'Do not share passwords, OTPs, or banking details.', 'No identified warning is not a guarantee of safety.']};
}
export function analyzeUrl(input: string, shopping = false): Report {
  const normalized = urlSchema.parse(input); const u = new URL(normalized); const h = u.hostname.toLowerCase(); const signals: Signal[] = [];
  const add = (title: string, reason: string, weight: number, kind: Signal['kind'] = 'warning') => signals.push({title, reason, weight, kind});
  if (u.username || u.password) add('Embedded credentials', 'Text before @ can disguise the actual destination domain.', 30);
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(h) || h.includes(':')) add('IP-address destination', 'The destination uses an IP address instead of a recognizable domain.', 25);
  if (u.protocol === 'http:') add('Unencrypted URL', 'HTTP does not encrypt the connection. Never enter sensitive information.', 15); else add('HTTPS URL', 'The URL requests encryption. Certificate availability was not tested; HTTPS does not establish trust.', 0, 'positive');
  if (h.includes('xn--')) add('Internationalized domain', 'Punycode can represent legitimate languages or visually deceptive domain names. Inspect the spelling.', 15);
  if (h.split('.').length > 4) add('Many subdomains', 'A long subdomain chain can hide the actual registered domain.', 15);
  if (u.port && !['80', '443'].includes(u.port)) add('Unusual port', `The destination uses port ${u.port}. This is unusual for a public website.`, 10);
  if (['bit.ly','tinyurl.com','t.co','shorturl.at','is.gd'].includes(h)) add('Shortened destination', 'The final destination is hidden. Redirects were not followed.', 15);
  const brands = ['paypal','amazon','google','microsoft','apple','facebook','instagram','sbi','hdfcbank'];
  const suspiciousBrand = brands.find(b => h.includes(b) && h !== `${b}.com` && !h.endsWith(`.${b}.com`) && h !== `${b}.in` && !h.endsWith(`.${b}.in`));
  if (suspiciousBrand) add('Possible brand impersonation', `The domain contains “${suspiciousBrand}” but is not that brand's .com or .in domain. This is not proof of impersonation.`, 25);
  if (/(verify|account-suspend|claim-prize|free-money|secure-login|kyc-update)/i.test(h + u.pathname)) add('Deceptive wording', 'The URL contains wording frequently used in account or prize scams.', 15);
  add('Reputation not yet verified', 'No live threat-intelligence result is available from local checks.', 0, 'unavailable');
  add('Domain and website evidence unavailable', 'Registration age, DNS, redirects, certificate and page contents were not retrieved.', 0, 'unavailable');
  if (shopping) add('Seller verification needed', 'Contact details, returns, discounts, payment methods and official seller status cannot be established from the URL alone.', 0, 'unavailable');
  return report(normalized, shopping ? 'shopping' : 'url', signals, [normalized]);
}
export function analyzeMessage(input: string): Report {
  const text = messageSchema.parse(input); const signals: Signal[] = [];
  const rules: [string, RegExp, string, number][] = [
    ['Urgency or threats', /urgent|immediately|within \d+ hours|account.{0,15}(blocked|suspend)|तुरंत|జరూరు|వెంటనే/gi, 'Pressure can discourage independent verification.', 15],
    ['Sensitive information request', /(?:share|send|provide|tell|enter).{0,35}(?:otp|password|pin|bank details)|(?:otp|password|pin).{0,25}(?:share|send)|ओटीपी|పాస్‌వర్డ్/gi, 'Never share OTPs, passwords or banking PINs with another person.', 35],
    ['Prize or unrealistic return', /won.{0,20}(prize|lottery)|guaranteed.{0,20}(return|profit)|double your money|free money|లాటరీ|लॉटरी/gi, 'Unexpected winnings and guaranteed returns are warning signs.', 25],
    ['Unusual payment demand', /gift card|crypto.{0,20}(pay|transfer)|pay.{0,20}(fee|unlock|prize)|wire transfer/gi, 'Irreversible payments or fees to claim prizes need careful verification.', 25],
    ['Impersonation context', /bank|government|delivery|police|support team|sbi|hdfc|బ్యాంక్|बैंक/gi, 'The message claims or mentions an institution; independently verify who sent it.', 5],
  ];
  for (const [title, pattern, reason, weight] of rules) { const m = text.match(pattern); if (m) signals.push({title, reason: `“${m[0]}” — ${reason}`, weight, kind: 'warning'}); }
  const urls = extractUrls(text); if (urls.length) signals.push({title: 'Links found', reason: `${urls.length} link(s) extracted. Scan each destination separately without opening it.`, weight: 0, kind: 'unavailable'});
  if (!signals.length) signals.push({title: 'No listed pattern identified', reason: 'Limited phrase checks cannot establish legitimacy. Language coverage is partial.', weight: 0, kind: 'unavailable'});
  return report(text, 'message', signals, urls);
}
export function validateImage(file: {size: number; type: string}) { if (!['image/png','image/jpeg','image/webp'].includes(file.type)) throw Error('Choose a PNG, JPEG, or WebP image.'); if(file.size > 8 * 1024 * 1024) throw Error('Image must be smaller than 8 MB.'); }
export function csvCell(value: string) { const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value; return `"${safe.replaceAll('"','""')}"`; }
