// LocaleLayout.tsx (Componente Principal)
import LocaleLayoutServer from './LocaleLayoutServer';
import LocaleLayoutClient from './LocaleLayoutClient';

export default async function LocaleLayout({ 
  children, 
  params: { locale } 
}: { 
  children: React.ReactNode; 
  params: { locale: string } 
}) {
  const messages = await LocaleLayoutServer({ params: { locale } }); 

  return <LocaleLayoutClient messages={messages} locale={locale}>{children}</LocaleLayoutClient>; 
}
