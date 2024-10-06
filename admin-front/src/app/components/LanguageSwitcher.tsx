'use client';

import { useRouter, usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
    locales: string[];  // Lista de idiomas obtenidos dinámicamente
}

const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
    const router = useRouter();
    const pathname = usePathname();  // Obtiene la ruta actual

    const changeLanguage = (lang: string) => {
        const segments = pathname.split('/').filter(Boolean);  // Filtra segmentos vacíos

        // Verifica si el primer segmento es un idioma
        if (locales.includes(segments[0])) {
            segments[0] = lang;  // Reemplaza el idioma actual con el nuevo
        } else {
            segments.unshift(lang);  // Si no hay idioma en la ruta, lo agrega al inicio
        }

        const newPathname = '/' + segments.join('/');

        // Navega a la nueva ruta con el idioma seleccionado
        router.push(newPathname);
    };

    return (
        <div>
            {locales.map((locale) => (
                <button key={locale} onClick={() => changeLanguage(locale)}>
                    {locale.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
