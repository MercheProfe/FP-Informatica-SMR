---
sidebar_position: 2
title: "1.1. Necesidad de DHCP"
---

# UT1. Servicio DHCP

Hasta ahora hemos configurado las direcciones IP de nuestros equipos **manualmente**. Para una red pequeña esto puede ser suficiente, pero ¿qué ocurriría si tuviéramos que configurar 20, 100 o 500 equipos?

Cada uno necesitaría, como mínimo:

- una dirección IP;
- una máscara de red;
- una puerta de enlace;
- uno o varios servidores DNS.

Además, tendríamos que asegurarnos de que **no asignamos la misma dirección IP a dos equipos diferentes**.

En esta unidad aprenderemos cómo **DHCP (Dynamic Host Configuration Protocol)** permite automatizar esta tarea.

:::info[¿Qué significa DHCP?]

**DHCP** son las siglas de **Dynamic Host Configuration Protocol**, es decir, **Protocolo de Configuración Dinámica de Host**.

Su función principal es proporcionar automáticamente la configuración de red que necesita un dispositivo para comunicarse.

:::

## 1️⃣ ¿Por qué necesitamos DHCP?

### 🟩 Configuración manual de una red

Imagina una pequeña red como esta:

```text
PC1 ─┐
PC2 ─┤
PC3 ─┼── SWITCH ─── ROUTER ─── Internet
PC4 ─┤
PC5 ─┘
```

Podríamos configurar cada ordenador manualmente.

Por ejemplo:

| Equipo | Dirección IP | Máscara | Gateway | DNS |
|---|---|---|---|---|
| PC1 | 192.168.10.101 | 255.255.255.0 | 192.168.10.1 | 8.8.8.8 |
| PC2 | 192.168.10.102 | 255.255.255.0 | 192.168.10.1 | 8.8.8.8 |
| PC3 | 192.168.10.103 | 255.255.255.0 | 192.168.10.1 | 8.8.8.8 |
| PC4 | 192.168.10.104 | 255.255.255.0 | 192.168.10.1 | 8.8.8.8 |
| PC5 | 192.168.10.105 | 255.255.255.0 | 192.168.10.1 | 8.8.8.8 |

Con cinco equipos es posible hacerlo.

Pero pensemos ahora en el aula, una empresa, un hotel o una biblioteca donde se conectan decenas o cientos de dispositivos.

Tendríamos que configurar manualmente todos ellos.

Y no solo una vez. Si cambiara, por ejemplo, la dirección del servidor DNS, tendríamos que modificar de nuevo la configuración de todos los equipos.

### 🟧 Problemas de la configuración manual

Configurar manualmente muchos dispositivos puede provocar errores.

**Direcciones IP duplicadas**

```text
PC1 → 192.168.10.101
PC2 → 192.168.10.101
```

Dos dispositivos de una misma red no deben utilizar simultáneamente la misma dirección IP.

**Máscaras incorrectas**

```text
IP:       192.168.10.105
Máscara:  255.255.0.0
```

cuando la red está utilizando `255.255.255.0`.

**Gateway incorrecto**

Si configuramos `192.168.10.2` cuando el router utiliza `192.168.10.1`, el equipo puede comunicarse con dispositivos de su propia red, pero tendrá problemas para alcanzar otras redes.

**DNS incorrecto**

El equipo podría tener conectividad IP pero no resolver correctamente nombres como `www.google.es`.

:::tip[Recuerda]

Para que un equipo funcione correctamente en una red normalmente necesita conocer, al menos:

- su **dirección IP**;
- su **máscara de red**;
- la **puerta de enlace** si necesita comunicarse con otras redes;
- uno o varios **servidores DNS** para resolver nombres.

Estos conceptos ya los hemos trabajado en la UT0.

:::

### 🟥 La solución: configuración automática

DHCP permite que gran parte de esta configuración se realice automáticamente.

En lugar de configurar cada ordenador manualmente, tendremos un dispositivo que actuará como **servidor DHCP**.

Cuando un equipo se conecta a la red puede solicitar su configuración.

```text
CLIENTE                            SERVIDOR DHCP

   │                                     │
   │  Necesito configuración de red      │
   │ ──────────────────────────────────> │
   │                                     │
   │       IP: 192.168.10.101            │
   │       Máscara: 255.255.255.0        │
   │       Gateway: 192.168.10.1         │
   │       DNS: ...                      │
   │ <────────────────────────────────── │
   │                                     │
```

:::info[Idea clave]

DHCP no sirve únicamente para proporcionar una **dirección IP**.

Puede proporcionar al cliente diferentes parámetros de configuración de red, entre ellos:

- dirección IP;
- máscara;
- puerta de enlace;
- servidores DNS.

:::

### 🟪 Cliente DHCP y servidor DHCP

**Cliente DHCP:** dispositivo que solicita configuración de red.

Puede ser un ordenador, portátil, teléfono móvil, máquina virtual, impresora u otro dispositivo compatible.

**Servidor DHCP:** dispositivo o servicio encargado de proporcionar la configuración a los clientes.

En nuestro laboratorio:

```text
SER-Servidor                    SER-Cliente
Windows Server                  Windows
Servidor DHCP                   Cliente DHCP
```

Más adelante también configuraremos DHCP en **Cisco Packet Tracer**, con redes más grandes, routers y varias subredes.

### 🟦 Configuración estática y configuración dinámica

| Configuración estática | Configuración dinámica |
|---|---|
| Se introduce manualmente | Se obtiene automáticamente |
| La configura el administrador | La proporciona normalmente un servidor DHCP |
| Permanece hasta que alguien la modifica | Puede cambiar con el tiempo |
| Útil para determinados dispositivos | Muy útil para equipos cliente |
| Mayor trabajo de administración | Reduce el trabajo de administración |

DHCP no sustituye completamente a la configuración estática. Hay dispositivos para los que interesa disponer de una dirección conocida y estable, como routers, servidores, impresoras de red o puntos de acceso.

A lo largo de la unidad veremos cómo gestionar estos casos mediante **exclusiones** y **reservas DHCP**.

### 🟩 Ejemplo: el aula de informática

Supongamos un aula con 25 ordenadores y esta red:

```text
192.168.10.0/24
```

El router utiliza:

```text
192.168.10.1
```

Podríamos decidir que los ordenadores reciban automáticamente direcciones entre:

```text
192.168.10.100
        ↓
192.168.10.150
```

Por ejemplo:

```text
PC01 → 192.168.10.100
PC02 → 192.168.10.101
PC03 → 192.168.10.102
...
```

Además, el servidor podría proporcionar:

```text
Máscara → 255.255.255.0
Gateway → 192.168.10.1
DNS     → servidor DNS configurado
```

:::tip[Piensa como administrador de red]

DHCP no elimina la necesidad de **diseñar correctamente el direccionamiento de la red**.

El administrador sigue teniendo que decidir:

- qué red se utilizará;
- qué direcciones se asignarán automáticamente;
- qué direcciones se reservarán para otros dispositivos;
- cuál será el gateway;
- qué servidores DNS utilizarán los clientes.

DHCP **automatiza la asignación**, pero la configuración debe estar previamente diseñada.

:::

### 🟧 ¿Qué vamos a investigar ahora?

Cuando un ordenador acaba de conectarse a una red y todavía no tiene dirección IP:

> **¿Cómo puede comunicarse con un servidor DHCP cuya dirección ni siquiera conoce?**

Para responder tendremos que observar qué ocurre realmente cuando un cliente solicita configuración.

Aparecerán conceptos ya conocidos como direcciones MAC, broadcast, UDP y puertos, y conoceremos el proceso **DORA**:

```text
DISCOVER → OFFER → REQUEST → ACK
```

Ese será el siguiente apartado de la unidad.
