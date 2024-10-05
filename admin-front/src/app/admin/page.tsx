"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';  // Importa el hook de idioma

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { locale } = useLanguage();  // Obtiene el idioma desde el contexto

    useEffect(() => {
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
            <h1>Welcome, {session.user?.name}</h1>
            <p>This is the admin dashboard for {locale} locale.</p>
        </div>
    );
}
