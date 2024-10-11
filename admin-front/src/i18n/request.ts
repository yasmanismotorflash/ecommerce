import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Definimos los tipos de locales permitidos
type Locale = 'en' | 'es' ; 

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  return {
    messages: (await import(`../../locales/${locale}.json`)).default,
    timeZone: 'Europe/Vienna',
  };
});
