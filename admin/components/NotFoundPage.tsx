import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Props{
  locale?:string
}

export function NotFoundPage(props:Props) {

  const locale:any = props?.locale;

  if (locale!=undefined){

    setRequestLocale(locale);
      
  }
  
  const t = useTranslations('NotFoundPage');

  return (
    <div className='bg-cover bg-center h-screen' style={{backgroundImage:`url('/img/404.png')`}}>
      <div className='flex flex-col items-center pt-14 w-full'>
        <div className='text-5xl text-white font-bold mb-10'>
          {t('title')}
        </div>  
        <div className="max-w-[460px] font-bold text-white text-lg text-center">{t('description')}</div>
      </div>
    </div>
  );
}
