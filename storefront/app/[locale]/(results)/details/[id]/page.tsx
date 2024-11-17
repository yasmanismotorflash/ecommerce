import { cardData } from "@/components/data/card-data";
import Image from "next/image";
import { IoLogoWhatsapp, IoMdArrowBack } from 'react-icons/io';
import { headers } from "next/headers";
import Link from "next/link";

type Params = Promise<{ id: string }>

export default async function DetailsPage({params}: {
  params: Params
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  const finalSlashIndex = pathname?.lastIndexOf('/')

  const previousPath = pathname?.slice(0, finalSlashIndex)

  const {id} = await params

  const data = cardData

  const car = data.find(card => card.id === id);

  if (!car){
    return null;
  }
  
  return (
    <>
    <Link href={previousPath||'/'} className="py-4 flex items-center pl-20 hover:cursor-pointer w-fit hover:text-green-500">
        <IoMdArrowBack className="text-2xl pr-2" /> Volver
    </Link>
    <div className="grid grid-col-1 md:grid-cols-2 gap-4 px-20 ">
      <div className="w-full">
        <Image src={car.image} width={140} height={140} className="w-full shadow-lg rounded-xl" alt={car.description} />
      </div>
      <div>
        <div className="rounded-xl shadow-xl border-2 border-gray-300 p-3">
            <div className="font-semibold text-2xl text-gray-800">
              {car.brand} {car.model}
            </div>
            <div className=" text-xl text-gray-800">
              {car.description}
            </div>
            <div className=" text-md text-gray-800 py-2">
              {car.km} km &emsp; {car.year} &emsp; Cambio {car.gear} &emsp; {car.color}
            </div>
            <div className=" text-md text-gray-800 pt-4">
              Precio
            </div>
            <div className=" text-3xl text-gray-800 pb-2">
              {car.price} &euro; 
            </div>
            <div className="flex justify-between border-gray-400 border-t-2 border-b-2 py-2">
                <button className="border-[2px] rounded-xl border-gray-900 text-gray-900 p-2 hover:bg-gray-900 hover:text-white">
                  Contáctanos
                </button>
                <button className="border-[2px] rounded-xl border-gray-900  bg-gray-900  text-white p-2 hover:bg-transparent hover:text-gray-900 ">
                  Llámanos
                </button>
                <button className="rounded-xl   bg-green-500  text-white py-2 px-4 text-2xl hover:bg-green-600 ">
                  <IoLogoWhatsapp />
                </button>
            </div>
            <div className="pt-4 flex items-center">
                <IoLogoWhatsapp className="text-3xl pr-2" /> ¿Necesitas ayuda? Habla con nosotros
            </div>
        </div>
      </div>

    </div>
    </>
  );
}