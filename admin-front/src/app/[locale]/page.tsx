'use client';

import { useTranslations } from 'next-intl';
import Sidebar from '@/components/ui/mf/sidebar';
import { MfSkeleton } from '@/components/ui/mf/skeleton';
import Input from '@/components/ui/mf/input';
import Text from '@/components/ui/mf/text';
import Select from '@/components/ui/mf/select';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const data = [
    {
      value: '1',
      label: 'Test'
    },
    {
      value: '2',
      label: 'Test 2' 
    },
    {
      value: '3',
      label: 'Test 3'
    }
  ]
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-10 bg-white sm:ml-60">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      </div>
    </div>
  );
}