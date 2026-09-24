---
sidebar_position: 2
title: "3.2. Mostrar información por pantalla"
---

# Mostrar información por pantalla

Uno de los primeros pasos al aprender un lenguaje de programación es conseguir que el programa muestre información.

En Java utilizaremos principalmente:

```java
System.out.print()
System.out.println()
```

## 1️⃣ `System.out.println()`

`System.out.println()` muestra información y, al terminar, pasa a la línea siguiente.

```java
public class SalidaDatos {

    public static void main(String[] args) {

        System.out.println("Hola");
        System.out.println("Estamos aprendiendo Java");

    }
}
```

El resultado será:

```text
Hola
Estamos aprendiendo Java
```

El texto que queremos mostrar se escribe entre comillas dobles.

```java
System.out.println("Equipo operativo");
```

:::info[Recuerda]

Las cadenas de texto se escriben entre comillas dobles:

```java
"Hola"
"PC-AULA-01"
"Equipo operativo"
```

:::

## 2️⃣ `System.out.print()`

`System.out.print()` también muestra información, pero **no cambia automáticamente de línea**.

```java
System.out.print("Hola ");
System.out.print("Java");
```

Resultado:

```text
Hola Java
```

Compáralo con:

```java
System.out.println("Hola");
System.out.println("Java");
```

Resultado:

```text
Hola
Java
```

La diferencia principal es:

```text
print()     → continúa en la misma línea
println()   → pasa a la línea siguiente
```

## 3️⃣ Mostrar números

También podemos mostrar valores numéricos:

```java
System.out.println(25);
System.out.println(3.14);
```

No debemos escribir los números entre comillas cuando queremos tratarlos como valores numéricos.

Observa:

```java
System.out.println(10 + 5);
```

Resultado:

```text
15
```

Pero:

```java
System.out.println("10 + 5");
```

Resultado:

```text
10 + 5
```

En el segundo caso hemos escrito un texto.

## 4️⃣ Secuencias de escape

Dentro de una cadena podemos utilizar algunos caracteres especiales.

### 🟩 Salto de línea: `\n`

```java
System.out.println("Nombre: PC01\nEstado: Operativo");
```

Resultado:

```text
Nombre: PC01
Estado: Operativo
```

### 🟧 Tabulación: `\t`

```java
System.out.println("Equipo\tRAM");
System.out.println("PC01\t8 GB");
```

La tabulación permite separar visualmente la información.

### 🟥 Mostrar comillas

Para incluir comillas dobles dentro de un texto utilizamos `\"`.

```java
System.out.println("El equipo se llama \"PC01\"");
```

Resultado:

```text
El equipo se llama "PC01"
```

## 5️⃣ Concatenar información

El operador `+` también puede utilizarse para unir texto.

```java
System.out.println("Equipo: " + "PC01");
```

Resultado:

```text
Equipo: PC01
```

Más adelante utilizaremos esta misma técnica para combinar texto y variables:

```java
int ram = 8;

System.out.println("Memoria RAM: " + ram + " GB");
```

Resultado:

```text
Memoria RAM: 8 GB
```

:::warning[Texto y números no son lo mismo]

Observa:

```java
System.out.println(10 + 5);
```

muestra `15`.

Sin embargo:

```java
System.out.println("10" + "5");
```

muestra `105`.

En el segundo caso Java está uniendo dos cadenas de texto.

:::

## 6️⃣ Código legible

Aunque podemos mostrar mucha información en una sola instrucción, debemos procurar que el código sea fácil de leer.

Por ejemplo:

```java
System.out.println("Equipo: PC01");
System.out.println("RAM: 8 GB");
System.out.println("Estado: Operativo");
```

es más fácil de comprender que intentar construir una salida compleja en una única línea.

:::tip[Objetivo]

`print()` y `println()` serán nuestras herramientas básicas para observar los resultados de los programas durante las próximas unidades.

:::
