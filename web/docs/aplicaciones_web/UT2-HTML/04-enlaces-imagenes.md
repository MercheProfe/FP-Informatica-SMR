---
sidebar_position: 4
title: "2.4. Enlaces e imágenes"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# 1.4 Enlaces e imágenes

Los enlaces y las imágenes son elementos esenciales en HTML para navegar entre páginas y mostrar contenido visual. Será necesario conocer el funcionamiento de las siguientes etiquetas:

- `<a>` → crea hipervínculos a otras páginas o recursos.
- `<img>` → inserta imágenes en la página.

## 1️⃣ Enlaces `<a>`

La etiqueta `<a>` permite crear hipervínculos a páginas, secciones internas, archivos y también abrir aplicaciones externas, como el cliente de correo.

A continuación se amplía su uso: rutas absolutas y relativas, anclas internas, `mailto:`, `tel:` y descarga de archivos.

### 🟩 Atributos clave de `<a>`

- `href` **(obligatorio)** → destino del enlace (URL, ruta interna, `mailto:`, `tel:`…).
- `target` **(opcional)** → dónde abrir el enlace: `_self` (por defecto), `_blank` (nueva pestaña).
- `title` **(opcional)** → texto informativo al pasar el ratón.
- `download` **(opcional)** → sugiere descargar el recurso y permite indicar un nombre de archivo, por ejemplo `download="guia.pdf"`.

### 🟧 Rutas absolutas vs. relativas

Una **ruta absoluta** incluye el protocolo y el dominio completos.

```text
https://midominio.com/cursos/html/index.html
```

Una **ruta relativa** depende de la ubicación del archivo HTML actual.

```text
cursos/html/index.html
```

Para subir un nivel en la estructura de carpetas:

```text
../index.html
```

Desde la raíz del sitio, mediante una ruta *root-relative*:

```text
/assets/docs/guia.pdf
```

#### Estructura de carpetas

```text
/ (raíz)
├─ index.html
├─ about/
│  └─ equipo.html
└─ assets/
   ├─ documentos.html
   └─ docs/
      └─ guia.pdf
```

:::tip[Practica con la estructura del ejemplo]
Descarga la estructura de carpetas del ejemplo para practicar los enlaces entre documentos.
:::

Desde `index.html`:

```html
<a href="about/equipo.html">Equipo</a>
```

Desde `about/equipo.html`:

```html
<a href="../index.html">Inicio</a>
```

Para acceder al recurso compartido desde una ruta basada en la raíz del sitio:

```html
<a href="/assets/docs/guia.pdf">Guía</a>
```

:::warning[Rutas dentro de tu sitio web]
**Usa siempre rutas relativas para navegar entre las páginas de tu sitio web.**

Si tu sitio se despliega bajo un subdirectorio, por ejemplo:

```text
https://midominio.com/mi-sitio/
```

las rutas que empiezan por `/` apuntan a la raíz del dominio, no a `mi-sitio/`. En ese caso, utiliza rutas relativas, que nunca empiezan por `/`.
:::

### 🟥 Enlaces a secciones internas (anclas)

Puedes enlazar a una parte concreta de la misma página usando un fragmento `#id`.

#### Ejemplo de enlace a secciones de un documento

<Tabs>
<TabItem value="codigo-anclas" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Enlaces internos</title>
</head>
<body>
  <p><a href="#faq">Ir a la seccion FAQ</a></p>
  <p><a href="#equipo">Ir a la seccion EQUIPO</a></p>

  <h2 id="faq">FAQ</h2>
  <p>Contenido de la seccion de preguntas frecuentes.</p>

  <h2 id="equipo">EQUIPO</h2>
  <p>Contenido de la seccion donde se muestra el equipo de empleados de la empresa.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-anclas" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/enlaces-imagenes/resultados/resultado-enlaces-internos.png"
  alt="Representación de enlaces a secciones internas de un documento HTML"
  className="code-result"
/>

</TabItem>
</Tabs>

### 🟪 Abrir en nueva pestaña

Por norma general, los enlaces se abren en la misma pestaña del navegador que estamos usando, debido a que el atributo `target` tiene el valor `_self` por defecto.

Si queremos que el enlace se abra en una nueva pestaña, deberemos declarar:

```html
target="_blank"
```

#### Ejemplo de apertura en nueva pestaña

```html
<p>
  <a 
    href="https://www.wikipedia.org"  
    target="_blank"  
    title="Ir a Wikipedia en nueva pestaña"> 
    Wikipedia 
  </a>
</p>
```

### 🟦 Enlaces especiales: `mailto:` y `tel:`

Los enlaces con `mailto:` abren el cliente de correo con destinatario y, opcionalmente, asunto y cuerpo.

Los enlaces `tel:` intentan iniciar una llamada en dispositivos compatibles.

#### Ejemplo de apertura de un email y el marcador de llamadas

```html
<p>
  <a 
    href="mailto:info@miescuela.com" 
    title="Correo a soporte"> 
    Enviar correo a soporte 
  </a>
</p>

<p>
  <a 
    href="tel:+34911223344" 
    title="Llamar a soporte">
    Llamar al +34 911 22 33 44
  </a>
</p>
```

### 🟩 Descargar archivos con `download`

El atributo `download` sugiere al navegador descargar el recurso en lugar de abrirlo y permite proponer un nombre de archivo.

```html
<p>
  <!-- Descarga con nombre original -->
  <a href="/assets/img/archivo.pdf" download>
    Descargar archivo con nombre original
  </a>
</p>

<p>
  <!-- Descarga con nombre sugerido -->
  <a href="/assets/docs/archivo.pdf" download="guia-HTML.pdf">
    Descargar archivo con nombre guia-HTML.pdf
  </a>
</p>
```

## 2️⃣ Imágenes `<img>`

La etiqueta `<img>` es un elemento vacío que sirve para mostrar imágenes en la página.

:::warning[Importante]
Es muy importante acompañarla siempre de un texto alternativo con el atributo `alt` para mejorar la accesibilidad y el SEO.
:::

### 🟩 Atributos principales

- `src` → ruta o URL de la imagen.
- `alt` → texto alternativo.
- `width` y `height` → ancho y alto de la imagen.
- `title` → información adicional que aparece al pasar el ratón.

<Tabs>
<TabItem value="codigo-img" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo imagen</title>
</head>
<body>
  <h2>Ejemplo de imagen</h2>
  <img src="img/llmm/UT1/monte.jpg" alt="Paisaje de montaña" width="300" title="Montaña al atardecer">
</body>
</html>
```

</TabItem>
<TabItem value="resultado-img" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/enlaces-imagenes/resultados/resultado-imagen.png"
  alt="Representación de una imagen insertada en un documento HTML"
  className="code-result"
/>

</TabItem>
</Tabs>

### 🟧 Formatos de imágenes

Los navegadores admiten muchos formatos de imagen. Los principales son:

- **JPG** → ideales para representar fotografías de calidad.
- **GIF** → ideales para representar animaciones.
- **PNG** → ideales para representar diagramas e iconos.
- **SVG** → ideales para gráficos vectoriales y especialmente útiles cuando necesitamos que la imagen se adapte a distintos tamaños sin perder calidad.

### 🟥 Comprueba la diferencia

Descarga esta <a href={useBaseUrl('/descargas/aplicaciones-web/ut2/imagenes.rar')} download>**carpeta de imágenes**</a> y crea una página llamada `index.html` en la raíz de un proyecto donde se muestren.

El resultado debe ser parecido a este:

<a
  href="/FP-Informatica-SMR/img/aplicaciones-web/ut2/enlaces-imagenes/ejemplo-formatos-imagen.jpg"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/enlaces-imagenes/ejemplo-formatos-imagen.jpg"
    alt="Ejemplo comparativo de diferentes formatos de imagen mostrados en una página HTML"
    style={{
      width: '100%',
      height: 'auto',
      maxHeight: 'none',
      objectFit: 'contain'
    }}
  />
</a>

