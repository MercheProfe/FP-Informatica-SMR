---
sidebar_position: 2
title: 3.2 Fundamentos de CSS
---

# 3.2 Fundamentos de CSS

En este apartado aprenderemos a **escribir reglas CSS**, seleccionar los elementos HTML que queremos modificar y utilizar las propiedades, unidades y colores más habituales.

## 1️⃣ Sintaxis básica de CSS

Una hoja de estilos contiene **reglas CSS**. Cada regla indica **a qué elementos** se aplica un estilo y **qué propiedades** se modifican.

```css
selector {
  propiedad: valor;
  otra-propiedad: otro-valor;
}
```

- **Selector:** identifica los elementos HTML a los que se aplicará el estilo.
- **Propiedad:** indica qué característica queremos cambiar, como `color` o `font-size`.
- **Valor:** establece cómo será esa característica.
- **Declaración:** conjunto formado por una propiedad y su valor, separados por `:` y terminados normalmente en `;`.

```css
h1 {
  color: #143b63;
  text-align: center;
}
```

Esta regla centra los títulos `<h1>` y cambia su color.

:::tip[Comentarios en CSS]
Podemos escribir anotaciones que el navegador ignorará utilizando `/* ... */`.
:::

```css
/* Estilos generales de la página */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  color: #333;
}

h1 {
  color: #143b63ff;
  text-align: center;
}

h2 {
  color: #6597c9ff;
}

ol, ul {
  margin-left: 20px;
}
```

### 🟩 Selectores básicos

Los selectores permiten decidir **qué elementos** recibirán los estilos.

| Tipo | Sintaxis | ¿Qué selecciona? |
|---|---|---|
| Etiqueta | `div` | Todos los elementos `<div>`. |
| Identificador | `#cabecera` | El elemento con `id="cabecera"`. |
| Clase | `.destacado` | Todos los elementos con la clase `destacado`. |

```html
<h1 id="cabecera">Mi página web</h1>
<p class="destacado">Primer párrafo destacado.</p>
<p>Segundo párrafo normal.</p>
<div>Una caja.</div>
```

```css
div {
  background-color: red;
}

#cabecera {
  color: navy;
}

.destacado {
  font-weight: bold;
}
```

:::info[Clases e identificadores]
El atributo `id` identifica un elemento de forma única dentro del documento. Una misma clase puede reutilizarse en muchos elementos.

`class="mi clase"` **sí es válido**: asigna dos clases distintas, `mi` y `clase`. Para utilizar una única clase, podemos escribir `class="mi-clase"`.
:::

### 🟧 Agrupación y descendencia

Si varios elementos comparten el mismo estilo, podemos **agrupar selectores** mediante comas:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: Arial, sans-serif;
}
```

También podemos seleccionar elementos que se encuentran **dentro de otros**:

```css
.contenedor p {
  font-size: 16px;
  color: green;
}
```

La regla anterior se aplica a los párrafos `<p>` que estén dentro de cualquier elemento con clase `contenedor`, incluso si hay otros elementos intermedios.

```html
<div class="contenedor">
  <p>Este párrafo aparecerá en verde.</p>
</div>
<p>Este párrafo no recibe ese estilo.</p>
```

## 2️⃣ Propiedades CSS

Las **propiedades** son las características visuales que podemos modificar. Algunas de las más utilizadas son:

| Propiedad | ¿Qué modifica? | Ejemplo |
|---|---|---|
| `color` | Color del texto | `color: blue;` |
| `background-color` | Color de fondo | `background-color: #f0f0f0;` |
| `font-size` | Tamaño del texto | `font-size: 18px;` |
| `font-family` | Familia tipográfica | `font-family: Arial, sans-serif;` |
| `text-align` | Alineación del texto | `text-align: center;` |
| `font-weight` | Grosor de la letra | `font-weight: bold;` |
| `margin` | Espacio exterior | `margin: 20px;` |
| `padding` | Espacio interior | `padding: 12px;` |
| `border` | Borde del elemento | `border: 1px solid black;` |
| `width` | Anchura | `width: 300px;` |
| `height` | Altura | `height: 150px;` |

No es necesario memorizar todas las propiedades: aprenderemos a reconocerlas, utilizarlas y consultar su documentación cuando las necesitemos.

### 🟩 Variables o propiedades personalizadas

CSS permite guardar valores reutilizables en **propiedades personalizadas**, cuyos nombres empiezan por `--`. Se consultan mediante `var()`.

```css
:root {
  --color-principal: hsl(200 90% 45%);
  --radio: 12px;
}

.boton {
  background: var(--color-principal);
  border-radius: var(--radio);
}
```

- `:root` representa el elemento raíz del documento HTML y permite definir valores disponibles para toda la página.
- `--color-principal` y `--radio` son nombres que elegimos nosotros.
- `var(--color-principal)` recupera el valor almacenado.

Podemos indicar un valor alternativo por si la propiedad personalizada no está definida:

```css
.boton {
  color: var(--color-texto, white);
}
```

En este caso se utilizará `white` si `--color-texto` no tiene un valor válido.

## 3️⃣ Unidades de medida en CSS

Muchas propiedades necesitan expresar tamaños, distancias o proporciones. CSS dispone de **unidades absolutas** y **relativas**.

| Unidad | Tipo | Significado | Ejemplo |
|---|---|---|---|
| `px` | Absoluta en CSS | Píxel CSS | `font-size: 16px;` |
| `%` | Relativa | Porcentaje respecto a una referencia que depende de la propiedad | `width: 80%;` |
| `em` | Relativa | Basada en el tamaño de fuente del elemento (o del padre en ciertos usos) | `padding: 1em;` |
| `rem` | Relativa | Basada en el tamaño de fuente del elemento raíz | `font-size: 1.25rem;` |
| `vw` | Relativa | 1 % de la anchura de la ventana de visualización | `width: 50vw;` |
| `vh` | Relativa | 1 % de la altura de la ventana de visualización | `min-height: 100vh;` |

:::info[¿Un píxel CSS es un píxel de la pantalla?]
No necesariamente. `px` es una unidad de referencia de CSS y no siempre coincide con un píxel físico del dispositivo.
:::

### 🟩 ¿Qué unidad conviene utilizar?

- **`rem`**: muy útil para tamaños de texto y espacios coherentes en toda la web.
- **`em`**: apropiada para espacios que deben escalar con el texto de un componente.
- **`%`**: útil para anchuras que dependen de su contenedor.
- **`vw` y `vh`**: útiles cuando el diseño depende del tamaño de la ventana.
- **`px`**: práctico para bordes y medidas concretas.

:::warning[Las unidades relativas dependen del contexto]
`width: 50%` no significa lo mismo que `width: 50vw`: la primera suele calcularse respecto al contenedor y la segunda respecto a la anchura de la ventana. Además, el significado de `%` depende de la propiedad CSS.
:::

**Ejemplo HTML de tamaños y unidades:**

```html
<section class="hero">
  <h1>Descubre nuestro sitio web</h1>
  <p>Un ejemplo de diseño adaptable.</p>
  <img src="img/paisaje.jpg" alt="Paisaje de ejemplo">
  <a class="boton" href="#contenido">Ver contenido</a>
</section>
```

El ejemplo permite identificar elementos a los que podríamos aplicar `rem`, `%` y unidades de ventana. **La hoja CSS de este ejemplo no estaba incluida en el material original**; se completará cuando preparemos su representación práctica.

## 4️⃣ Colores en CSS

Los colores pueden expresarse de distintas formas. Las más frecuentes son los **nombres**, los valores **hexadecimales**, `rgb()` y `hsl()`.

| Formato | Ejemplo | Explicación |
|---|---|---|
| Nombre | `red` | Color identificado por su nombre. |
| Hexadecimal corto | `#f00` | Equivale a `#ff0000`. |
| Hexadecimal | `#ff0000` | Canales rojo, verde y azul en hexadecimal. |
| Hexadecimal con alfa | `#ff000080` | Incluye transparencia. |
| RGB | `rgb(255, 0, 0)` | Intensidades de rojo, verde y azul. |
| RGB con alfa | `rgb(255 0 0 / 50%)` | Color RGB con opacidad del 50 %. |
| HSL | `hsl(0 100% 50%)` | Tono, saturación y luminosidad. |
| HSL con alfa | `hsl(0 100% 50% / 0.5)` | Color HSL semitransparente. |

### 🟩 Transparencia y valores especiales

El **canal alfa** controla la opacidad: `0` significa completamente transparente y `1`, completamente opaco.

Además, podemos utilizar estos valores:

- **`transparent`**: color transparente.
- **`currentColor`**: utiliza el valor actual de la propiedad `color`.
- **`inherit`**: hereda el valor calculado de la propiedad correspondiente del elemento padre.

```css
.icono {
  color: #0ea5e9;
  border: 2px solid currentColor;
  background-color: transparent;
}
```

En este ejemplo, el borde tendrá el mismo color que el texto gracias a `currentColor`.

### 🟧 Ejemplo de aplicación de colores

```html
<div class="tarjeta">
  <h2>Mi primera tarjeta</h2>
  <p>Podemos combinar colores de texto, fondo y bordes.</p>
</div>
```

```css
.tarjeta {
  background-color: #e0f2fe;
  border: 2px solid #0284c7;
  padding: 1rem;
}

.tarjeta h2 {
  color: rgb(3, 105, 161);
}

.tarjeta p {
  color: hsl(215 25% 27%);
}
```

:::tip[Legibilidad]
Al elegir colores, comprueba que exista suficiente contraste entre el texto y su fondo. Un diseño atractivo también debe ser fácil de leer.
:::

:::info[Material complementario pendiente]
En la documentación original se menciona un ejemplo con `colores.css`, pero no se facilita su contenido. El ejemplo anterior es una demostración autónoma para practicar las distintas formas de expresar colores; no sustituye a ese archivo original.
:::
