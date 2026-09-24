---
sidebar_position: 5
title: "1.4. Trazas y detección de errores"
---

## 8️⃣ Simular la ejecución de un algoritmo

Antes de escribir un programa podemos comprobar si nuestro algoritmo
funciona.

Para ello podemos **ejecutarlo manualmente**.

Esta técnica recibe distintos nombres:

-   prueba de escritorio;
-   traza;
-   seguimiento del algoritmo.

### 🟩 Ejemplo

Tenemos:

```text
LEER precio
LEER cantidad

total ← precio * cantidad

ESCRIBIR total
```

Utilizamos:

```text
precio = 25
cantidad = 4
```

Seguimos la ejecución paso a paso:

| Paso | precio | cantidad | total |
|---|---:|---:|---:|
| Inicio | — | — | — |
| `LEER precio` | 25 | — | — |
| `LEER cantidad` | 25 | 4 | — |
| Calcular | 25 | 4 | 100 |
| `ESCRIBIR total` | 25 | 4 | 100 |

**Salida: 100 €**

:::info[¿Para qué sirve una traza?]
Nos permite comprobar el comportamiento de un algoritmo **antes de
programarlo** y detectar errores en la solución.
:::
### 🟧 Actividad 6.1 · Realiza la traza

```text
LEER capacidad
LEER usado

libre ← capacidad - usado

ESCRIBIR libre
```

Utiliza:

```text
capacidad = 1000
usado = 675
```

Resultado esperado: **325 GB**.

### 🟥 Actividad 6.2 · Prueba varios valores

Ejecuta el mismo algoritmo utilizando:

| Caso | capacidad |
|:---:|---:|
| **1** | 500 |
| **2** | 2000 |
| **3** | 128 |

## 9️⃣ Los errores también forman parte de programar

Conviene aprender desde el principio una idea fundamental:

:::warning[Equivocarse forma parte del proceso de programación]

:::
Programar consiste muchas veces en:

1.  Pensar una solución.
2.  Probarla.
3.  Descubrir un problema.
4.  Corregirlo.
5.  Volver a probar.

Este proceso se repetirá continuamente.

### 🟩 Ejemplo

Queremos calcular el almacenamiento libre.

Algoritmo incorrecto:

```text
libre ← usado - capacidad
```

Datos:

```text
capacidad = 500
usado = 300
```

Resultado:

```text
-200
```

La operación matemática puede ejecutarse, pero **no resuelve
correctamente el problema**.

Debería ser:

```text
libre ← capacidad - usado
```

:::tip[Recuerda]
Que un algoritmo pueda ejecutarse no significa necesariamente que la
solución sea correcta.
:::
### 🟧 Actividad 7.1 · Cazadores de bugs

Encuentra el error en cada caso.

#### Caso A

Problema: calcular el coste de varias unidades.

```text
LEER precio
LEER unidades

total ← precio + unidades

ESCRIBIR total
```

#### Caso B

```text
LEER horas
LEER precioHora

total ← horas

ESCRIBIR total
```

**¿Qué operación falta?**

#### Caso C

```text
LEER total
LEER usado

libre ← total + usado
```

**¿Qué operación es incorrecta?**
