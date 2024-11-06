---
sidebar_position: 2
---

# Inicializar el Backend

- **1- Entrar al contenedos de php ejecutando el comando**

    docker exec -it backend_php bash

- **2- Instalar dependencias ejecutando dentro del contenedor de PHP**

    composer install

- **3-Crear Base de datos (si ya existe omitir este paso)**

    php bin/console doctrine:database:create

- **4-Crear esquema de tablas dentro de la base de datos**

    php bin/console doctrine:schema:create

- **5-Cargar datos iniciales**

    php bin/console doctrine:fixtures:load --append

Backend listo !!!

  ## Credenciasles para autenticación
  - **usuario**: admin@backend.local  
  - **password**: 123


  - **usuario**: user@backend.local
  - **password**: 456


  - **usuario**: user2@backend.local
  - **password**: 789

## Para borrar la base de datos y cargar todo de cero (Si hiciera falta)
      si desea eliminar la base de datos y cargar todo de nuevo ejecutar 
    
      //Este ejecutara bash dentro del contenedor backend_php ubicado en el directorio de la app 
    ```bash
      docker exec -it backend_php bash
    ```
      //Esto borra la base de datos y la crea de nuevo
    ```bash  
      php bin/console doctrine:database:drop --force
    ```
      //Esto crea la base de datos
    ```bash  
      php bin/console doctrine:database:create
    ```
      //Esto crea el esquema de tablas y relaciones de la base de datos
    ```bash  
      php bin/console doctrine:schema:create
    ```
      //Esto carga los datos iniciales
    ```bash  
      php bin/console doctrine:fixtures:load --append
    ```
      Listo BD reseteada de cero!!!

## Notas Adicionales

- Asegúrate de que todos los contenedores estén corriendo correctamente antes de acceder a las URLs locales.
- Si necesitas ajustar las variables de entorno, puedes añadir un archivo `.env` en las carpetas `admin-front`, `storefront` o `backend` para configuraciones específicas de desarrollo y producción.