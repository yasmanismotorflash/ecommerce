'use client'

import { TableHead } from "@/components/ui/table";
//import useStore from '@/store/store';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";


export default function RenderTableHeader({paramSource}:{paramSource:string}){
    const router = useRouter();
    //const {items, sortDescriptor, setSortDescriptor, url, setUrl, setSource } = useStore();
    



    /*useEffect(()=>{
        router.push(url);
    },[url])*/


   /* const handleSort=(value:string)=>{
        const sortColumn=sortDescriptor.column
        if (value===sortDescriptor.column){
            if (sortDescriptor.direction==='ascending')
                setSortDescriptor(sortColumn,'descending')
            else{
                setSortDescriptor(sortColumn,'ascending')
            }
        }else{
            setSortDescriptor(value,'ascending')
        }
        setUrl();
    }*/

    const SetTableRow=()=>{
        return(
            <>
                {/*
                    items.map((item)=>(
                        item.sortable!==undefined?
                            <TableHead key={item.name}  hidden={item.hide}  >
                                <div className="text-center">
                                    <Button variant="ghost" onClick={()=>handleSort(item.name)} >{item.label}
                                        {
                                            sortDescriptor.column===item.name ? sortDescriptor.direction==='descending'?
                                            <ChevronUp className="pl-1" />:
                                            <ChevronDown className="pl-1" />:null
                                        }</Button>
                                </div> 
                            </TableHead>:
                            null
                    ))
                */}
                <TableHead>
                    Acciones
                </TableHead>
            </>
        )
    }

    return(
        <SetTableRow />
    )
}