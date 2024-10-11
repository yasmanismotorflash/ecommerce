"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';



export default function LocaleLayoutClient({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages:  Record<string, string | AbstractIntlMessages>;
  locale: string; 
}) {
  return (
    <html lang={locale}>
      <body>
        <SessionProvider>
          <NextIntlClientProvider messages={messages} locale={locale}> 
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
