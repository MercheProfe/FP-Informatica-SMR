---
sidebar_position: 7
title: "3.7. Trabajar con texto"
---

# Trabajar con texto

Los programas no trabajan únicamente con números.

Nombres de equipos, usuarios, mensajes, estados o rutas son ejemplos de información textual.

En Java utilizamos `String` para representar cadenas de texto.

## 1️⃣ Crear una cadena

```java
String equipo = "PC-AULA-01";
String estado = "Operativo";
```

Las cadenas se escriben entre comillas dobles.

```java
"Hola"
"PC-AULA-01"
"Equipo operativo"
```

## 2️⃣ Concatenar cadenas

Podemos unir cadenas utilizando `+`.

```java
String nombre = "PC";
String numero = "01";

String equipo = nombre + numero;

System.out.println(equipo);
```

Resultado:

```text
PC01
```

También podemos añadir texto directamente:

```java
String equipo = "PC-AULA-" + "01";
```

## 3️⃣ Combinar texto y variables

Una de las operaciones más habituales será construir mensajes:

```java
String equipo = "PC-AULA-01";
int ram = 8;

System.out.println("Equipo: " + equipo);
System.out.println("RAM: " + ram + " GB");
```

Resultado:

```text
Equipo: PC-AULA-01
RAM: 8 GB
```

## 4️⃣ Cuidado al concatenar números

Observa:

```java
System.out.println("Resultado: " + 10 + 5);
```

El resultado será:

```text
Resultado: 105
```

Java comienza concatenando:

```text
"Resultado: " + 10
```

y obtiene una cadena. Después añade `5`.

Si queremos realizar primero la suma:

```java
System.out.println("Resultado: " + (10 + 5));
```

Resultado:

```text
Resultado: 15
```

:::warning[Los paréntesis pueden cambiar el resultado]

```java
"Total: " + 10 + 5
```

y

```java
"Total: " + (10 + 5)
```

no producen el mismo resultado.

:::

## 5️⃣ Longitud de una cadena

Los objetos `String` disponen de operaciones propias.

Por ejemplo, podemos obtener el número de caracteres con `.length()`:

```java
String equipo = "PC01";

int longitud = equipo.length();

System.out.println(longitud);
```

Resultado:

```text
4
```

Por ahora no necesitamos estudiar todos los métodos de `String`. Los iremos incorporando cuando sean necesarios.

## 6️⃣ Caracteres especiales

Podemos utilizar secuencias de escape dentro del texto:

```java
String informe = "Equipo: PC01\nEstado: Operativo";

System.out.println(informe);
```

También podemos incluir comillas:

```java
String mensaje = "El estado es \"Operativo\"";
```

## 7️⃣ `String` y `char`

Recuerda la diferencia:

```java
char grupo = 'A';
String nombreGrupo = "A";
```

`char` almacena un único carácter.

`String` almacena una cadena de caracteres.

:::info[Idea clave]

Aunque ambos puedan mostrar información similar, **texto y números son tipos diferentes** y Java los trata de forma distinta.

Comprender esta diferencia evitará muchos errores cuando comencemos a introducir datos desde teclado.

:::
