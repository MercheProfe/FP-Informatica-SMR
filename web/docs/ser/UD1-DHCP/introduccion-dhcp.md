---
sidebar_position: 1
title: "Introducción"
slug: /ser/UD1-DHCP/introduccion-dhcp
---

# UT1. Servicio de configuración dinámica (DHCP)

En la **UT0** hemos trabajado cómo se configura una red y qué información necesita un equipo para poder comunicarse: dirección IP, máscara de red, puerta de enlace y servidores DNS.

Hasta ahora hemos realizado muchas de estas configuraciones **manualmente**.

En una red pequeña puede ser una solución válida, pero cuando aumenta el número de dispositivos, configurar cada equipo uno por uno resulta poco práctico y aumenta la posibilidad de cometer errores.

En esta unidad aprenderemos cómo **DHCP (Dynamic Host Configuration Protocol)** permite automatizar la configuración de los equipos de una red.

:::info[Idea principal]

DHCP es un protocolo de red que permite proporcionar automáticamente a los clientes los parámetros necesarios para configurar su conexión a una red IP.

:::

## 1️⃣ ¿Qué aprenderemos?

A lo largo de esta unidad aprenderemos a:

- comprender qué problema resuelve DHCP;
- diferenciar configuración estática y dinámica;
- comprender cómo un cliente solicita configuración de red;
- interpretar el proceso **DORA**;
- conocer cómo funcionan las concesiones DHCP;
- diseñar ámbitos y rangos de direcciones;
- utilizar exclusiones y reservas;
- configurar las principales opciones DHCP;
- instalar y administrar un servidor DHCP en **Windows Server**;
- comprobar la configuración recibida por los clientes;
- observar tráfico DHCP mediante **Wireshark**;
- configurar y analizar DHCP mediante **Cisco Packet Tracer**;
- utilizar DHCP cuando existen varias subredes;
- comprender el funcionamiento de **DHCP Relay**;
- detectar y solucionar problemas habituales del servicio.

## 2️⃣ ¿Cómo vamos a trabajar?

La unidad combinará teoría, laboratorio real y simulación.

### 🟩 Laboratorio con VirtualBox

Utilizaremos las dos máquinas virtuales preparadas anteriormente:

```text
SER-Servidor                    SER-Cliente
Windows Server                  Windows
     │                              │
     └──────── Red interna ─────────┘
```

En **SER-Servidor** instalaremos y configuraremos el servicio DHCP.

**SER-Cliente** solicitará automáticamente su configuración de red y nos permitirá comprobar el funcionamiento del servicio.

### 🟧 Análisis con Wireshark

Utilizaremos **Wireshark** para observar qué ocurre realmente en la red cuando un cliente solicita una configuración DHCP.

Podremos relacionar los conceptos estudiados con los paquetes que circulan por la red.

### 🟥 Simulaciones con Packet Tracer

Con **Cisco Packet Tracer** construiremos escenarios progresivamente más complejos.

Comenzaremos con una única red y posteriormente trabajaremos con:

- varios clientes;
- routers;
- varias subredes;
- varios ámbitos DHCP;
- DHCP Relay;
- servidores DHCP centralizados;
- situaciones con errores que tendremos que diagnosticar.

## 3️⃣ Recorrido de la unidad

Los contenidos seguirán una progresión desde los conceptos básicos hasta la administración y resolución de problemas:

1. **Necesidad de DHCP**: configuración manual frente a configuración automática.
2. **Funcionamiento de DHCP**: proceso DORA, broadcast, UDP y puertos.
3. **Concesiones**: asignación temporal, renovación y liberación.
4. **Ámbitos y rangos**: qué direcciones puede entregar el servidor.
5. **Exclusiones y reservas**: control de las direcciones asignadas.
6. **Opciones DHCP**: máscara, gateway, DNS y otros parámetros.
7. **Servidor DHCP en Windows Server**: instalación y configuración.
8. **Clientes DHCP**: obtención, comprobación, liberación y renovación.
9. **Análisis con Wireshark**: observación del funcionamiento real.
10. **DHCP en Packet Tracer**: simulaciones y escenarios con varias redes.
11. **DHCP Relay**: DHCP cuando cliente y servidor están en redes diferentes.
12. **Diagnóstico**: detección y resolución de problemas.

:::tip[Conexión con la UT0]

En esta unidad volveremos continuamente a conceptos que ya conocemos:

- IPv4;
- máscara y prefijo CIDR;
- dirección de red y broadcast;
- direcciones MAC;
- gateway;
- DNS;
- routers;
- TCP/UDP;
- puertos.

DHCP nos permitirá ver cómo muchos de estos conceptos trabajan juntos en un servicio de red real.

:::

## 4️⃣ Objetivo final

Al terminar la unidad no solo deberemos saber **cómo configurar un servidor DHCP**.

Deberemos ser capaces de responder tres preguntas:

> **¿Qué está ocurriendo en la red?**

> **¿Por qué necesitamos esta configuración?**

> **¿Cómo podemos comprobar que funciona correctamente?**

Nuestro objetivo será poder **diseñar, configurar, comprobar y diagnosticar un servicio DHCP** tanto en un entorno real con Windows Server como en redes simuladas con Packet Tracer.
