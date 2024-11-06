---
sidebar_position: 1
---

# Instrucciones

## 1. Requisitos Previos

- **Docker** y **Docker Compose** instalados en tu sistema.
- Clonar el repositorio y navegar a la carpeta del proyecto:

```bash
git clone https://github.com/tu-usuario/my-ecommerce-project.git
cd my-ecommerce-project
```

## 2. Modificar el archivo `/etc/hosts`

Para que los dominios locales **storefront.local** y **admin.local** funcionen, debes añadir las siguientes líneas al archivo `/etc/hosts` en tu sistema:

```
127.0.0.1 storefront.local
127.0.0.1 admin.local
127.0.0.1 admin_prod.local
127.0.0.1 backend.local

```

## 3. Construir y Levantar los Contenedores

Ejecuta los siguientes comandos desde la raíz del proyecto para construir y levantar los contenedores de Docker:

```bash
docker-compose up --build
```

Esto descargará las imágenes necesarias, construirá los servicios y levantará los contenedores para el backend, el admin, el storefront y la base de datos MySQL.

## 4. Acceso a los Servicios

- **Storefront**: [http://storefront.local](http://storefront.local)
- **Admin**: [http://admin.local](http://admin.local)
- **Admin Prod**: [http://admin_prod.local](http://admin_prod.local)
- **Backend Symfony**: [http://backend.local](http://localhost:8000)

## 5. Conexión a la Base de Datos

El contenedor de MySQL estará corriendo en `localhost` en el puerto `3308`. Las credenciales de la base de datos son las siguientes:

- **Host**: `mysql_db`
- **Usuario**: `app_user`
- **Contraseña**: `app_password`
- **Base de datos**: `ecommerce`