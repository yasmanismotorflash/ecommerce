"use client";

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { routing } from '../../../i18n/routing';

export default function AdminPage() {
    const t = useTranslations('AdminPage');
    const { data: session, status } = useSession();
    const router = useRouter();
    // Obtener el idioma de la URL actual
    const locale = window.location.pathname.split('/')[1]; // Esto asume que la estructura es /[locale]/admin...


    useEffect(() => {
        console.log('true')
            console.log(locale)
            
        if (status === 'unauthenticated') {
            
            router.push(`/${locale}/admin/login`);  // Redirige teniendo en cuenta el idioma
        }
    }, [status, router, locale]);

    if (status === 'loading') {
       return <p>Loading...</p>;
    }

    if (!session) {
        return null;
    }
    return (
        <div>
            <h1>{t('title', { name:  session.user?.name  })}</h1>
            <p>{t('message', { locale: locale })}</p>
        </div>
    );

}