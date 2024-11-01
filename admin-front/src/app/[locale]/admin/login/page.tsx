'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MfInput from '@/components/ui/mf/MfInput/MfInput';
import MfButton from '@/components/ui/mf/MfButton/MfButton';
import { PersonIcon } from '@radix-ui/react-icons';
import { useLocale } from 'next-intl';
export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const locale = useLocale();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center rounded-2xl shadow-lg shadow-gray-400 p-8 bg-gray-100">
                <div className="relative bg-gray-400 rounded-full p-4 shadow-md">
                    <PersonIcon className="size-7" />
                </div>
                <h2 className="flex flex-row text-2xl">Login</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center w-full"
                >
                    <MfInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className=" border-gray-500"
                    />
                    <MfInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className=" border-gray-500"
                    />
                    <MfButton
                        type="submit"
                        className="hover:bg-gray-700 hover:text-white w-full"
                    >
                        Entrar
                    </MfButton>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
