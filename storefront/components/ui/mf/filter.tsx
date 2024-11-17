'use client'
import { Advertisement } from "@/interfaces";
import useFilterStore from "@/store/filtersStore";
import { ReactHTMLElement, useState } from 'react';



interface Props{
    items:Advertisement[]
  }

export default function Filters({items}:Props) {

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        price: ''
      });

    const {filters, setFilters, url, setUrl} = useFilterStore();

    const [models,setModels] = useState<string[]>([])
    
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
    


    const handleOnChange=(event:any)=>{

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (event.target.name==='brand'){
            const brand = event.target.value;
            const arrayModels:string[]=[];
            
            items.map((item)=>{
                if (brand===item.brand&&!arrayModels.find((model)=>model===item.model)){
                    arrayModels.push(item.model)
                }
            })
            setModels(arrayModels)
            console.log(arrayModels)
        }
    }

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        

        console.log(formData)
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
            <label className="block text-gray-700 font-semibold mb-2">Precio</label>
            <input name="price" type="range" min="5000" max="50000" className="w-full" onChange={handleOnChange}/>
            <div className="flex justify-between text-gray-600 text-sm">
                <span>$5,000</span>
                <span>$50,000</span>
            </div>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
            Aplicar filtros
        </button>
    </form>
  );
}