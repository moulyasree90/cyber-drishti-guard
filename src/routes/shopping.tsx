import { createFileRoute } from '@tanstack/react-router';
import { Scanner } from '@/components/cyber/scanner';
import { pageHead } from '@/lib/cyber/metadata';
export const Route=createFileRoute('/shopping')({head:()=>pageHead('Shopping detector','Evaluate available evidence before buying from an unfamiliar store.'),component:Page});
function Page(){return <div className="page tool-page"><div className="page-heading"><div><p className="eyebrow">PROTECTION TOOLS</p><h1>Shopping detector</h1><p>Evaluate available evidence before buying from an unfamiliar store.</p></div></div><Scanner mode="shopping"/></div>;}
