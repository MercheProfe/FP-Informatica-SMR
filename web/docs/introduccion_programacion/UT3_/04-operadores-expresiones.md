---
sidebar_position: 5
title: "3.5. Operadores y expresiones"
---

# Operadores y expresiones

Una vez que podemos almacenar datos necesitamos poder **trabajar con ellos**.

Los operadores permiten realizar cálculos y construir expresiones.

## 1️⃣ Operadores aritméticos

Los principales operadores aritméticos son:

| Operador | Operación | Ejemplo |
|---|---|---|
| `+` | Suma | `a + b` |
| `-` | Resta | `a - b` |
| `*` | Multiplicación | `a * b` |
| `/` | División | `a / b` |
| `%` | Resto de la división | `a % b` |

Ejemplo:

```java
int precio = 25;
int cantidad = 3;

int total = precio * cantidad;

System.out.println(total);
```

Resultado:

```text
75
```

## 2️⃣ Expresiones

Una **expresión** combina valores, variables y operadores para obtener un resultado.

```java
double precioHora = 25.0;
int horas = 3;

double total = precioHora * horas;
```

La expresión:

```java
precioHora * horas
```

produce un valor que se almacena en `total`.

También podemos combinar varias operaciones:

```java
double precio = 100.0;
double iva = 0.21;

double total = precio + precio * iva;
```

## 3️⃣ División

Debemos prestar especial atención a la división entre enteros.

```java
int resultado = 5 / 2;

System.out.println(resultado);
```

Resultado:

```text
2
```

Como ambos operandos son enteros, Java realiza una **división entera**.

Si queremos obtener el resultado decimal:

```java
double resultado = 5.0 / 2.0;
```

Resultado:

```text
2.5
```

:::warning[División entera]

```java
5 / 2
```

no produce `2.5` cuando ambos valores son enteros.

El tipo de los operandos influye en el resultado de la operación.

:::

## 4️⃣ El operador módulo `%`

El operador `%` devuelve el resto de una división.

```java
int resto = 10 % 3;

System.out.println(resto);
```

Resultado:

```text
1
```

También permite saber si un número es divisible por otro.

Por ejemplo:

```java
int resto = 8 % 2;
```

produce `0`.

Este operador será útil más adelante al trabajar con decisiones.

## 5️⃣ Prioridad de los operadores

Java sigue unas reglas de prioridad similares a las matemáticas.

```java
int resultado = 2 + 3 * 4;
```

Primero se realiza la multiplicación:

```text
2 + 12 = 14
```

Podemos utilizar paréntesis:

```java
int resultado = (2 + 3) * 4;
```

Resultado:

```text
20
```

:::tip[Usa paréntesis cuando mejoren la claridad]

Aunque conozcas la prioridad de los operadores, los paréntesis pueden hacer que una expresión sea mucho más fácil de leer.

```java
double total = precio + (precio * iva);
```

:::

## 6️⃣ Operadores de asignación abreviada

Podemos escribir:

```java
int equipos = 20;

equipos = equipos + 2;
```

También podemos utilizar:

```java
equipos += 2;
```

Otros ejemplos:

```java
equipos -= 2;
precio *= 2;
total /= 3;
```

## 7️⃣ Incremento y decremento

Para aumentar una variable en una unidad:

```java
int contador = 1;

contador++;
```

Para reducirla:

```java
contador--;
```

Estos operadores aparecerán con mucha frecuencia cuando estudiemos los bucles.

## 8️⃣ Construir cálculos paso a paso

Cuando una operación sea compleja puede ser preferible dividirla.

```java
double precioHora = 25.0;
int horas = 3;
double desplazamiento = 30.0;

double costeTrabajo = precioHora * horas;
double total = costeTrabajo + desplazamiento;

System.out.println("Total: " + total + " €");
```

Esto facilita comprender, comprobar y corregir el programa.

:::info[Idea clave]

Una expresión correcta no solo debe producir el resultado esperado. También debería ser **comprensible para quien lea el código**.

:::
