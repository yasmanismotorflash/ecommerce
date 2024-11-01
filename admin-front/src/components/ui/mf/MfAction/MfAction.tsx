'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


interface Props{
    title: string;
    action: string;
}

export default function MfAction({title, action}:Props){
    const url = process.env.CALLBACK_URL || '/#';
    const router = useRouter();
    const handleClick= async ()=>{
            switch (action){
                case 'signOut':
                    await signOut();
                    router.push(url);
                    break;
            }
    }
    return(
        <span onClick={handleClick}>
            {title}
        </span>
    )
}