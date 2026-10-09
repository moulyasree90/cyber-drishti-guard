import {createFileRoute} from '@tanstack/react-router';
import {VoicePage} from '@/components/cyber/voice';
import {pageHead} from '@/lib/cyber/metadata';
export const Route=createFileRoute('/voice')({head:()=>pageHead('Voice assistant','Voice assistant with privacy-first Cyber Drishti AI tools.'),component:()=> <VoicePage/>});
