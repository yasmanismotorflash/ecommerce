
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//export default createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const acceptLanguage = req.headers.get("accept-language") || "";
    const preferredLanguage = acceptLanguage.split(",")[0]; // Ejemplo: "es-ES"
  
    // Puedes agregar el idioma como header o cookie
    const response = NextResponse.next();
    response.cookies.set("preferred-language", preferredLanguage);
  
    return response;
  }

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(es|en)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};
