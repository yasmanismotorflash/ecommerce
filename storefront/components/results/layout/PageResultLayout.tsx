//import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import {cardData} from '@/components/data/card-data';
import { Card } from '@/components/ui/mf';
import Filters from '@/components/ui/mf/filter';

type Props = {
  children?: ReactNode;
  title: ReactNode;
  searchParams?:{[key:string]:string};
};

export default function PageResultLayout({children, title}: Props) {
  console.log(children,title);
  return (
      <div className="container mx-auto p-6">
          <div className="flex flex-col lg:flex-row gap-6">

              <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Listado de Coches en Venta</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    
            
                      {
                        cardData.map((item)=>(
                            <Card key={`${item.id}}`} item={item} />
                        ))

                      }

                  </div>
              </div>


              <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
                  <Filters items={cardData} />
              </div>
          </div>
      </div>
  );
}
