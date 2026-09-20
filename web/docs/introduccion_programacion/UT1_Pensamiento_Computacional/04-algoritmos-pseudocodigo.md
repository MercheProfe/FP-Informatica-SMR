---
sidebar_position: 4
title: Diseño de algoritmos y pseudocódigo
---

## 6️⃣ Diseñar algoritmos

Ya conocemos:

**Problema → Entrada → Proceso → Salida**

Ahora debemos describir los pasos necesarios para resolver el problema.

### 🟩 ¿Cómo debe ser un buen algoritmo?

  -----------------------------------------------------------------------
  Característica                      Significado
  ----------------------------------- -----------------------------------
  **Ordenado**                        Las instrucciones deben ejecutarse
                                      en un orden lógico.

  **Preciso**                         Debe quedar claro qué significa
                                      cada paso.

  **Finito**                          Tiene que terminar.

  **Comprensible**                    Otra persona debería ser capaz de
                                      ejecutarlo.
  -----------------------------------------------------------------------

### 🟧 Ejemplo

**Problema:** calcular cuánto espacio libre queda en un disco.

Datos:

-   capacidad total: **500 GB**;
-   espacio utilizado: **320 GB**.

Algoritmo:

1.  Obtener la capacidad total.
2.  Obtener el espacio utilizado.
3.  Restar el espacio utilizado a la capacidad.
4.  Mostrar el espacio libre.

**Resultado:**

`500 - 320 = 180 GB`

### 🟥 Actividad 4.1 · Ordena el algoritmo

Estas instrucciones están desordenadas:

-   Mostrar precio final.
-   Leer precio del producto.
-   Calcular precio × unidades.
-   Leer número de unidades.

Ordénalas correctamente.

### 🟪 Actividad 4.2 · Falta una instrucción

Tenemos este algoritmo:

1.  Leer capacidad del disco.
2.  Leer espacio utilizado.
3.  Mostrar espacio libre.

**¿Qué instrucción falta?**

### 🟦 Actividad 4.3 · Detecta el error

Queremos calcular la media de tres velocidades de descarga.

1.  Leer `velocidad1`.
2.  Leer `velocidad2`.
3.  Leer `velocidad3`.
4.  Sumar `velocidad1 + velocidad2`.
5.  Dividir entre 3.
6.  Mostrar resultado.

**¿Dónde está el error?**

### 🟩 ️ Actividad 4.4 · Crea tu propio algoritmo

Crea un algoritmo para calcular:

**El coste de instalar memoria RAM en varios equipos.**

Datos:

-   precio de un módulo;
-   número de módulos;
-   coste de instalación.

Debes indicar:

1.  Entrada.
2.  Proceso.
3.  Salida.
4.  Algoritmo completo.

## 7️⃣ Primer contacto con el pseudocódigo

Hasta ahora hemos utilizado **lenguaje natural** para describir nuestros
algoritmos.

Podemos escribirlos utilizando una notación algo más cercana a la
programación.

Esto se denomina **pseudocódigo**.

El pseudocódigo:

-   no pertenece a ningún lenguaje de programación;
-   no tiene una sintaxis completamente rígida;
-   permite concentrarnos en la solución;
-   facilita posteriormente escribir el programa.

### 🟩 Del lenguaje natural al pseudocódigo

**Problema:** calcular el precio de varios discos SSD.

En lenguaje natural:

1.  Pedir el precio del SSD.
2.  Pedir cuántos SSD se necesitan.
3.  Multiplicar precio por cantidad.
4.  Mostrar resultado.

En pseudocódigo:

```text
INICIO
    LEER precio
    LEER cantidad

    total ← precio * cantidad

    ESCRIBIR total
FIN
```

### 🟧 Elementos básicos

#### `LEER`

Representa la **entrada de información**.

```text
LEER precio
```

#### `ESCRIBIR`

Representa una **salida de información**.

```text
ESCRIBIR total
```

#### Asignación

Utilizaremos el símbolo `←`:

```text
resultado ← operación
```

Por ejemplo:

```text
total ← precio * cantidad
```

Significa:

> Calcula `precio × cantidad` y guarda el resultado en `total`.
>
Más adelante veremos que en Java escribiríamos algo similar a:

```java
total = precio * cantidad;
```

:::warning[Importante]
El pseudocódigo no es Java. Su objetivo es ayudarnos a **pensar la
solución antes de preocuparnos por la sintaxis** del lenguaje.
:::
### 🟥 Actividad 5.1 · De lenguaje natural a pseudocódigo

Convierte a pseudocódigo:

**Calcular cuánto espacio ocupa una copia de seguridad formada por
documentos, fotografías y vídeos.**

Una posible solución:

```text
INICIO
    LEER documentos
    LEER fotografias
    LEER videos

    total ← documentos + fotografias + videos

    ESCRIBIR total
FIN
```

### 🟪 ️ Actividad 5.2 · Presupuesto TechFix

TechFix cobra:

-   piezas utilizadas;
-   horas trabajadas;
-   precio de cada hora.

Crea el algoritmo en pseudocódigo.

### 🟦 Actividad 5.3 · Cambio de requisitos

Ahora TechFix añade un **coste fijo de diagnóstico de 20 €**.

Modifica el algoritmo anterior.

:::info[Idea importante]
Los programas cambian cuando cambian los requisitos.
:::
