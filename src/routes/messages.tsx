import { createFileRoute } from '@tanstack/react-router';
import { Scanner } from '@/components/cyber/scanner';
import { pageHead } from '@/lib/cyber/metadata';
export const Route=createFileRoute('/messages')({head:()=>pageHead('Message analyzer','Review scam warning signs in pasted messages.'),component:Page});
function Page(){return <div className="page tool-page"><div className="page-heading"><div><p className="eyebrow">PROTECTION TOOLS</p><h1>Message analyzer</h1><p>Review scam warning signs in pasted messages.</p></div></div><Scanner mode="message"/></div>;}
