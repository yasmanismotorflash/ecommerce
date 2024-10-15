import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const withNextIntl = createNextIntlPlugin();

// Obtener la ruta de directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['mf-front'], 
    images: {
        domains: ['images.motorflash.com']
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(__dirname, 'src'), // Alias para la carpeta src
        };
        return config;
    },
};
 
export default withNextIntl(nextConfig);