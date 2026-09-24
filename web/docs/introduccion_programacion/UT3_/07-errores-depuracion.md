---
sidebar_position: 8
title: "3.8. Errores y depuración básica"
---

# Errores y depuración básica

Cuando programamos es normal cometer errores.

El objetivo no es evitar cualquier error, sino aprender a **identificarlo, comprenderlo y corregirlo de forma ordenada**.

## 1️⃣ Tres tipos de problemas

En nuestros primeros programas encontraremos principalmente:

- errores de compilación;
- errores durante la ejecución;
- errores lógicos.

## 2️⃣ Errores de compilación

Impiden que Java compile correctamente el programa.

Por ejemplo:

```java
int equipos = 20
```

Falta `;`.

Otro ejemplo:

```java
int equipos = "veinte";
```

Estamos intentando almacenar texto en una variable `int`.

El compilador mostrará un mensaje indicando que existe un problema.

:::info[El compilador nos ayuda]

Un error de compilación no es únicamente un problema: el mensaje del compilador proporciona información para localizarlo.

Lee el mensaje antes de modificar el código.

:::

## 3️⃣ Variable no declarada

```java
int equipos = 20;

System.out.println(equipo);
```

Hemos declarado `equipos`, pero intentamos utilizar `equipo`.

Java diferencia exactamente los nombres.

También distingue mayúsculas y minúsculas:

```java
int equipos = 20;

System.out.println(Equipos);
```

`equipos` y `Equipos` no son el mismo identificador.

## 4️⃣ Tipos incompatibles

```java
int temperatura = 23.5;
```

`23.5` es un valor decimal y no puede almacenarse directamente en un `int`.

Debemos preguntarnos qué tipo representa realmente el dato:

```java
double temperatura = 23.5;
```

## 5️⃣ Variables locales sin inicializar

Una variable local debe tener un valor antes de utilizarse.

```java
int equipos;

System.out.println(equipos);
```

Java detectará que `equipos` podría no estar inicializada.

Podemos solucionarlo asignándole un valor antes de usarla:

```java
int equipos = 20;

System.out.println(equipos);
```

## 6️⃣ Errores lógicos

Son especialmente importantes porque el programa puede ejecutarse sin mostrar ningún mensaje de error.

```java
double precio = 25.0;
int cantidad = 3;

double total = precio + cantidad;
```

El programa funciona, pero si queríamos calcular el precio de tres unidades la operación correcta era:

```java
double total = precio * cantidad;
```

El compilador no puede saber qué resultado queríamos obtener.

:::warning[Que compile no significa que sea correcto]

Un programa puede no contener errores de sintaxis y, aun así, resolver mal el problema.

Por eso debemos comprobar siempre los resultados.

:::

## 7️⃣ Resultados inesperados

Algunos resultados incorrectos están relacionados con los tipos.

```java
int total = 5;
int cantidad = 2;

double media = total / cantidad;
```

El resultado es `2.0`, no `2.5`.

Aquí no existe un error de compilación. Debemos comprender cómo funciona la división entera.

## 8️⃣ Cómo buscar un error

Cuando un programa no funcione como esperábamos, seguiremos un proceso ordenado:

```text
1. LEER EL MENSAJE
        ↓
2. LOCALIZAR LA LÍNEA
        ↓
3. IDENTIFICAR QUÉ ESPERÁBAMOS
        ↓
4. REVISAR VARIABLES, TIPOS Y OPERACIONES
        ↓
5. CAMBIAR UNA SOLA COSA
        ↓
6. VOLVER A EJECUTAR
```

:::tip[No cambies muchas cosas a la vez]

Si modificas varias instrucciones al mismo tiempo y el programa empieza a funcionar, no sabrás cuál era realmente el problema.

Realiza cambios pequeños y vuelve a probar.

:::

## 9️⃣ Utilizar salidas para comprobar valores

Podemos mostrar temporalmente el contenido de variables:

```java
double precio = 25.0;
int cantidad = 3;

System.out.println("precio = " + precio);
System.out.println("cantidad = " + cantidad);

double total = precio * cantidad;

System.out.println("total = " + total);
```

Esto nos permite observar qué está ocurriendo durante la ejecución.

Más adelante conoceremos herramientas de depuración más avanzadas.

:::info[Depurar]

**Depurar** consiste en localizar, analizar y corregir los errores de un programa.

Es una parte normal del trabajo de programación.

:::
