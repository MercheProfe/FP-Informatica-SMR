---
sidebar_position: 3
title: "3.3. Variables y constantes"
---

# Variables y constantes

Los programas necesitan guardar información para poder trabajar con ella.

Por ejemplo, un programa puede necesitar almacenar:

- el número de equipos de un aula;
- el precio de una reparación;
- la temperatura de un procesador;
- el nombre de un usuario;
- el estado de un servicio.

Para almacenar estos datos utilizamos **variables**.

## 1️⃣ ¿Qué es una variable?

Una variable es un espacio al que damos un **nombre** y en el que podemos guardar un valor.

```java
int equipos = 20;
```

En esta instrucción:

```text
int       → tipo de dato
equipos   → nombre de la variable
20        → valor almacenado
```

Podemos imaginar una variable como una caja etiquetada:

```text
┌───────────────┐
│ equipos       │
│               │
│      20       │
└───────────────┘
```

## 2️⃣ Declarar una variable

Antes de utilizar una variable Java necesita conocer su tipo y su nombre.

```java
int equipos;
```

Esto se denomina **declarar una variable**.

Todavía no le hemos asignado ningún valor.

## 3️⃣ Inicializar una variable

Podemos asignarle un primer valor:

```java
equipos = 20;
```

También podemos declarar e inicializar en una sola instrucción:

```java
int equipos = 20;
```

Esta será la forma que utilizaremos con frecuencia.

:::info[Vocabulario]

```java
int equipos;
```

**Declaración**

```java
equipos = 20;
```

**Asignación**

```java
int equipos = 20;
```

**Declaración e inicialización**

:::

## 4️⃣ Modificar el valor

El contenido de una variable puede cambiar durante la ejecución.

```java
int equipos = 20;

System.out.println(equipos);

equipos = 18;

System.out.println(equipos);
```

Resultado:

```text
20
18
```

La segunda asignación sustituye el valor anterior.

## 5️⃣ El operador de asignación `=`

En programación:

```java
equipos = 20;
```

no significa exactamente lo mismo que una igualdad matemática.

El operador `=` indica:

> guarda el valor de la derecha en la variable de la izquierda.

También podemos utilizar el valor anterior de una variable para calcular el nuevo:

```java
int equipos = 20;

equipos = equipos - 1;
```

Después de ejecutar la segunda instrucción, `equipos` contiene `19`.

## 6️⃣ Mostrar variables

Podemos mostrar directamente su contenido:

```java
int ram = 8;

System.out.println(ram);
```

O combinar texto y variables:

```java
int ram = 8;

System.out.println("Memoria RAM: " + ram + " GB");
```

Resultado:

```text
Memoria RAM: 8 GB
```

## 7️⃣ Nombres de variables

Los nombres deberían indicar claramente qué información almacenan.

Buenos ejemplos:

```java
int numeroEquipos;
double precioReparacion;
int temperaturaCpu;
```

Nombres poco adecuados:

```java
int x;
double cosa;
int dato1;
```

Java diferencia entre mayúsculas y minúsculas:

```java
int equipos = 20;
int Equipos = 10;
```

son dos variables diferentes.

### 🟩 Convención `camelCase`

En Java utilizaremos normalmente **camelCase**:

```java
numeroEquipos
precioHora
temperaturaCpu
espacioDisponible
```

La primera palabra comienza en minúscula y las siguientes empiezan con mayúscula.

:::warning[Identificadores]

Un nombre de variable:

- no puede contener espacios;
- no puede comenzar por un número;
- no puede utilizar palabras reservadas de Java;
- debería ser descriptivo.

Por ejemplo, `numeroEquipos` es preferible a `ne`.

:::

## 8️⃣ Constantes

En ocasiones queremos guardar un valor que **no debe cambiar** durante el programa.

Utilizamos `final`:

```java
final double IVA = 0.21;
```

Si después intentamos hacer:

```java
IVA = 0.10;
```

Java mostrará un error.

Las constantes suelen escribirse en mayúsculas:

```java
final double IVA = 0.21;
final int MAX_EQUIPOS = 30;
```

:::info[Variable o constante]

Usa una **variable** cuando el valor pueda cambiar.

Usa una **constante** cuando el valor deba permanecer fijo durante la ejecución.

:::
