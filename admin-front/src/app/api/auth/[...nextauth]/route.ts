import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: { email?: string; password?: string }) {
                const user = { id: 1, name: 'Admin', email: credentials?.email };

                if (credentials?.email === 'admin@example.com' && credentials?.password === 'password') {
                    return user;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
