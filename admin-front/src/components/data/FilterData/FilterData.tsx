'use client'
import {MixerHorizontalIcon,TrashIcon} from '@radix-ui/react-icons';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/mf/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/mf/input";
import useStore from '@/store/store';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


export default function FilterData(){
    const {items, filters, setFilters, url, setUrl} = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        router.push(url);
    },[url])

    useEffect(()=>{

        setUrl();
    },[filters])

    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let tempFilters= '';

        for (const [key, value] of formData.entries()) {
            if (value){
                switch (value){
                    case 'on':
                        tempFilters+=`&${key}=true`;
                        break;
                    case 'off':
                        tempFilters+=`&${key}=false`;
                        break;
                    default:
                        tempFilters+=`&${key}=${value}`

                } 
            }
        }
        
        if (tempFilters!==''){
            setFilters(tempFilters);
        }
    }

    const handleCleanFilters=()=>{
        setFilters('')
        setIsOpen(false);
    }

    return(
        <>
        <Sheet  key={'left'} open={isOpen} onOpenChange={setIsOpen} >
            <SheetTrigger asChild>
                <Button variant="outline" className="dark:border-white dark:hover:bg-white dark:hover:text-black"><MixerHorizontalIcon className='mr-2' />  Filtrar</Button>
            </SheetTrigger>
            <SheetContent side='left' className='bg-white dark:bg-gray-800 text-black dark:text-white w-[400px]'>
                <SheetHeader>
                <SheetTitle>Filtrar por campos</SheetTitle>
                <SheetDescription>
                    <p>Escriba el valor a filtrar en el campo correspondiente.</p>
                    <p>Haga click en Enviar cuando termine.</p>
                </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}> 
                <div className="grid gap-4 py-4">
                    {
                        items.map((item,index)=>(
                            item.inSearch===true?
                                <div key={index}  className="grid grid-cols-8 items-center gap-4 w-full">
                                    {
                                        item.type==='string'?
                                        <>
                                            <Label htmlFor={item.name} className="text-right col-span-3">{item.label}</Label>
                                            <Input id={item.name} name={item.name}  className="col-span-4 dark:border-white" />
                                        </>:
                                        item.type==='number'?
                                        <>
                                            <Label htmlFor={item.name} className="text-right col-span-3">{item.label}</Label>
                                            <Input id={item.name} name={item.name} type={item.type}   className="col-span-4 dark:border-white" />
                                        </>:
                                        item.type==='boolean'?
                                            <>
                                                
                                                <label
                                                    htmlFor={item.name}
                                                    className=" col-span-3 text-right w-full"
                                                >
                                                    {item.label}
                                                </label>
                                                <RadioGroup id={item.name} name={item.name} className='col-span-4 px-3 flex flex-row justify-between'>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="true" id="option-one" />
                                                        <Label htmlFor="option-one">Si</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="false" id="option-two" />
                                                        <Label htmlFor="option-two">No</Label>
                                                    </div>
                                                </RadioGroup>
                                            </>:
                                        null    
                                    }
                                </div>
                            :null

                        ))
                    }
                    
                </div>
                <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Filtrar</Button>
                </SheetClose>
                </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
        {
            filters!==''?
                <Button variant="outline" className="dark:border-white dark:hover:bg-white dark:hover:text-black" type="button" onClick={handleCleanFilters}> 
                    <TrashIcon className='mr-2'/> Limpiar Filtros
                </Button>
            :null
        }
        </>
    )
}