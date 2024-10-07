// "use client";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import { SessionProvider } from 'next-auth/react';

export default async function LocaleLayout({
  children,
  params: { locale },  
}: {
  children: React.ReactNode;
  params: { locale: string };  
}) {
  
  const messages = await getMessages(); 

  return (
    <html lang={locale}>
      <body>
        {/* <SessionProvider> */}
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}

