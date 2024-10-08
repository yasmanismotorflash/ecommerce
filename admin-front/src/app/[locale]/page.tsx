"use client";

import { Thing } from 'mf-front';
import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage'); 
  // const t = useTranslations();
  return (
   <>
    <Thing/>
    <div>
    {/* <h1>{t("title")}</h1> */}
    <h1 className='bg-black'>{t("title")}</h1>
      
    </div>
   </>
  );
}