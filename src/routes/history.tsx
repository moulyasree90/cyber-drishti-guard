import {createFileRoute} from '@tanstack/react-router';
import {HistoryPage} from '@/components/cyber/account';
import {pageHead} from '@/lib/cyber/metadata';
export const Route=createFileRoute('/history')({head:()=>pageHead('Scan history','Scan history with privacy-first Cyber Drishti AI tools.'),component:()=> <HistoryPage/>});
