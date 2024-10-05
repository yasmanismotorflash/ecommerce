"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const locale = 'en';  // Puedes obtener el valor dinámicamente del contexto de idioma o desde el router
    const translations = useTranslation(locale);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/${locale}/admin/login`);  // Redirige teniendo en cuenta el idioma
        }
    }, [status, router, locale]);

    if (status === 'loading') {
        return <p>{translations.loading}</p>;  // Muestra mensaje de carga según el idioma
    }

    if (!session) {
        return null;  // Si no hay sesión, no muestra contenido mientras se redirige
    }

    return (
        <div>
            <LanguageSwitcher />  {/* Agrega el componente para cambiar el idioma */}
            <h1>{translations.welcomeMessage}, {session.user?.name}</h1>
            <p>{translations.adminDashboard}</p>
        </div>
    );
}

