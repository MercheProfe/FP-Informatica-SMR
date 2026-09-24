---
sidebar_position: 2
title: "2.1. Programas y entornos de desarrollo"
---

# UT2. Programas y entornos de desarrollo

En la unidad anterior aprendimos que, antes de programar, debemos **comprender el problema y diseñar una solución mediante un algoritmo**.

Ahora vamos a dar el siguiente paso: convertir esos algoritmos en programas que un ordenador pueda ejecutar.

Para ello necesitamos comprender qué es un programa, qué papel desempeña un lenguaje de programación y qué herramientas utilizaremos durante el curso. Prepararemos además nuestro entorno de trabajo con **Java 21** y **Visual Studio Code**.

:::info[Objetivos de la unidad]
Al finalizar esta unidad deberías ser capaz de:
- explicar qué es un programa y diferenciarlo de un algoritmo;
- distinguir entre código fuente, código compilado y programa en ejecución;
- comprender, a nivel básico, cómo se ejecuta un programa Java;
- identificar la función del JDK, el compilador y la JVM;
- reconocer las herramientas que forman un entorno de desarrollo;
- utilizar Visual Studio Code para crear y ejecutar programas Java;
- reconocer las partes básicas de un programa Java;
- utilizar de forma básica la terminal;
- interpretar errores sencillos de compilación y ejecución.
:::

## 1️⃣ Del algoritmo al programa

En la UT1 trabajamos con **algoritmos**: secuencias ordenadas de pasos que permiten resolver un problema.

```text
PROBLEMA
   ↓
ALGORITMO
   ↓
CÓDIGO FUENTE
   ↓
PROGRAMA
   ↓
EJECUCIÓN
   ↓
RESULTADO
```

:::info[Idea clave]
Un **algoritmo** describe los pasos necesarios para resolver un problema.

Un **programa** es la implementación de uno o varios algoritmos utilizando un lenguaje de programación.
:::

## 2️⃣ Lenguajes de programación

Los ordenadores trabajan internamente con instrucciones representadas mediante código máquina. Los **lenguajes de programación** nos permiten expresar esas instrucciones utilizando una sintaxis comprensible.

Algunos ejemplos son Java, Python, JavaScript, C y C++.

Durante este curso utilizaremos **Java**.

### 🟩 ¿Por qué Java?

Java permite aprender de forma estructurada conceptos fundamentales como variables, tipos de datos, operadores, decisiones, bucles, métodos, arrays, colecciones, ficheros y objetos.

Los conceptos que aprenderemos son transferibles posteriormente a otros lenguajes.

## 3️⃣ Código fuente, compilación y ejecución

Cuando escribimos un programa Java creamos un archivo de texto con extensión `.java`.

```java
public class Hola {
    public static void main(String[] args) {
        System.out.println("Hola, mundo");
    }
}
```

Antes de ejecutarlo debe producirse un proceso de compilación:

```text
Hola.java
    ↓
COMPILADOR
    ↓
Hola.class
```

El archivo `.class` contiene **bytecode**, que es ejecutado por la **Java Virtual Machine (JVM)**.

```text
CÓDIGO FUENTE (.java)
        ↓
   COMPILADOR javac
        ↓
    BYTECODE (.class)
        ↓
        JVM
        ↓
     EJECUCIÓN
```

:::info[Recuerda]
- `.java` → código fuente que escribimos.
- `.class` → bytecode generado al compilar.
- JVM → máquina virtual que ejecuta el bytecode.
:::

## 4️⃣ ¿Cómo funciona Java?

### 🟪 JDK

**JDK** significa *Java Development Kit*. Es el conjunto de herramientas necesarias para desarrollar programas Java.

Incluye, entre otras herramientas, el compilador `javac`, el comando `java` y las bibliotecas necesarias.

En este curso utilizaremos **JDK 21**.

### 🟦 El compilador `javac`

El compilador transforma un archivo `.java` en bytecode:

```text
javac Hola.java
```

### 🟩 JVM

**JVM** significa *Java Virtual Machine*. Es la máquina virtual encargada de ejecutar el bytecode.

De forma simplificada:

```text
Windows ─┐
Linux   ─┼── JVM ── bytecode Java
macOS   ─┘
```

:::tip[No es necesario memorizar todos los detalles]
En esta unidad necesitamos comprender el proceso general:

**escribimos código Java → compilamos → obtenemos bytecode → la JVM lo ejecuta.**
:::

## 5️⃣ Herramientas para programar

Para desarrollar programas necesitamos diferentes herramientas.

### 🟧 Editor de código

Un editor de código facilita la escritura mediante funciones como resaltado de sintaxis, autocompletado, numeración de líneas y detección de algunos errores.

### 🟥 IDE y entorno de desarrollo

Un IDE integra diferentes herramientas relacionadas con edición, ejecución, depuración y gestión de proyectos.

### 🟪 Visual Studio Code

Durante el curso utilizaremos **Visual Studio Code (VS Code)**.

VS Code es un editor extensible que podemos adaptar a diferentes lenguajes mediante extensiones. En esta asignatura lo configuraremos para trabajar con Java.

El mismo entorno puede utilizarse también para **HTML, CSS y JavaScript**, por lo que nos servirá como herramienta común para otras materias del ciclo.

:::info[Nuestro entorno de trabajo]
Durante el curso utilizaremos:

**Visual Studio Code + JDK 21 + extensiones para Java**
:::

## 6️⃣ Instalación y configuración del entorno

Para programar necesitamos disponer del **JDK 21**, Visual Studio Code y las extensiones necesarias para Java.

:::warning[Instrucciones de instalación]
Las **instrucciones completas y el paso a paso para instalar y configurar el entorno están disponibles en Classroom**.

Debes seguir esas instrucciones para preparar el equipo.

Durante todo el curso utilizaremos **JDK 21**. No instales una versión diferente salvo indicación expresa en clase.
:::

Una vez configurado el entorno podemos comprobar Java desde la terminal:

```text
java -version
```

y el compilador:

```text
javac -version
```

Ambos deben corresponder a **Java 21**.

:::tip[Si algo no funciona]
Comprueba de forma ordenada:
1. que el JDK 21 está instalado;
2. que `java` y `javac` funcionan desde la terminal;
3. que VS Code detecta el JDK;
4. que las extensiones necesarias para Java están instaladas.

No cambies varias configuraciones a la vez.
:::

## 7️⃣ Nuestro primer programa Java

Con el entorno preparado podemos crear nuestro primer programa:

```java
public class HolaMundo {

    public static void main(String[] args) {
        System.out.println("Hola, mundo");
    }

}
```

Al ejecutarlo obtenemos:

```text
Hola, mundo
```

Todavía no necesitamos comprender todos los elementos de este código. Primero aprenderemos a reconocer su estructura.

## 8️⃣ Partes básicas de un programa Java

### 🟩 La clase

```java
public class HolaMundo {
```

Por ahora consideraremos la clase como el **contenedor de nuestro programa**.

Si la clase pública se llama `HolaMundo`, el archivo debe llamarse:

```text
HolaMundo.java
```

### 🟧 El método `main`

```java
public static void main(String[] args) {
```

`main` es el punto desde el que comienza la ejecución de nuestros primeros programas.

:::info[Por ahora]
No necesitamos comprender todavía en profundidad `public`, `static`, `void` o `String[] args`.

Iremos entendiendo estos elementos conforme avancemos. De momento debemos reconocer la estructura y saber dónde escribiremos nuestras primeras instrucciones.
:::

### 🟥 Las instrucciones

```java
System.out.println("Hola, mundo");
```

Esta instrucción muestra información por pantalla.

Muchas instrucciones Java terminan con `;`.

### 🟪 Las llaves y la indentación

Java utiliza `{` y `}` para delimitar bloques de código.

La indentación permite ver con claridad qué instrucciones pertenecen a cada bloque.

## 9️⃣ Ejecutar un programa desde VS Code

Cuando el entorno está correctamente configurado, VS Code permite ejecutar nuestros programas directamente.

Aunque el editor automatice parte del proceso, debemos comprender qué ocurre:

```text
Código .java
    ↓
Compilación
    ↓
Bytecode .class
    ↓
JVM
    ↓
Resultado
```

## 1️⃣0️⃣ La terminal

La **terminal** permite comunicarnos con el sistema mediante comandos de texto. VS Code incorpora una terminal integrada.

Podemos comprobar las herramientas instaladas:

```text
java -version
javac -version
```

También podemos compilar manualmente:

```text
javac HolaMundo.java
```

y ejecutar:

```text
java HolaMundo
```

:::info[¿Por qué utilizar la terminal si VS Code ya ejecuta el programa?]
Porque nos permite comprender qué herramientas intervienen realmente.

VS Code facilita el trabajo, pero debajo siguen existiendo el compilador, la JVM y los comandos del JDK.
:::

## 1️⃣1️⃣ Errores de compilación, ejecución y lógica

Equivocarse al programar es normal. Una parte importante del aprendizaje consiste en **leer los mensajes de error y utilizarlos para localizar el problema**.

### 🟦 Error de compilación

```java
System.out.println("Hola")
```

Falta el punto y coma, por lo que el compilador detectará un error.

### 🟩 Error de ejecución

Un programa puede compilar correctamente y producir un problema mientras se está ejecutando. Veremos estos errores con más detalle conforme nuestros programas sean más complejos.

### 🟧 Error lógico

El programa puede ejecutarse sin errores y producir un resultado incorrecto:

```java
int precio = 10;
int cantidad = 3;

System.out.println(precio + cantidad);
```

El resultado será `13`, aunque si queríamos calcular el precio de tres unidades deberíamos obtener `30`.

:::warning[Un mensaje de error es información]
Cuando aparezca un error:
1. lee el mensaje;
2. identifica el archivo y la línea;
3. revisa la instrucción;
4. modifica una sola cosa;
5. vuelve a ejecutar.

No borres todo el programa y empieces de nuevo ante el primer error.
:::

## 1️⃣2️⃣ Organización de nuestros programas

Durante el curso crearemos muchos archivos y prácticas. Debemos mantenerlos organizados desde el principio.

Por ejemplo:

```text
IntroduccionProgramacion/
│
├── UT02/
├── UT03/
├── UT04/
└── ...
```

Utiliza nombres claros y evita guardar todos los archivos directamente en el Escritorio o en Descargas.

:::tip[Una buena organización también forma parte de programar]
Mantener ordenados los archivos facilita continuar una práctica, localizar problemas y recuperar trabajos anteriores.
:::

## 1️⃣3️⃣ Qué debemos recordar

Al terminar esta unidad debemos tener claras estas ideas:

- Un **algoritmo** describe una solución y un **programa** la implementa utilizando un lenguaje.
- El código Java se almacena en archivos `.java`.
- `javac` transforma el código fuente en bytecode `.class`.
- La JVM ejecuta el bytecode.
- El JDK contiene las herramientas necesarias para desarrollar programas Java.
- Durante el curso utilizaremos **JDK 21**.
- Nuestro entorno de trabajo será **Visual Studio Code** configurado para Java.
- Las instrucciones de instalación y configuración están disponibles en **Classroom**.
- La ejecución de nuestros primeros programas comienza en `main`.
- Los mensajes de error ayudan a localizar y corregir problemas.

:::info[Siguiente unidad]
Con el entorno preparado y comprendiendo la estructura básica de un programa, en la siguiente unidad comenzaremos a trabajar con **variables, tipos de datos y operadores**.
:::
