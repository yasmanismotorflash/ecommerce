"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MfInput from '@/components/ui/mf/input';
import MfButton from '@/components/ui/mf/button';
import {LockClosedIcon, PersonIcon} from '@radix-ui/react-icons'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('Invalid credentials');
        } else {
            setError(null);
            router.push('/admin');  // Redirige al dashboard después del login
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center border-solid border-2 border-gray-600 rounded-lg p-8'>
                <h2 className='pb-5 flex flex-row'><PersonIcon className='size-5' />&nbsp;Login</h2>
                
            <form onSubmit={handleSubmit} className='flex flex-col justify-center w-full'>
                <MfInput type="email" name="email" placeholder="Email" required />
                <MfInput type="password" name="password" placeholder="Password" required />
                <MfButton 
                    type="submit"
                    className='hover:bg-gray-700 hover:text-white'
                >Entrar</MfButton>
            </form>
            {error && <p>{error}</p>}
            </div>
        </div>
    );
}
