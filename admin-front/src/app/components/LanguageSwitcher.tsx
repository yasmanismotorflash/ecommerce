"use client";

import { usePathname } from 'next/navigation';  // Obtiene la ruta actual
import { useRouter } from 'next/navigation';  // Para manejar la navegación

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();  // Obtiene la ruta actual

    const changeLanguage = (lang: string) => {
        router.push(`/${lang}${pathname}`);  // Cambia el idioma y navega a la misma ruta
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
        </div>
    );
};

export default LanguageSwitcher;
