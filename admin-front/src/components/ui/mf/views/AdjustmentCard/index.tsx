import * as React from 'react';
import {Input} from '@/components/ui/mf';
import { Button } from '@/components/ui/button';


export function AdjustmentCard() {
  return (
    <div className='w-full p-4 shadow-lg rounded-lg flex flex-col'>
      <h2 className='text-2xl font-semibold'>Ajustes de ficha</h2>
      <Input 
        label='Teléfono' 
        placeholder='Entre el teléfono de contacto'
        id='phone'
        name='phone'
        className='w-full'
        />
      <Input 
        label='Email' 
        placeholder='Entre el email de contacto'
        id='email'
        name='email'
        type='email'
        className='w-full'
        />
        <div className='w-full py-2 border-t-2 border-gray-600 flex justify-end'>
            <Button variant='outline' className='text-gray-700 hover:text-white bg-green-300 hover:bg-green-500 font-bold   '>
                Enviar
            </Button>
        </div>
    </div>
  );
}
