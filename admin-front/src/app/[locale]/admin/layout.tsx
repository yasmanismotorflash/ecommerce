// LocaleLayout.tsx (Componente Principal)
import React from 'react';
import LocaleLayoutServer from '../LocaleLayoutServer';
import LocaleLayoutClient from '../LocaleLayoutClient';
import '../globals.css';
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/ui/app-sidebar";

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await LocaleLayoutServer({ params: { locale } });

    return (
        <LocaleLayoutClient messages={messages} locale={locale}>
            <SidebarProvider>
                <AppSidebar/>
                <main className='w-full'>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </LocaleLayoutClient>
    );
}
