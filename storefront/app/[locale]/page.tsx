
import {setRequestLocale} from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import PageResultLayout from "@/components/results/layout/PageResultLayout";

type Params = Promise<{ locale: string }>

export default async function DefaultPage({params}: {
    params: Params
}) {
    const {locale} = await params
    setRequestLocale(locale);

    const t = await getTranslations('IndexPage');

    return (
        <PageResultLayout title={t('title')}>
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
