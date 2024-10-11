"use client"
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {useLocale} from 'next-intl';


export default function AdminPage() {
    const t = useTranslations('AdminPage');
    const { data: session, status } = useSession();
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        
        if (status === 'unauthenticated') {
            // Redirige teniendo en cuenta el idioma
            router.push(`/${locale}/admin/login`);
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
            <h1>{t('title', { name: session.user?.name })}</h1>
            <p>{t('message', { locale: locale })}</p>
        </div>
    );
}
