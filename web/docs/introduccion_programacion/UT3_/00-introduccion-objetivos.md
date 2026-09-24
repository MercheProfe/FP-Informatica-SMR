---
sidebar_position: 1
title: "3.1. Introducción y objetivos"
---

# Introducción y objetivos

En la UT2 preparamos nuestro entorno de desarrollo y vimos la estructura básica de un programa Java. Ya sabemos crear un archivo `.java`, ejecutarlo desde Visual Studio Code y reconocer el método `main`.

En esta unidad comenzaremos a escribir programas capaces de **almacenar datos, modificarlos y realizar operaciones con ellos**.

Para ello aprenderemos tres conceptos fundamentales de cualquier lenguaje de programación:

- las **variables**, que permiten guardar información;
- los **tipos de datos**, que indican qué clase de información estamos almacenando;
- los **operadores**, que permiten realizar cálculos y construir expresiones.

:::info[Idea clave]

Un programa trabaja continuamente con datos.

Puede necesitar guardar el número de equipos de un aula, el precio de una reparación, el nombre de un usuario o indicar si un servicio está activo.

Antes de utilizar un dato debemos saber **qué representa y qué tipo de información contiene**.

:::

## 1️⃣ ¿Qué vamos a aprender?

Al finalizar esta unidad deberías ser capaz de:

- mostrar información por pantalla;
- declarar, inicializar y modificar variables;
- utilizar constantes cuando un valor no deba cambiar;
- elegir un tipo de dato adecuado;
- utilizar los principales tipos de datos de Java;
- realizar operaciones aritméticas;
- construir expresiones combinando variables, valores y operadores;
- comprender la prioridad de los operadores;
- realizar conversiones sencillas entre tipos;
- trabajar con cadenas de texto;
- reconocer algunos errores habituales relacionados con variables, tipos y operaciones.

## 2️⃣ ¿Cómo avanzaremos?

Seguiremos esta progresión:

```text
MOSTRAR INFORMACIÓN
        ↓
GUARDAR INFORMACIÓN
        ↓
ELEGIR EL TIPO DE DATO
        ↓
REALIZAR OPERACIONES
        ↓
CONVERTIR TIPOS
        ↓
TRABAJAR CON TEXTO
        ↓
DETECTAR ERRORES
```

Los ejemplos utilizarán valores escritos directamente en el código.

Por ejemplo:

```java
int horas = 3;
double precioHora = 25.0;

double total = horas * precioHora;

System.out.println("Total: " + total + " €");
```

:::note[¿Y los datos introducidos por el usuario?]

En esta unidad todavía no utilizaremos `Scanner`.

Primero aprenderemos a trabajar correctamente con variables, tipos y operaciones. En la siguiente unidad sustituiremos los valores escritos directamente en el código por datos introducidos por el usuario.

:::

## 3️⃣ Ejemplos y práctica

En los apuntes encontrarás **ejemplos de código** que explican cada concepto.

Las actividades prácticas se proporcionarán aparte mediante archivos `.java` comentados para que puedas abrirlos en Visual Studio Code, completar el código y ejecutarlo directamente.

:::tip[Cuando leas un ejemplo]

No te limites a leer el código. Intenta anticipar qué resultado mostrará antes de ejecutarlo y comprueba después si tu razonamiento era correcto.

:::
