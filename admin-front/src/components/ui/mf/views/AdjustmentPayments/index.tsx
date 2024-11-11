import * as React from 'react';
import {Input} from '@/components/ui/mf';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';


export function AdjustmentPayments() {
  return (
    <div className='w-full p-4 shadow-lg rounded-lg flex flex-col'>
      <h2 className='text-2xl font-semibold'>Ajustes de Pasarelas de pago</h2>
      <Input 
        label='Pasarela de pago' 
        placeholder='Entre el nombre de la pasarela'
        id='paymentGateway'
        name='paymentGateway'
        className='w-full'
        />
        <div className='p-2 flex justify-start items-center'>
          <Checkbox id="paymentGatewayEnable" />
          <label
            htmlFor="paymentGatewayEnable"
            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Pasarela habilitada
          </label>
        </div>
        <div className='w-full py-2 border-t-2 border-gray-600 flex justify-end'>
            <Button variant='outline' className='text-gray-700 hover:text-white bg-green-300 hover:bg-green-500 font-bold   '>
                Enviar
            </Button>
        </div>
    </div>
  );
}
