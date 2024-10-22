
# My E-commerce Project

---

Este proyecto es un sistema e-commerce compuesto de un backend en Symfony y dos frontends separados: uno para la parte de administración (**Admin**) y otro para la tienda pública (**Storefront**). Todo está estructurado y orquestado en un entorno de Docker-compose.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
/ecommerce
    /admin-front        # Frontend de administración en Next.js
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

## Instrucciones para Desplegar el Proyecto

### 1. Requisitos Previos

- **Docker** y **Docker Compose** instalados en tu sistema.
- Clonar el repositorio y navegar a la carpeta del proyecto:

```bash
git clone https://github.com/tu-usuario/my-ecommerce-project.git
cd my-ecommerce-project
```

### 2. Modificar el archivo `/etc/hosts`

Para que los dominios locales **storefront.local** y **admin.local** funcionen, debes añadir las siguientes líneas al archivo `/etc/hosts` en tu sistema:

```
127.0.0.1 storefront.local
127.0.0.1 admin.local
127.0.0.1 backend.local

```

### 3. Construir y Levantar los Contenedores

Ejecuta los siguientes comandos desde la raíz del proyecto para construir y levantar los contenedores de Docker:

```bash
docker-compose up --build
```

Esto descargará las imágenes necesarias, construirá los servicios y levantará los contenedores para el backend, el admin, el storefront y la base de datos MySQL.

### 4. Acceso a los Servicios

- **Storefront**: [http://storefront.local](http://storefront.local)
- **Admin**: [http://admin.local](http://admin.local)
- **Backend Symfony**: [http://backend.local](http://localhost:8000)

### 5. Conexión a la Base de Datos

El contenedor de MySQL estará corriendo en `localhost` en el puerto `3308`. Las credenciales de la base de datos son las siguientes:

- **Host**: `mysql_db`
- **Usuario**: `app_user`
- **Contraseña**: `app_password`
- **Base de datos**: `ecommerce`

### 6. Personalización de Configuraciones

#### Nginx

Las configuraciones de Nginx para el frontend (storefront, admin y backend) están en la carpeta `/docker/nginx/`. Puedes ajustar los archivos `storefront.conf` y `admin.conf` según tus necesidades.

#### PHP

Las configuraciones personalizadas de PHP están en la carpeta `/docker/php/`. El archivo `php.ini` ya incluye algunas configuraciones predeterminadas, como el límite de memoria y el tamaño máximo de los archivos subidos.

## Comandos Útiles

- **Detener los contenedores**:
  
  ```bash
  docker-compose down
  ```

- **Reconstruir los contenedores después de hacer cambios**:
  
  ```bash
  docker-compose up --build
  ```


## Inicializar el backend

- ### 1- Entrar al contenedos de php ejecutando el comando

    docker exec -it backend_php bash

- ### 2- Instalar dependencias ejecutando dentro del contenedor de PHP

    composer install

- ### 3-Crear Base de datos (si ya existe omitir este paso)

    php bin/console doctrine:database:create

- ### 4-Crear esquema de tablas dentro de la base de datos

    php bin/console doctrine:schema:create

- ### 5-Cargar datos iniciales

    php bin/console doctrine:fixtures:load --append

Backend listo !!!

  ### Credenciasles para autenticacion
- usuario: admin@backend.local  
- password: 123





## Notas Adicionales

- Asegúrate de que todos los contenedores estén corriendo correctamente antes de acceder a las URLs locales.
- Si necesitas ajustar las variables de entorno, puedes añadir un archivo `.env` en las carpetas `admin-front`, `storefront` o `backend` para configuraciones específicas de desarrollo y producción.
