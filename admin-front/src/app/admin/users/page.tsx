"use client";

import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function UsersPage() {
    const locale = 'en';  // Puedes gestionar el idioma de otra forma si es necesario
    const translations = useTranslation(locale);  // Carga las traducciones

    return (
        <div>
            <LanguageSwitcher />
            <h1>{translations.manageUsers}</h1>
        </div>
    );
}
