
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
//import { getServerSession } from "next-auth";
//import { authConfig } from "@/app/api/auth";

export default async function HomePage() {
    //const session = await getServerSession(authConfig);
    

    const  locale  = await getLocale();
    console.log(locale);
    redirect(`/${locale}/admin`);

    
}