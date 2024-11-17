'use client'
import { Advertisement } from '@/interfaces'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props{
  item:Advertisement
}

export function Card({item}:Props) {
  const {
    id,
    image,
    description,
    brand,
    model,
    year,
    km,
    fuel,
    price,
  } = item

  const pathname = usePathname();

  return (  
        <div className="bg-white shadow-lg rounded-lg p-4 ">
            <Link href={`${pathname}/details/${id}`}>
            <Image src={image} alt={description}  width={140} height={140}
                  className="w-full h-auto object-cover rounded-md hover:scale-105"/>
            </Link>
            <div className="mt-4 flex flex-col items-baseline w-full">
                <h3 className="text-lg font-semibold">{`${brand} ${model}`}</h3>
                <div className='text-md h-16' >{description}</div>
                <div className='text-xs font-semibold py-2 flex justify-between w-full' >
                  <div>{km} km</div> 
                  <div>{year}</div> 
                  <div>{fuel}</div> 
                </div>

                <div className='flex justify-between border-t-2 text-lg w-full'>
                    <div >Precio contado</div>
                    <div >{price}</div>
                </div>
            </div>
            <div className='flex justify-center'>
              <Link  href={`${pathname}/details/${id}`} className="my-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Ver detalles
              </Link>
            </div>
        </div>
  );
}