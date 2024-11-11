import {
    AdjustmentCar, 
    AdjustmentCard, 
    AdjustmentMotorcycles,
    AdjustmentPayments
} from '@/components/ui/mf/views';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import React from 'react';

export default function AdjustmentsPage(){
    return(
        <div className="flex-1 p-5 bg-white w-full">
                <h1 className="text-3xl font-bold mb-8">
                    Ajustes
                </h1>
                <Tabs defaultValue="card" className="w-full flex" >
                    <TabsContent value="card" className='w-full'>
                        <AdjustmentCard />
                    </TabsContent>
                    <TabsContent value="car" className='w-full'>
                        <AdjustmentCar />
                    </TabsContent>
                    <TabsContent value="motorcycles" className='w-full'>
                        <AdjustmentMotorcycles />
                    </TabsContent>
                    <TabsContent value="pagos" className='w-full'>
                        <AdjustmentPayments />
                    </TabsContent>
                    <TabsList className="flex flex-col mr-4 p-2  h-fit">
                        <TabsTrigger value="card" className='font-medium text-lg'>
                            Ficha
                        </TabsTrigger>
                        <TabsTrigger value="car" className='font-medium text-lg'>
                            Autos
                        </TabsTrigger>
                        <TabsTrigger value="motorcycles" className='font-medium text-lg'>
                            Motos
                        </TabsTrigger>
                        <TabsTrigger value="pagos" className='font-medium text-lg'>
                            Pagos
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
        </div>

    )
}