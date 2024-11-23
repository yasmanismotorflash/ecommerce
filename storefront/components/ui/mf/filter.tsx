'use client'
import { Advertisement } from "@/interfaces";
import useFilterStore from "@/store/filtersStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import DoubleRangeSlider  from './doubleRangeSlider';
import { Range } from 'react-range';



interface Props{
    items:Advertisement[]
  }

export default function Filters({items}:Props) {

    const {filters, setFilters, url, setUrl} = useFilterStore();


    const router = useRouter();

    useEffect(()=>{
        router.push(`${url}`);
    },[url,router])

    useEffect(()=>{
            setUrl();
    },[filters])

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        color:'',
        price: ''
      });


    const [models,setModels] = useState<string[]>([])
    const [colors,setColors] = useState<string[]>([])
    
    const getBrands=(items:Advertisement[])=>{
        const brandsArray:string[] = [];

        items.map((item)=>{
            if (!brandsArray.find((brand)=>brand===item.brand)){
                brandsArray.push(item.brand)
            }
        })

        return brandsArray;
    }

    const brands = getBrands(items);
    


    const handleOnChange=(event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{

        const { name, value } = event.target;
        if (value!=''){
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (event.target.name==='brand'){
            const brand = event.target.value;
            const arrayModels:string[]=[];
            const arrayColors:string[]=[];
            
            items.map((item)=>{
                
                if (brand===item.brand&&!arrayModels.find((model)=>model===item.model)){
                    arrayModels.push(item.model);
                }

                if (brand===item.brand&&!arrayColors.find((color)=>color===item.color)){
                    arrayColors.push(item.color);
                }

            })

            setModels(arrayModels);
            setColors(arrayColors);
            console.log(arrayModels);
        }
    }

    const handleRangeChange = (range: [number, number]) => {
        console.log("Rango seleccionado:", range);
    };

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        console.log('FORMDATA',formData);

        let filterStr = '';

        Object.entries(formData).forEach(([key,value])=>{
            if (value.length>0)
                filterStr+=`${filters}${key}=${value}&`
        })
        console.log(DoubleRangeSlider.values)
        setFilters(filterStr);
    }

  return (
    <form onSubmit={handleSubmit} id='filterForm'>
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>

        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Marca</label>
            <select name="brand" className="w-full p-2 border border-gray-300 rounded" onChange={handleOnChange}>
                <option>Seleccione una marca</option>
                {
                    brands.map((item)=><option key={item}>{item}</option>)
                }
            </select>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Modelo</label>
            <select name="model" className="w-full p-2 border border-gray-300 rounded" onChange={handleOnChange}>
                <option>Seleccione un modelo</option>
                {
                    models.map((item)=><option key={item}>{item}</option>)
                }
            </select>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Color</label>
            <select name="color" className="w-full p-2 border border-gray-300 rounded" onChange={handleOnChange}>
                <option>Seleccione un color</option>
                {
                    colors.map((item)=><option key={item}>{item}</option>)
                }
            </select>
        </div>

           

        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Precio</label>
            <DoubleRangeSlider   min={0}  max={15000} onRangeChange={handleRangeChange}/>

        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
            Aplicar filtros
        </button>
    </form>
  );
}