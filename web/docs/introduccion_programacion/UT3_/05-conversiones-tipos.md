---
sidebar_position: 6
title: "3.6. Conversiones de tipos"
---

# Conversiones de tipos

En algunos programas necesitamos utilizar conjuntamente valores de tipos diferentes.

Java puede realizar determinadas conversiones automáticamente, pero otras deben indicarse de forma explícita.

## 1️⃣ Conversión automática

Java puede convertir automáticamente un valor cuando la conversión es segura.

```java
int equipos = 20;
double cantidad = equipos;

System.out.println(cantidad);
```

Resultado:

```text
20.0
```

El valor entero `20` puede representarse como `double` sin perder la parte entera.

```text
int → double
```

## 2️⃣ Conversión explícita o casting

El proceso contrario puede provocar pérdida de información.

```java
double temperatura = 23.8;
```

No podemos asignarlo directamente a un `int`:

```java
int valor = temperatura;
```

Java mostrará un error.

Si realmente queremos realizar la conversión debemos indicarlo mediante un **casting**:

```java
int valor = (int) temperatura;
```

El resultado será:

```text
23
```

La parte decimal se pierde.

:::warning[El casting no redondea]

```java
(int) 23.8
```

produce:

```text
23
```

No produce `24`. La parte decimal simplemente se elimina.

:::

## 3️⃣ El tipo del resultado importa

Observa:

```java
int total = 5;
int cantidad = 2;

double media = total / cantidad;
```

Podríamos esperar:

```text
2.5
```

pero el resultado será:

```text
2.0
```

¿Por qué?

Primero Java calcula:

```java
5 / 2
```

Como ambos operandos son `int`, obtiene `2`. Después ese `2` se convierte a `double`.

Podemos solucionarlo haciendo que al menos uno de los operandos sea decimal:

```java
double media = (double) total / cantidad;
```

Ahora el resultado será:

```text
2.5
```

## 4️⃣ Conversiones y pérdida de información

No todas las conversiones son inocuas.

```java
double espacio = 512.75;
int espacioEntero = (int) espacio;
```

Después de la conversión:

```text
espacioEntero = 512
```

Hemos perdido `.75`.

Por eso debemos realizar conversiones explícitas únicamente cuando tengan sentido.

## 5️⃣ Conversión entre números y texto

Una cadena puede contener caracteres que visualmente parecen un número:

```java
String edad = "18";
```

pero `edad` sigue siendo texto.

No podemos utilizarla directamente como un `int`:

```java
// No es válido:
int siguiente = edad + 1;
```

Más adelante, cuando trabajemos con entrada de datos, veremos cómo convertir texto a valores numéricos cuando sea necesario.

:::info[Idea clave]

El valor `18` y el texto `"18"` no son lo mismo.

```java
int edad = 18;
String textoEdad = "18";
```

El tipo determina qué operaciones podemos realizar con cada dato.

:::
