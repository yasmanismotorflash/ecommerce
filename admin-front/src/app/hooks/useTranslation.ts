import { useState, useEffect } from 'react';

export function useTranslation(locale: string = 'en') {  // Usa 'en' como valor por defecto si no se pasa locale
    const [translations, setTranslations] = useState<Record<string, string>>({});

    useEffect(() => {
        async function loadTranslations() {
            try {
                const res = await import(`../locales/${locale}.json`);
                setTranslations(res.default || {});
            } catch (error) {
                console.error(`Error loading ${locale} translations:`, error);
            }
        }
        loadTranslations();
    }, [locale]);

    return translations;
}

