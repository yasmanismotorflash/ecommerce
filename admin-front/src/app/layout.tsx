"use client";

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from './context/LanguageContext';  // Importa el proveedor de idioma

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={params.locale}>
        <body>
        <SessionProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
