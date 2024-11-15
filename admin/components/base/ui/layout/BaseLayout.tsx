import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';



type Props = {
  children: ReactNode;
  locale: string;
};

export async function BaseLayout({children}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
  );
}
