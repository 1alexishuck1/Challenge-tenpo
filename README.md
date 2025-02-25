# Challenge Tenpo

Este proyecto es una aplicación React con Chakra UI que permite gestionar el inicio de sesión, la navegación entre páginas y la visualización de usuarios generados aleatoriamente.

La aplicación incluye autenticación, paginación y visualización de una lista de usuarios con detalles como nombre, correo electrónico y foto de perfil.

## API Usada

Este proyecto utiliza la API pública de [RandomUser.me](https://randomuser.me/)

## Correr Proyecto

Para correr este proyecto localmente, sigue estos pasos:

1. Instala las dependencias:

```bash
  npm i
```

2. Corre el proyecto:

```bash
  npm run deploy
```

## Respuestas

La mejor forma de mostrar la lista para este caso es usar paginación. En este caso se agregaron botones de "Siguiente" y "Anterior", mostrando la página actual. Esto mejora el rendimiento al cargar solo una parte de los elementos y ofrece una navegación clara al usuario.

Una mejora sobre las llamadas usadas al backend para que nuestra app sea más eficiente sería implementar caché en el cliente. Solo se llamaria al backend cuando el último insert sobre la tabla que se haga referencia en la base de datos es posterior al tiempo de la caché guardada. Esto reduce llamadas innecesarias al backend, mejora el rendimiento y optimiza la experiencia del usuario al servir datos más rápidamente.

## Mejoras

- En desarrollo real, se deberia usar una cookie httponly para guardar el token de la sesion, ya que usando localStorage se puede acceder desde JavaScript.
