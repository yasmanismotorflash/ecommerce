"use client";

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
                                       children,
                                       params
                                   }: {
    children: React.ReactNode;
    params: { locale: string };  // Obtenemos el idioma desde los parámetros de la ruta
}) {
    const { locale } = params || { locale: 'en' };  // Usa 'en' como valor por defecto si no hay locale

    return (
        <html lang={locale}>
        <body>
        <SessionProvider>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
