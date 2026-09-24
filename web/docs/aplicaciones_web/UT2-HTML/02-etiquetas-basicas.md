---
sidebar_position: 2
title: "2.2. Etiquetas básicas"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.2 Etiquetas básicas

En esta sección estudiaremos las **etiquetas más básicas del lenguaje HTML** y su uso. Para elaborar una web básica necesitaremos comprender el funcionamiento de las siguientes etiquetas.

<a
  href="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/ejemplo-web-basica.png"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/ejemplo-web-basica.png"
    alt="Resumen visual de las etiquetas básicas de HTML"
    style={{ width: '100%', height: 'auto' }}
  />
</a>

## 1️⃣ Metadatos y enlaces

### 🟩 `<title>` — título del documento

La etiqueta `<title>` en HTML se utiliza para definir el título de una página web. Este título aparece en la pestaña del navegador y es importante para los motores de búsqueda, ya que ayuda a identificar de qué trata la página.

El contenido dentro de esta etiqueta no se muestra en el cuerpo de la página, pero es esencial para mejorar la experiencia del usuario y el SEO (optimización para motores de búsqueda). El `<title>` debe ser breve y descriptivo, ya que también puede aparecer en los resultados de búsqueda.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mi primera pagina</title>
</head>
<body>
    <h1>Hola, Web</h1>
    <p>Este es el contenido visible.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-title.png"
  alt="Representación en el navegador del ejemplo de la etiqueta title"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟧 `<link>` — enlace a recursos externos

La etiqueta `<link>` es una etiqueta vacía para enlazar recursos como hojas de estilo o favicon. Se usa principalmente en el bloque `<head>`.

Atributos más usados:

- `rel` → relación con el recurso (p. ej., `stylesheet`, `icon`).
- `href` → URL del recurso.

#### Ejemplo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mi primera pagina</title>
    <!-- Hoja de estilo externa -->
    <link rel="stylesheet" href="/css/estilos.css">
    <!-- Favicon de la pagina -->
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon">
</head>
<body>
    <h1>Hola, Web</h1>
    <p>Este es el contenido visible.</p>
</body>
</html>
```

:::tip[Favicon]
Un **favicon** es la pequeña imagen que aparece en la pestaña del navegador o en marcadores.


<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/ejemplo-favicon.png"
  alt="Ejemplo de favicon mostrado en la pestaña de un navegador"
  className="unit-hero"
/>

:::

Se puede emplear casi cualquier formato de imagen, pero se recomiendan imágenes con formato `.ico`, cuadradas y que no superen los 100 × 100 píxeles.

### 🟥 Comentarios en HTML

Los comentarios son fragmentos de texto que el navegador ignora; sirven para documentar y aclarar el código.

Se escriben con:

```html
<!-- comentario -->
```

#### Ejemplo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mi primera pagina</title>
    <!-- Hoja de estilo externa -->
    <link rel="stylesheet" href="/css/estilos.css">
    <!-- Favicon de la pagina -->
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon">
</head>
<body>
    <h1>Hola, Web</h1>
    <p>Este es el contenido visible.</p>
</body>
</html>
```

:::tip[Configura un atajo de teclado en tu editor]
Es muy útil configurar un atajo de teclado para comentar líneas de código en tu editor. En VS Code se hace desde **File → Preferences → Keyboard Shortcuts**. En caso de que no esté configurado por defecto, busca la acción correspondiente a comentar las líneas seleccionadas e indica el atajo de teclado que prefieras.
:::

## 2️⃣ Texto y estructura

### 🟩 `<p>` — párrafo de texto

La etiqueta `<p>` se utiliza para definir párrafos de texto. El navegador agrega automáticamente un espacio antes y después del párrafo, lo que permite organizar el contenido de forma más legible.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ejemplo parrafos</title>
</head>
<body>
    <p>Este es el primer parrafo de ejemplo.</p>
    <p>Este es otro parrafo, separado automaticamente.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-parrafos.png"
  alt="Representación de dos párrafos HTML en el navegador"
  className="code-result"
/>

</TabItem>
</Tabs>
:::warning[Importante]
En HTML los párrafos ignoran los saltos de línea, las tabulaciones y los espacios múltiples.
:::

### 🟧 `<h1>` – `<h6>` — encabezados

Las etiquetas `<h1>` a `<h6>` definen encabezados jerárquicos en un documento HTML:

- `<h1>` → nivel más alto, título principal de la página.
- `<h2>` → secciones principales.
- `<h3>` a `<h6>` → subsecciones con menor relevancia.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ejemplo encabezados</title>
</head>
<body>
    <h1>Titulo principal de la pagina</h1>
    <h2>Seccion importante</h2>
    <h3>Subseccion</h3>
    <h4>Detalle menor</h4>
    <h5>Subdetalle</h5>
    <h6>Encabezado de nivel mas bajo</h6>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-encabezados.png"
  alt="Representación de los encabezados HTML desde h1 hasta h6"
  className="code-result"
/>

</TabItem>
</Tabs>
:::info[Encabezados, accesibilidad y SEO]
Los encabezados no solo sirven para modificar el tamaño de la fuente —esto se puede hacer mediante estilos—, también son importantes tanto para la accesibilidad como para el SEO, ya que permiten organizar la información y facilitar la lectura.
:::

### 🟥 `<pre>` — texto preformateado

La etiqueta `<pre>` se usa para mostrar texto preformateado, es decir, conserva los espacios, tabulaciones y saltos de línea exactamente como se escriben en el código. Se emplea mucho para mostrar código fuente o contenido donde el formato es relevante.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ejemplo pre</title>
</head>
<body>
    <pre>
      Linea 1
          Linea 2 con sangria
      Linea 3
    </pre>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-pre.png"
  alt="Representación de texto preformateado con la etiqueta pre"
  className="code-result"
/>

</TabItem>
</Tabs>
## 3️⃣ Listas en HTML

Las listas permiten organizar información en forma de viñetas o numeración. En HTML existen dos tipos principales:

- **Listas desordenadas (`<ul>`)**: muestran los elementos con viñetas.
- **Listas ordenadas (`<ol>`)**: muestran los elementos con numeración automática.
- Los elementos de ambas listas se definen con `<li>` (*list item*).

### 🟩 `<ul>` — lista desordenada

Se utiliza para representar elementos sin un orden específico. Cada elemento se marca con un punto o viñeta.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo ul</title>
</head>
<body>
  <h2>Lista de frutas</h2>
  <ul>
    <li>Manzana</li>
    <li>Pera</li>
    <li>Naranja</li>
  </ul>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-lista-ul.png"
  alt="Representación de una lista desordenada HTML"
  className="code-result"
/>

</TabItem>
</Tabs>
:::info[Formato de la viñeta]
El atributo `type` cambia el estilo de las viñetas, aunque actualmente está en desuso, ya que el cambio de estilo se realiza con CSS.

```html
<li type="disc">Viñeta con punto negro</li>
<li type="circle">Viñeta con círculo</li>
<li type="square">Viñeta con cuadrado</li>
```
:::

### 🟧 `<ol>` — lista ordenada

Se utiliza cuando los elementos siguen un orden secuencial. Permite personalizar la numeración con atributos.

Atributos principales de `<ol>`:

- `type`: tipo de numeración (`1`, `A`, `a`, `I`, `i`).
- `start`: número inicial de la lista.
- `reversed`: invierte el orden de la numeración.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo ol</title>
</head>
<body>
  <h2>Pasos para preparar té</h2>
  <ol type="A" start="3" reversed>
    <li>Calentar agua</li>
    <li>Agregar té</li>
    <li>Servir en taza</li>
  </ol>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-lista-ol.png"
  alt="Representación de una lista ordenada HTML con atributos type, start y reversed"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟥 `<li>` — elemento de lista

Cada elemento dentro de `<ul>` o `<ol>` se marca con la etiqueta `<li>`. Puede contener texto, enlaces, imágenes u otros elementos HTML.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo li</title>
</head>
<body>
  <h2>Lista con enlaces</h2>
  <ul>
    <li><a href="https://www.google.com">Google</a></li>
    <li><a href="https://www.wikipedia.org">Wikipedia</a></li>
    <li><a href="https://www.github.com">GitHub</a></li>
  </ul>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-lista-li.png"
  alt="Representación de una lista HTML cuyos elementos contienen enlaces"
  className="code-result"
/>

</TabItem>
</Tabs>
#### Atributo `value`

El elemento `<li>` puede ir acompañado del atributo `value`, que nos permite indicar de forma manual el índice del elemento en una lista ordenada.

```html
<h2>Lista ordenada con atributo value</h2>
<ol>
    <li value="10">Elemento 10</li>
    <li>Elemento 11</li>
    <li value="20">Elemento 20</li>
    <li>Elemento 21</li>
</ol>
```

#### ¿Eres capaz de crear estas listas?

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/ejemplo-elemento-lista.png"
  alt="Ejemplo visual de listas que el alumnado debe reproducir con HTML"
  className="unit-hero"
/>

### 🟪 `<details>` — lista interactiva

La etiqueta `<details>` permite crear un bloque de información desplegable que el usuario puede expandir o contraer. Es muy útil para ocultar información secundaria o mostrar detalles bajo demanda, como ejemplos, explicaciones o FAQ.

- Puede contener cualquier elemento HTML en su interior.
- El texto visible del encabezado se suele definir con `<summary>`.
- El atributo `open` hace que el bloque aparezca desplegado por defecto.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo details</title>
</head>
<body>
  <h2>Preguntas frecuentes</h2>
  <details>
    <summary>¿Qué es HTML?</summary>
    <p>HTML es un lenguaje de marcado que se utiliza para estructurar el contenido de la web.</p>
  </details>

  <details open>
    <summary>¿Qué es CSS?</summary>
    <p>CSS es un lenguaje de estilos que se usa para dar formato y diseño a los documentos HTML.</p>
  </details>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-details.png"
  alt="Representación de bloques desplegables creados con details y summary"
  className="code-result"
/>

</TabItem>
</Tabs>
#### Acordeón exclusivo

Es posible crear un acordeón exclusivo con HTML. Este es el nombre que se le da a una serie de acordeones HTML donde solo se permite tener desplegado uno. La forma de conseguirlo es añadir a todos los acordeones el atributo `name` con el mismo nombre.

```html
<h2>Preguntas frecuentes</h2>
<details name="faq">
  <summary>¿Qué es HTML?</summary>
  <p>HTML es un lenguaje de marcado que se utiliza para estructurar el contenido de la web.</p>
</details>
<details name="faq">
  <summary>¿Qué es CSS?</summary>
  <p>CSS es un lenguaje de estilos que se usa para dar formato y diseño a los documentos HTML.</p>
</details>
```

## 4️⃣ Formatos de texto

Las etiquetas de formato permiten resaltar o dar énfasis a fragmentos de texto. Es importante diferenciar entre aquellas que aportan significado semántico y las que solo tienen un efecto visual.

### 🟩 `<em>` — énfasis en el texto

La etiqueta `<em>` se utiliza para dar énfasis semántico a una parte del texto. Normalmente el navegador lo representa en cursiva, pero lo importante es que indica que ese contenido tiene más relevancia dentro del contexto.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo em</title>
</head>
<body>
  <p>Este texto tiene un <em>énfasis especial</em>.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-em.png"
  alt="Representación de texto con énfasis mediante la etiqueta em"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟧 `<strong>` — texto importante

La etiqueta `<strong>` se emplea para resaltar un texto con importancia semántica. El navegador lo muestra en negrita, pero lo relevante es que indica que el contenido es fundamental o requiere mayor atención.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo strong</title>
</head>
<body>
  <p>Es <strong>muy importante</strong> prestar atención a este detalle.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-strong.png"
  alt="Representación de texto importante mediante la etiqueta strong"
  className="code-result"
/>

</TabItem>
</Tabs>
#### Anidamiento de formato

Este tipo de etiquetas pueden anidarse para aplicar los dos formatos:

```html
<p><strong><em>Párrafo en negrita y cursiva</em></strong>.</p>
```

### 🟥 `<mark>` — texto resaltado

La etiqueta `<mark>` se utiliza para resaltar texto como si estuviera marcado con un rotulador fluorescente. Es útil para señalar información relevante dentro de un párrafo.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo mark</title>
</head>
<body>
  <p>Recuerda estudiar el <mark>tema 3</mark> para el examen.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-mark.png"
  alt="Representación de texto resaltado mediante la etiqueta mark"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟪 Etiquetas obsoletas y no recomendadas (*deprecated*)

No se recomienda usar:

- La etiqueta `<u>` aplica un subrayado al texto. Su uso no es recomendable, ya que puede confundirse con enlaces.
- La etiqueta `<s>` se usa para mostrar texto tachado, normalmente cuando un contenido ya no es válido o está en desuso.

En el material también encontraremos etiquetas tradicionales como:

- `<i>` aplica estilo cursiva. Para expresar énfasis semántico utilizaremos `<em>`.
- `<b>` aplica estilo negrita. Para expresar importancia semántica utilizaremos `<strong>`.

## 5️⃣ Superíndice y subíndice

Las etiquetas `<sup>` y `<sub>` se utilizan para representar texto en posiciones especiales, muy comunes en fórmulas matemáticas, químicas o referencias.

- `<sup>` → muestra texto en superíndice (elevado sobre la línea de base).
- `<sub>` → muestra texto en subíndice (por debajo de la línea de base).

### 🟩 `<sup>` — superíndice

Se utiliza para representar potencias, exponentes, notas al pie o referencias.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo sup</title>
</head>
<body>
  <p>La formula de un cuadrado es: lado<sup>2</sup></p>
  <p>Referencia bibliografica<sup>[1]</sup></p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-sup.png"
  alt="Representación de texto en superíndice con la etiqueta sup"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟧 `<sub>` — subíndice

Se utiliza para representar símbolos químicos, índices o elementos que se escriben por debajo de la línea de texto.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo sub</title>
</head>
<body>
  <p>La formula del agua es: H<sub>2</sub>O</p>
  <p>Serie numerada: X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub></p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-sub.png"
  alt="Representación de texto en subíndice con la etiqueta sub"
  className="code-result"
/>

</TabItem>
</Tabs>
## 6️⃣ Otros elementos

Además de los párrafos, encabezados y formatos de texto, HTML ofrece una serie de etiquetas que permiten añadir citas, abreviaturas, saltos de línea y separadores para enriquecer el contenido.

### 🟩 `<q>` — cita breve

La etiqueta `<q>` se usa para marcar citas cortas en línea. Los navegadores suelen añadir automáticamente comillas alrededor del contenido.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo q</title>
</head>
<body>
  <p>El profesor dijo: <q>El HTML es la base de la web</q>.</p>
  <p>El profesor dijo: <q>El HTML es la base de la web</q>.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-q.png"
  alt="Representación de una cita breve mediante la etiqueta q"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟧 `<abbr>` — abreviatura o acrónimo

La etiqueta `<abbr>` se usa para indicar abreviaturas o acrónimos. Debe acompañarse del atributo `title`, que muestra el significado completo al pasar el ratón.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo abbr</title>
</head>
<body>
  <p>La <abbr title="Organizacion de las Naciones Unidas">ONU</abbr> fue fundada en 1945.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-abbr.png"
  alt="Representación de una abreviatura HTML con información en el atributo title"
  className="code-result"
/>

</TabItem>
</Tabs>
#### El atributo `title`

El atributo `title="Organizacion de las Naciones Unidas"` indicará la información que quieres que aparezca cuando pases el cursor sobre el acrónimo:

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/ejemplo-abbr-title.png"
  alt="Ejemplo del texto mostrado al pasar el cursor sobre una abreviatura"
  className="unit-hero"
/>

### 🟥 `<br>` — salto de línea

La etiqueta `<br>` es un elemento vacío que se usa para insertar un salto de línea dentro de un párrafo o texto, sin comenzar uno nuevo.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo br</title>
</head>
<body>
  <p>Linea 1<br>Linea 2<br>Linea 3</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-br.png"
  alt="Representación de saltos de línea mediante la etiqueta br"
  className="code-result"
/>

</TabItem>
</Tabs>
### 🟪 `<hr>` — separador horizontal

La etiqueta `<hr>` es un elemento vacío que se utiliza para añadir una línea horizontal como separador visual entre secciones de contenido.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo hr</title>
</head>
<body>
  <h2>Introduccion</h2>
  <p>Este es el texto de la introduccion.</p>
  <hr>
  <h2>Contenido principal</h2>
  <p>Aqui empieza el contenido de la seccion principal.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-hr.png"
  alt="Representación de un separador horizontal mediante la etiqueta hr"
  className="code-result"
/>

</TabItem>
</Tabs>
## 7️⃣ Entidades en HTML

En HTML, algunas combinaciones de caracteres tienen un significado especial (por ejemplo, `<` o `&`). Para poder mostrarlas en pantalla sin que el navegador las interprete como código, se utilizan las **entidades HTML**.

Una entidad comienza siempre con `&` y termina con `;`.

Puede representarse con un nombre (`&nbsp;`) o con un código numérico (`&#160;`).

Son muy útiles para:

- Insertar espacios en blanco adicionales.
- Mostrar caracteres reservados como `<`, `>` o `&`.
- Añadir símbolos especiales, acentos, flechas o incluso emojis.

#### Ejemplo

<Tabs>
<TabItem value="codigo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo Entidadesr</title>
</head>
<body>
  <p>Texto con un espacio extra&nbsp;&nbsp;entre palabras.</p>
  <p>Menor que: &lt; / Mayor que: &gt; / Ampersand: &amp;</p>
  <p>Moneda: &euro; / &dollar; / &yen;</p>
  <p>Emoji: &#128512; / &#128640; </p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado" label="Representación">

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resultados/resultado-entidades.png"
  alt="Representación de distintas entidades HTML en el navegador"
  className="code-result"
/>

</TabItem>
</Tabs>
:::tip[Más entidades y emojis]
Puedes consultar un listado de entidades HTML y una muestra de emojis Unicode cuando necesites incorporar caracteres especiales.
:::

## 8️⃣ Resumen

La siguiente imagen resume de forma gráfica la mayoría de las etiquetas estudiadas en esta sección.

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/etiquetas-basicas/resumen-etiquetas-html.png"
  alt="Resumen gráfico de las principales etiquetas HTML estudiadas"
  className="unit-hero"
/>

:::info[Fuente de la imagen]
La imagen está extraída de la página web **Interneting Is Hard**, una página de referencia para comenzar el aprendizaje de HTML y CSS.
:::
