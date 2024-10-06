import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

// Extiende el tipo de `session.user` para incluir la propiedad `id`
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;  // Añadimos la propiedad `id`
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const user = { id: '1', name: 'Admin', email: credentials.email };
                if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
                    return user;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user && token?.id) {
                session.user.id = token.id as string;  // Añadimos el id de token a session.user
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
