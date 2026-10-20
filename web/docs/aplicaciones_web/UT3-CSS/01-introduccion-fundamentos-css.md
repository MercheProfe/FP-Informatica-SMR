---
sidebar_position: 1
title: "3.1 Introducción y fundamentos CSS"
description: "Sintaxis, aplicación de estilos, selectores básicos, unidades de medida y variables CSS."
---

# 3.1 Introducción y fundamentos CSS

Hasta ahora hemos creado páginas con HTML: títulos, párrafos, enlaces, imágenes y contenido multimedia. **CSS (Cascading Style Sheets)** nos permite decidir cómo se presentan esos elementos: colores, tamaños, separaciones y distribución.

HTML define **qué contenido hay** y CSS define **cómo se muestra**. Una misma página HTML puede tener apariencias muy diferentes cambiando únicamente su hoja de estilos.

## 1️⃣ ¿Qué es CSS y para qué sirve?

CSS es un lenguaje de hojas de estilo que controla la presentación de los documentos HTML. Nos permite, por ejemplo:

- Elegir colores de texto y fondo.
- Cambiar tipos y tamaños de letra.
- Añadir espacios, bordes y efectos visuales.
- Adaptar el diseño a diferentes tamaños de pantalla.
- Mantener una apariencia coherente en varias páginas.

:::info[Una idea importante]
El contenido debe seguir siendo comprensible aunque no se cargue el CSS. Por eso utilizamos HTML para estructurar la información y CSS para darle estilo.
:::

## 2️⃣ Sintaxis de una regla CSS

Una regla CSS tiene un **selector** y un **bloque de declaraciones**. Cada declaración contiene una propiedad y su valor.

```css
/* Este comentario no se muestra en la página */
p {
  color: #1d4ed8;
  font-size: 18px;
  text-align: center;
}
```

| Parte | Ejemplo | Función |
|---|---|---|
| Selector | `p` | Selecciona los párrafos HTML. |
| Propiedad | `color` | Indica qué característica se modifica. |
| Valor | `#1d4ed8` | Establece el color elegido. |
| Declaración | `font-size: 18px;` | Asigna un valor a una propiedad. |

Las declaraciones se escriben entre llaves `{ }`, separadas normalmente por punto y coma `;`. Los comentarios CSS comienzan con `/*` y terminan con `*/`.

### 🟩 Primer ejemplo

**HTML**

```html
<h1>Mi primera web</h1>
<p>Estoy aprendiendo a diseñar con CSS.</p>
```

**CSS**

```css
h1 {
  color: darkblue;
}

p {
  color: #334155;
  font-size: 18px;
}
```

El navegador aplicará el color azul oscuro al título y un tamaño de 18 píxeles a los párrafos.

## 3️⃣ Formas de aplicar CSS a una página

Existen tres formas principales de incorporar estilos.

### 🟧 Estilos en línea

Se escriben dentro de una etiqueta HTML mediante el atributo `style`.

```html
<p style="color: green;">Este texto es verde.</p>
```

Es útil para una prueba puntual, pero resulta difícil de mantener si hay muchos elementos.

### 🟥 Estilos internos

Se escriben dentro de la etiqueta `<style>`, normalmente en el `<head>` del documento.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Estilos internos</title>
  <style>
    h1 {
      color: teal;
    }
  </style>
</head>
<body>
  <h1>Mi primera web</h1>
</body>
</html>
```

Se aplican a esa página HTML.

### 🟪 Estilos externos

Los estilos se guardan en un archivo independiente con extensión `.css`, que se enlaza desde el HTML.

**Archivo `index.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi primera web</title>
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
  <h1>Mi primera web</h1>
  <p>Ahora mi página tiene una hoja de estilos externa.</p>
</body>
</html>
```

**Archivo `css/estilos.css`**

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f1f5f9;
}

h1 {
  color: #0f766e;
}
```

**Estructura de carpetas:**

```text
mi_primera_web/
├── index.html
├── css/
│   └── estilos.css
└── img/
    └── ...
```

:::tip[La opción que utilizaremos]
Trabajaremos principalmente con **hojas de estilo externas**. Así podremos modificar el diseño sin mezclar las reglas CSS con el contenido HTML y reutilizar un mismo archivo en varias páginas.
:::

Un documento HTML también puede enlazar varias hojas CSS:

```html
<link rel="stylesheet" href="css/estilos.css">
<link rel="stylesheet" href="css/componentes.css">
```

## 4️⃣ La cascada y la prioridad de los estilos

La palabra *cascada* indica que pueden existir varias reglas aplicables al mismo elemento. El navegador decide cuál utilizar teniendo en cuenta, entre otros factores, el origen de los estilos, su importancia, la **especificidad** del selector y el orden de aparición.

Observa este ejemplo:

```html
<p class="destacado">Un párrafo importante.</p>
```

```css
p {
  color: blue;
}

.destacado {
  color: red;
}
```

El texto aparecerá **rojo**, porque el selector de clase `.destacado` es más específico que el selector de etiqueta `p`.

Si dos reglas tienen la misma prioridad y especificidad, normalmente prevalece la que aparece después:

```css
p { color: blue; }
p { color: green; } /* Se aplica esta declaración */
```

Los estilos en línea suelen tener prioridad frente a reglas normales de autor, pero **no existe una jerarquía universal tan simple como «externo < interno < en línea»**: también intervienen la especificidad, `!important` y otros criterios de la cascada.

:::warning[Evita conflictos innecesarios]
No recurras a `!important` para solucionar cualquier problema. Es preferible escribir selectores claros y mantener ordenada la hoja de estilos.
:::

## 5️⃣ Selectores básicos

Los selectores indican **qué elementos HTML** recibirán las declaraciones CSS.

### 🟦 Selector de etiqueta

Afecta a todos los elementos de un tipo:

```css
h2 {
  color: #7c3aed;
}
```

### 🟩 Selector de clase

Selecciona los elementos cuyo atributo `class` contiene esa clase. Se escribe con un punto (`.`).

```html
<p class="aviso">Recuerda guardar tu trabajo.</p>
<p>Este párrafo no es un aviso.</p>
```

```css
.aviso {
  background-color: #fef3c7;
  color: #92400e;
}
```

Una clase puede utilizarse en varios elementos. Un elemento también puede tener varias clases, separadas por espacios: `class="aviso importante"`.

### 🟧 Selector de identificador

Selecciona un elemento mediante su atributo `id`. Se escribe con una almohadilla (`#`).

```html
<h2 id="contacto">Contacto</h2>
```

```css
#contacto {
  color: #0f766e;
}
```

Un `id` debe ser único dentro de la página. Para aplicar un mismo estilo a varios elementos, normalmente es preferible utilizar clases.

### 🟥 Selectores múltiples y combinados

Podemos **agrupar** selectores separándolos con comas:

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
}
```

También podemos seleccionar elementos que están **dentro de otros**:

```html
<div class="contenedor">
  <p>Este párrafo está dentro del contenedor.</p>
</div>
<p>Este párrafo está fuera.</p>
```

```css
.contenedor p {
  color: green;
}
```

La regla anterior afecta únicamente a los párrafos descendientes de `.contenedor`.

Y podemos exigir que un elemento cumpla dos condiciones a la vez:

```css
p.destacado {
  font-weight: bold;
}
```

Esta última regla selecciona solo los elementos `<p>` que tengan la clase `destacado`.

## 6️⃣ Propiedades CSS habituales

Estas son algunas propiedades que utilizaremos con frecuencia:

| Propiedad | ¿Qué modifica? | Ejemplo |
|---|---|---|
| `color` | Color del texto | `color: navy;` |
| `background-color` | Color de fondo | `background-color: #e0f2fe;` |
| `font-family` | Familia tipográfica | `font-family: Arial, sans-serif;` |
| `font-size` | Tamaño de letra | `font-size: 1.2rem;` |
| `font-weight` | Grosor de letra | `font-weight: bold;` |
| `text-align` | Alineación del texto | `text-align: center;` |
| `width` | Anchura | `width: 80%;` |
| `height` | Altura | `height: 200px;` |
| `margin` | Espacio exterior | `margin: 20px;` |
| `padding` | Espacio interior | `padding: 16px;` |
| `border` | Borde del elemento | `border: 1px solid gray;` |

Estudiaremos las propiedades de dimensiones, márgenes, rellenos y bordes con más detalle al trabajar el **modelo de caja**.

## 7️⃣ Unidades de medida en CSS

En CSS podemos expresar tamaños mediante unidades **absolutas** y **relativas**.

### 🟪 Unidades absolutas

Las unidades absolutas tienen una equivalencia definida en CSS. La más utilizada en pantalla es `px` (píxel CSS).

```css
h1 {
  font-size: 32px;
}
```

Un píxel CSS no tiene por qué corresponder a un píxel físico de la pantalla.

Otras unidades, como `cm`, `mm` o `pt`, se emplean especialmente en contextos de impresión.

### 🟦 Unidades relativas

Su valor depende de otra referencia, como el tamaño de letra o las dimensiones de un contenedor.

| Unidad | Referencia habitual | Ejemplo |
|---|---|---|
| `%` | Otra medida definida por la propiedad, frecuentemente el contenedor | `width: 80%;` |
| `em` | Tamaño de fuente del propio elemento (con matices según la propiedad) | `padding: 1em;` |
| `rem` | Tamaño de fuente del elemento raíz (`html`) | `font-size: 1.25rem;` |
| `vw` | 1 % del ancho del viewport | `width: 50vw;` |
| `vh` | 1 % de la altura del viewport | `height: 50vh;` |
| `vmin` | 1 % de la dimensión menor del viewport | `width: 40vmin;` |
| `vmax` | 1 % de la dimensión mayor del viewport | `width: 40vmax;` |

Por ejemplo, si el tamaño de fuente raíz es de `16px`, entonces `2rem` equivale a `32px`.

```css
html {
  font-size: 16px;
}

h1 {
  font-size: 2rem;
}

.contenedor {
  width: 80%;
  max-width: 900px;
}
```

:::tip[¿Qué unidad elegir?]
Como punto de partida, utiliza `rem` para tamaños de letra, `%` para anchuras adaptables y `px` cuando necesites medidas concretas, como el grosor de un borde. No hay una única unidad correcta para todos los casos.
:::

## 8️⃣ Propiedades personalizadas: variables CSS

Cuando repetimos un mismo color o tamaño, podemos guardarlo en una **propiedad personalizada** (*custom property*), conocida habitualmente como variable CSS.

Su nombre comienza por dos guiones (`--`) y se utiliza mediante la función `var()`.

```css
:root {
  --color-principal: #2563eb;
  --color-fondo: #eff6ff;
  --espaciado: 16px;
}

h1 {
  color: var(--color-principal);
}

.aviso {
  background-color: var(--color-fondo);
  padding: var(--espaciado);
}
```

La pseudoclase `:root` selecciona el elemento raíz del documento (en HTML, `<html>`). Al declarar ahí las variables, normalmente estarán disponibles para todos sus descendientes.

Podemos proporcionar un valor alternativo si la variable no está definida:

```css
.boton {
  background-color: var(--color-boton, #16a34a);
}
```

En este caso se utilizará `#16a34a` si `--color-boton` no tiene un valor válido disponible.

:::info[Ventaja de las variables]
Si cambiamos `--color-principal` en un solo lugar, se actualizarán todos los elementos que utilicen esa variable.
:::

## 9️⃣ Aplicamos CSS a `mi_primera_web`

Vamos a incorporar una hoja de estilos a la página HTML que ya hemos creado. No es necesario rehacer el contenido: seguiremos trabajando con sus títulos, párrafos, enlaces, imágenes y elementos multimedia.

### 🟩 Paso 1. Crear la hoja de estilos

Dentro de la carpeta de tu web, crea la subcarpeta `css` y el archivo `estilos.css`.

### 🟧 Paso 2. Enlazar el CSS

Añade dentro del `<head>` de tu página:

```html
<link rel="stylesheet" href="css/estilos.css">
```

Comprueba que la ruta coincide con la ubicación real del archivo.

### 🟥 Paso 3. Escribir las primeras reglas

Copia estas reglas en `css/estilos.css`:

```css
:root {
  --color-principal: #0f766e;
  --color-texto: #1e293b;
}

body {
  font-family: Arial, sans-serif;
  color: var(--color-texto);
  background-color: #f8fafc;
  font-size: 16px;
}

h1, h2 {
  color: var(--color-principal);
}

p {
  line-height: 1.6;
}

a {
  color: #1d4ed8;
}

img {
  max-width: 100%;
  height: auto;
}
```

### 🟪 Paso 4. Comprobar y experimentar

Abre la página en el navegador y realiza estas pruebas:

1. Cambia el valor de `--color-principal` y observa qué elementos se modifican.
2. Prueba otra fuente en `font-family`.
3. Cambia `font-size` de `16px` a `18px` y compara el resultado.
4. Crea una clase `.destacado` y aplícala a un párrafo de tu web.
5. Añade una regla para centrar únicamente el título principal.
6. Comprueba que las imágenes no se salen del ancho de la ventana al reducir el navegador.

:::tip[Antes de continuar]
Si no ves los cambios, guarda ambos archivos, comprueba el enlace a `estilos.css` y actualiza la página en el navegador.
:::

## 🔟 Comprueba lo aprendido

1. Explica qué diferencia existe entre HTML y CSS.
2. Identifica el selector, las propiedades y los valores de esta regla:

   ```css
   .tarjeta {
     background-color: lightblue;
     padding: 20px;
   }
   ```

3. ¿Qué ventaja tiene utilizar un archivo CSS externo?
4. ¿Qué elementos selecciona `.contenedor p`? ¿Y `p.contenedor`?
5. ¿En qué se diferencian `px`, `%` y `rem`?
6. ¿Para qué sirven `:root` y `var()`?
7. Si dos reglas `p` establecen colores diferentes y tienen la misma prioridad, ¿cuál se aplicará normalmente?

:::info[En el siguiente apartado]
Aprenderemos cómo funciona el **modelo de caja**: contenido, dimensiones, relleno (`padding`), bordes (`border`) y márgenes (`margin`).
:::
