---
sidebar_position: 2
title: "3.2 Modelo de caja y apariencia"
description: "Modelo de caja CSS, dimensiones, márgenes, relleno, bordes, sombras, tipografías, fondos y estilos de listas y tablas."
---

# 3.2 Modelo de caja y apariencia

En HTML organizamos la información mediante elementos. Con CSS podemos controlar **el espacio que ocupa cada elemento** y su aspecto: tamaño, separación, bordes, sombras, letras y fondos.

En este apartado trabajaremos sobre el proyecto `mi_web_css`, utilizando `index.html`, `aficiones.html` y su hoja compartida `css/estilos.css`.

## 1️⃣ El modelo de caja (Box Model)

El navegador representa los elementos HTML mediante **cajas**. Cada caja tiene cuatro zonas, desde el centro hacia el exterior:

| Zona | Propiedad | ¿Para qué sirve? |
|---|---|---|
| Contenido | `width`, `height` | Espacio ocupado por el texto, la imagen u otro contenido. |
| Relleno | `padding` | Separación entre el contenido y el borde. |
| Borde | `border` | Línea que rodea el contenido y su relleno. |
| Margen | `margin` | Separación exterior respecto a otras cajas. |

```css
.seccion {
  width: 600px;
  padding: 20px;
  border: 2px solid #2563eb;
  margin: 24px;
}
```

:::info[Recuerda]
El `padding` está **dentro** del borde; el `margin` está **fuera**. El color de fondo se extiende normalmente por el contenido y el relleno, pero no por el margen.
:::

### 🟩 Elementos de bloque y elementos en línea

Por defecto, los elementos de bloque, como `h1`, `p`, `section` y `div`, comienzan en una línea nueva. Los elementos en línea, como `a`, `strong` y `span`, forman parte del texto.

La propiedad `display` permite modificar ese comportamiento:

```css
.palabra-clave {
  display: inline;
}

.boton {
  display: inline-block;
}
```

| Valor | Comportamiento |
|---|---|
| `block` | Comienza en una nueva línea y admite ancho y alto. |
| `inline` | Se integra en el texto; `width` y `height` no se aplican de la forma habitual. |
| `inline-block` | Se coloca en línea, pero admite dimensiones y rellenos como una caja. |

## 2️⃣ Tamaños y comportamiento de las cajas

Podemos establecer dimensiones con `width` y `height`, y limitar su tamaño con `min-width`, `max-width`, `min-height` y `max-height`.

```css
.contenido {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}

.imagen-principal {
  max-width: 100%;
  height: auto;
}
```

Con `max-width: 100%`, la imagen no superará el ancho disponible en su contenedor. Con `height: auto`, conserva sus proporciones.

### 🟩 `box-sizing`: cómo se calcula el tamaño

Por defecto, `width` establece el ancho del **contenido** (`content-box`). Si añadimos relleno y bordes, la caja completa será mayor.

Por ejemplo, con `width: 300px`, `padding: 20px` y `border: 5px`, el ancho exterior será **350px**, sin contar márgenes.

```css
/* Recomendación habitual para todo el documento */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Con `border-box`, el ancho declarado incluye contenido, relleno y borde. Esto facilita los cálculos al diseñar páginas.

### 🟧 ¿Qué ocurre si el contenido no cabe?

La propiedad `overflow` controla el contenido que sobresale de una caja con dimensiones limitadas.

| Valor | Efecto |
|---|---|
| `visible` | El contenido puede sobresalir (valor inicial). |
| `hidden` | Oculta lo que sobresale. |
| `scroll` | Muestra barras de desplazamiento según corresponda, aunque no siempre sean necesarias. |
| `auto` | Permite desplazarse cuando hace falta. |

```css
.caja-con-scroll {
  max-height: 120px;
  overflow: auto;
}
```

## 3️⃣ Rellenos y márgenes

### 🟩 `padding`: espacio interior

```css
.seccion {
  padding: 20px;
}
```

Podemos escribir entre uno y cuatro valores:

| Valores | Interpretación |
|---|---|
| `padding: 20px;` | Los cuatro lados. |
| `padding: 10px 20px;` | Arriba/abajo y derecha/izquierda. |
| `padding: 10px 20px 30px;` | Arriba, laterales y abajo. |
| `padding: 10px 20px 30px 40px;` | Arriba, derecha, abajo e izquierda. |

También existen `padding-top`, `padding-right`, `padding-bottom` y `padding-left`.

### 🟧 `margin`: espacio exterior

```css
.seccion {
  margin-bottom: 24px;
}

.contenido {
  max-width: 1000px;
  margin: 0 auto;
}
```

La segunda regla centra horizontalmente un bloque que tiene un ancho menor que el espacio disponible.

`margin` admite la misma notación abreviada de uno a cuatro valores que `padding`.

:::warning[Colapso de márgenes]
En determinadas situaciones, los márgenes verticales de dos bloques consecutivos **no se suman**: se colapsan. Por ejemplo, un margen inferior de `50px` y otro superior de `25px` pueden producir una separación de `50px`, no de `75px`. Este comportamiento no se produce de la misma forma entre elementos de Flexbox o Grid.
:::

## 4️⃣ Bordes y esquinas redondeadas

Un borde se define indicando su grosor, estilo y color:

```css
.seccion {
  border: 2px solid #cbd5e1;
  border-radius: 12px;
}
```

| Propiedad | Ejemplo | Función |
|---|---|---|
| `border-width` | `2px` | Grosor. |
| `border-style` | `solid`, `dashed`, `dotted`, `double` | Tipo de línea. |
| `border-color` | `#2563eb` | Color. |
| `border-radius` | `12px` | Redondeo de las esquinas. |

Podemos modificar lados concretos mediante `border-top`, `border-right`, `border-bottom` y `border-left`.

```css
.destacada {
  border-left: 5px solid #2563eb;
}
```

## 5️⃣ Sombras para textos y cajas

### 🟩 Sombra de texto: `text-shadow`

```css
.cabecera h1 {
  text-shadow: 2px 2px 4px #94a3b8;
}
```

Los valores representan desplazamiento horizontal, desplazamiento vertical, desenfoque y color.

### 🟧 Sombra de caja: `box-shadow`

```css
.tarjeta {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

Se puede añadir un cuarto valor de expansión y la palabra `inset` para dibujar la sombra hacia el interior.

```css
.tarjeta {
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.12);
}
```

### 🟥 Sombras sobre imágenes sin fondo

`box-shadow` dibuja la sombra de la caja rectangular. Para seguir el contorno visible de una imagen transparente podemos utilizar `filter: drop-shadow()`:

```css
.imagen-transparente {
  filter: drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.3));
}
```

## 6️⃣ Fuentes y presentación del texto

La tipografía influye en la legibilidad y en el aspecto de toda la página.

| Propiedad | Función | Ejemplo |
|---|---|---|
| `font-family` | Familia tipográfica y alternativas. | `Arial, sans-serif` |
| `font-size` | Tamaño del texto. | `1.1rem` |
| `font-weight` | Grosor de letra. | `700` |
| `font-style` | Estilo normal o cursiva. | `italic` |
| `line-height` | Separación entre líneas. | `1.6` |
| `text-align` | Alineación del texto. | `center` |
| `text-decoration` | Decoración, como subrayado. | `underline` |
| `text-transform` | Transformación de mayúsculas/minúsculas. | `uppercase` |
| `letter-spacing` | Separación entre letras. | `0.05em` |

```css
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
}

.subtitulo {
  font-style: italic;
  letter-spacing: 0.03em;
}
```

:::tip[Legibilidad]
Para los párrafos, suele funcionar bien un tamaño cercano a `1rem` y un `line-height` entre `1.4` y `1.7`. Evita reducir demasiado el texto o abusar de las sombras.
:::

### 🟩 Fuentes de Google Fonts

Podemos utilizar una fuente alojada en un servicio externo. En el `<head>` de cada página HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;700&display=swap" rel="stylesheet">
```

Después, en `css/estilos.css`:

```css
body {
  font-family: "Onest", Arial, sans-serif;
}
```

Si la fuente no se carga, el navegador utiliza las alternativas indicadas. Esta opción requiere conexión a Internet.

### 🟧 Fuentes guardadas en nuestro proyecto

Si disponemos de un archivo de fuente autorizado para su uso, podemos cargarlo mediante `@font-face`:

```css
@font-face {
  font-family: "MiFuente";
  src: url("../fuentes/mi-fuente.woff2") format("woff2");
  font-display: swap;
}
```

El ejemplo requiere que exista el archivo indicado en la carpeta `fuentes`. No es necesario añadirlo para realizar las prácticas de esta unidad.

### 🟥 Iconos como fuentes

También existen bibliotecas de iconos que se insertan mediante HTML y se personalizan con CSS. Por ejemplo, Material Icons:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

```html
<span class="material-icons" aria-hidden="true">home</span>
```

```css
.material-icons {
  font-size: 28px;
  color: #2563eb;
}
```

Si un icono transmite información importante, debe acompañarse de texto accesible.

## 7️⃣ Imágenes y colores de fondo

La propiedad `background-color` aplica un color de fondo y `background-image` permite utilizar una imagen o un degradado.

```css
.cabecera {
  background-color: #dbeafe;
}

.destacada {
  background-image: linear-gradient(120deg, #dbeafe, #f0f9ff);
}
```

### 🟩 Una imagen de fondo

Utilizaremos la imagen `paisaje.svg`, que ya existe en el proyecto:

```css
.cabecera {
  background-image: url("../img/paisaje.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
```

| Propiedad | Algunos valores | Función |
|---|---|---|
| `background-repeat` | `repeat`, `no-repeat` | Repetición de la imagen. |
| `background-position` | `center`, `top`, `right` | Posición de la imagen. |
| `background-size` | `cover`, `contain`, `100%` | Tamaño de la imagen. |
| `background-attachment` | `scroll`, `fixed` | Desplazamiento del fondo. |

`cover` cubre el área del elemento, aunque pueda recortar parte de la imagen; `contain` permite verla completa, aunque pueda quedar espacio libre.

### 🟧 Varios fondos en un elemento

Podemos superponer fondos separándolos por comas. **El primero se dibuja por encima de los siguientes**.

```css
.cabecera {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),
    url("../img/paisaje.svg");
  background-position: center;
  background-size: cover;
}
```

En este caso, el degradado semitransparente suaviza la imagen y facilita la lectura del texto.

## 8️⃣ Estilos de listas y tablas

### 🟩 Personalizar listas

Ya conocemos las listas HTML `ul`, `ol` y `li`. CSS permite cambiar las viñetas, la numeración y las separaciones.

```css
.lista-objetivos {
  list-style-type: square;
  padding-left: 28px;
}

.lista-recomendaciones {
  list-style-type: decimal;
  padding-left: 28px;
}

.lista-objetivos li {
  margin-bottom: 8px;
}

.lista-objetivos li::marker {
  color: #2563eb;
}
```

| Propiedad | Función |
|---|---|
| `list-style-type` | Tipo de viñeta o numeración. |
| `list-style-position` | Posición de la marca (`inside` o `outside`). |
| `list-style-image` | Imagen como marca. |
| `list-style` | Escritura abreviada de las propiedades anteriores. |
| `::marker` | Estilos admitidos para la marca de cada elemento. |

### 🟧 Dar estilo a una tabla

Las tablas se utilizan para representar **datos organizados en filas y columnas**, no para maquetar una página. Cuando trabajemos con tablas HTML, podremos utilizar propiedades como estas:

```css
.tabla-datos {
  width: 100%;
  border-collapse: collapse;
}

.tabla-datos th,
.tabla-datos td {
  border: 1px solid #cbd5e1;
  padding: 10px;
  text-align: left;
}

.tabla-datos th {
  background-color: #dbeafe;
}
```

| Propiedad | Función |
|---|---|
| `border-collapse` | Une los bordes de celdas contiguas cuando vale `collapse`. |
| `border-spacing` | Separación entre celdas cuando los bordes están separados. |
| `table-layout` | Controla el algoritmo de distribución de las columnas. |
| `caption-side` | Coloca el título de la tabla arriba o abajo. |

:::info[Tablas HTML]
En este apartado nos centramos en los estilos CSS. Para construir tablas completas con `table`, `tr`, `th` y `td`, necesitaremos conocer primero su estructura HTML.
:::

## 9️⃣ Aplicación práctica: mejoramos `mi_web_css`

Vamos a dar un aspecto más cuidado a las dos páginas del proyecto, **sin modificar su estructura HTML**. Abre `css/estilos.css` y añade estas reglas al final. Puedes cambiar colores, tamaños y separaciones para comprobar sus efectos.

```css
/* 3.2 Modelo de caja y apariencia */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.6;
}

.cabecera {
  padding: 32px 20px;
  text-align: center;
  background-color: #dbeafe;
}

.cabecera h1 {
  margin: 0;
  font-size: 2.2rem;
}

.contenido {
  width: 90%;
  max-width: 1000px;
  margin: 32px auto;
}

.seccion {
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.destacada {
  border-left: 5px solid #2563eb;
  background-color: #eff6ff;
}

.imagen-principal {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.boton {
  display: inline-block;
  padding: 10px 18px;
  border-radius: 8px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
}

.tarjeta {
  margin-bottom: 16px;
  padding: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.lista-objetivos,
.lista-recomendaciones {
  padding-left: 28px;
}

.pie-pagina {
  padding: 18px;
  text-align: center;
  background-color: #e2e8f0;
}
```

:::tip[¿Por qué las tarjetas siguen una debajo de otra?]
En esta fase estamos trabajando la **apariencia de las cajas**, no su distribución. Más adelante utilizaremos Flexbox y Grid para colocarlas en filas y columnas.
:::

### 🟩 Comprueba los cambios

Abre `index.html` y `aficiones.html` en el navegador y realiza estas pruebas:

1. Cambia el `padding` de `.seccion` y observa la separación entre texto y borde.
2. Cambia el `margin-bottom` de `.tarjeta` y observa el espacio entre tarjetas.
3. Sustituye temporalmente `box-sizing: border-box` por `content-box` en una caja con ancho fijo y compara su tamaño.
4. Modifica `border-radius` y `box-shadow` para conseguir un aspecto diferente.
5. Prueba un fondo con la imagen local `paisaje.svg` en `.cabecera`.
6. Cambia el tipo de viñeta de `.lista-objetivos` y la numeración de `.lista-recomendaciones`.

## 🔟 Comprueba lo aprendido

1. ¿Qué diferencia hay entre `margin` y `padding`?
2. ¿Qué significa que una caja utilice `box-sizing: border-box`?
3. ¿Para qué sirve `max-width: 100%` en una imagen?
4. ¿Qué diferencia existe entre `box-shadow` y `text-shadow`?
5. ¿Qué propiedad utilizarías para redondear las esquinas de una tarjeta?
6. ¿Qué diferencia hay entre `background-size: cover` y `contain`?
7. ¿Por qué es recomendable indicar varias fuentes en `font-family`?
8. ¿Qué propiedad permite modificar la viñeta de una lista?
