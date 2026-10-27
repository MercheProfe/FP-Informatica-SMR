---
sidebar_position: 6
---

# Anexo HTML · Etiquetas semánticas y estructura de una página web

Cuando creamos nuestras primeras páginas HTML, utilizamos etiquetas como `<h1>`, `<p>`, `<img>` o `<div>`. Ahora vamos a conocer otras etiquetas que nos ayudan a **organizar el contenido según su función**.

Estas etiquetas son especialmente útiles antes de comenzar a diseñar nuestra web con CSS.

## 1️⃣ ¿Qué significa HTML semántico?

HTML es un lenguaje que describe la **estructura y el significado** del contenido. Una etiqueta semántica indica qué representa una parte de la página.

Por ejemplo:

- `<header>` identifica una cabecera.
- `<nav>` identifica una zona de navegación.
- `<main>` contiene el contenido principal.
- `<section>` agrupa contenido relacionado por un tema.
- `<article>` representa un contenido que puede entenderse de forma independiente.
- `<footer>` identifica un pie de página.

:::tip[Idea clave]

**HTML organiza el contenido; CSS controla su apariencia.** Las etiquetas semánticas no sustituyen a CSS ni garantizan un diseño visual determinado.

:::

## 2️⃣ Las etiquetas principales

### 🟩 `<header>`: cabecera

Suele contener el título de la web, un logotipo o información introductoria.

```html
<header>
  <h1>Mi web CSS</h1>
  <p>Una web para practicar HTML y CSS</p>
</header>
```

Una página puede tener una cabecera general y otras dentro de secciones o artículos.

### 🟧 `<nav>`: navegación

Agrupa los enlaces que permiten desplazarse por las partes principales de la web.

```html
<nav class="menu">
  <a href="index.html">Inicio</a>
  <a href="aficiones.html">Mis aficiones</a>
  <a href="index.html#contacto">Contacto</a>
</nav>
```

La clase `menu` nos permitirá aplicar estilos con CSS mediante el selector `.menu`.

### 🟥 `<main>`: contenido principal

Contiene el contenido central de la página, es decir, aquello que es específico de ese documento.

```html
<main>
  <h2>Bienvenidos a mi página</h2>
  <p>En esta web voy a compartir mis aficiones.</p>
</main>
```

Normalmente, cada página tiene **un único `<main>` visible**, sin incluir en él la cabecera general, el menú principal o el pie de página.

### 🟪 `<section>`: sección temática

Agrupa contenidos relacionados que forman una parte reconocible de la página. Habitualmente tiene un encabezado.

```html
<section id="contacto">
  <h2>Contacto</h2>
  <p>Puedes encontrarme en el instituto.</p>
</section>
```

El atributo `id="contacto"` permite enlazar directamente con esa sección y seleccionarla en CSS usando `#contacto`.

:::info[¿Siempre debemos usar `<section>`?]

No. Si solo necesitamos un contenedor para aplicar estilos, sin un significado temático concreto, suele ser más adecuado `<div>`.

:::

### 🟦 `<article>`: contenido independiente

Representa una unidad de contenido que tiene sentido por sí sola: una noticia, una publicación o una ficha completa.

```html
<article class="tarjeta">
  <h3>Mi afición favorita</h3>
  <p>Me gusta practicar senderismo.</p>
</article>
```

En nuestra web podemos utilizar artículos para representar fichas de aficiones, siempre que cada una tenga contenido propio.

### 🟩 `<footer>`: pie de página

Suele incluir información de autoría, enlaces secundarios o datos complementarios.

```html
<footer>
  <p>Mi web CSS · 2.º SMR</p>
</footer>
```

## 3️⃣ Diferencias entre `<div>`, `<section>` y `<article>`

| Etiqueta | ¿Cuándo utilizarla? | Ejemplo |
|---|---|---|
| `<div>` | Para agrupar elementos sin aportar un significado especial | Contenedor para colocar tarjetas con CSS |
| `<section>` | Para agrupar contenido de un mismo tema | Sección «Mis aficiones» |
| `<article>` | Para un contenido que puede entenderse por separado | Ficha de una afición |

:::tip[Regla práctica]

Pregúntate: **«¿Qué representa este contenido?»**. Si tiene una función clara, utiliza la etiqueta semántica correspondiente. Si solo necesitas agrupar elementos para diseñarlos, utiliza `<div>`.

:::

## 4️⃣ Ejemplo completo: estructura de `mi_web_css`

Este ejemplo utiliza las etiquetas que acabamos de conocer. Guárdalo como una página HTML o compáralo con tu archivo `index.html`.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi web CSS</title>
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
  <header>
    <h1>Mi web CSS</h1>
    <p>Aprendiendo a diseñar páginas web</p>
  </header>

  <nav class="menu">
    <a href="index.html">Inicio</a>
    <a href="aficiones.html">Aficiones</a>
    <a href="#contacto">Contacto</a>
  </nav>

  <main>
    <section>
      <h2>Sobre mí</h2>
      <p>Esta es mi primera página con estilos CSS.</p>
    </section>

    <section>
      <h2>Mis aficiones</h2>
      <div class="tarjetas">
        <article class="tarjeta">
          <h3>Música</h3>
          <p>Me gusta descubrir canciones nuevas.</p>
        </article>
        <article class="tarjeta">
          <h3>Deporte</h3>
          <p>Disfruto haciendo actividades al aire libre.</p>
        </article>
      </div>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
      <p>Gracias por visitar mi página.</p>
    </section>
  </main>

  <footer>
    <p>Mi web CSS · 2.º SMR</p>
  </footer>
</body>
</html>
```

Observa que las clases `menu`, `tarjetas` y `tarjeta` **no son etiquetas HTML**: son nombres que hemos elegido para seleccionar elementos desde CSS.

## 5️⃣ ¿Cómo se relacionan estas etiquetas con CSS?

Podemos seleccionar una etiqueta directamente o utilizar una clase o un identificador.

```css
/* Selector de etiqueta */
main {
  max-width: 900px;
  margin: 0 auto;
}

/* Selector de clase */
.tarjeta {
  padding: 20px;
  border: 1px solid #1565c0;
}

/* Selector de identificador */
#contacto {
  background-color: #e3f2fd;
}
```

- `main` aplica estilos a los elementos `<main>`.
- `.tarjeta` aplica estilos a los elementos con `class="tarjeta"`.
- `#contacto` aplica estilos al elemento con `id="contacto"`.

## 6️⃣ Comprueba lo aprendido

1. ¿Qué diferencia existe entre `<main>` y `<section>`?
2. ¿Por qué es mejor utilizar `<nav>` para el menú principal que un `<div>` sin significado?
3. ¿En qué situación utilizarías `<article>`?
4. ¿Qué etiqueta utilizarías para agrupar varias tarjetas y aplicarles Flexbox: `<section>` o `<div>`? Justifica tu respuesta según la función del contenedor.
5. Localiza en `mi_web_css` las etiquetas `<header>`, `<nav>`, `<main>` y `<footer>`.
6. Identifica una clase y un identificador en el HTML y escribe sus selectores CSS correspondientes.

:::info[Recuerda]

Las etiquetas semánticas facilitan la comprensión del documento, ayudan a las tecnologías de asistencia a identificar sus regiones y hacen que el código sea más fácil de mantener. **No debemos elegirlas por su aspecto visual, sino por su significado.**

:::
