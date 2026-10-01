---
sidebar_position: 3
title: "2.3. Estilos"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.3 Estilos

En esta unidad se verá una breve introducción a la forma de aplicar estilos en HTML, pero el estudio completo de CSS se desarrollará en la siguiente unidad, **UT3 · CSS**.

## 1️⃣ Introducción a estilos en HTML

El lenguaje HTML define la estructura y el contenido de una página web, pero por sí solo no controla el aspecto visual. Para cambiar el diseño, colores, tipografías y disposición de los elementos se utiliza **CSS (*Cascading Style Sheets*)**.

Existen tres formas principales de aplicar estilos:

- **Estilo en línea** → con el atributo `style` en una etiqueta HTML.
- **Estilo interno** → con la etiqueta `<style>` dentro del `<head>`.
- **Estilo externo** → mediante un archivo CSS enlazado con `<link>`.

### 🟩 Estilos en línea

El atributo `style` permite aplicar un estilo directamente a un elemento. No es la mejor práctica para proyectos grandes, pero puede ser útil en ejemplos simples.

<Tabs>
<TabItem value="codigo-linea" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Estilo en linea</title>
</head>
<body>
  <p style="color: red; font-size: 20px;">Este texto es rojo y grande.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-linea" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-estilo-linea.png" alt="Representación de un estilo CSS aplicado en línea" className="code-result" />

</TabItem>
</Tabs>

### 🟧 Estilos internos

La etiqueta `<style>` permite incluir estilos dentro del bloque `<head>`. Se aplican a todo el documento y permiten reutilizar reglas de diseño sin repetirlas en cada etiqueta.

<Tabs>
<TabItem value="codigo-interno" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Estilos internos</title>
  <style>
    p { color: blue; font-size: 18px; }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>Ejemplo de estilos internos</h1>
  <p>Este párrafo se muestra en color azul.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-interno" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-estilo-interno.png" alt="Representación de estilos CSS internos" className="code-result" />

</TabItem>
</Tabs>

### 🟥 Estilos externos

El método más recomendado consiste en enlazar un archivo CSS independiente con la etiqueta `<link>` dentro de `<head>`. Esto mejora la organización y el mantenimiento del proyecto.

<Tabs>
<TabItem value="codigo-externo" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Estilos externos</title>
  <!-- Enlace al archivo CSS -->
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <h1>Ejemplo de estilos externos</h1>
  <p>Este párrafo toma estilos desde un archivo CSS.</p>
</body>
</html>
```

</TabItem>
<TabItem value="css-externo" label="Archivo estilos.css">

:::info[Archivo CSS]
En el contenido proporcionado no se especifica el código del archivo `estilos.css`. Podemos incorporarlo cuando definamos su contenido.
:::

</TabItem>
<TabItem value="resultado-externo" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-estilo-externo.png" alt="Representación de estilos aplicados desde un archivo CSS externo" className="code-result" />

</TabItem>
</Tabs>

## 2️⃣ Propiedades CSS más comunes

| Propiedad | Descripción | Ejemplo |
|---|---|---|
| `color` | Define el color del texto. | `p { color: red; }` |
| `background-color` | Establece el color de fondo de un elemento. | `body { background-color: lightblue; }` |
| `font-size` | Cambia el tamaño de la fuente. | `h1 { font-size: 32px; }` |
| `font-family` | Define la tipografía. | `p { font-family: Arial, sans-serif; }` |
| `text-align` | Alinea el texto (`left`, `right`, `center`, `justify`). | `h1 { text-align: center; }` |
| `font-weight` | Define el grosor del texto (`normal`, `bold`). | `strong { font-weight: bold; }` |
| `margin` | Establece el espacio exterior de un elemento. | `p { margin: 20px; }` |
| `padding` | Establece el espacio interior (relleno) de un elemento. | `div { padding: 10px; }` |
| `border` | Añade un borde alrededor de un elemento. | `p { border: 1px solid black; }` |
| `width` / `height` | Definen el ancho y alto de un elemento. | `img { width: 200px; height: auto; }` |

:::info[Varias propiedades]
Se puede asignar más de una propiedad a la misma etiqueta separándolas mediante `;`.
:::

## 3️⃣ Agrupación de elementos

En HTML existen etiquetas que sirven como contenedores genéricos para agrupar contenido. Estas no tienen un significado semántico por sí mismas, pero permiten estructurar la página y aplicar estilos o scripts a partes concretas del contenido.

Las más utilizadas son:

- `<div>` → agrupa bloques completos de contenido (nivel de bloque).
- `<span>` → agrupa fragmentos de texto u otros elementos en línea (nivel en línea).

### 🟩 `<div>` — contenedor de bloque

La etiqueta `<div>` es un contenedor de nivel bloque que se usa para organizar y estructurar secciones grandes de contenido, como cabeceras, artículos o grupos de párrafos. Por defecto, ocupa todo el ancho disponible y empieza en una nueva línea.

<Tabs>
<TabItem value="codigo-div" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo div</title>
  <style>
    div {
      border: 1px solid #333;
      padding: 10px;
      margin: 5px;
    }
  </style>
</head>
<body>
  <div>
    <h2>Sección principal</h2>
    <p>Este párrafo está dentro de un div.</p>
    <p>Podemos agrupar varios elementos.</p>
  </div>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-div" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-div.png" alt="Representación de contenido agrupado mediante div" className="code-result" />

</TabItem>
</Tabs>

### 🟧 `<span>` — contenedor en línea

La etiqueta `<span>` es un contenedor en línea, ideal para aplicar estilos o identificar pequeñas partes de texto dentro de un párrafo, sin romper el flujo del contenido.

<Tabs>
<TabItem value="codigo-span" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo span</title>
  <style>
    span.resaltado {
      color: red;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <p>El precio actual es <span class="resaltado">30€</span> con descuento.</p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-span" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-span.png" alt="Representación de un fragmento estilizado mediante span" className="code-result" />

</TabItem>
</Tabs>

:::info[`<div>` y `<span>`]
`<div>` se usa para bloques grandes de contenido.

`<span>` se usa para fragmentos pequeños en línea.

Ambos suelen combinarse con atributos `id` y `class` para aplicar estilos con CSS o manipularlos con JavaScript.
:::

## 4️⃣ Identificación de elementos

En HTML, para poder diferenciar o agrupar elementos y luego aplicarles estilos o scripts, se emplean los atributos `id` y `class`.

- `id` → identifica un único elemento en toda la página.
- `class` → agrupa uno o varios elementos que comparten características comunes.

Ambos se usan junto con CSS y JavaScript para personalizar el diseño y la interactividad de los elementos.

### 🟩 `id` — identificador único

El atributo `id` se utiliza para identificar un elemento concreto.

<Tabs>
<TabItem value="codigo-id" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo id</title>
  <style>
    #principal {
      background-color: lightblue;
      padding: 10px;
      border: 1px solid #333;
    }
  </style>
</head>
<body>
  <div id="principal">
    <h2>Sección destacada</h2>
    <p>Este bloque tiene un identificador único llamado "principal".</p>
  </div>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-id" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-id.png" alt="Representación de estilos aplicados mediante id" className="code-result" />

</TabItem>
</Tabs>

:::warning[Identificadores únicos]
Cada `id` debe ser único dentro del documento, lo que significa que no puede repetirse en más de un elemento.
:::

### 🟧 `class` — agrupación de elementos

El atributo `class` permite asignar uno o varios nombres de clase a un elemento. A diferencia de `id`, una misma clase puede repetirse en varios elementos, lo que facilita aplicar un mismo estilo a todos ellos.

<Tabs>
<TabItem value="codigo-class" label="Código" default>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ejemplo class</title>
  <style>
    .resaltado {
      color: red;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <p>Producto 1: <span class="resaltado">30€</span></p>
  <p>Producto 2: <span class="resaltado">50€</span></p>
  <p>Producto 3: <span class="resaltado">20€</span></p>
</body>
</html>
```

</TabItem>
<TabItem value="resultado-class" label="Representación">

<img src="/FP-Informatica-SMR/img/aplicaciones-web/ut2/estilos/resultados/resultado-class.png" alt="Representación de una clase aplicada a varios elementos" className="code-result" />

</TabItem>
</Tabs>
