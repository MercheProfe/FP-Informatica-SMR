---
title: "4.1 · Introducción a los CMS"
sidebar_position: 2
---

# 4.1 · Introducción a los gestores de contenidos (CMS)

Cuando creamos una página con HTML y CSS, editamos directamente sus archivos. Pero ¿qué sucede si una tienda necesita publicar novedades todas las semanas o una asociación quiere que varias personas actualicen su web?

Un **CMS** permite gestionar estos contenidos desde una interfaz de administración sin tener que editar manualmente el código de cada página.

## 1️⃣ ¿Qué es un CMS?

Las siglas **CMS** proceden del inglés *Content Management System*, es decir, **sistema de gestión de contenidos**.

Un CMS es una aplicación que facilita la creación, organización, publicación y mantenimiento de contenidos digitales, normalmente a través de un navegador web.

### 🟩 ¿Qué podemos hacer con un CMS?

- Crear y modificar páginas y publicaciones.
- Subir imágenes y otros archivos.
- Organizar menús y secciones.
- Gestionar cuentas de usuario y permisos.
- Cambiar la apariencia del sitio.
- Añadir funciones mediante extensiones.

:::info[Importante]
Utilizar un CMS no significa que HTML y CSS desaparezcan. El navegador sigue interpretando HTML y CSS para mostrar las páginas; el CMS facilita su generación y administración.
:::

## 2️⃣ Web estática y web gestionada con un CMS

Imagina la web de una asociación que publica noticias sobre sus actividades.

| Aspecto | Web creada manualmente con HTML/CSS | Web gestionada con CMS |
|---|---|---|
| **Publicar una noticia** | Normalmente hay que editar archivos. | Se puede utilizar un editor desde el panel. |
| **Cambiar el diseño** | Se modifican los estilos y las plantillas del proyecto. | Se puede cambiar de tema o ajustar su apariencia. |
| **Varios autores** | Requiere organizar cómo se editan y publican los archivos. | Puede ofrecer usuarios con roles y permisos. |
| **Mantenimiento** | Hay que mantener los archivos y dependencias utilizados. | Hay que mantener el CMS, sus temas y sus extensiones. |
| **Flexibilidad** | Control directo del código. | Administración rápida, condicionada por el CMS y sus extensiones. |

No existe una solución mejor para todos los proyectos. Una web pequeña y poco cambiante puede funcionar perfectamente con HTML y CSS. Un sitio con publicaciones frecuentes y varios autores puede beneficiarse de un CMS.

## 3️⃣ Ejemplos y aplicaciones de los CMS

Algunos gestores de contenidos conocidos son **WordPress**, **Joomla** y **Drupal**. Cada uno tiene características y formas de administración diferentes.

Los CMS se utilizan, entre otros casos, para:

- Webs de asociaciones y centros educativos.
- Blogs y revistas digitales.
- Páginas de empresas y profesionales.
- Portales con varios autores.
- Sitios que incorporan foros u otras funcionalidades mediante extensiones.

### 🟧 ¿Qué debemos valorar antes de elegir uno?

Conviene comprobar qué contenidos tendrá el sitio, quién lo administrará, qué permisos necesitarán sus usuarios, qué recursos técnicos requiere y cómo se mantendrá actualizado y seguro.

## 4️⃣ WordPress: nuestro CMS de prácticas

**WordPress** es un gestor de contenidos con el que podemos crear y administrar sitios web. Dispone de un panel de administración para trabajar con contenidos, usuarios, apariencia y funcionalidades adicionales.

Durante la unidad conoceremos estos conceptos:

| Concepto | Función |
|---|---|
| **Escritorio** | Zona principal de administración. |
| **Páginas** | Contenido habitual de secciones como «Quiénes somos» o «Contacto». |
| **Entradas** | Publicaciones que suelen mostrarse ordenadas por fecha. |
| **Temas** | Controlan la apariencia y parte de la estructura visual. |
| **Plugins** | Añaden o amplían funcionalidades. |
| **Usuarios y roles** | Determinan quién accede y qué operaciones puede realizar. |

### 🟥 WordPress.org y WordPress.com no son lo mismo

- **WordPress.org** ofrece el software de código abierto que podemos instalar en un entorno propio o en un alojamiento compatible.
- **WordPress.com** es un servicio de alojamiento y creación de sitios basado en WordPress, con funciones y condiciones que dependen del plan contratado.

En esta unidad nos interesa especialmente **instalar y administrar el software WordPress** en un entorno de prácticas.

## 5️⃣ ¿Cómo trabajaremos con WordPress en clase?

En esta unidad utilizaremos **LocalWP (Local)**, una aplicación que permite crear y gestionar sitios WordPress en nuestro propio ordenador, sin necesidad de contratar un alojamiento web.

Con LocalWP prepararemos un **entorno local de prácticas**: el sitio funcionará en nuestro equipo y podremos acceder a él mediante el navegador.

Este entorno nos permitirá:

- Instalar WordPress y comprobar que funciona.
- Acceder al panel de administración.
- Crear usuarios y asignarles diferentes roles.
- Personalizar la apariencia y organizar los contenidos.
- Instalar plugins, configurar un foro y realizar tareas de mantenimiento.
- Practicar copias de seguridad y comprobar su recuperación.

:::info[Lo veremos en el apartado 4.2]
En el siguiente apartado conoceremos los requisitos técnicos de WordPress, instalaremos LocalWP y prepararemos nuestro entorno de trabajo. **Todavía no necesitas instalar nada.**
:::

:::warning[Web local y web publicada]
Nuestro sitio de prácticas se ejecutará en el ordenador. No estará publicado automáticamente en Internet ni será accesible para cualquier persona desde fuera del equipo.
:::

## 6️⃣ Primer contacto: el panel de administración

Cuando accedemos como administradores a un WordPress instalado, encontramos un panel desde el que podemos gestionar el sitio.

En las siguientes sesiones aprenderemos a reconocer sus opciones y a utilizarlas. Por ahora, recuerda esta diferencia:

- **Parte pública:** lo que ven las personas que visitan la web.
- **Parte de administración:** donde los usuarios autorizados gestionan contenidos y configuración.

:::tip[Conexión con HTML y CSS]
En una web hecha a mano, editamos directamente los archivos HTML y CSS. En WordPress, muchas modificaciones se realizan desde el panel, pero también podemos aplicar conocimientos de HTML y CSS para comprender o ajustar el resultado.
:::

## 7️⃣ Comprueba lo aprendido

Antes de pasar a la instalación, asegúrate de que puedes responder:

1. ¿Qué significan las siglas CMS y cuál es su finalidad?
2. ¿Por qué una asociación con varios autores podría utilizar un CMS?
3. ¿Qué diferencia existe entre una página y una entrada en WordPress?
4. ¿Para qué sirven los temas y los plugins?
5. ¿Qué diferencia hay entre WordPress.org y WordPress.com?
6. ¿Para qué utilizaremos LocalWP en clase y qué diferencia hay entre una web local y una publicada en Internet?

**Criterio de evaluación relacionado:** RA1, CE a), como introducción a la identificación de requisitos. La comprobación técnica de los requisitos se desarrollará en el apartado 4.2.
