---
sidebar_position: 6
title: Retos y consolidación
---

## 🔟 Reto guiado · El primer problema de TechFix

Ahora combinaremos todo lo aprendido.

### 🟩 Situación

Un cliente lleva su ordenador a TechFix.

La reparación requiere:

-   una pieza;
-   varias horas de trabajo;
-   un coste fijo de diagnóstico.

Queremos calcular el **precio final**.

### 🟧 Paso 1 · Identificar el problema

**Calcular cuánto debe pagar el cliente.**

### 🟥 Paso 2 · Identificar las entradas

Necesitamos:

-   `precioPieza`;
-   `horas`;
-   `precioHora`;
-   `diagnostico`.

### 🟪 Paso 3 · Definir el proceso

```text
manoObra ← horas * precioHora
total ← precioPieza + manoObra + diagnostico
```

### 🟦 Paso 4 · Identificar la salida

**Precio final de la reparación.**

### 🟩 Paso 5 · Escribir el algoritmo completo

```text
INICIO
    LEER precioPieza
    LEER horas
    LEER precioHora
    LEER diagnostico

    manoObra ← horas * precioHora
    total ← precioPieza + manoObra + diagnostico

    ESCRIBIR total
FIN
```

:::info[Observa el proceso]
**Problema → Entrada/Proceso/Salida → Algoritmo → Pseudocódigo**
:::

## 1️⃣1️⃣ Retos en grupo · TechFix Challenge

Es el momento de aplicar el mismo procedimiento a nuevos problemas.

### 🟩 Reto A · Ampliación de RAM

Calcular cuánto cuesta ampliar la RAM de varios ordenadores.

Datos:

-   número de equipos;
-   precio del módulo;
-   coste de instalación por equipo.

### 🟧 Reto B · Sustitución de discos

Calcular cuánto cuesta instalar discos SSD en varios ordenadores.

### 🟥 Reto C · Cableado

Calcular el coste de instalar cable de red.

Datos:

-   metros necesarios;
-   precio por metro;
-   coste de instalación.

### 🟪 Reto D · Copias de seguridad

Calcular cuánto espacio total necesita una copia formada por:

-   documentos;
-   fotografías;
-   vídeos;
-   otros archivos.

### 🟦 Reto E · Renovación de equipos

Una empresa necesita comprar:

-   ordenadores;
-   monitores;
-   teclados.

Calcula el presupuesto total.

### 🟩 Entrega

Por cada reto debes entregar:

1.  Descripción del problema.
2.  Entradas.
3.  Proceso.
4.  Salidas.
5.  Algoritmo en lenguaje natural.
6.  Algoritmo en pseudocódigo.
7.  Dos casos de prueba.

## 1️⃣2️⃣ Ficha-resumen

### 🟩 ¿Qué hemos aprendido?

  -----------------------------------------------------------------------
  Concepto                            Significado
  ----------------------------------- -----------------------------------
  **Programar**                       Resolver problemas utilizando
                                      instrucciones que puede ejecutar un
                                      ordenador.

  **Problema**                        Situación que queremos resolver.

  **Algoritmo**                       Conjunto ordenado de instrucciones
                                      para resolver un problema.

  **Programa**                        Algoritmo escrito en un lenguaje
                                      que puede ejecutar un ordenador.

  **Entrada**                         Datos que recibe el programa.

  **Proceso**                         Operaciones realizadas con esos
                                      datos.

  **Salida**                          Resultado obtenido.
  -----------------------------------------------------------------------

### 🟧 El esquema fundamental

:::info[De la idea al programa]
**PROBLEMA → ANÁLISIS → ENTRADA / PROCESO / SALIDA → ALGORITMO →
PROGRAMA**
:::
**Problema**\
Situación que queremos resolver.

↓

**Análisis**\
Entender y descomponer el problema.

↓

**Entrada → Proceso → Salida**\
Datos, transformación y resultados.

↓

**Algoritmo**\
Instrucciones ordenadas para resolver el problema.

↓

**Programa**\
Implementación ejecutable del algoritmo.

### 🟥 Pseudocódigo básico

```text
INICIO
    LEER dato1
    LEER dato2

    resultado ← dato1 + dato2

    ESCRIBIR resultado
FIN
```

## 1️⃣3️⃣ Autoevaluación

Antes de terminar la unidad, valora qué eres capaz de hacer.

### 🟦 Escala de valoración

- **1** · No lo entiendo.
- **2** · Necesito ayuda.
- **3** · Puedo hacerlo.
- **4** · Podría explicárselo a otra persona.

### 🟩 Valora tu aprendizaje

| Competencia | 1 | 2 | 3 | 4 |
|---|:---:|:---:|:---:|:---:|
| Sé explicar qué es un algoritmo | ☐ | ☐ | ☐ | ☐ |
| Distingo problema y programa | ☐ | ☐ | ☐ | ☐ |
| Identifico entradas | ☐ | ☐ | ☐ | ☐ |
| Identifico procesos | ☐ | ☐ | ☐ | ☐ |
| Identifico salidas | ☐ | ☐ | ☐ | ☐ |
| Puedo escribir un algoritmo | ☐ | ☐ | ☐ | ☐ |
| Entiendo pseudocódigo sencillo | ☐ | ☐ | ☐ | ☐ |
| Puedo ejecutar una traza | ☐ | ☐ | ☐ | ☐ |
| Puedo detectar algunos errores | ☐ | ☐ | ☐ | ☐ |

## 1️⃣4️⃣ Mini prueba de consolidación

### 🟩 Pregunta 1

¿Qué es un algoritmo?

-   A. Un ordenador.
-   B. Un lenguaje de programación.
-   C. Una secuencia ordenada de pasos para resolver un problema.
-   D. Un programa Java.

### 🟧 Pregunta 2

En un programa que calcula el coste de varios discos, el **precio del
disco** y la **cantidad de discos** son:

-   A. Salidas.
-   B. Entradas.
-   C. Errores.
-   D. Algoritmos.

### 🟥 Pregunta 3

Si tenemos:

```text
total ← precio * cantidad
```

¿Qué estamos realizando?

-   A. Entrada.
-   B. Salida.
-   C. Procesamiento.
-   D. Error.

### 🟪 Pregunta 4

Ordena correctamente:

-   Mostrar resultado.
-   Leer número 1.
-   Calcular suma.
-   Leer número 2.

### 🟦 Pregunta 5

Completa el algoritmo:

```text
LEER precio
LEER cantidad

_________________________

ESCRIBIR total
```

### 🟩 Pregunta 6

Detecta el error:

```text
LEER capacidad
LEER utilizado

libre ← capacidad + utilizado
```


:::tip[Al terminar esta unidad]
Ya dispones de la base necesaria para comenzar a programar.

En la siguiente unidad pasaremos de los algoritmos al código y
escribiremos nuestros **primeros programas en Java**.
:::
