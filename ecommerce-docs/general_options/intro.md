---
sidebar_position: 1
---

# Introducción al proyecto

Este proyecto es un sistema e-commerce compuesto de un backend en Symfony y dos frontends separados: uno para la parte de administración (**Admin**) y otro para la tienda pública (**Storefront**). Todo está estructurado y orquestado en un entorno de Docker-compose.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
/ecommerce
    /admin-front        # Frontend de administración en Next.js
    /admin              # Frontend de administración en Next.js version 15
    /storefront         # Frontend de la tienda en Next.js
    /backend            # Backend en Symfony (PHP 8.3)
    /docker             # Configuraciones específicas para Docker
        /mysql          # Configuraciones y datos de MySQL para datos y configuraciones
        /nginx          # Configuraciones de Nginx para Admin y Storefront
        /php            # Configuraciones personalizadas de PHP (php.ini)
    docker-compose.yml  # Archivo de configuración de Docker Compose
    README.md           # Este archivo
```

## Tecnologías Utilizadas

- **Frontend**:
  - Next.js (para Storefront y Admin)
  - Node.js (versión 20.18 )

- **Backend**:
  - Symfony (PHP 8.3)
  - MySQL (versión 9.0)
  - Redis

- **Infraestructura**:
  - Docker
  - Docker-Compose
  - Nginx (proxy para Storefront, Admin, backend)