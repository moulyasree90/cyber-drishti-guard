import { createFileRoute } from '@tanstack/react-router';
import { Scanner } from '@/components/cyber/scanner';
import { pageHead } from '@/lib/cyber/metadata';
export const Route=createFileRoute('/scanner')({head:()=>pageHead('URL scanner','Inspect a suspicious destination without opening it.'),component:Page});
function Page(){return <div className="page tool-page"><div className="page-heading"><div><p className="eyebrow">PROTECTION TOOLS</p><h1>URL scanner</h1><p>Inspect a suspicious destination without opening it.</p></div></div><Scanner mode="url"/></div>;}
