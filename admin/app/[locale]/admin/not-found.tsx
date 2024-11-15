import { NotFoundPage } from "@/components";

type Params = Promise<{ locale: string }>

export default async function NotFound({params}: {
  params: Params
}) {

  const {locale} = await params

  return (
    <NotFoundPage locale={locale}/>
  );
}