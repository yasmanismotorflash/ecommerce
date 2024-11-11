import CredentialsProvider from 'next-auth/providers/credentials';
import {z} from 'zod';
import NextAuth, {NextAuthOptions} from 'next-auth';
import {RequestInternal} from 'next-auth';

// Extiende el tipo de `session.user` para incluir la propiedad `id`
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            token: string | null;
        }
    }
}

/*interface Credentials {
    email: string;
    password: string;
}*/

interface User {
    id: string;
    email?: string;
    name?: string;
    token: string;
    error?: string;
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
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined,
                req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
            ): Promise<User | null> {  // Cambio a Promise<User | null>
                if (!credentials) {
                    return null;
                }
                console.log(req);
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(3)
                    })
                    .safeParse(credentials);
                if (parsedCredentials.success) {

                    const URI = process.env.API_URL;
                    const {email, password} = parsedCredentials.data;
                    const query = {email, password};

                    if (!URI) {
                        throw new Error('There is no URI!!');
                    }
                    console.log('PARSE', parsedCredentials)


                    return {
                        id: "",//res.id ?? "",
                        email: "admin@backend.local",//res.email,
                        name: "SysAdmin",//res.name,
                        token: "sjdsdsydshhdyt445sds6d7dsud8s8f88f77gf",
                    };

                    const res = await validateUser(`${URI}/auth`, query);


                    console.log('RES', res)
                    if (res && !res.error) {
                        return {
                            id: "",//res.id ?? "",
                            email: "admin@backend.local",//res.email,
                            name: "SysAdmin",//res.name,
                            token: "sjdsdsydshhdyt445sds6d7dsud8s8f88f77gf",
                        };
                    } else {
                        return null;
                    }
                }
                return null;
            }
        })
    ],

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                //token.token = user.token;
            }
            return token;
        },
        async session({session, token}) {
            if (session?.user && token?.id) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

const validateUser = async (url: string, query: { email: string; password: string; }): Promise<User | null> => {

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(query),
    });

    if (!res.ok) {
        console.error('Error al autenticar:', await res.text());
        return null;
    }

    const data = await res.json();
    return data as User;

};
