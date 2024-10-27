'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { MfSkeleton } from '@/components/ui/mf/skeleton';
//import Sidebar from '@/components/ui/mf/sidebar';
import Input from '@/components/ui/mf/input';
import Select from '@/components/ui/mf/select';
import Text from '@/components/ui/mf/text';
import { Spinner } from '@/components/ui/spinner';

export default function AdminPage() {
    const t = useTranslations('AdminPage');
    const { data: session, status } = useSession();
    const router = useRouter();
    const locale = useLocale();
    const data = [
        {
            value: '1',
            label: 'Test',
        },
        {
            value: '2',
            label: 'Test 2',
        },
        {
            value: '3',
            label: 'Test 3',
        },
    ];
    useEffect(() => {
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
            {/* Sidebar */}

            {/* Contenido principal */}
            <div className="flex-1 p-10 bg-white sm:ml-60">
                <h1 className="text-3xl font-bold mb-8">
                    {t('title', { name: session.user?.name })}
                </h1>
                <p>{t('message', { locale: locale })}</p>
                <Input
                    id="test"
                    name="test"
                    placeholder="MY Test Input"
                    className="rounded-sm"
                    label="Test Input Label"
                    error="Este campo es requerido"
                />
                <Text
                    label="Test Text Label"
                    value="My Text Input"
                    id="test"
                    name="test"
                    className="rounded-sm min-h-[80px]"
                    cols={50}
                    rows={40}
                    error="Este campo es requerido"
                />

                <Select
                    data={data}
                    default_data={{ value: '0', label: 'Test 0' }}
                    id="test"
                    name="test"
                    className="rounded-sm"
                    label="Test Select Label"
                    error="debe seleccionar un valor"
                />
                {/* Simulación de contenido Mfcon Skeletons */}
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
