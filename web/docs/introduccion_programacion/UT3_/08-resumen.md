---
sidebar_position: 9
title: "3.9. Resumen de la UT3"
---

# Resumen de la UT3

En esta unidad hemos comenzado a construir nuestros primeros programas utilizando datos.

Partimos de programas que únicamente mostraban mensajes y hemos aprendido a **guardar información, realizar cálculos y combinar diferentes tipos de datos**.

## 1️⃣ Mapa de conceptos

```text
DATOS
 │
 ├── VARIABLES
 │      ├── declaración
 │      ├── inicialización
 │      └── asignación
 │
 ├── CONSTANTES
 │      └── final
 │
 ├── TIPOS
 │      ├── int
 │      ├── long
 │      ├── double
 │      ├── float
 │      ├── boolean
 │      ├── char
 │      └── String
 │
 ├── OPERADORES
 │      ├── +
 │      ├── -
 │      ├── *
 │      ├── /
 │      └── %
 │
 ├── CONVERSIONES
 │      ├── automáticas
 │      └── casting
 │
 └── SALIDA
        ├── print()
        └── println()
```

## 2️⃣ Referencia rápida

### 🟩 Mostrar información

```java
System.out.println("Hola");
System.out.print("Hola");
```

### 🟧 Variable

```java
int equipos = 20;
```

### 🟥 Modificar una variable

```java
equipos = 18;
```

### 🟪 Constante

```java
final double IVA = 0.21;
```

### 🟦 Tipos habituales

```java
int numero = 10;
long bytes = 5000000000L;
double precio = 29.95;
float valor = 3.5F;
boolean conectado = true;
char grupo = 'A';
String equipo = "PC01";
```

## 3️⃣ Operaciones

```java
int suma = a + b;
int resta = a - b;
int producto = a * b;
int division = a / b;
int resto = a % b;
```

Recuerda que:

```java
5 / 2
```

produce `2` si ambos operandos son enteros.

Para obtener un resultado decimal podemos utilizar:

```java
double resultado = (double) 5 / 2;
```

## 4️⃣ Concatenación

```java
String equipo = "PC01";
int ram = 8;

System.out.println("Equipo: " + equipo);
System.out.println("RAM: " + ram + " GB");
```

Cuando combinamos texto y operaciones numéricas podemos necesitar paréntesis:

```java
System.out.println("Resultado: " + (10 + 5));
```

## 5️⃣ Conversión de tipos

Conversión automática:

```java
int numero = 20;
double decimal = numero;
```

Conversión explícita:

```java
double temperatura = 23.8;
int temperaturaEntera = (int) temperatura;
```

El casting puede provocar pérdida de información.

## 6️⃣ Errores que debemos reconocer

Debemos prestar atención a:

- olvidar `;`;
- utilizar una variable que no existe;
- confundir mayúsculas y minúsculas;
- utilizar una variable local sin inicializar;
- asignar un valor incompatible con el tipo;
- realizar una división entera esperando un decimal;
- confundir números con cadenas de texto;
- utilizar un operador incorrecto;
- obtener un resultado válido sintácticamente pero incorrecto desde el punto de vista lógico.

:::info[Lo más importante de esta unidad]

Antes de realizar una operación debemos saber **qué información estamos almacenando, qué tipo de dato necesita y qué resultado esperamos obtener**.

:::

## 7️⃣ ¿Qué viene después?

Hasta ahora los datos de nuestros programas están escritos directamente en el código:

```java
int horas = 3;
double precioHora = 25.0;
```

Esto significa que para trabajar con otros valores tendríamos que modificar el programa.

En la siguiente unidad aprenderemos a crear **programas interactivos**, capaces de solicitar datos al usuario mediante el teclado.

Pasaremos de:

```java
int horas = 3;
```

a trabajar con datos introducidos durante la ejecución utilizando `Scanner`.

:::tip[Siguiente paso]

En la UT4 combinaremos todo lo aprendido aquí con **entrada de datos**, por lo que será especialmente importante dominar variables, tipos y operadores.

:::
