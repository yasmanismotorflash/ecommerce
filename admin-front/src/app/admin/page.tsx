"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        router.push('/admin/login');
        return null;
    }

    return (
        <div>
            <h1>Welcome, {session.user?.name}</h1>
            <p>This is the admin dashboard.</p>
        </div>
    );
}

