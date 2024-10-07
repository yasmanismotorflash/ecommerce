// LocaleLayoutServer.tsx
import { getMessages } from 'next-intl/server';

export default async function LocaleLayoutServer({ params: { locale } }: { params: { locale: string } }) {
  // Obtener mensajes para el idioma específico
  const messages = await getMessages(locale); 
  return messages; 
}
