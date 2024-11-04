// LocaleLayout.tsx (Componente Principal)
import React from 'react';
import LocaleLayoutServer from '../LocaleLayoutServer';
import LocaleLayoutClient from '../LocaleLayoutClient';
import '../globals.css';
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/ui/app-sidebar";
import { getServerSession } from "next-auth";

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await LocaleLayoutServer({ params: { locale } });
    const session = await getServerSession();
    console.log(session)
    return (
        <LocaleLayoutClient messages={messages} locale={locale}>
            <SidebarProvider>
                <AppSidebar/>
                <main className='w-full'>
                    {session!==null&&<SidebarTrigger/>}
                    {children}
                </main>
            </SidebarProvider>
        </LocaleLayoutClient>
    );
}
