'use client'
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';



export function getLocales(section:string){       
    const locale = useLocale();
    const t = useTranslations(section);
    return ({locale,t})
}