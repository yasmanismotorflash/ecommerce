"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();  // Obtiene la ruta actual
    const params = useParams();      // Obtiene los parámetros de la ruta

    const changeLanguage = (lang: string) => {
        // Elimina el prefijo de idioma actual
        const currentLocale = params.locale || 'en';
        const newPathname = pathname.replace(`/${currentLocale}`, '');

        // Navega a la ruta con el nuevo idioma
        router.push(`/${lang}${newPathname}`);
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
            <button onClick={() => changeLanguage('fr')}>Français</button>
        </div>
    );
};

export default LanguageSwitcher;
