// LocaleLayoutServer.tsx
import { getMessages } from 'next-intl/server';

type LocaleParams = {
  locale: string; 
};

export default async function LocaleLayoutServer({ params }: { params: LocaleParams }) {
  const { locale}  = params;


  if (!locale) {
    throw new Error('Locale must be provided');
  }

  // Obtener mensajes para el idioma específico
  const messages = await getMessages({locale});
  
  return messages; 
}
