type Params = Promise<{ brand: string }>

export default async function BrandPage({params}: {
    params: Params
}) {
    const {brand} = await params

    return (
        <>
            Pagina de la marca: {brand} - coches
        </>
    );
}
