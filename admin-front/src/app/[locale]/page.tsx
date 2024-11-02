
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function HomePage() {
    const  locale  = await getLocale();
    console.log(locale);
    redirect(`/${locale}/admin`);

    
}