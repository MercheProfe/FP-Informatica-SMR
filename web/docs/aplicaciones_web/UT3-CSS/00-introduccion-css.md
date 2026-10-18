---
sidebar_position: 1
title: "3.1. Introducción a CSS"
---

# UT3 – CSS: hojas de estilo en cascada

**CSS (Cascading Style Sheets)** es un lenguaje que permite definir la **presentación y el estilo** de los documentos HTML. Con CSS podemos controlar los **colores, las tipografías, los tamaños, los márgenes, la disposición de los elementos y las animaciones**, entre otros aspectos de una página web.

![Logotipo de CSS](https://jamartinezf01.github.io/img/llmm/UT2/logo_css.png)

CSS es uno de los **tres pilares del desarrollo web**:

- **HTML** define la **estructura** del contenido.
- **CSS** define la **apariencia visual**.
- **JavaScript** permite incorporar **comportamiento dinámico e interactividad**.

![HTML, CSS y JavaScript: pilares del desarrollo web](https://jamartinezf01.github.io/img/llmm/UT2/diagrama.png)

## 1️⃣ ¿Por qué usar CSS?

CSS ofrece varias ventajas:

- **Separa el contenido de la presentación:** HTML organiza la información y CSS define su aspecto.
- **Permite reutilizar estilos:** una misma hoja CSS puede aplicarse a varias páginas.
- **Facilita el mantenimiento:** podemos cambiar el diseño sin modificar cada elemento HTML.
- **Puede mejorar la accesibilidad y la experiencia de usuario:** por ejemplo, mediante textos legibles, buen contraste y una distribución adaptable.

## 2️⃣ ¿Cómo se aplica CSS?

Existen **tres formas principales** de aplicar CSS a una página web. Ya las hemos visto al estudiar HTML; ahora las recordamos con ejemplos.

### 🟩 CSS en línea (inline)

Se escribe directamente en el atributo `style` de una etiqueta HTML.

```html
<p style="color: red; font-size: 20px;">
  Este texto es rojo y tiene tamaño 20px.
</p>
```

:::warning[Uso poco recomendado]
Es útil para pruebas rápidas o estilos muy puntuales, pero dificulta reutilizar y mantener los estilos.
:::

### 🟧 CSS interno (dentro del HTML)

Se coloca dentro de una etiqueta `<style>`, normalmente en el `<head>` del documento HTML.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo CSS interno</title>
  <style>
    p {
      color: blue;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <p>Este texto es azul y tiene tamaño 18px.</p>
</body>
</html>
```

:::info[¿Cuándo utilizarlo?]
Puede ser útil para páginas pequeñas, prototipos o pruebas. Los estilos solo afectan al documento en el que están escritos.
:::

### 🟥 CSS externo (archivo separado)

Se crea un archivo con extensión `.css` y se enlaza desde HTML mediante la etiqueta `<link>`.

**Archivo `index.html`:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejemplo CSS externo</title>
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
  <p>Este texto está estilizado desde un archivo externo.</p>
</body>
</html>
```

**Archivo `css/estilos.css`:**

```css
p {
  color: green;
  font-size: 18px;
}
```

La estructura de archivos sería:

```text
mi-web/
├── index.html
└── css/
    └── estilos.css
```

:::tip[Forma recomendada]
El **CSS externo** es la opción habitual para desarrollar sitios web: permite organizar los estilos, reutilizarlos en distintas páginas y facilitar su mantenimiento.
:::

### 🟪 Orden de aplicación de los estilos

Cuando varias reglas intentan modificar la misma propiedad de un elemento, el navegador utiliza la **cascada CSS** para decidir cuál aplicar.

En los casos habituales, intervienen el **origen y la importancia de las reglas**, la **especificidad del selector** y, cuando corresponde, el **orden de aparición**.

- El navegador aporta estilos predeterminados (*user agent*).
- El usuario puede configurar estilos propios.
- El autor de la página define reglas en archivos externos, bloques `<style>` o atributos `style`.
- Los estilos **en línea** suelen imponerse a las reglas normales de las hojas de estilo del autor por su mayor especificidad.

:::info[Importante]
El CSS **externo** y el **interno** no tienen distinta prioridad solo por su ubicación. Si dos reglas normales del mismo origen tienen la misma especificidad, se aplica la que aparezca **más tarde**. Existen excepciones, como las declaraciones `!important`, que estudiaremos cuando corresponda.
:::

## 3️⃣ Primer selector básico

Los **selectores CSS** indican a qué elementos HTML se aplica una regla de estilo.

Por ejemplo, para modificar **todos los párrafos** `<p>` de una página:

```css
p {
  color: purple;
  font-weight: bold;
}
```

- `p` es el **selector**: identifica los párrafos.
- `color: purple;` establece el **color del texto** en morado.
- `font-weight: bold;` muestra el texto **en negrita**.

:::tip[Compruébalo en el navegador]
Crea una página HTML con dos párrafos, enlaza una hoja CSS y aplica la regla anterior. Después, cambia `purple` por `blue` y observa el resultado.
:::
