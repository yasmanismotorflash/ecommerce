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
            async authorize(credentials) {
                // Verifica si las credenciales están definidas
                if (!credentials) {
                    return null;  // Si no hay credenciales, retorna null (no autorizado)
                }

                // Simula un usuario con `id` como una cadena
                const user = { id: '1', name: 'Admin', email: credentials.email };

                // Verifica las credenciales
                if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
                    return user;  // Retorna el usuario si las credenciales coinciden
                }

                return null;  // Si las credenciales no son correctas, retorna null
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
