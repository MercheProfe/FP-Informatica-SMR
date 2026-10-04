---
sidebar_position: 9
title: "1.8. Instalación de DHCP en Windows Server"
---

# 1.8. Instalación de DHCP en Windows Server

Ya conocemos los principales elementos que intervienen en DHCP:

- concesiones;
- ámbitos;
- rangos;
- exclusiones;
- reservas;
- opciones DHCP.

Ahora vamos a trasladar estos conceptos a un servidor real.

En nuestro laboratorio utilizaremos **Windows Server** para instalar y configurar el servicio DHCP.

:::info[Objetivo]

El objetivo de este apartado es comprender el proceso general necesario para convertir nuestro servidor en un **servidor DHCP**.

La configuración exacta la realizaremos de forma guiada en el laboratorio, comprobando cada paso antes de continuar.

:::

## 1️⃣ Nuestro escenario de laboratorio

Trabajaremos inicialmente con dos máquinas virtuales:

```text
┌─────────────────────────┐       ┌─────────────────────────┐
│      SER-Servidor       │       │       SER-Cliente       │
│                         │       │                         │
│     Windows Server      │       │        Windows          │
│                         │       │                         │
│   Servidor DHCP         │       │     Cliente DHCP        │
└────────────┬────────────┘       └────────────┬────────────┘
             │                                 │
             └────────── Red interna ──────────┘
```

Ambas máquinas deben estar conectadas a la misma red interna de VirtualBox para realizar las primeras pruebas.

En esta primera configuración:

```text
SER-Servidor
     │
     ├── tendrá una dirección IP fija
     │
     └── proporcionará DHCP
                 │
                 ▼
SER-Cliente
     │
     └── obtendrá su configuración automáticamente
```

## 2️⃣ ¿Por qué el servidor debe tener una IP fija?

Antes de instalar DHCP debemos comprobar la configuración de red de `SER-Servidor`.

Un servidor que proporciona servicios de red debe poder ser localizado de forma predecible.

Por ello, nuestro servidor DHCP tendrá una **dirección IP estática**.

Por ejemplo, si trabajamos con:

```text
Red: 192.168.10.0/24
```

podríamos planificar:

```text
Servidor DHCP: 192.168.10.10
```

y utilizar para los clientes un rango diferente:

```text
192.168.10.100 - 192.168.10.150
```

:::warning[Antes de instalar]

No debemos comenzar instalando el rol DHCP sin comprobar primero el direccionamiento del servidor y la red en la que estamos trabajando.

Primero **planificamos y comprobamos**. Después instalamos el servicio.

:::

## 3️⃣ Comprobar la configuración del servidor

Antes de instalar el rol debemos verificar:

- dirección IPv4;
- máscara;
- configuración de la interfaz;
- red de VirtualBox a la que está conectado el adaptador.

En Windows podemos consultar la configuración con:

```cmd
ipconfig /all
```

Debemos ser capaces de responder:

```text
¿Qué IP tiene SER-Servidor?
¿A qué subred pertenece?
¿La dirección es estática?
¿Está conectado a la red interna correcta?
```

:::tip[Primera comprobación]

Antes de avanzar, anotaremos la configuración de `SER-Servidor`.

Si no conocemos con seguridad la dirección y la subred del servidor, no debemos continuar con la configuración DHCP.

:::

## 4️⃣ Instalar el rol DHCP

En Windows Server, DHCP se instala como un **rol de servidor**.

El proceso general será:

```text
Administrador del servidor
        ↓
Agregar roles y características
        ↓
Seleccionar servidor
        ↓
Servidor DHCP
        ↓
Instalar
```

Durante la práctica realizaremos este proceso paso a paso.

La instalación añade al servidor los componentes necesarios para proporcionar el servicio DHCP.

:::info[Rol de servidor]

En Windows Server, un **rol** representa una función que el servidor desempeña en la red.

En este caso instalaremos el rol:

**Servidor DHCP**

:::

## 5️⃣ Configurar el servicio DHCP

Instalar el rol no significa que el servidor ya esté preparado para entregar direcciones.

Después de la instalación tendremos que **configurar el servicio**.

La idea general será:

```text
Instalar DHCP
      ↓
Configurar DHCP
      ↓
Crear ámbito
      ↓
Definir direcciones
      ↓
Configurar opciones
      ↓
Activar ámbito
      ↓
Probar con un cliente
```

Esta diferencia es importante:

```text
Servicio instalado ≠ servicio correctamente configurado
```

## 6️⃣ Crear un ámbito

El servidor necesita saber qué subred va a atender.

Para ello crearemos un **ámbito DHCP**.

Por ejemplo:

```text
Nombre del ámbito: AULA-SMR

Red:
192.168.10.0/24
```

El ámbito agrupará la configuración correspondiente a esa subred.

:::tip[Recuerda]

Un ámbito DHCP está relacionado con una **subred**.

Por eso los conocimientos de IPv4 y subnetting de la UT0 son necesarios para configurar correctamente DHCP.

:::

## 7️⃣ Establecer el rango de direcciones

Dentro del ámbito definiremos qué direcciones podrá utilizar DHCP para realizar concesiones.

Por ejemplo:

```text
Dirección inicial:
192.168.10.100

Dirección final:
192.168.10.150

Máscara:
255.255.255.0
```

El servidor dispondrá así de un conjunto de direcciones para los clientes.

```text
192.168.10.100
       │
       │   Pool DHCP
       │
192.168.10.150
```

Antes de aceptar el rango comprobaremos que:

- pertenece a la subred correcta;
- no contiene la dirección de red;
- no contiene el broadcast;
- tiene capacidad suficiente para los clientes previstos.

## 8️⃣ Configurar exclusiones

Si existen direcciones dentro del rango que no deben entregarse automáticamente, configuraremos las **exclusiones** necesarias.

Por ejemplo:

```text
Rango:
192.168.10.100 - 192.168.10.150

Exclusión:
192.168.10.120 - 192.168.10.125
```

El servidor no utilizará ese intervalo para las asignaciones dinámicas normales.

:::warning[No crear exclusiones sin motivo]

Antes de configurar una exclusión debemos saber:

1. qué dirección queremos proteger;
2. por qué no debe ser entregada;
3. si realmente se encuentra dentro del rango DHCP.

:::

## 9️⃣ Configurar la duración de la concesión

También estableceremos durante cuánto tiempo podrá utilizar un cliente la dirección recibida.

Es la **duración de la concesión** o **lease time**.

Conceptualmente:

```text
Cliente recibe una IP
        ↓
Comienza la concesión
        ↓
El cliente la utiliza
        ↓
Intenta renovarla
```

La duración debe adaptarse a las características de la red.

En el laboratorio observaremos el valor configurado y posteriormente comprobaremos la información de la concesión desde el cliente y desde el servidor.

## 🔟 Establecer las opciones DHCP

Después configuraremos los parámetros adicionales que necesiten nuestros clientes.

Principalmente:

```text
Gateway
DNS
```

y, cuando proceda:

```text
Nombre de dominio
```

Por ejemplo:

```text
Gateway: 192.168.10.1
DNS:     192.168.10.10
```

:::warning[Configurar solo lo que exista realmente]

No debemos introducir un gateway o un servidor DNS simplemente porque el asistente nos permita hacerlo.

Cada valor debe corresponder con el **diseño real de nuestro laboratorio**.

Si en ese momento nuestro escenario no dispone de un determinado servicio, analizaremos si esa opción debe configurarse.

:::

## 1️⃣1️⃣ Activar el ámbito

Una vez definida la configuración, el ámbito debe quedar **activo** para que pueda atender las solicitudes de los clientes.

Podemos pensar en dos estados:

```text
Ámbito configurado
      │
      ├── Inactivo → no realiza normalmente las concesiones del ámbito
      │
      └── Activo   → puede atender a los clientes
```

Por tanto, una de nuestras comprobaciones será verificar que el ámbito está activado.

## 1️⃣2️⃣ Configurar el cliente

Una vez preparado el servidor, pasaremos a `SER-Cliente`.

Su interfaz deberá estar configurada para obtener automáticamente la configuración de red.

Conceptualmente:

```text
SER-Cliente
      │
      │ DHCP Discover
      ▼
SER-Servidor
      │
      │ DHCP Offer
      ▼
SER-Cliente
      │
      │ DHCP Request
      ▼
SER-Servidor
      │
      │ DHCP ACK
      ▼
SER-Cliente obtiene configuración
```

En ese momento podremos relacionar la práctica con el proceso **DORA** estudiado anteriormente.

## 1️⃣3️⃣ Comprobar la configuración recibida

Desde `SER-Cliente` utilizaremos:

```cmd
ipconfig /all
```

No comprobaremos únicamente si aparece una dirección IP.

Revisaremos:

- si DHCP está habilitado;
- dirección IPv4 recibida;
- máscara;
- servidor DHCP;
- gateway, si está configurado;
- DNS, si está configurado;
- información de la concesión.

Después compararemos estos valores con la configuración realizada en `SER-Servidor`.

:::info[La comprobación debe tener sentido]

Si configuramos:

```text
Rango DHCP:
192.168.10.100 - 192.168.10.150
```

y el cliente recibe:

```text
192.168.10.105
```

la dirección es coherente con nuestro diseño.

Si recibe una dirección que no esperábamos, no continuaremos sin investigar su origen.

:::

## 1️⃣4️⃣ Comprobar la concesión en el servidor

La comprobación no se realizará únicamente desde el cliente.

También accederemos a la consola DHCP de `SER-Servidor` para observar las **concesiones de direcciones**.

Esperamos poder relacionar:

```text
SER-Cliente
IP obtenida
        │
        ▼
Concesión registrada
en SER-Servidor
```

Esto nos permitirá comprobar el servicio desde ambos extremos:

```text
CLIENTE                         SERVIDOR

¿Qué he recibido?        ↔      ¿Qué he entregado?
```

## 1️⃣5️⃣ Secuencia completa de configuración

Nuestro primer despliegue DHCP seguirá esta secuencia:

```text
1. Comprobar la red del servidor
                ↓
2. Instalar el rol DHCP
                ↓
3. Configurar el servicio
                ↓
4. Crear el ámbito
                ↓
5. Establecer el rango
                ↓
6. Configurar exclusiones
                ↓
7. Configurar la duración de la concesión
                ↓
8. Establecer las opciones DHCP
                ↓
9. Activar el ámbito
                ↓
10. Configurar el cliente
                ↓
11. Comprobar la concesión
```

:::tip[Método de trabajo]

En el laboratorio no realizaremos todos estos pasos rápidamente para llegar al final.

Nos detendremos en cada fase para comprobar:

- qué estamos configurando;
- por qué es necesario;
- qué resultado esperamos;
- cómo podemos demostrar que funciona.

:::

## 1️⃣6️⃣ Configurar no es lo mismo que comprobar

Una parte fundamental de la administración de redes es distinguir entre:

```text
CONFIGURAR
```

y:

```text
COMPROBAR
```

Por ejemplo, crear un ámbito sin errores no demuestra que un cliente pueda obtener una concesión.

Para considerar que nuestro servicio funciona tendremos que demostrar, al menos, que:

```text
Servidor DHCP activo
        ↓
Ámbito activo
        ↓
Cliente solicita configuración
        ↓
Cliente recibe una IP del rango previsto
        ↓
Las opciones recibidas son correctas
        ↓
La concesión aparece en el servidor
```

## 1️⃣7️⃣ Si algo falla, no empezamos de nuevo

Cuando un cliente no obtiene la configuración esperada, debemos localizar el punto en el que se produce el problema.

Podemos revisar:

```text
¿Servidor y cliente están en la red correcta?
                ↓
¿El servidor tiene IP estática correcta?
                ↓
¿El servicio DHCP está instalado y funcionando?
                ↓
¿Existe un ámbito?
                ↓
¿Está activo?
                ↓
¿Tiene direcciones disponibles?
                ↓
¿El cliente tiene DHCP habilitado?
                ↓
¿Qué configuración ha recibido?
```

:::warning[Diagnóstico]

Reinstalar o cambiar configuraciones al azar puede ocultar el problema en lugar de ayudarnos a comprenderlo.

Seguiremos una comprobación ordenada desde la infraestructura hasta el cliente.

:::

## 1️⃣8️⃣ Qué haremos en el laboratorio

Este apartado establece el **proceso general**.

La configuración exacta la realizaremos primero de forma guiada en nuestras máquinas:

```text
SER-Servidor
SER-Cliente
```

Durante el laboratorio iremos registrando:

- configuración inicial;
- decisiones de direccionamiento;
- pasos realizados;
- resultados obtenidos;
- errores encontrados;
- comprobaciones realizadas.

Después podremos reproducir el procedimiento de forma autónoma.

## 1️⃣9️⃣ Resumen

Para poner en funcionamiento nuestro primer servidor DHCP tendremos que:

| Fase | Objetivo |
|---|---|
| Comprobar servidor | Verificar direccionamiento y red |
| Instalar rol | Añadir el servicio DHCP |
| Configurar servicio | Prepararlo para su utilización |
| Crear ámbito | Definir la subred atendida |
| Crear rango | Determinar direcciones disponibles |
| Exclusiones | Proteger direcciones concretas |
| Concesión | Establecer su duración |
| Opciones | Configurar gateway, DNS, etc. |
| Activar ámbito | Permitir que atienda clientes |
| Configurar cliente | Habilitar obtención automática |
| Comprobar | Verificar configuración y concesión |

La pregunta final no será únicamente:

> **¿He instalado DHCP?**

Tendremos que poder responder:

> **¿Qué he configurado, por qué lo he configurado así y qué pruebas demuestran que el servicio funciona correctamente?**

En el siguiente apartado estudiaremos con más detalle el servicio **desde el punto de vista del cliente DHCP**, incluyendo la obtención, liberación y renovación de su configuración.
