'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { MfSkeleton } from '@/components/ui/mf/MfSkeleton/MfSkeleton';
import { Spinner } from '@/components/ui/spinner';


export default function AdminPage() {
    const t = useTranslations('AdminPage');
    const { data: session, status } = useSession();
    const router = useRouter();
    const locale = useLocale();
    useEffect(() => {
        if (status === 'authenticated') {
            console.log('SESSION', session?.user.name);
        }
        if (status === 'unauthenticated') {
            // Redirige teniendo en cuenta el idioma
            router.push(`/${locale}/admin/login`);
        }
    }, [status, router, locale]);

    if (status === 'loading') {
        return (
            <div className="flex w-screen h-screen justify-center items-center ">
                <div className="flex rounded-2xl shadow-lg shadow-gray-400 p-8 bg-gray-100">
                    <Spinner size="small" />{' '}
                    <span className="ml-4 text-xl">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="flex min-h-screen">

            {/* Contenido principal */}
            <div className="flex-1 p-5 bg-white ">
                <h1 className="text-3xl font-bold mb-8">
                    {t('title', { name: session.user?.name })}
                </h1>
                <p>{t('message', { locale: locale })}</p>

                {/* Simulación de contenido con MfSkeletons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <MfSkeleton className="h-[200px] w-full rounded-xl" />
                        <MfSkeleton className="h-4 w-3/4" />
                        <MfSkeleton className="h-4 w-1/2" />
                    </div>

                    <div className="space-y-4">
                        <MfSkeleton className="h-[200px] w-full rounded-xl" />
                        <MfSkeleton className="h-4 w-3/4" />
                        <MfSkeleton className="h-4 w-1/2" />
                    </div>

                    <div className="space-y-4">
                        <MfSkeleton className="h-[200px] w-full rounded-xl" />
                        <MfSkeleton className="h-4 w-3/4" />
                        <MfSkeleton className="h-4 w-1/2" />
                    </div>

                    <div className="space-y-4">
                        <MfSkeleton className="h-[200px] w-full rounded-xl" />
                        <MfSkeleton className="h-4 w-3/4" />
                        <MfSkeleton className="h-4 w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
