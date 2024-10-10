import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['mf-front'], 
    images: {
        domains: ['images.motorflash.com']
    }
};
 
export default withNextIntl(nextConfig);