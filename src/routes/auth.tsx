import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/cyber/account';
import {pageHead} from '@/lib/cyber/metadata';
export const Route=createFileRoute('/auth')({head:()=>pageHead('Phone sign-in','Phone sign-in with privacy-first Cyber Drishti AI tools.'),component:()=> <AuthPage/>});
