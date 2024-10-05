import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Si no hay token, redirige al login
    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Si el token es válido, permite el acceso
    return NextResponse.next();
}

// Aplica el middleware a las rutas bajo /admin
export const config = {
    matcher: ['/admin/:path*'],
};
