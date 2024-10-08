"use client";

import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';


export default function LocaleLayoutClient({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: Record<string, any>;
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
