"use client";

// import { Thing } from 'mf-front';
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage'); 
  return (
   <>
    {/* <Thing/> */}
    <div>
    <h1>{t("title")}</h1>
      
    </div>
   </>
  );
}