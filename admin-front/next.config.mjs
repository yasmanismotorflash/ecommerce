import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['mf-front'],  // Para permitir que Next.js procese el paquete
};
 
export default withNextIntl(nextConfig);