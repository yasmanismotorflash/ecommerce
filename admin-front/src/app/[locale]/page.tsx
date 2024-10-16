'use client';

import { useTranslations } from 'next-intl';
import Sidebar from '@/components/ui/mf/sidebar';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
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