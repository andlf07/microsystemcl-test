# ReadConnect

Este proyecto fue realizado para una prueba de desarrollo.

Utilize el framework Nextjs ya que este me provee de un ambiente fullstack el cual fue necesario para este proyecto.

El despliegue fue hecho en AWS Amplify. Y utilize el servicio de Azure Email Communication para envio de emails el cual utilizo para recuperacion de clave.


URL: https://master.d3dchcnaqnqxse.amplifyapp.com/login


## Clonar el Proyecto desde GitHub

1. **Obtener la URL del Repositorio:**
   - Copia la URL que aparece (puedes usar HTTPS o SSH).

2. **Clonar el Repositorio:**
   - Abre tu terminal o línea de comandos.
   - Navega al directorio donde deseas clonar el proyecto.
   - Ejecuta el siguiente comando, reemplazando `<URL>` con la URL que copiaste:

     ```bash
     git clone <URL>
     ```

   Esto creará una copia local del repositorio en tu máquina.

## Instalar Dependencias

1. **Navegar al Directorio del Proyecto:**
   - Utiliza el comando `cd` para cambiar al directorio del proyecto clonado:

     ```bash
     cd nombre_del_proyecto
     ```

2. **Instalar Dependencias:**
   - Entra al ```package.json``` para ver las dependencias usadas.

     ```bash
     npm install
     ```

3. **Agregar las variables de entorno:**
   - Crea un archivo .env en la raiz del proyecto y sus valores
        ```bash
        NEXT_PUBLIC_HOST_BASE=http://localhost:3000
        NEXT_PUBLIC_LOGIN_ENDPOINT=/api/login
        NEXT_PUBLIC_GOOGLE_CREATE_USER_ENDPOINT=/api/users/provider/google
        NEXT_PUBLIC_GEN_PROVIDER_TOKEN_LOGIN_ENDPOINT=/api/users/provider/token
        NEXT_PUBLIC_USERS_ENDPOINT=/api/users
        NEXT_PUBLIC_SEND_EMAIL_RECOVERY_ENDPOINT=/api/recovery/code
        NEXT_PUBLIC_VERIFY_RECOVERY_CODE_ENDPOINT=/api/recovery/verify
        MODE_ENV=
        NEXTAUTH_SECRET=
        NEXTAUTH_URL=http://localhost:3000/api/auth/
        <!--AZURE EMAIL COMMUNICATION SERVICE-->
        NEXT_PUBLIC_AZURE_EMAIL_STRING= # String endpoint proporcionado por azure
        NEXT_PUBLIC_AZURE_EMAIL_SENDER= # Email sender proporcionado por azure
        <!--GOOGLE SIGNIN PROVIDER--> # Credenciales de google para signin.
        GOOGLE_CLIENT_ID=
        GOOGLE_CLIENT_SECRET=
        <!--Database credentials--> # Credenciales de la base de datos postgres
        DB_NAME=
        DB_DOMAIN=
        DB_PORT=
        DB_USER=
        DB_PASSWORD=
     ```

## Ejecutar el Proyecto

1. **Comandos de Ejecución:**
   - Para desarrollo:
    ```bash
   npm run dev
   ```

   - Para hacer build:
    ```bash
   npm run build
   ```
   - Para para produccion:
    ```bash
   npm run start
   ```


## Backend

Ya que Nextjs nos provee de un ambiente fullstack, utilize su API para la creacion del backend ya que por tiempo y despliegue de la aplicacion me parecio la mejor opcion(Tambien se puede usar un ambiente separado para el backend)

1. **Endpoints**
   - POST ```/api/login```: Verificamos el usuario por email, y validamos su contraseña(Ya que al momento de usar google signin creamos el usuario si no existe en base de datos solo con su email, es posible que retorne error  indicando que debe crear su contraseña)
    ```bash
    # Body
   {
       "email": "test@email.com",
       "password": "123456"
   }
   
   # Response
    {
        "statusCode": 200,
        "message": "AUTHORIZED",
        "token": "jwtToken"
    }
    
    # Posibles errores messages
    
    {
        "statusCode": 401,
        "message": "UNAUTHORIZED",
    }
    {
        "statusCode": 400,
        "message": "UNAUTHORIZED_CREATE_PASSWORD",
    }
    
   ```

   - POST ```/api/recovery/code```: El ```email``` recibido se le enviara mediante Azure Email Communication el codigo generado en base de dato de 4 digitos
    ```bash
   {
       "email": "test@email.com",
   }
   
   # Response
    {
        "message": "CREATED",
        "statusCode": 201
    }
   ```

   - POST ```/api/recovery/verify```
    ```bash
   {
       "email": "test@email.com",
       "code": "12345",
   }
   ```

   - POST ```/api/recovery/verify```: Para verificar el codigo, enviamos el body, el email y la nueva contraseña ( Se verificara si el codigo esta ```enabled```, pertenece al ```email``` y si aun esta vigente ). Se actualiza la contraseña y actualizamos el estado del codigo en base de datos a ```enabled = false```
    ```bash
    # Body
   {
       "email": "test@email.com",
       "code": "12345",
       "password": "12345678"
   }
   
   # Response
    {
        "statusCode": 200,
        "message": "OK",
    }
    
    # Posibles errores messages
    {
        "statusCode": 404,
        "message": "INVALID_CODE",
    }
    
    {
        "statusCode": 404,
        "message": "INVALID_CODE_EMAIL",
    }
    
    {
        "statusCode": 404,
        "message": "EXPIRED_CODE",
    }
    
   ```

   - GET ```/api/users```: Obtenemos el listado de de los usuarios, ademas podemos utilizar la paginacion mediante parametros en la url.
        - ```/api/users?page=1&pageSize=10```
        - ```page```: numero de pagin
        - ```pageSize```: numero de registros por pagina
    ```bash
    {
        "data": [
            {
                "id": "dd0e3126-b71e-422a-ab08-44057264ae3d",
                "first_name": "User Name",
                "last_name": "User Lastname",
                "authProvider": null,
                "email": "email@test.com",
                "enabled": true,
                "createdAt": "2023-11-04T15:28:31.940Z",
                "updatedAt": "2023-11-04T15:35:24.470Z"
            }
        ],
        "statusCode": 200,
        "message": "OK",
        "pagination": {
            "count": 4,
            "page": 1,
            "pageSize": 13,
            "totalPages": 1
        }
    }
   ```

   - POST ```/api/users```
        ```bash
        # Body
        {
            "first_name": "User Name",
            "last_name": "User Lastname",
            "email": "email@test.com",
            "password": "123456"
        }
        
        # Response 
        {
            "data": {
                "id": "c0a955b5-ec35-490a-bc00-31431fd21cbd",
                "enabled": true,
                "first_name": "User Name",
                "last_name": "User Lastname",
                "email": "email@test.com",
                "updatedAt": "2023-11-10T18:05:27.800Z",
                "createdAt": "2023-11-10T18:05:27.800Z",
                "authProvider": null
            },
            "statusCode": 201,
            "message": "OK"
        }
        
   ```

   - GET ```/api/users/{UUID}```
       - Usuario registrado con google signin
        ```bash
        {
            "data": {
                "id": "55f0f1da-a1e2-406f-ae21-4dfc65400e61",
                "first_name": "User Name",
                "last_name": "User Lastname",
                "authProvider": "GOOGLE",
                "email": "email@test.com",
                "enabled": true,
                "createdAt": "2023-11-05T17:36:16.686Z",
                "updatedAt": "2023-11-05T17:36:16.686Z",
                "password": null
            },
            "statusCode": 200,
            "message": "OK"
        }
       ```

       - Usuario registrado normalmente
        ```bash
        {
            "data": {
                "id": "55f0f1da-a1e2-406f-ae21-4dfc65400e61",
                "first_name": "User Name",
                "last_name": "User Lastname",
                "authProvider": "GOOGLE",
                "email": "email@test.com",
                "enabled": true,
                "createdAt": "2023-11-04T15:28:31.940Z",
                "updatedAt": "2023-11-04T15:35:24.470Z",
                "password": {
                    "id": "1741003e-55b4-483b-b5e1-3e96c4e1348a",
                    "password": "$2b$16$WBJyc3x05icT68Ld1UF18eh/uVn1aYnuzSq/WkdMIKmvNt5z8gXti",
                    "enabled": true,
                    "salt": 16,
                    "createdAt": "2023-11-04T15:28:27.523Z",
                    "updatedAt": "2023-11-05T23:40:22.711Z",
                    "user_id": "dd0e3126-b71e-422a-ab08-44057264ae3d"
                }
            },
            "statusCode": 200,
            "message": "OK"
        }
       ```

   - DELETE ```/api/users/{UUID}```
    ```bash
    {
        "data": 1,
        "statusCode": 200,
        "message": "OK"
    }
   ```


   - POST ```/api/users/providers/google```
    ```bash
    {
        "first_name": "User Name",
        "last_name": "User Lastname",
        "email": "email@test.com",
    }
   ```


   - POST ```/api/users/providers/token```
    ```bash
    {
        "email": "email@test.com",
    }
   ```