# Intrucciones

## Tener instalado:

- PostgreSQL versión 17
- pgAdmin 4 v8.12 (o cualquier gestor de base de datos de preferencias)
- Tener un Script en la base de datos llamado "ucuddit"
- Node.js versión 20.17.0.
- IntelliJ IDEA: Versión 2024.2.3
- Git, para clonar el repositorio que contiene el código fuente del proyecto
- React v18.3.1

## Pasos para la instalación:

- Clonar el proyecto usando git clone <URL del repositorio>

### Configuracion del front (ReactJS):

- Luego de clonado el repositorio, abrir el proyecto en Visual Studio (o cualquier IDE de preferencia) y ejecutar el comando 'npm install' para instalar todas las dependencias utilizadas.

### Configuración y ejecución del backend:

- En postgres tener la base de datos creada con el nombre "ucuddit" y haber ejecutado el script
- Ejecuta el backend desde IntelliJ IDEA y déjalo funcionando en segundo plano para que la aplicación móvil pueda conectarse a él. Las entidades en la base de datos se crearan automaticamente al ejecutar el backend.

### Ejecución del proyecto web:

- Desde la carpeta del front, ejecutar el siguiente comando para iniciar la pagina web: `npm start`.

## Arquitectura:

### Frontend:

La arquitectura del frontend de mi sistema se basa en el patrón de diseño Component-Based Architecture (Arquitectura basada en componentes), el mismo da enteneder que el proyecto está compuesto de componentes reutilizables y bien delimitados en responsabilidad. Además, el código está estructurado en carpetas especificas separando el código y lógica de `.js` en componentes, atomos y screens. Los atomos componen partes de los componentes (tales como botones, barras de busqueda, etc). Los componentes componen las screens (ejemplo: el componente Posts, se encuentra en MainScreen, CommentScreen, etc).

[Arquitectura del backend](https://github.com/NicooGon/UCUDDIT\_backend)

## Decisiones Técnicas:

Uso de bootstrap para estilizar y lograr un diseno responsive.

No fue necesario el uso de useContext debido a que no hay prop drealing.

Uso de Auth0 para autenticar usuarios y manejar su información

Se utiliza React Router DOM para crear rutas dinámicas y facilitar la navegación entre componentes.

[Video Demostrativo](https://drive.google.com/file/d/1oMV0NmfZA5csKoTpmadC4D_y0Wlzm1IA/view?usp=sharing)
