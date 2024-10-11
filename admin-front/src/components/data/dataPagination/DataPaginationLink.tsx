'use client'
import {
    PaginationEllipsis,
    PaginationItem,
	PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../../ui/pagination";
import useStore from "@/store/store";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

interface Props{
    type:string;
    pages:number;
    paramSource:string;
    item:[];
}

export default function DataPaginationLink(props:Props){
    const router = useRouter();
    const {type,pages,paramSource,item} = props
    const {page,setPage,url,setUrl, source,setSource,items,setItems} = useStore();

    useEffect(()=>{
        router.push(url);
    },[url])

    useEffect(()=>{
        if (source!==''){
            setUrl();
        }
    },[source])

    useEffect(()=>{
        if (source===''||source!=paramSource){        
            setSource(paramSource)
        }
    },[paramSource])

    useEffect(()=>{
        
        if (items.length===0||items.length!==item.length){
            setItems(item)
        }
    },[item])


    const configSource=()=>{
        if (source===''){
            setSource(paramSource);
        }
    }

    const setPrevious=(e:any)=>{
        e.preventDefault();
        if (page>1){
            setPage(page-1);
        }
        setUrl();                    
    }

    const setNext=(e:any)=>{
        e.preventDefault();
        if (page<pages){
            setPage(page+1);
        }
        setUrl();
                    
    }

    const setCurrent=(value:number)=>{
        if (page!==value){
            setPage(value);
        }
        setUrl();
    }


    const SetButtonPage=()=>{
        let paginations=[];
        if (pages<=5){
            
            for (let i = 1; i <= pages ; i++){
                paginations.push(<PaginationItem><PaginationLink href="#" key={i} onClick={()=>setCurrent(i)}>{i}</PaginationLink></PaginationItem>)
            }
            
            return(
                <>
                {paginations}
                </>
            )
        }
        if (page<5&&pages>5)
            return(
                <>
                    <PaginationItem>
                        <PaginationLink key={1} href="#" onClick={()=>setCurrent(1)}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={2} href="#" onClick={()=>setCurrent(2)}>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={3} href="#" onClick={()=>setCurrent(3)}>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={4} href="#" onClick={()=>setCurrent(4)}>4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={5} href="#" onClick={()=>setCurrent(5)}>5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" key={pages} onClick={()=>setCurrent(pages)}>{pages}</PaginationLink>
                    </PaginationItem>
                    
                </>
            )
        if (page>=5 && page<=pages-5){
            return(
                <>
                    <PaginationItem>
                        <PaginationLink href="#" key={1} onClick={()=>setCurrent(1)}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={page-1} href="#" onClick={()=>setCurrent(page-1)}>{page-1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={page} href="#" onClick={()=>setCurrent(page)}>{page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={page+1} href="#" onClick={()=>setCurrent(page+1)}>{page+1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={pages} href="#" onClick={()=>setCurrent(pages)}>{pages}</PaginationLink>
                    </PaginationItem>
                </>
            )
        }
        if (page>(pages-5))
            return(
                <>
                    <PaginationItem>
                        <PaginationLink key={1} href="#" onClick={()=>setCurrent(1)}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={pages-4} href="#" onClick={()=>setCurrent(pages-4)}>{pages-4}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={pages-3} href="#" onClick={()=>setCurrent(pages-3)}>{pages-3}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={pages-2} href="#" onClick={()=>setCurrent(pages-2)}>{pages-2}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={pages-1} href="#" onClick={()=>setCurrent(pages-1)}>{pages-1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink key={pages} href="#" onClick={()=>setCurrent(pages)}>{pages}</PaginationLink>
                    </PaginationItem>
                    
                </>
            )
    }

    switch (type){
        case 'previous':
            return(
                <PaginationPrevious href="#" onClick={setPrevious} />
            )
        case 'next':
            return(
                <PaginationNext href="#" onClick={setNext} />
            )
        case 'middle':
            return(
                <SetButtonPage />
            )   
    }

}