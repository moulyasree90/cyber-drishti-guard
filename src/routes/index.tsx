import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/cyber/dashboard';
import { pageHead } from '@/lib/cyber/metadata';
export const Route=createFileRoute('/')({head:()=>pageHead('Cyber Drishti AI — See the Threat. Stop the Scam.','Inspect suspicious links, messages and QR codes with explainable cybersecurity checks and privacy-first tools.'),component:Dashboard});
