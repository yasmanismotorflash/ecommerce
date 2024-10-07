"use client";

import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Config  from '../../../../next.config.mjs';
import {useLanguage} from "@/app/context/LanguageContext";

export default function UsersPage() {
    const { locale } = useLanguage();
    const translations = useTranslation(locale);

    return (
        <div>
            <LanguageSwitcher locales={Config.i18n.locales} />
            <h1>{translations.manageUsers}</h1>
        </div>
    );
}
