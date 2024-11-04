
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getServerSession } from "next-auth";

export default async function HomePage() {
    const  locale  = await getLocale();
    const session = await getServerSession();
    console.log(locale);

    if (session)
        redirect(`/${locale}/admin`);
    else
        redirect(`/${locale}/login`);

    
}