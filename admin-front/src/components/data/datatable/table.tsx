
'use server';
import {
    Table,
    TableBody,
    TableCaption,
    //TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
import RenderTableHeader from "./RenderTableHeader";
//import RenderTableRow from "./RenderTableRow";
//import DialogDetails from "../DialogDetails/DialogDetails";
//import { fetchDetailsData } from "@/controllers/dataFetching";



interface Props {
    res:[],
    config:[],
    Item:[],
    paramSource:string,
}



function Dtable(props:Props){
    
    const {res,/*config,Item,*/paramSource}=props;
    //const data = res.data;
    console.log(res);
    
    
    return(
        <>
            <Table>
                <TableCaption>Listado de anuncios.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <RenderTableHeader paramSource={paramSource} />                   
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*<RenderTableRow data={data}  />*/}
                </TableBody>
            </Table>
            {/*<DialogDetails />*/}
        </>        
    )


}

export default Dtable;