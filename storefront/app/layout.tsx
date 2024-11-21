import {ReactNode} from 'react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import './styles.css';
import clsx from 'clsx';
import {Inter} from 'next/font/google';
import {routing} from '@/i18n/routing';

const inter = Inter({subsets: ['latin']});

type Props = {
  children: ReactNode;
  params: {locale: string};
};



export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params: {locale}
}: Omit<Props, 'children'>) {
  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}


// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children, params:{locale}}: Props) {


  // Enable static rendering
  setRequestLocale(locale);
  return (
  <html className="h-full" lang={locale}>
    <body className={clsx(inter.className, 'flex h-full flex-col')}>
      {children}
    </body>
  </html> 
  )
        
}
