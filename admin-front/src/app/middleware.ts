import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Evita aplicar el middleware en rutas como /api/auth/session o cualquier otra de NextAuth.js
    if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Redirige a login si no hay token
    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verifica el rol solo para rutas específicas
    if (req.nextUrl.pathname.startsWith('/admin/users')) {
        if (token.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

// Aplica el middleware solo en las rutas de administración, excluyendo las rutas de API
export const config = {
    matcher: ['/admin/:path*', '/es/admin/:path*', '/en/admin/:path*'],  // Aplica a todas las rutas de administración
};
