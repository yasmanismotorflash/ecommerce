FROM nginx:alpine

# Copiar las configuraciones de Nginx
COPY ./nginx/storefront.conf /etc/nginx/conf.d/storefront.conf
COPY ./nginx/admin.conf /etc/nginx/conf.d/admin.conf

# Exponer el puerto 80 para el tráfico HTTP
EXPOSE 80
