import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verifica el rol
    if (req.nextUrl.pathname.startsWith('/admin/users')) {
        if (token.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
