

import React from 'react';
import { MfSidebar } from '@/components/ui/mf/MfSidebar/MfSidebar';
import { getLocales } from '@/lib';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function HomePage() {
    const  locale  = await getLocale();
    console.log(locale);
    redirect(`/${locale}/admin`);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <MfSidebar />

            {/* Contenido principal */}
            <div className="flex-1 p-10 bg-white ">
                <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
            </div>
        </div>
    );
}