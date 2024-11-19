//import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
//import ExternalLink from '../../../ExternalLink';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageResultLayout({children, title}: Props) {
    console.log(children,title)
    return (
      <div className="container mx-auto p-6">
          <div className="flex flex-col lg:flex-row gap-6">

              <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Listado de Coches en Venta</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                      <div className="bg-white shadow-lg rounded-lg p-4">
                          <img src="car-image-url.jpg" alt="Imagen del coche"
                               className="w-full h-40 object-cover rounded-md"/>
                          <div className="mt-4">
                              <h3 className="text-lg font-semibold">Marca y Modelo</h3>
                              <p className="text-gray-600">Año | Kilometraje | Precio</p>
                          </div>
                          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                              Ver detalles
                          </button>
                      </div>

                  </div>
              </div>


              <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Filtros</h2>

                  <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Marca</label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                          <option>Seleccione una marca</option>
                          <option>Marca 1</option>
                          <option>Marca 2</option>
                      </select>
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Modelo</label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                          <option>Seleccione un modelo</option>
                          <option>Modelo 1</option>
                          <option>Modelo 2</option>
                      </select>
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Precio</label>
                      <input type="range" min="5000" max="50000" className="w-full"/>
                      <div className="flex justify-between text-gray-600 text-sm">
                          <span>$5,000</span>
                          <span>$50,000</span>
                      </div>
                  </div>

                  <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                      Aplicar filtros
                  </button>
              </div>
          </div>
      </div>
  );
}
