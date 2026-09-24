---
sidebar_position: 1
title: Introducción a los lenguajes de marcas
---

# Introducción a los lenguajes de marcas

Los **lenguajes de marcas** permiten describir, estructurar y organizar información mediante etiquetas o marcas. Son fundamentales en la Web y también se utilizan para representar e intercambiar información entre diferentes sistemas.

En esta introducción veremos qué son, para qué se utilizan, cuáles son sus principales características y qué tecnologías trabajaremos en el módulo.

## 1️⃣ ¿Qué es un lenguaje de marcas?

Un **lenguaje de marcas** (también conocido como *markup language*) es un lenguaje diseñado para **describir, estructurar o etiquetar información** dentro de un documento.

A diferencia de los lenguajes de programación tradicionales, los lenguajes de marcas **no incluyen estructuras de control** como bucles o condicionales, sino que se enfocan en representar datos de forma jerárquica y comprensible tanto para humanos como para máquinas.

Un lenguaje de marcas utiliza **etiquetas (*tags*)** para identificar las distintas partes del contenido. Por ejemplo:

```xml
<libro>
    <titulo>El nombre del viento</titulo>
    <autor>El camino de los Reyes</autor>
    <coleccion>
        <nombre>El archivo de las tormentas</nombre>
        <numero>1</numero>
    </coleccion>
</libro>
```

Este fragmento describe un libro usando una **estructura jerárquica de etiquetas**.

## 2️⃣ ¿Para qué se usan los lenguajes de marcas?

Los lenguajes de marcas se aplican en diversos contextos tecnológicos. Algunos de sus principales usos son:

- **Desarrollo web**: HTML estructura las páginas, CSS las presenta y JavaScript las hace interactivas. XML puede utilizarse para almacenar o intercambiar información estructurada.
- **Intercambio de información entre sistemas**: XML y JSON son formatos comunes para intercambiar datos mediante APIs.
- **Documentación técnica**: tecnologías como DocBook o LaTeX permiten crear documentación estructurada.
- **Edición y publicación digital**: formatos como EPUB se basan en tecnologías como HTML y XML.
- **Aplicaciones empresariales**: XML se utiliza para intercambiar datos estructurados, por ejemplo en facturas electrónicas, pedidos y otros documentos.

## 3️⃣ Características de los lenguajes de marcas

Los lenguajes de marcas presentan algunas características habituales:

- **Jerárquicos**: organizan la información en forma de árbol.
- **Autodescriptivos**: las etiquetas ayudan a identificar el significado o función del contenido que encapsulan.
- **Legibles**: están pensados para poder ser interpretados tanto por personas como por sistemas.
- **Separación de contenido y presentación**: especialmente útil en el desarrollo web.
- **Extensibles**: algunos lenguajes permiten crear nuevas etiquetas según las necesidades del usuario, como ocurre con XML.

## 4️⃣ Tipos de lenguajes de marcas

Existe una gran variedad de lenguajes y formatos de marcado. Dependiendo de sus características podemos realizar diferentes clasificaciones.

Para introducirlos, utilizaremos una clasificación simplificada en dos grandes grupos.

### 🟩 Lenguajes descriptivos o semánticos

Este tipo de lenguajes están orientados a **describir la estructura de los datos** que contienen.

Los ejemplos más habituales que encontraremos son:

- **XML (*eXtensible Markup Language*)**: lenguaje extensible utilizado para representar e intercambiar datos estructurados entre aplicaciones.
- **JSON (*JavaScript Object Notation*)**: formato ligero de intercambio de datos, fácil de leer tanto para humanos como para máquinas. Se utiliza especialmente en aplicaciones web y APIs.

#### Ejemplos

A continuación se representa la información de un libro utilizando XML y JSON.

**XML**

```xml
<libro>
    <titulo>El camino de los Reyes</titulo>
    <autor>Brandon Sanderson</autor>
    <coleccion>
        <nombre>El archivo de las tormentas</nombre>
        <numero>1</numero>
    </coleccion>
</libro>
```

**JSON**

```json
{
  "libro": {
    "titulo": "El camino de los Reyes",
    "autor": "Brandon Sanderson",
    "coleccion": {
      "nombre": "El archivo de las tormentas",
      "numero": 1
    }
  }
}
```

### 🟧 Lenguajes procedimentales y de presentación

Este tipo de lenguajes están orientados a especificar cómo debe estructurarse o representarse la información.

Los ejemplos que utilizaremos inicialmente son:

- **HTML (*HyperText Markup Language*)**: utilizado para estructurar el contenido de las páginas web.
- **Markdown**: lenguaje de marcado ligero que permite dar formato a texto utilizando una sintaxis sencilla y fácil de recordar.

#### Ejemplos

A continuación se representa un contenido equivalente utilizando HTML y Markdown.

**HTML**

```html
<h1>Hola mundo</h1>

<p>Este es un <strong>texto en negrita</strong> y este en <em>cursiva</em>.</p>

<ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
    <li>Elemento 3</li>
</ul>
```

**Markdown**

```md
# Hola mundo

Este es un **texto en negrita** y este en *cursiva*.

- Elemento 1
- Elemento 2
- Elemento 3
```

:::warning[Importante]
Existen muchos lenguajes de marcas y formatos relacionados. Los que hemos visto son ejemplos de aquellos que encontraremos con mayor frecuencia durante el módulo.
:::

## 5️⃣ ¿Qué vamos a aprender en este módulo?

Los lenguajes de marcas son **fundamentales en el desarrollo de aplicaciones web** y en el **intercambio de información estructurada**.

A lo largo del módulo exploraremos distintas tecnologías. Nos centraremos principalmente en:

- **HTML** y las tecnologías que lo acompañan en el desarrollo de páginas web, principalmente **CSS y JavaScript**.
- **XML** y tecnologías relacionadas con su validación, transformación y consulta, como **DTD, XML Schema, XSLT, XPath y XQuery**, quedan fuera de este módulo.

:::info[En Aplicaciones Web]
En nuestro recorrido actual comenzaremos por **HTML** para aprender a estructurar páginas web. Posteriormente trabajaremos su presentación mediante **CSS** y una introducción a la interactividad con **JavaScript**.
:::

## 6️⃣ ¿Qué herramientas vamos a usar?

Para trabajar los contenidos emplearemos **Visual Studio Code (VS Code)**, uno de los editores de código más utilizados por la comunidad de desarrollo.

También utilizaremos navegadores web actuales, principalmente para:

- visualizar las páginas HTML;
- comprobar los cambios realizados;
- inspeccionar el código interpretado por el navegador;
- utilizar las herramientas de desarrollo;
- localizar errores.

