// next.config.mjs
// export default {
//     i18n: {
//         locales: ['en', 'es', 'fr'],  // Idiomas soportados
//         defaultLocale: 'en',          // Idioma predeterminado
//     }
// };

import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
export default withNextIntl(nextConfig);