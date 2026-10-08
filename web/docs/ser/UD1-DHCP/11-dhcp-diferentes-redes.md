---
sidebar_position: 12
title: "1.11. DHCP en diferentes redes"
---

# 1.11. DHCP en diferentes redes

Hasta ahora hemos trabajado con el cliente y el servidor DHCP dentro de la **misma red**.

En ese escenario, el cliente puede localizar al servidor mediante los mensajes iniciales de DHCP.

Ahora vamos a introducir una situación nueva:

```text
CLIENTE ─── SWITCH ─── ROUTER ─── SWITCH ─── SERVIDOR DHCP
```

El cliente y el servidor ya **no pertenecen a la misma subred**.

La pregunta fundamental de este apartado es:

> **¿Por qué deja de funcionar el procedimiento que utilizábamos cuando cliente y servidor están en redes diferentes?**

Para responder tendremos que recuperar varios conceptos de la UT0: **subred, broadcast, router y gateway**.

## 1️⃣ Escenario inicial: cliente y servidor en la misma red

Hasta ahora nuestro escenario era similar a este:

```text
Red 192.168.10.0/24

SER-Cliente ───── SWITCH ───── SER-Servidor
DHCP                         Servidor DHCP
```

Por ejemplo:

```text
SER-Servidor:
192.168.10.10/24

Rango DHCP:
192.168.10.100 - 192.168.10.150
```

El cliente todavía no tiene una dirección IPv4 válida y necesita encontrar un servidor DHCP.

Por eso puede iniciar el proceso mediante **broadcast**.

```text
CLIENTE
   │
   │ DHCP Discover
   │ Broadcast
   ▼
RED LOCAL
   │
   └──────────────> SERVIDOR DHCP
```

Como ambos están en la misma red local, el servidor puede recibir esa solicitud.

## 2️⃣ ¿Qué ocurre cuando añadimos un router?

Ahora modificamos la topología:

```text
      RED A                           RED B

CLIENTE ── SWITCH ── ROUTER ── SWITCH ── DHCP
```

Por ejemplo:

```text
RED A
192.168.10.0/24

RED B
192.168.20.0/24
```

El cliente pertenece a:

```text
192.168.10.0/24
```

y el servidor DHCP se encuentra en:

```text
192.168.20.0/24
```

Entre ambas redes existe un **router**.

:::info[Idea clave]

En este escenario ya no tenemos una única red local.

Tenemos **dos subredes diferentes separadas por un router**.

:::

## 3️⃣ Recordamos qué hace un router

Un router permite comunicar **redes diferentes**.

Por ejemplo:

```text
192.168.10.0/24
        │
        │
      ROUTER
        │
        │
192.168.20.0/24
```

Podría tener una interfaz en cada red:

```text
Interfaz hacia RED A:
192.168.10.1/24

Interfaz hacia RED B:
192.168.20.1/24
```

Cuando un equipo ya dispone de configuración IP y quiere comunicarse con otra red, puede enviar el tráfico a su **gateway**.

Pero el inicio de DHCP presenta un problema especial.

## 4️⃣ El cliente todavía no tiene configuración

Cuando un cliente inicia la obtención de configuración DHCP:

```text
No tiene una IP válida
No conoce todavía su gateway
No conoce inicialmente al servidor DHCP
```

Precisamente está utilizando DHCP para obtener parte de esa información.

Por tanto, no podemos razonar como si el cliente ya estuviera completamente configurado.

Su primera necesidad es:

> **Encontrar un servidor DHCP.**

## 5️⃣ El Discover utiliza broadcast

En una obtención inicial, el cliente puede enviar:

```text
DHCP Discover
```

mediante broadcast.

Conceptualmente podemos encontrar:

```text
Origen:
0.0.0.0

Destino:
255.255.255.255
```

La difusión permite que el mensaje llegue a los dispositivos de la **red local**.

```text
CLIENTE
   │
   │ BROADCAST
   ▼
SWITCH
   ├────────> Equipo A
   ├────────> Equipo B
   └────────> Router
```

Pero aquí aparece la limitación fundamental.

## 6️⃣ Los routers separan dominios de broadcast

Un router no reenvía normalmente los broadcasts IPv4 locales de una subred hacia otra.

Por tanto:

```text
RED A                              RED B

CLIENTE ── SWITCH ── ROUTER ── SWITCH ── DHCP
   │                   ✕
   └── Discover ───────┘
       broadcast
```

El Discover llega a la red local del cliente, pero **no atraviesa el router como un broadcast normal** para alcanzar la otra subred.

:::warning[Concepto fundamental]

Los routers **separan dominios de broadcast**.

Por eso un servidor DHCP situado en otra subred no recibe directamente el broadcast inicial del cliente mediante el procedimiento básico que utilizábamos en una sola red.

:::

## 7️⃣ Entonces, ¿por qué no responde el servidor?

Supongamos:

```text
Cliente:
RED A → 192.168.10.0/24

Servidor DHCP:
192.168.20.10/24
RED B → 192.168.20.0/24
```

El cliente envía:

```text
DHCP Discover
```

pero el servidor se encuentra al otro lado del router.

Podemos representar el problema:

```text
CLIENTE
   │
   │ Discover
   ▼
RED 192.168.10.0/24
   │
   ▼
ROUTER
   │
   ✕  broadcast no reenviado normalmente
   │
RED 192.168.20.0/24
   │
   ▼
SERVIDOR DHCP
```

El servidor no puede ofrecer una dirección si **no recibe la solicitud**.

## 8️⃣ ¿Serviría configurar un gateway en el cliente?

Aquí debemos razonar con cuidado.

El cliente está intentando obtener precisamente su configuración mediante DHCP.

Antes de completar el proceso todavía no dispone de la configuración normal que queremos proporcionarle, incluido el gateway.

Por eso el problema no se resuelve simplemente pensando:

```text
«El cliente enviará el Discover a su gateway».
```

El mecanismo inicial de DHCP está diseñado para permitir que un cliente sin configuración encuentre el servicio dentro de su entorno local.

## 9️⃣ Relación entre subred y ámbito DHCP

Si tenemos dos redes:

```text
192.168.10.0/24
192.168.20.0/24
```

son dos subredes diferentes.

El servidor DHCP debe disponer de una configuración adecuada para la red cuyos clientes vaya a atender.

Por ejemplo:

```text
Ámbito RED 10
192.168.10.0/24
Rango: 192.168.10.100 - 192.168.10.150
```

y, si también debe atender clientes de la otra red:

```text
Ámbito RED 20
192.168.20.0/24
Rango: 192.168.20.100 - 192.168.20.150
```

:::tip[Recuerda]

Un servidor DHCP puede administrar configuraciones para distintas subredes.

El problema que estamos estudiando ahora no es únicamente **qué dirección debe entregar**, sino:

> **¿Cómo llega hasta el servidor la solicitud de un cliente situado en otra red?**

:::

## 🔟 Dos problemas diferentes

Es importante separar dos cuestiones.

### 🟩 Problema 1: llegar al servidor

El broadcast inicial del cliente no atraviesa normalmente el router.

```text
Cliente → Discover → Router ✕ → Servidor
```

### 🟧 Problema 2: saber qué configuración entregar

Si el servidor atiende varias redes, tendrá que determinar qué ámbito corresponde al cliente.

Por ejemplo:

```text
Cliente de RED A
        ↓
Debe recibir configuración de RED A

Cliente de RED B
        ↓
Debe recibir configuración de RED B
```

La solución que veremos posteriormente tendrá que resolver **ambas cuestiones**.

## 1️⃣1️⃣ Ejemplo paso a paso

Tenemos:

```text
RED A: 192.168.10.0/24
RED B: 192.168.20.0/24
```

Topología:

```text
PC0
 │
Switch0
 │
Router0
 │
Switch1
 │
Servidor DHCP
```

El servidor tiene:

```text
IP: 192.168.20.10/24
```

PC0 está conectado a la red:

```text
192.168.10.0/24
```

### 🟩 Paso 1. PC0 necesita una dirección

No dispone todavía de una configuración válida.

### 🟧 Paso 2. Envía DHCP Discover

Utiliza difusión para localizar un servidor DHCP.

### 🟥 Paso 3. El broadcast llega hasta el router

El mensaje circula por la red local del cliente.

### 🟪 Paso 4. El router separa las redes

El broadcast local no se reenvía normalmente hacia `192.168.20.0/24`.

### 🟦 Paso 5. El servidor DHCP no recibe el Discover

Por tanto, no puede responder con un Offer mediante el procedimiento básico.

El resultado es:

```text
No se completa DORA
        ↓
El cliente no obtiene la configuración esperada
```

## 1️⃣2️⃣ ¿Qué veremos en Packet Tracer?

Este escenario es especialmente útil para comprender DHCP mediante simulación.

Construiremos una topología como:

```text
PC ── SWITCH ── ROUTER ── SWITCH ── SERVER
```

Primero comprobaremos que existe conectividad y que el direccionamiento de las interfaces del router es correcto.

Después intentaremos que el cliente obtenga DHCP desde el servidor situado en la otra red.

Esperamos observar un problema:

```text
El cliente genera DHCP
        ↓
La solicitud llega a su red local
        ↓
No alcanza directamente al servidor remoto
```

:::info[La simulación debe mostrar primero el problema]

Antes de configurar la solución nos interesa provocar y observar el fallo.

Así podremos responder:

> **¿Qué problema concreto estamos intentando resolver?**

:::

## 1️⃣3️⃣ ¿Qué debemos comprobar antes de buscar una solución?

Si DHCP no funciona entre redes, no debemos asumir inmediatamente que el problema es el router.

Comprobaremos de forma ordenada:

```text
¿Las subredes están bien calculadas?
        ↓
¿Las interfaces del router tienen IP correcta?
        ↓
¿El servidor tiene configuración estática correcta?
        ↓
¿Existe el ámbito adecuado?
        ↓
¿El ámbito está activo?
        ↓
¿El cliente utiliza DHCP?
        ↓
¿Dónde se detiene el intercambio?
```

Packet Tracer nos permitirá visualizar parte de este recorrido mediante el **modo Simulation**.

## 1️⃣4️⃣ Recuperamos conceptos de la UT0

Este problema reúne varios conceptos que ya conocemos.

| Concepto | Papel en este escenario |
|---|---|
| Subred | Cliente y servidor pertenecen a redes diferentes |
| Broadcast | El cliente lo utiliza inicialmente para localizar DHCP |
| Router | Separa las redes y los dominios de broadcast |
| Gateway | Permite normalmente salir de la subred cuando el host ya está configurado |
| Dirección IP | Identifica interfaces y redes |
| Máscara | Permite determinar si un destino está en la misma subred |

DHCP nos permite comprobar que estos conceptos no funcionan de forma aislada.

## 1️⃣5️⃣ ¿Cuál podría ser la solución?

Necesitamos algún mecanismo situado en la red del cliente que pueda:

```text
1. Recibir la solicitud DHCP local
2. Hacerla llegar al servidor situado en otra red
3. Permitir que el servidor identifique la red de origen
4. Facilitar que la respuesta vuelva al cliente
```

Conceptualmente:

```text
CLIENTE
   │
   │ broadcast DHCP
   ▼
RED LOCAL
   │
   ▼
¿INTERMEDIARIO?
   │
   │ petición hacia servidor
   ▼
ROUTER / OTRAS REDES
   │
   ▼
SERVIDOR DHCP
```

Ese mecanismo será el protagonista del siguiente apartado.

## 1️⃣6️⃣ Una pista: no necesitamos un servidor en cada red

Una posible solución sería instalar un servidor DHCP independiente en cada subred.

Pero en una red con muchas subredes esto puede complicar innecesariamente la administración.

Por ejemplo:

```text
RED 10 → servidor DHCP
RED 20 → servidor DHCP
RED 30 → servidor DHCP
RED 40 → servidor DHCP
```

Nos interesa estudiar cómo un **servidor DHCP centralizado** puede atender clientes situados en otras redes.

Para ello necesitaremos hacer llegar las solicitudes DHCP hasta él.

## 1️⃣7️⃣ Preguntas que debemos saber responder

Después de este apartado debemos poder explicar:

1. ¿Qué cambia cuando cliente y servidor están en subredes diferentes?
2. ¿Por qué el cliente utiliza broadcast inicialmente?
3. ¿Hasta dónde llega normalmente ese broadcast?
4. ¿Qué papel tiene el router?
5. ¿Por qué el servidor remoto no recibe directamente el Discover?
6. ¿Por qué no basta con decir que «el cliente usa su gateway»?
7. ¿Qué ámbito debería utilizar el servidor para un cliente de cada subred?
8. ¿Qué mecanismo necesitamos para comunicar la solicitud con un servidor remoto?

## 1️⃣8️⃣ Resumen

En una única red:

```text
CLIENTE ───────── SERVIDOR DHCP
       broadcast
           ✓
```

Cuando existe un router entre ambos:

```text
CLIENTE ── SWITCH ── ROUTER ── SWITCH ── DHCP
                       ✕
               broadcast local
```

El problema fundamental es:

> **El broadcast DHCP inicial del cliente no atraviesa normalmente el router para llegar a un servidor situado en otra subred.**

Por tanto, necesitamos un mecanismo que permita transportar o reenviar esas solicitudes hacia el servidor DHCP adecuado.

En el siguiente apartado estudiaremos ese mecanismo:

# **DHCP Relay**
