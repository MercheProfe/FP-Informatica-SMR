---
title: "4.2. Arquitectura y requisitos técnicos de WordPress"
sidebar_position: 2
---

# 4.2. Arquitectura y requisitos técnicos de WordPress

En este apartado aprenderás a reconocer los componentes que necesita WordPress, explicar cómo responde a una petición y comprobar si un equipo está preparado para trabajar con **LocalWP**.

Retomamos la arquitectura cliente-servidor estudiada anteriormente. No necesitas saber programar en PHP ni escribir consultas SQL: basta con comprender qué función cumple cada componente.

## 1️⃣ Front-end y back-end

### 🟩 Front-end: la parte que visita el usuario

El **front-end** es la interfaz del sitio que se muestra en el navegador: páginas, entradas, imágenes, menús y formularios. El navegador interpreta HTML, aplica los estilos CSS y ejecuta el JavaScript que recibe.

En WordPress, el tema y el contenido ayudan a determinar esta presentación. Un visitante puede leer una noticia sin acceder al escritorio de administración. Algunas páginas pueden requerir identificación o tener acceso restringido.

### 🟧 Back-end: administración y procesamiento

En el uso cotidiano de un CMS, llamamos **back-end** a su zona de administración: el escritorio desde el que las personas autorizadas gestionan contenidos, usuarios, ajustes, temas y plugins.

En un sentido técnico más amplio, el back-end también incluye la lógica que se ejecuta en el servidor y el acceso a los datos. El escritorio es una interfaz de esa parte del sistema; no es todo el servidor.

| Acción | Parte con la que interactúa el usuario |
|---|---|
| Leer una entrada publicada | Front-end |
| Consultar el menú del sitio | Front-end |
| Redactar una entrada desde el escritorio | Back-end de administración |
| Cambiar un ajuste del sitio | Back-end de administración |

**Ambas interfaces se abren en un navegador.** La diferencia está en su finalidad y en los permisos necesarios para utilizarlas.

## 2️⃣ La arquitectura cliente-servidor de WordPress

### 🟥 El navegador solicita y el servidor responde

El **cliente** es el navegador. El **servidor** atiende las peticiones y devuelve los recursos necesarios para mostrar la página. Se comunican mediante HTTP o HTTPS; HTTPS cifra la comunicación.

En una instalación local, cliente y servidor pueden funcionar en el mismo ordenador. Siguen teniendo funciones distintas, aunque compartan equipo.

Este esquema representa una petición dinámica habitual, sin entrar en sistemas de caché:

```text
Navegador (cliente)
    | petición HTTP/HTTPS
    v
Servidor web
    | encarga ejecutar PHP
    v
WordPress (código PHP) <--> Base de datos
    | genera la página
    v
Servidor web --> Navegador (HTML, CSS, JS e imágenes)
```

### 🟪 Qué ocurre al abrir una entrada

1. El usuario abre la URL de la entrada en el navegador.
2. El servidor web recibe la petición y, cuando corresponde, la pasa al entorno de ejecución de PHP.
3. WordPress ejecuta su código y consulta los contenidos y ajustes que necesita en la base de datos.
4. WordPress utiliza el tema y las funcionalidades activas para generar la respuesta HTML.
5. El servidor devuelve la respuesta. El navegador la interpreta y solicita también los estilos, scripts e imágenes necesarios.

El navegador recibe el resultado de ejecutar WordPress, **no el código PHP para ejecutarlo**. Los archivos estáticos, como una imagen o una hoja de estilos, pueden servirse directamente sin generar una página mediante PHP.

## 3️⃣ Componentes del entorno

### 🟦 Servidor web, PHP y base de datos

| Componente | Función | Ejemplo |
|---|---|---|
| Servidor web | Recibe peticiones HTTP/HTTPS y entrega respuestas y archivos | Nginx o Apache |
| PHP | Ejecuta el código del lado del servidor con el que está desarrollado WordPress | Intérprete de PHP |
| Base de datos | Guarda información organizada que WordPress consulta y modifica | MySQL o MariaDB |
| WordPress | Proporciona las funciones del CMS y coordina contenidos, apariencia y extensiones | Aplicación instalada en el servidor |

**PHP es un lenguaje de programación; MySQL y MariaDB son sistemas gestores de bases de datos.** SQL es el lenguaje utilizado para consultar y modificar esos datos. En esta unidad realizaremos la gestión habitual desde WordPress, sin necesitar consultas SQL manuales.

### 🟩 Archivos, contenidos y configuración

Un sitio WordPress necesita tanto **archivos** como **base de datos**:

- **Núcleo de WordPress:** archivos que proporcionan las funciones básicas del CMS.
- **Temas:** archivos que definen la presentación y las plantillas del sitio.
- **Plugins:** archivos que añaden funcionalidades.
- **Archivos subidos:** imágenes, documentos y otros recursos multimedia.
- **Base de datos:** entradas, páginas, comentarios, usuarios y numerosos ajustes. Los usuarios se guardan con hashes de sus contraseñas, no con las contraseñas en texto claro.

Las imágenes subidas se almacenan habitualmente como archivos; la base de datos guarda sus referencias y metadatos. Por eso, copiar solo la base de datos no equivale a copiar el sitio completo. Las copias de seguridad se estudiarán en el apartado 4.8.

## 4️⃣ Requisitos técnicos

### 🟧 Requisitos de WordPress

WordPress necesita un servidor web, PHP y una base de datos compatibles. No basta con abrir sus archivos haciendo doble clic, como haríamos con una página HTML sencilla.

La documentación oficial recomienda actualmente:

| Elemento | Recomendación oficial |
|---|---|
| PHP | Versión 8.3 o superior |
| Base de datos | MySQL 8.0 o superior, o MariaDB 10.11 o superior |
| Servidor web | Apache o Nginx como opciones recomendadas |
| Comunicación | Compatibilidad con HTTPS |

Estas son **recomendaciones**, no una lista de versiones mínimas históricas. Además, la combinación elegida debe ser compatible con la versión concreta de WordPress, los temas y los plugins. No elegiremos versiones antiguas solo porque permitan arrancar el sitio.

Fuente: [requisitos oficiales de WordPress](https://wordpress.org/about/requirements/), consultados el 4 de noviembre de 2026. Las recomendaciones pueden cambiar.

### 🟥 Requisitos del equipo para LocalWP

LocalWP es una aplicación de escritorio que prepara y gestiona el entorno local de WordPress. En el aula utilizaremos **LocalWP como único entorno de prácticas**.

Según su documentación, Local requiere como base **4 GB de RAM y 1,5 GB de espacio en disco**. El espacio necesario aumenta con los sitios, las imágenes, las copias y los componentes adicionales. Estos valores de partida no garantizan un funcionamiento fluido si el equipo ejecuta muchas aplicaciones a la vez.

En Windows, la documentación indica compatibilidad con Windows 10 de 64 bits y Windows 11. Debemos comprobar también que la versión descargada de Local sea adecuada para el sistema concreto del aula y que este reciba mantenimiento.

Además, necesitaremos un navegador actualizado, permisos suficientes para la preparación del entorno y conexión a Internet para descargar software, componentes y actualizaciones. Con el entorno preparado, muchas tareas locales pueden realizarse sin conexión; los servicios externos seguirán necesitándola.

Fuente: [documentación oficial de instalación de Local](https://localwp.com/help-docs/getting-started/installing-local/), consultada el 4 de noviembre de 2026.

## 5️⃣ Qué aporta LocalWP

### 🟪 Un entorno local integrado

LocalWP, también denominado **Local**, reúne las herramientas necesarias para crear y ejecutar sitios WordPress en el ordenador. Gestiona servicios como el servidor web, PHP y MySQL, evitando que tengamos que instalarlos y conectarlos por separado en esta unidad.

LocalWP y WordPress son aplicaciones distintas: **LocalWP gestiona el entorno; WordPress es el CMS que funciona dentro de él**. Los componentes de la arquitectura siguen existiendo aunque Local facilite su preparación.

Local permite iniciar y detener los servicios del sitio y acceder a su parte pública y a la administración. La selección concreta de versiones se comprobará en el entorno del aula durante el apartado 4.3; aquí no damos por probada una combinación que todavía no se ha ensayado.

### 🟦 URL local y acceso a la administración

Cada sitio dispone de una dirección para abrirlo en el navegador. Local puede utilizar un dominio local o una dirección con `localhost` y un puerto, según su configuración.

La dirección local identifica el sitio dentro del entorno de desarrollo. **No implica que exista un dominio público registrado ni que el sitio esté publicado en Internet.**

En una instalación estándar, la administración se encuentra en la ruta `/wp-admin/` de la URL del sitio. Esta ruta es una dirección web, no una carpeta que debamos abrir desde el explorador de archivos. Local ofrece acceso a la administración desde su interfaz.

## 6️⃣ Entorno local y sitio publicado

| Aspecto | Entorno local con LocalWP | Sitio publicado |
|---|---|---|
| Dónde funciona el servidor | En el ordenador de prácticas | En un servidor de alojamiento |
| Acceso habitual | Desde el propio equipo | Desde Internet, según la configuración de acceso |
| Dirección | URL del entorno local | Habitualmente un dominio público |
| Disponibilidad | Depende del equipo y de los servicios locales | Depende del alojamiento y sus servicios |
| Uso principal en esta unidad | Aprender, probar y preparar cambios | Referencia conceptual; no se exige publicar |
| HTTPS | Puede usar un certificado local que deba confiarse en el equipo | Necesita un certificado válido y confiable para los visitantes |

La arquitectura básica se mantiene: navegador, servidor web, PHP, WordPress y base de datos. Cambian la ubicación, el acceso y la gestión del entorno.

:::tip[Local también es cliente-servidor]
Que todo funcione en un ordenador no convierte WordPress en una web estática. El navegador sigue solicitando páginas al servidor local.
:::

Una instalación local no se publica automáticamente. Trasladarla a un alojamiento requeriría transferir archivos y base de datos y adaptar la configuración y las URL. Ese procedimiento queda fuera de este apartado.

## 7️⃣ Comprobaciones previas a la instalación

### 🟩 Preparación del equipo

Antes de comenzar el apartado 4.3, revisa esta lista con las indicaciones de la docente:

- [ ] Identifico el sistema operativo y compruebo que es compatible con la versión de Local prevista.
- [ ] Compruebo la memoria disponible y el espacio libre, dejando margen para el trabajo del curso.
- [ ] Dispongo de un navegador actualizado y conexión para las descargas iniciales.
- [ ] Confirmo si necesito permisos de instalación o intervención de la persona responsable del equipo.
- [ ] Identifico dónde se guardará el trabajo y si se conservará al reiniciar o cerrar la sesión del aula.
- [ ] Compruebo si existen otros servicios web que puedan causar conflictos de puertos.
- [ ] Consulto cualquier bloqueo del antivirus o cortafuegos; no desactivo las protecciones de forma general.
- [ ] Preparo un nombre reconocible para el sitio y un lugar seguro para registrar sus credenciales.

No es necesario instalar por separado Apache, PHP o MySQL: utilizaremos los servicios gestionados por LocalWP. Si un servicio ya instalado causa un conflicto, se revisará antes de modificar su configuración.

### 🟧 Registro y comprensión

Anota el sistema operativo, la RAM, el espacio libre y las incidencias detectadas. Cuando se prepare el entorno en 4.3, completa el registro con las versiones reales de Local, WordPress, PHP y base de datos.

Antes de continuar, deberías poder responder:

1. ¿Por qué no basta con un navegador para ejecutar WordPress?
2. ¿Qué diferencia hay entre el servidor web, PHP y la base de datos?
3. ¿Por qué una copia del sitio debe tener en cuenta archivos y base de datos?
4. ¿Puede haber arquitectura cliente-servidor en un solo ordenador?
5. ¿Por qué abrir una URL local no significa publicar el sitio en Internet?

Como evidencia breve, dibuja el recorrido de una petición y escribe una frase con la función de cada componente. Puedes utilizar el esquema del apartado 2 como referencia.

## 8️⃣ Continuación en el apartado 4.3

El siguiente apartado, **4.3. Instalación de WordPress con LocalWP**, desarrollará el procedimiento paso a paso: preparación de Local, creación del sitio, comprobación de los servicios y acceso a la web y al escritorio.

En este 4.2 hemos identificado la arquitectura y los requisitos. La instalación y sus pruebas de funcionamiento se realizarán y documentarán en 4.3.

## 9️⃣ Recursos utilizados

Este documento utiliza únicamente texto, tablas y un diagrama de texto integrado. No requiere imágenes, archivos en `static`, componentes adicionales ni descargas complementarias.

Árbol exacto de archivos de esta entrega:

```text
02-Arquitectura-Requisitos.md
```
