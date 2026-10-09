import {createFileRoute} from '@tanstack/react-router';
import {HistoryPage} from '@/components/cyber/account';
import {pageHead} from '@/lib/cyber/metadata';
export const Route=createFileRoute('/reports')({head:()=>pageHead('Scan reports','Scan reports with privacy-first Cyber Drishti AI tools.'),component:()=> <HistoryPage reports/>});
