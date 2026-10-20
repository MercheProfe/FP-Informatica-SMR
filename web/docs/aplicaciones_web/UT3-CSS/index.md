---
sidebar_position: 0
title: UT3 · CSS
description: Presentación, objetivos y organización de la unidad de CSS de Aplicaciones Web.
---

# UT3 – CSS: diseño y presentación de páginas web

En la unidad anterior aprendimos a crear páginas con **HTML**: textos, enlaces, imágenes y contenido multimedia. Ahora vamos a utilizar **CSS (Cascading Style Sheets)** para controlar su aspecto visual.

Con CSS podremos elegir colores y tipografías, ajustar espacios, añadir fondos y organizar los elementos de una página. Trabajaremos sobre las páginas que ya conocemos, en lugar de empezar desde cero.

## 1️⃣ ¿Qué aprenderemos?

Al finalizar esta unidad serás capaz de:

- Comprender cómo se escriben las **reglas CSS** y cómo se enlaza una hoja de estilos a un documento HTML.
- Utilizar **selectores, unidades de medida y propiedades personalizadas** para aplicar estilos.
- Reconocer el **modelo de caja** y modificar tamaños, márgenes, rellenos, bordes y sombras.
- Mejorar la presentación con **fuentes, imágenes de fondo y estilos de listas**.
- Seleccionar elementos con mayor precisión y aplicar **efectos y transformaciones sencillos**.
- Distribuir elementos mediante **Flexbox** y crear diseños con **CSS Grid**.
- Diferenciar los principales tipos de **posicionamiento CSS**.

## 2️⃣ Organización de la unidad

Seguiremos el orden de las presentaciones utilizadas en clase. Los apuntes se agrupan en seis apartados:

| Apartado | Contenidos principales | Aplicación práctica |
|---|---|---|
| **3.1 Introducción y fundamentos CSS** | Sintaxis, formas de aplicar estilos, precedencia, selectores básicos, unidades y variables CSS. | Dar los primeros estilos a una página HTML. |
| **3.2 Modelo de caja y apariencia** | `display`, dimensiones, `padding`, `margin`, bordes, sombras, fuentes, fondos, listas y tablas. | Mejorar el aspecto y el espaciado del contenido. |
| **3.3 Selectores y efectos CSS** | Selectores de atributo, pseudoclases y transformaciones básicas. | Personalizar enlaces y añadir efectos sencillos. |
| **3.4 Distribución con CSS** | `float` y Flexbox: contenedores, alineación, dirección y tamaño flexible. | Organizar menús y bloques de contenido. |
| **3.5 Diseño con CSS Grid** | Filas, columnas, `fr`, `gap`, `repeat()`, `minmax()` y áreas. | Construir una distribución en cuadrícula. |
| **3.6 Posicionamiento avanzado** | `position: relative`, `absolute`, `fixed`, `sticky` y `z-index`. | Colocar elementos en posiciones específicas. |


## 3️⃣ Herramientas y archivos

Utilizaremos **Visual Studio Code** para editar el código y un **navegador web** para comprobar los resultados.

Una estructura sencilla de trabajo será:

```text
mi_primera_web/
├── index.html
├── css/
│   └── estilos.css
└── img/
    └── ...
```

En la cabecera del documento HTML enlazaremos la hoja de estilos:

```html
<link rel="stylesheet" href="css/estilos.css">
```

De esta manera, el **HTML contiene la estructura y el contenido**, mientras que el **CSS define su presentación**.

## 4️⃣ ¿Cómo trabajaremos?

Comenzaremos con reglas pequeñas para observar qué cambia en el navegador. Después aplicaremos los conceptos a **dos ejemplos basados en las actividades de `mi_primera_web`**, que ya habíamos desarrollado hasta el contenido multimedia.

- **Ejemplo 1. Mi primera web personal:** colores, tipografías, tamaños, márgenes, bordes, fondos y sombras.
- **Ejemplo 2. Mi web de aficiones:** organización de secciones, menús y otros elementos mediante Flexbox y, cuando corresponda, Grid.

Cada ejemplo evolucionará a medida que avancemos en los apuntes y las presentaciones.

:::tip[Consejo de trabajo]
Después de modificar una regla CSS, guarda los archivos y actualiza la página en el navegador. Cambia una propiedad cada vez para comprender su efecto.
:::

:::info[Conocimientos previos]
Partimos de las etiquetas HTML que ya hemos estudiado. Cuando necesitemos utilizar tablas u otras estructuras nuevas, las introduciremos antes de aplicarles estilos.
:::
