
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchDetailsData } from "@/controllers/dataFetching";
import { useCallback, useEffect, useState } from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import LoadingCardSkeleton from "../LoadingSkeleton/LoadingCardSkeleton";
import ImageSlider1 from "@/components/mf/ImageSlider/ImageSlider1";

interface DetailsDataProps{
    source:string;
    id:string;
    //res:any;
}

const fetchDetails = async (source:string,id:string)=>{
    const res = await fetchDetailsData(source,id);
    if (res){
        return res;
    }
};

export default async function DetailsData(props: DetailsDataProps) {
    const {source,id} = props;
    const configModel = require(`@/models/${source}.ts`);
    const {detail} = configModel;
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const res = await fetchDetails(source, id);
          if (res) {
            setData(res);
          }
          setLoading(false);
        };

        if (source && id) {
          fetchData();
        }
      }, [source, id]);

    const Data =async()=>{
        if (source!==undefined&&data!==null){
            switch (source){
                case 'imagesTask':
                    return(
                        <div>
                            {
                                data!==null?
                                detail.map((item)=>(
                                    Array.isArray(item)?
                                    <div key={item.name}>
                                        {
                                            data.data.image_data.map((value:any,index:number)=>(
                                                <div key={`${index}-${value.image_id}`} className="py-2 mb-4 border-b-2 dark:border-white">
                                                    <p><strong>ID Imagen:</strong> {value.image_id}</p>
                                                    <p><strong>Nombre:</strong> {value.image_name}</p>
                                                    <div className="w-full my-6" >
                                                        <ImageSlider image1={value.input_image} image2={value.output_image} />
                                                    </div>
                                                </div>
                                            ))
                                        }
        
                                    </div>
                                    :<div key={item.name}>
                                        <p>{item.label}: {data['data'][item.name]}</p>
                                    </div>))
                                :null
                                
                            }
                        </div>
                    )
            }
        }

        return null;
    }

    return (
        <>
        {
            loading?
            <LoadingCardSkeleton />:
            <Data />
        }
        </>
    )
}