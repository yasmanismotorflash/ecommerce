"use client";

import { useTranslation } from './hooks/useTranslation';

export default function HomePage({ params }: { params: { locale: string } }) {
    const { locale } = params || { locale: 'en' };  // Define el idioma por defecto como 'en'
    const translations = useTranslation(locale);  // Carga las traducciones

    return (
        <div>
            <h1>{translations.welcomeMessage}</h1>
            <p>{translations.homePageDescription}</p>
        </div>
    );
}
