---
sidebar_position: 1
title: "2.1. Documentos y etiquetas HTML"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.1 Documentos y etiquetas HTML

Un documento HTML es un archivo de texto que utiliza el lenguaje de marcado **HTML (*HyperText Markup Language*)** para estructurar y presentar contenido en la Web. Los navegadores web leen el documento HTML y lo renderizan como páginas visuales interactivas.

Un documento HTML comienza con `<!DOCTYPE html>` y se organiza de forma jerárquica y anidada dentro del elemento raíz `<html>`, que contiene dos bloques: metadatos en `<head>` y contenido visible en `<body>`.

:::info[Extensión de los archivos HTML]
Todos los archivos HTML deben llevar la extensión `.html`, por ejemplo:

```text
index.html
Hola mundo.html
...
```
:::

Los documentos están formados por **etiquetas** que indican al navegador cómo debe interpretarse y mostrarse el contenido de un documento.

## 1️⃣ Estructura mínima de un documento

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mi primera pagina</title>
    <!-- <link rel="stylesheet" href="estilos.css"> -->
    <!-- <script src="app.js" defer></script> -->
</head>
<body>
    <h1>Hola, Web</h1>
    <p>Este es el contenido visible.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/ejemplos/estructura-minima-html.png"
     alt="Representación en el navegador de la estructura básica de un archivo HTML"
     className="code-result" />

</TabItem>
</Tabs>

- `<html>` es la raíz; agrupa todo salvo el `<!DOCTYPE>`.
- `<head>` incluye metadatos y recursos (título, hojas de estilo, scripts…).
- `<body>` contiene el contenido que ve el usuario (texto, imágenes, enlaces, etc.).

### 🟩 El preámbulo `<!DOCTYPE html>`

Es obligatorio y en HTML5 tiene la forma corta `<!DOCTYPE html>`.

En versiones anteriores indicaba la variante de HTML; hoy se usa para activar el **modo estándar del navegador** y evitar *Quirks mode*.

:::warning[Quirks mode]
Si no se indica el `<!DOCTYPE>`, el navegador puede activar el **Quirks mode** (modo no estándar). Esto activa un modo de retrocompatibilidad con páginas antiguas que procesará de forma diferente muchas etiquetas HTML o propiedades CSS.
:::

### 🟧 El elemento `<html>` y el idioma

`<html>` es la etiqueta raíz de todo documento HTML, envuelve a toda la página y suele declararse con el atributo `lang` para indicar el idioma del documento (por ejemplo, `lang="es"` o `lang="en"`), lo que mejora la accesibilidad y el SEO.

Existen varios atributos relacionados con el idioma de un documento HTML:

| Atributo | Dónde se usa | Función principal | Ejemplo |
|---|---|---|---|
| `lang` | En `<html>` (recomendado) y en cualquier elemento de texto | Indica el idioma del contenido. Mejora la accesibilidad (lectores de pantalla) y el SEO. | `<html lang="es">` |
| `dir` | En `<html>` o elementos de texto | Define la dirección de escritura: de izquierda a derecha (`ltr`) o de derecha a izquierda (`rtl`). | `<html lang="ar" dir="rtl">` |
| `translate` | En cualquier elemento HTML | Indica si el contenido debe ser traducido automáticamente por herramientas de traducción (`yes` o `no`). | `<p translate="no">StarWars</p>` |

### 🟥 La cabecera `<head>`: etiquetas destacadas

- `<title>`: título de la página, obligatorio; lo muestran las pestañas del navegador.
- `<link>`: enlaza recursos externos (por ejemplo, CSS o favicon).
- `<style>`: estilos internos (en el curso se recomienda preferir hojas externas).
- `<meta>`: metadatos (`charset`, `viewport`, SEO…).
- `<script>`: enlaza o incrusta JavaScript.

:::info[CSS]
La carga de CSS interno/externo se declara en `<head>`. Veremos este contenido en profundidad en la **UT3**.
:::

### 🟪 El cuerpo `<body>`

Contiene todo lo que el usuario ve e interactúa: encabezados (`<h1>`–`<h6>`), párrafos (`<p>`), listas, enlaces (`<a>`), imágenes (`<img>`), tablas, formularios, etc.

### 🟦 Diagrama de la jerarquía de un documento

La estructura de un documento HTML es una estructura jerárquica de etiquetas anidadas que corresponde al siguiente diagrama simplificado:

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/esquemas/jerarquia-documento-html.png"
     alt="Diagrama de la estructura jerárquica de un documento HTML"
     className="unit-hero" />

## 2️⃣ Etiquetas HTML

Las etiquetas HTML son la base del lenguaje de marcas, ya que indican al navegador cómo debe interpretarse y mostrarse el contenido de una página web.

### 🟩 Sintaxis básica de una etiqueta

La estructura general de una etiqueta HTML es la siguiente:

```html
<nombre_etiqueta atributo="valor"> Contenido </nombre_etiqueta>
```


- **Etiqueta de apertura:** formada por `<` + nombre de la etiqueta + `>`.
- **Contenido:** texto u otros elementos que estarán dentro de la etiqueta.
- **Etiqueta de cierre:** formada por `</` + nombre de la etiqueta + `>`.
- **Atributos (opcionales):** añaden información adicional sobre el elemento. Se colocan siempre en la etiqueta de apertura.

#### Ejemplo

```html
<p class="destacado">Este es un párrafo</p>
```

:::info[Nombre de las etiquetas]
En HTML el nombre de las etiquetas está predefinido. Cada etiqueta cumple una función específica: estructurar, dar formato, enlazar, incrustar contenido multimedia, entre otras.
:::

#### Elementos vacíos o autocontenidos

Algunas etiquetas no tienen contenido interno y, por tanto, no necesitan etiqueta de cierre. Se denominan **elementos vacíos** o *self-closing*.

Ejemplos:

```html
<img src="logo.png" alt="Logotipo">
<br>
<hr>
```

También podemos encontrarlas escritas así:

```html
<img src="logo.png" alt="Logotipo" />
<br />
<hr />
```

:::tip[HTML5]
En HTML5 no es necesario añadir `/` al final de los elementos vacíos. Ambas formas pueden encontrarse en código HTML.
:::

### 🟧 Reglas importantes de sintaxis

#### 1. El nombre del elemento debe ir inmediatamente después del carácter `<`

❌ Incorrecto:
```html
< p>Hola</p>
```

✅ Correcto:
```html
<p>Hola</p>
```

#### 2. La etiqueta de cierre debe coincidir exactamente con la de apertura

❌ Incorrecto:
```html
<h1>Título</h2>
```

✅ Correcto:
```html
<h1>Título</h1>
```

#### 3. Las etiquetas deben estar correctamente anidadas (no se pueden cruzar)

❌ Incorrecto:
```html
<b><i>Texto en negrita y cursiva</b></i>
```

✅ Correcto:
```html
<b><i>Texto en negrita y cursiva</i></b>
```

#### 4. Los atributos solo pueden aparecer en la etiqueta de apertura (o en elementos vacíos)

❌ Incorrecto:
```html
<p>Hola</p class="rojo">
```

✅ Correcto:
```html
<p class="rojo">Hola</p>
```

#### 5. Un atributo no puede repetirse dentro de la misma etiqueta

❌ Incorrecto:
```html
<img src="foto.png" src="otra.png">
```

✅ Correcto:
```html
<img src="foto.png" alt="Foto de perfil">
```

#### 6. El orden de los atributos no importa

Ambos ejemplos son correctos:

```html
<a href="https://ejemplo.com" target="_blank">Enlace</a>
```

```html
<a target="_blank" href="https://ejemplo.com">Enlace</a>
```

### 🟥 Ejemplo completo de etiqueta con atributos

```html
<a href="https://www.ejemplo.com" target="_blank" class="enlace-principal">
  Visitar página de ejemplo
</a>
```

- `<a>` → etiqueta de apertura.
- `href="https://www.ejemplo.com"` → atributo obligatorio que indica la URL de destino.
- `target="_blank"` → atributo que define cómo abrir el enlace (en nueva pestaña).
- `class="enlace-principal"` → atributo opcional para identificar o aplicar estilos.
- `Visitar página de ejemplo` → contenido visible para el usuario.
- `</a>` → etiqueta de cierre.


