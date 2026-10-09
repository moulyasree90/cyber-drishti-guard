import { createFileRoute } from '@tanstack/react-router';
import { Scanner } from '@/components/cyber/scanner';
import { pageHead } from '@/lib/cyber/metadata';
export const Route=createFileRoute('/qr')({head:()=>pageHead('QR code scanner','Decode a QR destination without visiting it.'),component:Page});
function Page(){return <div className="page tool-page"><div className="page-heading"><div><p className="eyebrow">PROTECTION TOOLS</p><h1>QR code scanner</h1><p>Decode a QR destination without visiting it.</p></div></div><Scanner mode="qr"/></div>;}
