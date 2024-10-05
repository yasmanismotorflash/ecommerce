import { useState, useEffect } from 'react';

export function useTranslation(locale: string) {
    const [translations, setTranslations] = useState<Record<string, string>>({});  // Utiliza un objeto dinámico

    useEffect(() => {
        async function loadTranslations() {
            const res = await import(`../locales/${locale}.json`);
            setTranslations(res.default || {});  // Asegúrate de cargar las traducciones o un objeto vacío
        }
        loadTranslations();
    }, [locale]);

    return translations;
}
