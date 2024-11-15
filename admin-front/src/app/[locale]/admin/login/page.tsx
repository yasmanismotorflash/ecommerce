'use client';
import React,{ useEffect } from 'react';
import { useFormState } from 'react-dom'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonIcon } from '@radix-ui/react-icons';
import { useLocale } from 'next-intl';
import { Input } from '@/components/ui/mf';
import { Button } from '@/components/ui/button';


//importaciones nuevas
import { getMessageFromCode } from "@/lib/utils";
import { authenticate } from '@/lib/actions';


export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const locale = useLocale();
    const [result, dispatch] = useFormState(authenticate, undefined);


    useEffect(() => {
        console.log('RESULT',result);
        if (result) {
          if (result.type === "error") {
            const errorMessage = getMessageFromCode(result.resultCode)
                console.log(errorMessage)
          } else {
            const errorMessage = getMessageFromCode(result.resultCode)
            console.log(errorMessage);
            router.refresh();
          }
        }
      }, [result, router]);

    /*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const loginEmail = formData.get('email') as string;
        const loginPassword = formData.get('password') as string;
        const loginCallbackUrl = process.env.CALLBACK_URL;

        const result = await signIn('credentials', {
            redirect: false,
            email: loginEmail,
            password: loginPassword,
            callbackUrl: loginCallbackUrl,
        });

        console.log('RESULT', result);
        if (result?.error) {
            setError(error);
        } else {
            setError(null);
            router.push(`/${locale}/admin`); //Redirige al dashboard después del login
        }
    };*/

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center rounded-2xl shadow-lg shadow-gray-400 p-8 bg-gray-100">
                <div className="relative bg-gray-400 rounded-full p-4 shadow-md">
                    <PersonIcon className="size-7" />
                </div>
                <h2 className="flex flex-row text-2xl">Login</h2>
                <form
                    action={dispatch}
                    className="flex flex-col justify-center w-full"
                >
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className=" border-gray-500"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className=" border-gray-500"
                    />
                    <Button
                        type="submit"
                        className="hover:bg-gray-700 hover:text-white w-full"
                    >
                        Entrar
                    </Button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
