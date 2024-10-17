import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { NextAuthOptions } from 'next-auth';
import { error } from 'console';
import { redirect } from "next/navigation";

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
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials,req) {
                if (!credentials) {
                    return null;
                }

                const parsedCredentials = z
                .object({ 
                    email: z.string().email(),
                    password: z.string().min(3) 
                })
                .safeParse(credentials);
                console.log(parsedCredentials)
                if (parsedCredentials.success){
                    const URI = process.env.API_URL
                    console.log(`${URI}/auth`)
                    const { email, password } = parsedCredentials.data;
                    const query ={
                        "email":email,
                        "password":password,
                    }
                    
                    if (!URI){
                        throw error('Thereis no URI!!');
                    }


                    const res = await fetch(`${URI}/auth`, {
                        method: 'POST',
                        body: JSON.stringify(query),
                        headers: { "Content-Type": "application/json" }
                    })
                    console.log('RES',res)
                    if (res.status===200){
                        redirect('/admin');
                    }
                }
                //console.log(res)
                /*const user = { id: '1', name: 'Admin', email: credentials.email };
                if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
                    return user;
                }*/
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
        async signIn({ email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
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
