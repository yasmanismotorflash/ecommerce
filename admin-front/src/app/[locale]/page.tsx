'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MfSidebar } from '@/components/ui/mf/MfSidebar/MfSidebar';

export default function HomePage() {
    const t = useTranslations('HomePage');

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
