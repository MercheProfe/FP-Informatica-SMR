---
sidebar_position: 5
title: "2.5. Contenido multimedia"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 1.5 Contenido multimedia

En HTML se pueden incrustar contenidos de audio, vídeo y documentos externos. En esta sección se presentan las etiquetas `<audio>`, `<video>` (con precarga y *fallback*) y `<iframe>`.

## 1️⃣ Reproductor de audio `<audio>`

La etiqueta `<audio>` permite reproducir archivos de sonido en la página.

:::info[Formatos de audio]
Existen múltiples formatos de audio reproducible (`mp3`, la pista de audio de `mp4`, `opus`, `ogg`...), aunque no todos los navegadores son compatibles con todos los formatos.
:::

### 🟩 Atributos principales

- `src` **(obligatorio)** → indica la ruta al recurso a reproducir. Puede ser tanto interno como externo.
- `controls` **(opcional)** → muestra controles de reproducción.
- `loop` **(opcional)** → reproduce en bucle.

:::warning[Atributo autoplay]
El atributo `autoplay` permite que el audio se reproduzca automáticamente. Para evitar el uso abusivo de audio en una página sin permiso del usuario, los navegadores han implementado nuevas políticas que exigen que el usuario haya interactuado con la página con anterioridad. Por lo tanto, se desaconseja el uso de este atributo.
:::

### 🟧 Ejemplo de uso de la etiqueta `<audio>`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Audio basico</title>
</head>
<body>
  <h2>Ejemplo de audio básico</h2>
    <!-- Reproducción de contenido interno -->
    <audio controls src="assets/muestra.mp3"></audio>
    <!-- Reproducción de contenido externo -->
    <audio controls src="https://www.w3schools.com/html/mov_bbb.mp4"></audio>
</body>
</html>
```

:::tip[Archivo de audio]
Descarga el <a href={useBaseUrl('/descargas/aplicaciones-web/ut2/multimedia/muestra.mp3')} download>**archivo de muestra**</a> para reproducirlo.
:::

## 2️⃣ Reproductor de vídeo `<video>`

Permite reproducir vídeo con controles nativos. Se recomienda ofrecer varias fuentes y, si es posible, subtítulos con `<track>`.

### 🟩 Atributos principales

- `src` **(obligatorio)** → indica la ruta al recurso a reproducir. Puede ser tanto interno como externo.
- `controls` **(opcional)** → muestra controles de reproducción.
- `muted` **(opcional)** → quita el sonido del vídeo.
- `loop` **(opcional)** → reproduce en bucle.
- `poster` **(opcional)** → permite mostrar una imagen fija antes de que se reproduzca el vídeo.
- `width`, `height` **(opcionales)** → permiten fijar las dimensiones del reproductor.

:::warning[Atributo autoplay]
El atributo `autoplay` permite que el vídeo se reproduzca automáticamente. Tiene las mismas limitaciones que su uso en la etiqueta `<audio>`. Por lo tanto, se desaconseja el uso de este atributo.
:::

### 🟧 Ejemplo de uso de la etiqueta `<video>`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Video basico</title>
</head>
<body>
  <h2>Video con poster</h2>
    <video controls src="assets/video.mp4" width="640" height="360" poster="assets/poster.jpg"> </video>
</body>
</html>
```

:::tip[Archivo de vídeo y portada]
Descarga el <a href={useBaseUrl('/descargas/aplicaciones-web/ut2/multimedia/video.mp4')} download>**archivo de vídeo**</a> y la <a href={useBaseUrl('/descargas/aplicaciones-web/ut2/multimedia/poster.jpg')} download>**portada**</a>.
:::

### 🟥 Fragmentos

Podemos acotar el periodo de reproducción indicándolo en el atributo `src` añadiendo el sufijo `#t=s_inicio,s_fin` (segundos). También funciona a la hora de mostrar los controles de reproducción.

#### Ejemplo de fragmento de vídeo

```html
<video controls src="assets/video.mp4#t=5,8"></video>
```

### 🟪 Subtítulos y descripciones `<track>`

La etiqueta `<track>` se usa dentro de `<video>` para añadir subtítulos, transcripciones o descripciones de audio. El formato más habitual es WebVTT (`.vtt`).

Atributos principales:

- `kind` → tipo de pista: `subtitles`, `captions`, `descriptions`, `chapters`, `metadata`.
- `src` → ruta del archivo `.vtt`.
- `srclang` → idioma (ej. `"es"`, `"en"`).
- `label` → nombre mostrado al usuario en el selector de subtítulos.
- `default` → indica qué pista se carga automáticamente.

#### Ejemplo de uso de subtítulos

```html
<video controls src="/media/video/demo.mp4" width="480">
  <track src="/media/video/subs-es.vtt" kind="subtitles" srclang="es" label="Español" default>
  <track src="/media/video/subs-en.vtt" kind="subtitles" srclang="en" label="English">
</video>
```

## 3️⃣ Precarga (`preload`) en audio/vídeo

El contenido multimedia es muy pesado y, en alguna ocasión, puede entorpecer un funcionamiento fluido de nuestra página web. Por este motivo las etiquetas `<audio>` y `<video>` permiten el control de la carga del contenido mediante el atributo `preload`.

El atributo `preload` sugiere al navegador cuánto cargar por adelantado los recursos. Existen 3 estrategias de precarga:

- `none` → no descarga el medio al cargar la página (ahorra datos).
- `metadata` → descarga solo metadatos (duración, dimensiones, etc.).
- `auto` → el navegador puede descargar el archivo completo (a criterio del navegador).

#### Ejemplo de uso de `preload`

```html
<!-- Ejemplo de precarga en archivos de audio -->
<audio controls src="assets/muestra.mp3" preload="none"></audio>
<audio controls src="assets/muestra.mp3" preload="metadata"></audio>

<!-- Ejemplo de precarga en archivos de video -->
<video controls src="assets/video.mp4" preload="none"></video>
<video controls src="assets/video.mp4" preload="metadata"></video>
```

## 4️⃣ Fallbacks en audio y vídeo

Los *fallbacks* permiten que el navegador muestre alternativas cuando no soporta un formato multimedia o la etiqueta en sí. De este modo, la experiencia del usuario no se ve interrumpida y siempre se ofrece una salida: otro formato, subtítulos, un texto o incluso una imagen.

### 🟩 Fuentes alternativas `<source>`

La etiqueta `<source>` se coloca dentro de `<audio>` o `<video>` para proporcionar múltiples versiones del mismo archivo en distintos formatos. El navegador elige automáticamente la primera que pueda reproducir.

Atributos principales:

- `src` → ruta al archivo.
- `type` → MIME type del archivo (ej. `audio/mpeg`, `video/mp4`, `video/webm`). Sirve para que el navegador detecte antes de descargar si puede reproducirlo.

```html
<audio controls>
  <source src="/media/audio/piano.mp3" type="audio/mpeg">
  <source src="/media/audio/piano.ogg" type="audio/ogg">
  Tu navegador no soporta audio.
  <a href="/media/audio/piano.mp3">Descargar pista</a>
</audio>
```

### 🟧 Atributo `type`

El atributo `type` define el tipo de contenido (MIME type) del recurso y permite a los navegadores detectar compatibilidad antes de descargar.

Ejemplos más comunes:

- **Audio**: `audio/mpeg`, `audio/ogg`.
- **Vídeo**: `video/mp4`, `video/webm`, `video/ogg`.

### 🟥 `<img>` como fallback en vídeo

Si el navegador no soporta `<video>`, se puede mostrar una imagen estática como último recurso dentro de la etiqueta.

```html
<video controls width="480">
  <source src="/media/video/demo.mp4" type="video/mp4">
  <source src="/media/video/demo.webm" type="video/webm">
  <img src="/media/video/poster.jpg" alt="Imagen alternativa del video">
</video>
```

### 🟪 Diagrama de decisión de fallback

<a href="/FP-Informatica-SMR/img/aplicaciones-web/ut2/multimedia/fallback-multimedia.png" target="_blank" rel="noopener noreferrer">
  <img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/multimedia/fallback-multimedia.png" alt="Diagrama de decisión de fallback para contenido multimedia" style={{width: '100%', height: 'auto', maxHeight: 'none', objectFit: 'contain'}} />
</a>

:::tip[Amplía la imagen]
Haz clic sobre la imagen para verla a tamaño completo.
:::

## 5️⃣ Contenido externo embebido `<iframe>`

La etiqueta `<iframe>` se usa para incrustar un documento HTML externo o contenido (mapas, vídeos de plataformas, documentos, widgets).

:::info[`<iframe>`]
En este apartado utilizaremos `<iframe>` para embeber contenido externo.
:::

### 🟩 Atributos clave

- `src` **(obligatorio)** → URL del recurso a embeber.
- `title` → describe el contenido y mejora la accesibilidad.
- `width`, `height` → dimensiones del marco.
- `frameborder` → define si el iframe tiene borde (`frameborder="1"`) o no (`frameborder="0"`).
- `loading="lazy"` → carga diferida (mejora rendimiento).
- `allowfullscreen` → permite pantalla completa (útil con vídeos).

### 🟧 Ejemplo de uso de iframes

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Iframe</title>
</head>
<body>
      <h2>IES Albarregas (Mérida)</h2>
      <!-- Ejemplo de mapa embebido -->
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.426096326225!2d-6.339611223546924!3d38.92302834519069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1428c2cce72475%3A0xf1d9d8d665e4ae13!2sIES%20Albarregas!5e1!3m2!1ses!2ses!4v1756209106168!5m2!1ses!2ses" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      <!-- Ejemplo de WEB embebida -->
      <iframe src="https://sites.google.com/iesalbarregas.es/portada/inicio" width="300" height="225" frameborder="0" allowfullscreen></iframe><br>

      <!-- Ejemplo de contenido de plataformas embebido -->
      <iframe src="https://www.youtube.com/embed/EacciRr04cE?si=6sltssxs0a7yS3ys" width="300" height="225" style="border:1;" allowfullscreen></iframe>

      <!-- Ejemplo de documento -->
      <iframe src="assets/archivo.pdf" width="300" height="225" frameborder="1"></iframe>
</body>
</html>
```

:::tip[Obtener un iframe]
Generalmente son las propias plataformas las que te suministran el `iframe` para que puedas embeber su contenido. En la siguiente imagen se muestra dónde se puede conseguir el `iframe` de una localización en Google Maps.
:::

<a href="/FP-Informatica-SMR/img/aplicaciones-web/ut2/multimedia/obtener-iframe-maps.jpg" target="_blank" rel="noopener noreferrer">
  <img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/multimedia/obtener-iframe-maps.jpg" alt="Dónde obtener el código iframe de una localización en Google Maps" style={{width: '100%', height: 'auto', maxHeight: 'none', objectFit: 'contain'}} />
</a>

:::warning[Contenidos restringidos]
Es posible que no se nos permita embeber en nuestra web contenido de algunas plataformas como YouTube, Twitch, etc. Esto puede deberse a restricciones del contenido o de la propia plataforma.
:::
