
import {setRequestLocale} from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import PageResultLayout from "@/components/results/layout/PageResultLayout";

type Params = Promise<{ locale: string }>

export default async function DefaultPage({params,searchParams}: {
    params: Params,
    searchParams: {[key:string]:string}
}) {
    const {locale} = await params;
    const search = searchParams;
    console.log('SEARCH',Object.keys(search).length)



    setRequestLocale(locale);

    const t = await getTranslations('IndexPage');

    return (
        <PageResultLayout title={t('title')} searchParams={searchParams}>
            <p className="max-w-[590px]">
                {t.rich('description', {
                    code: (chunks) => (
                        <code className="font-mono text-white">{chunks}</code>
                    )
                })}
            </p>
        </PageResultLayout>
    );
}
