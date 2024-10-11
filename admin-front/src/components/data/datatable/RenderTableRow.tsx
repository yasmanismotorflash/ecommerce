'use client'
import useStore from "@/store/store"
import RenderTableCell from "./RenderTableCell"
import { TableCell, TableRow } from "@/components/ui/table"
import { EyeOpenIcon } from '@radix-ui/react-icons';
import useImageStore from "@/store/imagesStore";
import { Button } from "@/components/ui/mf/button";
import { useCallback } from "react";

export default function RenderTableRow({data}:{data:any}){
    const { setIsImageDialogOpen, setImageId, isLoading, setIsLoading } = useImageStore();
    const handleClick = useCallback((value:string)=>{
            setIsImageDialogOpen(true);
            setImageId(value);

    },[])
    
    const {items}=useStore()
    return(
        data!==undefined?
            data.map((row:object,rowIndex:number)=>(
                <TableRow key={rowIndex} className="dark:hover:bg-gray-600">
                    {
                        items.map((column,colIndex:number)=>(
                            <RenderTableCell key={colIndex} row={row} column={column} colIndex={colIndex} Item={items} />                            
                        ))
                    }
                    <TableCell key={`${rowIndex}-Action`} className="text-center">
                        <Button variant='ghost' id={row.id} name={row.id} onClick={()=>handleClick(row.id)} tooltip='Ver imagen' >
                            <EyeOpenIcon key={row.id}  className="w-5 h-5 cursor-pointer"   />
                        </Button>
                    </TableCell>
                </TableRow>
            )):
        null
    )
}