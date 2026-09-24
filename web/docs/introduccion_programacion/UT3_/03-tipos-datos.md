---
sidebar_position: 4
title: "3.4. Tipos de datos"
---

# Tipos de datos

Cuando declaramos una variable debemos indicar qué clase de información almacenará.

Java es un lenguaje de **tipado estático**: el tipo de una variable se establece al declararla y no podemos utilizarla después como si fuera de otro tipo incompatible.

## 1️⃣ ¿Por qué existen diferentes tipos?

No todos los datos representan lo mismo.

```text
18             → número entero
25.50          → número decimal
'A'            → carácter
"PC-AULA-01"   → texto
true           → valor lógico
```

El tipo permite a Java saber:

- qué clase de valor almacenamos;
- qué operaciones podemos realizar;
- cómo debe tratar ese valor.

## 2️⃣ Números enteros

Para los números enteros utilizaremos principalmente `int`.

```java
int edad = 18;
int equipos = 25;
int temperatura = 52;
```

`int` no puede almacenar decimales.

Para números enteros de mayor tamaño existe `long`:

```java
long bytes = 5000000000L;
```

La `L` indica que el literal debe tratarse como `long`.

:::tip[Durante las primeras unidades]

Para la mayoría de los números enteros utilizaremos `int`.

Solo recurriremos a otros tipos cuando exista una razón para hacerlo.

:::

## 3️⃣ Números decimales

Utilizaremos principalmente `double`.

```java
double precio = 29.95;
double temperatura = 52.7;
double porcentaje = 75.5;
```

En Java los decimales se escriben utilizando **punto**, no coma:

```java
double precio = 19.99;
```

También existe `float`:

```java
float temperatura = 23.5F;
```

La `F` indica que el valor es de tipo `float`.

En nuestros primeros programas utilizaremos normalmente `double` para valores decimales.

## 4️⃣ Valores lógicos

El tipo `boolean` solo puede almacenar dos valores:

```java
true
false
```

Ejemplo:

```java
boolean encendido = true;
boolean tieneConexion = false;
```

Los booleanos serán especialmente importantes cuando estudiemos las estructuras de decisión.

## 5️⃣ Caracteres

`char` almacena **un único carácter**.

```java
char letra = 'A';
char grupo = 'B';
```

Los caracteres utilizan comillas simples:

```text
'A'
```

## 6️⃣ Cadenas de texto

Para almacenar texto utilizamos `String`.

```java
String nombre = "PC-AULA-01";
String usuario = "alumno";
String estado = "Operativo";
```

Las cadenas utilizan comillas dobles:

```text
"PC-AULA-01"
```

:::warning[`char` y `String`]

No son lo mismo:

```java
char letra = 'A';
String texto = "A";
```

`char` representa un carácter y utiliza comillas simples.

`String` representa una cadena de texto y utiliza comillas dobles.

:::

## 7️⃣ Resumen de tipos

| Tipo | Almacena | Ejemplo |
|---|---|---|
| `int` | Enteros | `25` |
| `long` | Enteros grandes | `5000000000L` |
| `double` | Decimales | `25.75` |
| `float` | Decimales | `25.75F` |
| `boolean` | Verdadero/falso | `true` |
| `char` | Un carácter | `'A'` |
| `String` | Texto | `"PC01"` |

## 8️⃣ Elegir el tipo adecuado

Debemos pensar qué representa el dato.

```java
int numeroEquipos = 25;
double precio = 399.99;
boolean conectado = true;
char grupo = 'A';
String nombreEquipo = "PC-AULA-01";
```

:::info[Idea clave]

No elegimos un tipo porque el valor actual "quepa", sino por **la naturaleza del dato que queremos representar**.

Por ejemplo, un número de equipos es entero, mientras que un precio puede necesitar decimales.

:::
