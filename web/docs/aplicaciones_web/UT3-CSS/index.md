---
sidebar_position: 0
title: "Introducción - Elementos de la UT"
description: Introducción y organización de la unidad de hojas de estilo CSS.
---

# UT3 – CSS: diseño y estilo de páginas web

En la unidad anterior aprendimos a crear la **estructura de una página web con HTML**. Ahora vamos a utilizar **CSS (Cascading Style Sheets)** para mejorar su presentación: colores, tipografías, espacios, imágenes de fondo y distribución de los elementos.

Aprenderemos a pasar de una página con el aspecto predeterminado del navegador a una **web organizada, legible y visualmente atractiva**, separando el contenido HTML de sus estilos CSS.

![HTML, CSS y JavaScript: pilares del desarrollo web](https://jamartinezf01.github.io/img/llmm/UT2/diagrama.png)

## 1️⃣ ¿Qué aprenderemos?

Al finalizar esta unidad podrás:

- Escribir reglas CSS y aplicarlas a elementos HTML mediante **selectores**.
- Utilizar **colores, unidades, tipografías y fondos** para personalizar una página.
- Comprender el **modelo de caja** y controlar tamaños, márgenes, rellenos y bordes.
- Dar estilo a **listas y tablas** y reconocer selectores más específicos.
- Incorporar **transformaciones y transiciones** sencillas.
- Organizar elementos con **Flexbox y CSS Grid** y conocer otras técnicas de posicionamiento.
- Mantener el HTML y el CSS en **archivos separados**, trabajando desde VS Code y comprobando los resultados en el navegador.

## 2️⃣ Organización de la unidad

Los contenidos se desarrollarán progresivamente, partiendo de los estilos básicos hasta llegar a la maquetación de páginas completas.

| Apartado | Contenido | ¿Para qué sirve? |
|---|---|---|
| **Introducción** | Qué es CSS y cómo se aplica | Relacionar HTML y CSS. |
| **1. Fundamentos de CSS** | Sintaxis, selectores, propiedades, unidades y colores | Escribir y comprender reglas de estilo. |
| **2. Modelo de caja** | `display`, dimensiones, `padding`, `margin`, bordes y sombras | Controlar el espacio que ocupa cada elemento. |
| **3. Tipografías y fondos** | Fuentes, decoración del texto, iconos e imágenes de fondo | Mejorar la apariencia y legibilidad. |
| **4. Listas y tablas** | Estilos para listas y tablas HTML | Presentar información de forma clara. |
| **5. Selectores avanzados** | Combinadores, atributos, pseudoclases y pseudoelementos | Aplicar estilos con mayor precisión. |
| **6. Transformaciones** | Desplazamientos, escalado, rotación y transiciones | Añadir efectos visuales sencillos. |
| **7. Maquetación CSS** | Concepto de layout y `float` | Comprender cómo se distribuyen los bloques. |
| **8. Flexbox** | Alineación, distribución y tamaño flexible | Crear filas, menús y conjuntos de tarjetas. |
| **9. Grid y posicionamiento** | Rejillas CSS y posiciones `relative`, `absolute`, `fixed` y `sticky` | Construir diseños más completos. |

:::info[Antes de continuar]
Para trabajar los estilos de **tablas** y algunos selectores relacionados con **formularios**, incorporaremos los anexos de HTML necesarios cuando lleguemos a esos contenidos.
:::

## 3️⃣ Herramientas de trabajo

Utilizaremos **Visual Studio Code** para editar los archivos y un **navegador web** para visualizar los cambios.

La organización habitual de nuestros ejercicios será:

```text
mi-web/
├── index.html
├── css/
│   └── estilos.css
└── img/
    └── imagen.jpg
```

En `index.html` enlazaremos la hoja de estilos externa desde la cabecera:

```html
<link rel="stylesheet" href="css/estilos.css">
```

:::tip[Forma de trabajar]
Escribe una regla CSS, guarda los archivos y actualiza la página en el navegador. Cambia un valor cada vez y observa su efecto antes de continuar.
:::

## 4️⃣ ¿Cómo trabajaremos?

Comenzaremos con ejemplos pequeños para comprender cada propiedad. Después combinaremos varias reglas sobre una misma página y utilizaremos **Flexbox y Grid** para construir diseños más organizados.

El objetivo no es memorizar todas las propiedades CSS, sino **entender cómo funcionan, saber localizar las que necesitamos y utilizarlas correctamente** en nuestros proyectos web.
