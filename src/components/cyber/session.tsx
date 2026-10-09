import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
const SessionContext = createContext<{user:User|null}>({user:null});
export function SessionProvider({children}:{children:ReactNode}) {const [user,setUser]=useState<User|null>(null);useEffect(()=>{supabase.auth.getUser().then(({data})=>setUser(data.user));const {data}=supabase.auth.onAuthStateChange((event,session)=>{if(['SIGNED_IN','SIGNED_OUT','USER_UPDATED','INITIAL_SESSION'].includes(event))setUser(session?.user??null);});return()=>data.subscription.unsubscribe();},[]);return <SessionContext.Provider value={{user}}>{children}</SessionContext.Provider>;}
export const useSession=()=>useContext(SessionContext);
