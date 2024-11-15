

import { getTranslations } from 'next-intl/server';



export default async function DefaultPage() {
    
    const t = await getTranslations('IndexPage');

    return (
            <p className="max-w-[590px]">
                {t.rich('description', {
                    code: (chunks) => (
                        <code className="font-mono text-white">{chunks}</code>
                    )
                })}
            </p>
    );
}
