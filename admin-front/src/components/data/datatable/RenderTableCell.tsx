/*import { Key } from "react";
import { TableCell } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import Image from "next/image";*/

interface RenderProps{
    row:[],
    column:[],
    colIndex:number
    Item:[]
}

export default function RenderTableCell(props:RenderProps){
    //const {row,column,colIndex,Item} = props
    console.log(props);
    /*if (column.sortable!==undefined){
        let cellValue:any = null;*/
        /*if (typeof (row[column.name]) === 'object' && row[column.name]!==null) {
            cellValue = row[column.name].name;
        }else*/
        /*    cellValue = (row[column.name])
        if (cellValue!==undefined)
            switch (column.name){
                case "selection":
                    if (cellValue===true){
                        return(
                            <TableCell key={colIndex} className="font-medium " hidden={column.hide} >            
                                <div className="flex items-center h-full ">
                                    <div className="bg-green-500 w-2 h-2 rounded-full mx-auto"></div>

                                </div>
                            </TableCell>)
                    }else{
                        return(
                            <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                                <div className="flex items-center h-full ">
                                    <div className="bg-red-500 w-2 h-2 rounded-full mx-auto"></div>
                                </div>
                            </TableCell>)
                    }
                case "enabled":
                    if (cellValue===true){
                        return(
                            <TableCell key={colIndex} className="font-medium " hidden={column.hide} >            
                                <div className="flex items-center h-full ">
                                    <div className="bg-green-500 w-2 h-2 rounded-full mx-auto"></div>

                                </div>
                            </TableCell>)
                    }else{
                        return(
                            <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                                <div className="flex items-center h-full ">
                                    <div className="bg-red-500 w-2 h-2 rounded-full mx-auto"></div>

                                </div>
                            </TableCell>)
                    }
                case "statusBooking":
                    if (cellValue==='DISPONIBLE'){
                        return(
                            <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                                <div className="bg-green-900 rounded-xl text-center px-2 py-1 text-white ">
                                    {cellValue}
                                </div>
                            </TableCell>)
                    }else{
                        return(
                            <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                                <div className="bg-red-900 rounded-xl text-center px-2 py-1 text-white ">
                                    {cellValue}
                                </div>
                            </TableCell>)
                    }
                case "shop":
                    return(
                    <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                        <div className="bg-gray-500 border-gray-800 border dark:bg-gray-800 dark:border-gray-500 rounded-xl text-center p-1 w-fit text-white">
                            {cellValue}
                        </div>
                    </TableCell>
                    )
                case "images":
                    return(
                    <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                        <div className="text-center p-1 w-full text-white">
                            
                                <Carousel className="w-full max-w-xs mx-auto">
                                    <CarouselContent>
                                    {cellValue.map((value,index)=>(
                                        <CarouselItem key={index}>
                                            <img src={value.url} alt={value.name} className=" rounded-md" />
                                        </CarouselItem>
                                    ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                        </div>
                    </TableCell>
                    )
                case "url":
                    return(
                    <TableCell key={colIndex} className="font-medium" hidden={column.hide} >            
                        <div className="text-center p-1 w-full text-white">
                            
                            <img src={cellValue} alt='' className="w-[250px] rounded-md mx-auto"  />
                                
                        </div>
                    </TableCell>
                    )
                default: return (
                    <TableCell key={colIndex} className="font-medium text-center" hidden={column.hide} >                   
                            {cellValue}
                    </TableCell>)
            }
    }*/
}