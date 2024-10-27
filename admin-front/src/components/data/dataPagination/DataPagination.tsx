import {} from /*Pagination,
  PaginationContent,
	PaginationItem,*/
'@/components/ui/pagination';
//import DataPaginationLink from "./DataPaginationLink";

interface Props {
    pages: number;
    item: [];
    paramSource: string;
}

export default function DataPagination(props: Props) {
    //const {pages,item, paramSource} = props;
    console.log(props);
    return {
        /*<Pagination>
      <PaginationContent>
                <PaginationItem>
                    <DataPaginationLink type='previous' paramSource={paramSource} pages={pages} item={item} />
                </PaginationItem>
                    <DataPaginationLink type='middle' paramSource={paramSource} pages={pages} item={item} />
                <PaginationItem>
                    <DataPaginationLink type='next' paramSource={paramSource} pages={pages} item={item} />
                </PaginationItem>
            </PaginationContent>
    </Pagination>*/
    };
}
