import {create} from 'zustand';

type Store ={
    url:string;
    filters:string;
    setUrl:()=>void;
    setFilters:(value:string)=>void;
}

const useFilterStore = create<Store>((set) => ({
    url:'/',
    filters:'',
    setUrl:()=>(set((state)=>({url:`/?${state.filters!==''?`${state.filters}`:``}`}))),
    setFilters:(value:string)=>(set(()=>({filters:value}))),    
}))

export default useFilterStore;