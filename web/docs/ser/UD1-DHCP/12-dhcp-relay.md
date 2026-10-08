---
sidebar_position: 13
title: "1.12. DHCP Relay"
---

# 1.12. DHCP Relay

En el apartado anterior encontramos un problema:

```text
CLIENTE ─── SWITCH ─── ROUTER ─── SWITCH ─── SERVIDOR DHCP
```

El cliente y el servidor DHCP están en **subredes diferentes**.

El cliente inicia DHCP mediante un broadcast, pero los routers separan los dominios de broadcast y no reenvían normalmente ese tráfico hacia otras redes.

Por tanto, necesitamos un mecanismo que permita que la solicitud del cliente llegue hasta el servidor DHCP remoto.

Ese mecanismo es **DHCP Relay**.

:::info[Idea clave]

Primero debemos comprender **por qué necesitamos DHCP Relay**.

El comando para configurarlo será sencillo. Lo importante es entender qué problema resuelve.

:::

## 1️⃣ Recordamos el problema

Supongamos que tenemos:

```text
RED A
192.168.10.0/24

RED B
192.168.20.0/24
```

Y la siguiente topología:

```text
RED A                                  RED B

PC ─── SWITCH ─── ROUTER ─── SWITCH ─── DHCP
```

El cliente pertenece a:

```text
192.168.10.0/24
```

y el servidor DHCP está en:

```text
192.168.20.0/24
```

Cuando el cliente necesita configuración envía:

```text
DHCP Discover
```

mediante broadcast.

Pero:

```text
CLIENTE
   │
   │ Discover
   ▼
SWITCH
   │
   ▼
ROUTER
   │
   ✕
   │
SERVIDOR DHCP
```

El broadcast no atraviesa normalmente el router.

## 2️⃣ ¿Qué necesitamos?

Necesitamos que algún dispositivo:

1. reciba la solicitud DHCP en la red del cliente;
2. la reenvíe hacia el servidor DHCP;
3. permita al servidor saber desde qué red procede la solicitud;
4. facilite el retorno de la respuesta al cliente.

Conceptualmente:

```text
CLIENTE
   │
   │ broadcast DHCP
   ▼
AGENTE RELAY
   │
   │ reenvío hacia el servidor
   ▼
SERVIDOR DHCP
```

El dispositivo que realiza esta función se denomina **agente DHCP Relay**.

## 3️⃣ ¿Qué es DHCP Relay?

Un **DHCP Relay** es un mecanismo que permite reenviar mensajes DHCP entre clientes y servidores situados en redes diferentes.

El agente relay actúa como intermediario.

```text
CLIENTE
   │
   │ DHCP
   ▼
RELAY
   │
   │ DHCP reenviado
   ▼
SERVIDOR
```

:::tip[No es otro servidor DHCP]

El agente relay **no sustituye al servidor DHCP**.

Su función principal es hacer posible la comunicación DHCP entre redes diferentes.

:::

## 4️⃣ ¿Dónde se encuentra el agente relay?

El agente relay debe estar conectado a la red donde se encuentran los clientes.

En nuestros escenarios de Packet Tracer, esta función la realizará normalmente el **router**.

Por ejemplo:

```text
192.168.10.0/24
        │
        │
       PC
        │
      Switch
        │
        ▼
   ┌──────────┐
   │  ROUTER  │  ← DHCP Relay
   └──────────┘
        │
        │
192.168.20.0/24
        │
        ▼
Servidor DHCP
192.168.20.10
```

El router recibe la solicitud DHCP procedente de la red del cliente y la reenvía al servidor.

## 5️⃣ Del broadcast al servidor remoto

Sin DHCP Relay:

```text
CLIENTE
   │
   │ broadcast
   ▼
ROUTER
   │
   ✕
   │
SERVIDOR
```

Con DHCP Relay:

```text
CLIENTE
   │
   │ broadcast DHCP
   ▼
ROUTER / RELAY
   │
   │ reenvío dirigido al servidor
   ▼
SERVIDOR DHCP
```

El relay permite superar el límite impuesto por los dominios de broadcast sin hacer que el router reenvíe indiscriminadamente todos los broadcasts.

:::info[Qué estamos consiguiendo]

No estamos haciendo que el broadcast del cliente se propague libremente por todas las redes.

Estamos configurando un dispositivo para que **trate específicamente estas solicitudes DHCP y las reenvíe al servidor correspondiente**.

:::

## 6️⃣ ¿Cómo sabe el relay dónde está el servidor?

El agente relay debe conocer la dirección IP del servidor DHCP.

Supongamos:

```text
Servidor DHCP:
192.168.20.10
```

En el router tendremos que indicar que las solicitudes DHCP recibidas en la interfaz correspondiente deben reenviarse hacia:

```text
192.168.20.10
```

En routers Cisco utilizaremos:

```text
ip helper-address 192.168.20.10
```

:::warning[No memorices el comando sin entenderlo]

Antes de escribir:

```text
ip helper-address
```

debemos saber responder:

> ¿Qué solicitud estoy reenviando y hacia qué servidor quiero enviarla?

:::

## 7️⃣ ¿Dónde se configura `ip helper-address`?

Esta es una de las ideas más importantes.

El comando debe configurarse en la **interfaz del router que recibe el broadcast de los clientes**.

En nuestro ejemplo:

```text
RED CLIENTES
192.168.10.0/24
        │
        │
      Switch
        │
        ▼
Router
Interfaz: 192.168.10.1/24
```

Esa interfaz es la que recibe el Discover procedente de los clientes de `192.168.10.0/24`.

Conceptualmente:

```text
interface ...
 ip helper-address 192.168.20.10
```

:::warning[Error frecuente]

No debemos colocar `ip helper-address` simplemente en «la interfaz que está más cerca del servidor».

Debemos razonar:

> **¿Qué interfaz recibe el broadcast DHCP de los clientes?**

Ahí es donde necesitamos el relay para esa red.

:::

## 8️⃣ Ejemplo completo

Tenemos:

```text
RED A
192.168.10.0/24

Gateway:
192.168.10.1

RED B
192.168.20.0/24

Servidor DHCP:
192.168.20.10
```

Topología:

```text
PC0
 │
Switch0
 │
 │ 192.168.10.1
Router0
 │ 192.168.20.1
 │
Switch1
 │
Servidor DHCP
192.168.20.10
```

En la interfaz del router conectada a `192.168.10.0/24` configuraremos conceptualmente:

```text
ip helper-address 192.168.20.10
```

Así indicamos:

> Las solicitudes DHCP que lleguen desde esta red deben ser reenviadas al servidor `192.168.20.10`.

## 9️⃣ ¿Qué ocurre ahora con DORA?

El proceso sigue siendo DHCP, pero ahora existe un intermediario.

De forma simplificada:

```text
CLIENTE            RELAY                SERVIDOR

   │                  │                     │
   │ Discover         │                     │
   │─────────────────>│                     │
   │                  │──── reenvío ───────>│
   │                  │                     │
   │                  │<──── Offer ─────────│
   │<─────────────────│                     │
   │                  │                     │
   │ Request          │                     │
   │─────────────────>│                     │
   │                  │──── reenvío ───────>│
   │                  │                     │
   │                  │<──── ACK ───────────│
   │<─────────────────│                     │
```

El relay permite que cliente y servidor participen en el proceso aunque estén separados por un router.

## 🔟 ¿Cómo sabe el servidor de qué red es el cliente?

Este punto es fundamental.

Imaginemos que un mismo servidor DHCP atiende:

```text
192.168.10.0/24
192.168.20.0/24
192.168.30.0/24
```

El servidor debe saber qué ámbito utilizar.

No puede entregar una dirección de:

```text
192.168.30.0/24
```

a un cliente situado en:

```text
192.168.10.0/24
```

El agente relay proporciona al servidor información que permite identificar la red desde la que se ha reenviado la solicitud.

Así el servidor puede seleccionar el **ámbito correspondiente**.

Conceptualmente:

```text
Solicitud desde RED 10
        │
        ▼
Relay informa del origen
        │
        ▼
Servidor selecciona
ámbito 192.168.10.0/24
```

:::info[Relay y ámbitos trabajan juntos]

DHCP Relay resuelve cómo llega la solicitud al servidor.

Los ámbitos permiten al servidor decidir qué configuración corresponde a cada subred.

:::

## 1️⃣1️⃣ Servidor DHCP centralizado

Una de las principales utilidades de DHCP Relay es poder utilizar un **servidor DHCP centralizado**.

Sin relay podríamos pensar en:

```text
RED A → DHCP A
RED B → DHCP B
RED C → DHCP C
```

Con relay podemos plantear:

```text
RED A ──┐
        │
RED B ──┼──► SERVIDOR DHCP CENTRAL
        │
RED C ──┘
```

El servidor puede mantener distintos ámbitos:

```text
Ámbito RED A
Ámbito RED B
Ámbito RED C
```

mientras los routers o dispositivos relay hacen llegar las solicitudes.

Esto simplifica la administración en redes con varias subredes.

## 1️⃣2️⃣ ¿Qué debe existir para que funcione?

Configurar únicamente `ip helper-address` no garantiza que todo funcione.

Necesitamos que exista coherencia en toda la red:

```text
Cliente
   ↓
Relay
   ↓
Enrutamiento
   ↓
Servidor DHCP
   ↓
Ámbito adecuado
```

Debemos comprobar:

- direccionamiento correcto de las interfaces;
- conectividad entre router y servidor;
- dirección correcta del servidor DHCP;
- ámbito para la red cliente;
- rango con direcciones disponibles;
- gateway adecuado en las opciones DHCP;
- relay configurado en la interfaz correcta.

## 1️⃣3️⃣ El gateway que recibe el cliente

Supongamos que el servidor está en:

```text
192.168.20.10
```

pero el cliente pertenece a:

```text
192.168.10.0/24
```

El gateway que debe recibir el cliente **no es la dirección del servidor DHCP**.

Para la red del cliente podría ser:

```text
Gateway:
192.168.10.1
```

Es decir, la interfaz del router perteneciente a su propia subred.

:::warning[Servidor DHCP ≠ gateway]

Son funciones diferentes:

```text
Servidor DHCP
192.168.20.10
```

proporciona la configuración.

```text
Gateway del cliente
192.168.10.1
```

permite al cliente salir de su subred.

:::

## 1️⃣4️⃣ Ejemplo de ámbito remoto

Para clientes de:

```text
192.168.10.0/24
```

el servidor central podría disponer de:

```text
Ámbito:
192.168.10.0/24

Rango:
192.168.10.100 - 192.168.10.150

Gateway:
192.168.10.1

DNS:
según el diseño de la red
```

Aunque el servidor DHCP se encuentre físicamente en:

```text
192.168.20.10
```

las direcciones entregadas a esos clientes pertenecen a la **red de los clientes**, no a la red física del servidor.

## 1️⃣5️⃣ Configuración conceptual en Cisco

En Packet Tracer veremos una configuración similar a:

```text
Router> enable
Router# configure terminal
Router(config)# interface <interfaz-clientes>
Router(config-if)# ip helper-address 192.168.20.10
```

Todavía debemos sustituir:

```text
<interfaz-clientes>
```

por la interfaz real de nuestra topología.

Por ejemplo, según el router utilizado podría ser una interfaz como:

```text
GigabitEthernet0/0
```

pero no debemos copiar el nombre sin comprobar nuestro dispositivo.

:::tip[Primero identifica, luego configura]

Antes de introducir el comando:

1. identifica la red de los clientes;
2. identifica la interfaz del router conectada a esa red;
3. identifica la IP del servidor DHCP;
4. entonces configura el relay.

:::

## 1️⃣6️⃣ ¿Cómo comprobaremos que funciona?

Después de configurar DHCP Relay, el cliente solicitará configuración mediante DHCP.

Comprobaremos que recibe:

```text
IP de su subred
Máscara correcta
Gateway de su subred
DNS configurado
```

Por ejemplo:

```text
IP:      192.168.10.105
Máscara: 255.255.255.0
Gateway: 192.168.10.1
```

También verificaremos que la dirección pertenece al rango definido para `192.168.10.0/24`.

## 1️⃣7️⃣ Diagnóstico: Discover pero no hay respuesta

Si el cliente no obtiene dirección, seguiremos una secuencia ordenada.

```text
¿Cliente está en DHCP?
        ↓
¿Discover sale del cliente?
        ↓
¿Relay está en la interfaz correcta?
        ↓
¿helper-address apunta al servidor correcto?
        ↓
¿Existe conectividad hasta el servidor?
        ↓
¿Existe ámbito para la red cliente?
        ↓
¿Está activo y tiene direcciones?
```

No cambiaremos varios elementos simultáneamente.

## 1️⃣8️⃣ Error típico: ámbito equivocado

Supongamos:

```text
Cliente:
192.168.10.0/24

Servidor:
192.168.20.10
```

y en el servidor únicamente existe:

```text
Ámbito:
192.168.20.0/24
```

Configurar DHCP Relay no crea automáticamente un ámbito para:

```text
192.168.10.0/24
```

Necesitamos que el servidor disponga de la configuración correspondiente a la red de los clientes.

:::warning[Relay no sustituye al ámbito]

El relay consigue que la solicitud llegue.

El servidor sigue necesitando saber **qué direcciones y opciones debe proporcionar a esa subred**.

:::

## 1️⃣9️⃣ Comparación: sin relay y con relay

| Situación | Sin DHCP Relay | Con DHCP Relay |
|---|---|---|
| Cliente y servidor misma subred | Puede funcionar directamente | Normalmente no es necesario |
| Cliente y servidor distintas subredes | El broadcast inicial no llega directamente | El relay reenvía la solicitud |
| Servidor centralizado | Limitado sin mecanismo adicional | Puede atender varias redes |
| Configuración en router | No necesaria para DHCP local | Relay en interfaz de clientes |

## 2️⃣0️⃣ Preguntas que debemos saber responder

Al finalizar debemos poder explicar:

1. ¿Qué problema resuelve DHCP Relay?
2. ¿Qué es un agente relay?
3. ¿Por qué es necesario cuando servidor y cliente están en redes distintas?
4. ¿Qué dispositivo puede actuar como relay en nuestro escenario?
5. ¿Qué hace `ip helper-address`?
6. ¿Qué dirección debemos indicar en ese comando?
7. ¿En qué interfaz del router se configura?
8. ¿Cómo sabe el servidor qué ámbito debe utilizar?
9. ¿Qué gateway debe recibir el cliente?
10. ¿Por qué DHCP Relay permite centralizar el servicio?

## 2️⃣1️⃣ Resumen

El problema inicial era:

```text
CLIENTE
   │
   │ broadcast DHCP
   ▼
ROUTER
   │
   ✕
   │
SERVIDOR DHCP REMOTO
```

DHCP Relay introduce un intermediario:

```text
CLIENTE
   │
   │ broadcast
   ▼
ROUTER / DHCP RELAY
   │
   │ reenvío
   ▼
SERVIDOR DHCP CENTRAL
```

En routers Cisco utilizaremos:

```text
ip helper-address <IP-del-servidor-DHCP>
```

y lo configuraremos en la **interfaz que recibe las solicitudes de los clientes**.

Debemos recordar:

```text
DHCP Relay
      │
      ├── permite superar la separación entre dominios de broadcast
      ├── reenvía solicitudes al servidor
      ├── permite identificar la red cliente
      └── facilita utilizar un servidor DHCP centralizado
```

En el siguiente apartado ampliaremos el escenario para que un mismo servidor DHCP proporcione configuración a **varias subredes**, cada una con su propio ámbito.
