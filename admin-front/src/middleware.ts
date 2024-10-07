import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing'; // Importa tu archivo de rutas de i18n

// Función principal del middleware
export default async function middleware(req: NextRequest) {
    // Aplicar la internacionalización con next-intl
    const intlMiddleware = createMiddleware(routing);

    // Aplicar la lógica de next-intl middleware primero
    const response = intlMiddleware(req);

    // Evitar aplicar la lógica de autenticación en las rutas de la API
    if (req.nextUrl.pathname.startsWith('/api/')) {
        return response;
    }

    // Obtener el token de autenticación
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Redirigir a login si no hay token y la ruta no está autenticada
    if (!token && req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verificar el rol solo para rutas específicas de administración
    if (req.nextUrl.pathname.startsWith('/admin/users')) {
        if (token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
        }
    }

    return response; // Retorna la respuesta del middleware combinado
}

// Configuración del matcher para aplicar el middleware en las rutas específicas
export const config = {
    matcher: [
        '/', 
        '/(es|en)/:path*', 
        '/admin/:path*', 
        '/es/admin/:path*', 
        '/en/admin/:path*',
        '/((?!api|_next|favicon.ico).*)'// Excluye API, _next, y favicon.ico
    ],
};
 