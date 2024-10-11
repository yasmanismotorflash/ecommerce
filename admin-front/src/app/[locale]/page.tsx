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
        <Input 
          id='test' 
          name='test' 
          placeholder='MY Test Input' 
          className='rounded-sm' 
          label='Test Input Label'
          error='Este campo es requerido'
        />
        <Text
          label='Test Text Label'
          value='My Text Input'
          id='test'
          name='test'
          className='rounded-sm'
          cols={40}
          error='Este campo es requerido'
        />

        <Select 
          data={data}
          default_data={{value: '0', label: 'Test 0'}}
          id='test' 
          name='test' 
          className='rounded-sm' 
          label='Test Select Label'
          error='debe seleccionar un valor'
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