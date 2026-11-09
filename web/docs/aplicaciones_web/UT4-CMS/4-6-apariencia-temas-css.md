---
title: "4.6. Apariencia, temas y CSS"
sidebar_position: 6
---

# 4.6. Apariencia, temas y personalización visual

Un **tema** determina gran parte de la presentación de un sitio WordPress: estilos, plantillas y distribución de sus elementos. Cambiar de tema no equivale a borrar las páginas y entradas, aunque puede modificar su aspecto y navegación.

:::info[Tipos de temas]
La interfaz de personalización depende de si el tema es **de bloques** o **clásico**.
:::

## 1️⃣ Temas instalados y tema activo

Entra en **Apariencia → Temas** para consultar los temas disponibles y distinguir el tema activo de los demás. Sus archivos se encuentran normalmente en `wp-content/themes`.

### 🟩 Comprobar los temas

1. Anota el nombre del tema activo.
2. Abre su información y comprueba su versión.
3. Localiza su carpeta en `wp-content/themes`.
4. No elimines el tema activo ni modifiques directamente los archivos del núcleo.

## 2️⃣ Instalar y activar un tema

1. En **Apariencia → Temas**, selecciona **Añadir nuevo**.
2. Busca un tema adecuado para una web informativa sencilla.
3. Revisa su descripción, compatibilidad y fecha de actualización.
4. Instálalo y actívalo.
5. Abre la web pública y comprueba portada, navegación, páginas e imágenes.

:::warning[Cambio de tema]
Al cambiar de tema, algunas plantillas, menús o ajustes de diseño pueden requerir revisión. Antes de realizar cambios importantes conviene disponer de una copia recuperable, que se aborda en el apartado 4.8.
:::

## 3️⃣ Personalización y plantillas

Un **tema de bloques** puede ofrecer **Apariencia → Editor**, con estilos globales, plantillas y partes de plantilla. Un **tema clásico** puede ofrecer **Apariencia → Personalizar** y menús tradicionales.

| Elemento | Qué controla |
|---|---|
| Estilos globales | Tipografías, colores y otros ajustes visuales |
| Plantilla | Estructura de presentación de un tipo de página |
| Cabecera y pie | Elementos repetidos del sitio |
| Navegación | Enlaces para desplazarse entre secciones |

### 🟧 Prueba de personalización

Cambia un color y un ajuste tipográfico desde las herramientas disponibles en el tema. Comprueba el resultado en una página y una entrada. Anota la ruta utilizada, porque dependerá del tema elegido.

## 4️⃣ Relación entre HTML y CSS

El navegador representa el HTML generado por WordPress y aplica las reglas CSS del tema. Podemos reconocer elementos, clases y estilos mediante las herramientas de desarrollo del navegador.

```css
/* Ejemplo didáctico: no se aplica automáticamente al sitio */
.aviso-destacado {
  background-color: #eef6ff;
  border-left: 4px solid #2463a6;
  padding: 1rem;
}
```

### 🟥 Prueba de inspección

1. Abre la web pública y pulsa **Inspeccionar** sobre un título.
2. Identifica el elemento HTML y algunas reglas CSS aplicadas.
3. Comprueba que modificar una regla temporalmente en las herramientas del navegador no la guarda en WordPress.

Para conservar cambios CSS, utiliza los mecanismos que ofrezca el tema (por ejemplo, estilos adicionales o un tema hijo). **No edites directamente los archivos del tema original** para una personalización que deba sobrevivir a las actualizaciones.

## 5️⃣ Diseño adaptable y accesibilidad

Revisa el sitio en anchuras de escritorio y móvil. Comprueba que la navegación se puede usar, que el texto tiene contraste suficiente y que las imágenes no desbordan el contenido.

### 🟪 Lista de comprobación

- El sitio se puede leer en pantalla estrecha.
- Los enlaces y botones se identifican con claridad.
- El tamaño de letra resulta legible.
- Las imágenes conservan sus proporciones.
- La navegación sigue funcionando después de cambiar de tema.

## 6️⃣ Evidencia del bloque

Entrega o muestra el nombre del tema elegido, una justificación breve, los cambios visuales realizados y una comprobación de la versión móvil. Se relaciona principalmente con **RA1.c**.
