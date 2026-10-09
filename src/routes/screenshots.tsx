import { createFileRoute } from '@tanstack/react-router';
import { Scanner } from '@/components/cyber/scanner';
import { pageHead } from '@/lib/cyber/metadata';
export const Route=createFileRoute('/screenshots')({head:()=>pageHead('Screenshot analyzer','Read and analyze screenshot text on your device.'),component:Page});
function Page(){return <div className="page tool-page"><div className="page-heading"><div><p className="eyebrow">PROTECTION TOOLS</p><h1>Screenshot analyzer</h1><p>Read and analyze screenshot text on your device.</p></div></div><Scanner mode="screenshot"/></div>;}
