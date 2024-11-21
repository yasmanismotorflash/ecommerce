import {create} from 'zustand';

type Store ={
    url:string;
    filters:string;
    page:number;
    perPage:number;
    pages:number;
    total:number;
    setUrl:()=>void;
    setFilters:(value:string)=>void;
    setPage:(value:number)=>void;
    setPerPage:(value:number)=>void;
    setPages:(value:number)=>void;
    setTotal:(value:number)=>void;
}

const useFilterStore = create<Store>((set) => ({
    url:'/',
    filters:'',
    page:1,
    perPage:6,
    pages:2,
    total:12,
    setUrl:()=>(set((state)=>({url:`/es?${state.filters!==''?`${state.filters}`:``}page=${state.page}&perPage=${state.perPage}`}))),
    setFilters:(value:string)=>(set(()=>({filters:value}))),    
    setPage:(value:number)=>(set(()=>({page:value}))),    
    setPerPage:(value:number)=>(set(()=>({perPage:value}))),    
    setPages:(value:number)=>(set(()=>({pages:value}))),    
    setTotal:(value:number)=>(set(()=>({total:value}))),    
}))

export default useFilterStore;