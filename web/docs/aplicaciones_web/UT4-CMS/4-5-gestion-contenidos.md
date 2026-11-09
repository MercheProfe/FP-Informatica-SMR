---
title: "4.5. Gestión de contenidos"
sidebar_position: 5
---

# 4.5. Gestión de contenidos y navegación

WordPress permite publicar información sin escribir manualmente cada página HTML. En este bloque se construye la estructura de un sitio web y se comprueba cómo se relacionan contenidos, medios y navegación.

:::info[Variaciones de la interfaz]
Algunas opciones de navegación y edición pueden variar según el tema y la versión de WordPress.
:::

## 1️⃣ Páginas y entradas

| Característica | Páginas | Entradas |
|---|---|---|
| Uso habitual | Inicio, Quiénes somos, Contacto | Noticias, novedades, artículos |
| Organización | Jerarquía de páginas, si procede | Categorías y etiquetas |
| Fecha | No suele ser protagonista | Habitualmente relevante |
| Aparición en listados de blog | No por defecto | Sí |

### 🟩 Crear páginas

1. Entra en **Páginas → Añadir nueva**.
2. Escribe un título y añade contenido con el editor de bloques.
3. Utiliza **Vista previa** para revisar el resultado.
4. Guarda como **Borrador** si aún no debe ser visible, o pulsa **Publicar** cuando esté preparado.
5. Crea, como mínimo, páginas de **Inicio**, **Quiénes somos** y **Contacto** con información ficticia.

:::tip[Antes de publicar]
Comprueba ortografía, enlaces, imágenes y que no aparezcan datos personales reales en la web de pruebas.
:::

### 🟧 Crear entradas

1. Entra en **Entradas → Añadir nueva**.
2. Crea una noticia relacionada con la entidad ficticia.
3. Asigna una categoría y revisa su URL.
4. Publica y abre la entrada desde el sitio público.

## 2️⃣ Editor de bloques

El editor de WordPress organiza el contenido en **bloques**: párrafo, encabezado, imagen, lista, columnas o botones, entre otros. Cada bloque tiene opciones de contenido y presentación.

### 🟥 Prueba de edición

Crea una página que incluya un encabezado, dos párrafos, una lista y una imagen. Cambia el orden de dos bloques y comprueba la vista previa. Distingue el **contenido** de la página de su **presentación** visual, que depende también del tema.

## 3️⃣ Categorías, etiquetas y organización

Las **categorías** agrupan entradas en grandes temas; las **etiquetas** describen asuntos más específicos. No son necesarias para las páginas normales.

### 🟪 Prueba de clasificación

Crea dos categorías, asigna varias entradas y abre el archivo de una categoría para observar el listado. Evita crear categorías que no vayas a utilizar.

## 4️⃣ Biblioteca de medios

En **Medios → Biblioteca** se gestionan los archivos subidos. Las imágenes suelen almacenarse en `wp-content/uploads`, mientras que sus datos y relaciones se registran también en la base de datos.

### 🟦 Subir y utilizar una imagen

1. Accede a **Medios → Añadir archivo multimedia** o inserta un bloque Imagen.
2. Sube una imagen propia o con licencia adecuada.
3. Completa el **texto alternativo** cuando la imagen aporte información.
4. Insértala en una página y verifica su visualización.
5. Comprueba en LocalWP que aparece un archivo en `wp-content/uploads`.

:::warning[Privacidad y derechos]
No subas fotografías del alumnado, datos personales ni imágenes sin permiso de uso. El texto alternativo debe describir la información relevante, no repetir automáticamente el nombre del archivo.
:::

## 5️⃣ Portada, navegación y enlaces

En **Ajustes → Lectura**, WordPress permite mostrar las últimas entradas o una **página estática** como portada. Para una web institucional suele ser útil elegir una página «Inicio» y, si se desea, otra página para las entradas del blog.

La configuración de navegación depende del tema: en temas de bloques suele realizarse desde **Apariencia → Editor → Navegación** o desde el bloque Navegación; en temas clásicos puede existir **Apariencia → Menús**.

### 🟩 Prueba de navegación

1. Establece «Inicio» como portada estática.
2. Configura la navegación con enlaces a Inicio, Quiénes somos y Contacto.
3. Comprueba que todos los enlaces funcionan y que la portada se abre desde el dominio local.
4. Revisa **Ajustes → Enlaces permanentes** y comprueba una URL legible.

## 6️⃣ Comprobación del bloque

- Existen páginas y entradas diferenciadas.
- Las entradas están clasificadas y pueden localizarse.
- Hay al menos una imagen con texto alternativo apropiado.
- La portada y la navegación funcionan.
- Se ha comprobado qué archivos se guardan en `uploads`.

:::info[Continuidad]
En 4.6 cambiaremos la apariencia sin perder los contenidos. En 4.7 añadiremos funcionalidades mediante plugins y un foro.
:::
