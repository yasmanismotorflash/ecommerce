
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { NextAuthOptions } from 'next-auth';
import { error } from 'console';
import { RequestInternal } from 'next-auth';
import { redirect } from "next/navigation";

// Extiende el tipo de `session.user` para incluir la propiedad `id`
declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;  // Añadimos la propiedad `id`
            name?: string | null;
            email?: string | null;
            image?: string | null;
            token?:string | null;
        }
    }
}

interface Credentials {
    email: string;
    password: string;
  }
  
  // Definimos el tipo de usuario que la API devuelve tras la autenticación.
  interface User {
    id?: string;
    email?: string;
    name?: string;
    token?:string | null;
    error?:string | null;
    // Agrega otros campos que la API devuelva, si es necesario.
  }

  type Awaitable<T> = T | Promise<T>;

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
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, 
                req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Awaitable <User | null> {
                if (!credentials) {
                    return null;
                }

                const parsedCredentials = z
                .object({ 
                    email: z.string().email(),
                    password: z.string().min(3) 
                })
                .safeParse(credentials);
                //console.log(parsedCredentials)
                if (parsedCredentials.success){
                    const URI = process.env.API_URL
                    console.log(`${URI}/auth`)
                    const { email, password } = parsedCredentials.data;
                    const query ={
                        "email":email,
                        "password":password,
                    }
                    console.log(`${URI}/auth`);
                    if (!URI){
                        throw error('Thereis no URI!!');
                    }


                    const res = await validateUser(`${URI}/auth`,query);
                    const user ={
                        'email':'admin@apicore.local',
                        'token':'',
                        'error':res?res.error:null
                    }
                    
                    console.log('USER',user);
                    if (!user.error){
                        return user;
                    }else{
                        //throw new Error("Invalid email or password");
                        return {'error':user.error};
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

const validateUser=async(url:string,query:any)=>{
    console.log(JSON.stringify(query))
    const res = await fetch(url, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json", 
        },
        body: JSON.stringify(query),
    })
    if (!res.ok) {
        const errorMessage = await res.text();  // Lee el contenido del error
        console.error('Error al autenticar:', errorMessage);
        return null;
        //throw new Error(`Failed to authenticate user: ${errorMessage}`);
    }
    console.log('RESPONSE',res);
    return res
}
