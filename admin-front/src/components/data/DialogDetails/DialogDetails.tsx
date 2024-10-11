'use client'
import { Button } from "@/components/ui/button";
import { Dialog , DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useImageStore from "@/store/imagesStore";
import DetailsData from "./DetailsData";
import useStore from "@/store/store";
import React, { Suspense } from "react";
import LoadingCardSkeleton from "../LoadingSkeleton/LoadingCardSkeleton";
import { fetchDetailsData } from "@/controllers/dataFetching";


interface Props {
    fetchDetails: (source: string, id: string) => Promise<any>;
}

const DialogDetails=React.memo(()=> {
    
    const {isImageDialogOpen,setIsImageDialogOpen, imageId, isLoading} = useImageStore((state) => state);
    const {source} = useStore((state) => state);
    


    return(
        <div className='flex justify-center'>
            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}  >
                <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white max-w-[600px] max-h-screen overflow-y-scroll">
                    <DialogHeader>
                    <DialogTitle>
                        {
                            source==='imagesTask'?
                                'Detalle de Imagen'
                                :'Detalle de Media'
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {imageId}.
                    </DialogDescription>
                    </DialogHeader>
                    <Suspense fallback={ <LoadingCardSkeleton/>}>
                        <DetailsData source={source} id={imageId} />
                    </Suspense>
                    <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cerrar
                        </Button>
                    </DialogClose>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
        </div>
    )
}
)
export default DialogDetails;