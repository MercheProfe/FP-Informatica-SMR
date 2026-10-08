---
sidebar_position: 14
title: "1.13. DHCP para varias subredes"
---

# 1.13. DHCP para varias subredes

Ya sabemos que **DHCP Relay** permite que un servidor DHCP atienda clientes situados en una red diferente.

Ahora ampliaremos el escenario.

Queremos utilizar un **servidor DHCP centralizado** para proporcionar configuración a clientes pertenecientes a **varias subredes**.

Nuestro escenario conceptual será:

```text
                       SERVIDOR DHCP
                            │
                          ROUTER
                     ┌──────┼──────┐
                     │      │      │
                   LAN A  LAN B  LAN C
```

Cada LAN tendrá:

- una red diferente;
- un gateway diferente;
- un ámbito DHCP diferente.

Este escenario relaciona directamente DHCP con los conocimientos de **direccionamiento IPv4 y subnetting** estudiados en la UT0.

:::info[Idea clave]

Un único servidor DHCP puede atender varias subredes.

Pero los clientes de cada subred deben recibir una configuración adecuada **a su propia red**.

:::

## 1️⃣ El problema que queremos resolver

Supongamos que nuestra organización dispone de tres redes:

```text
LAN A
LAN B
LAN C
```

Queremos evitar instalar un servidor DHCP independiente en cada una.

En lugar de:

```text
LAN A ─── DHCP A

LAN B ─── DHCP B

LAN C ─── DHCP C
```

queremos utilizar:

```text
LAN A ──┐
        │
LAN B ──┼──── SERVIDOR DHCP CENTRAL
        │
LAN C ──┘
```

El servidor deberá ser capaz de proporcionar una configuración distinta a los clientes de cada LAN.

## 2️⃣ Cada LAN es una subred diferente

Vamos a utilizar inicialmente un ejemplo sencillo:

```text
LAN A → 192.168.10.0/24
LAN B → 192.168.20.0/24
LAN C → 192.168.30.0/24
```

Las tres redes son diferentes.

Por tanto, un equipo de LAN A no puede recibir una dirección perteneciente a LAN B o LAN C.

Por ejemplo:

```text
Cliente LAN A
192.168.10.0/24
```

deberá recibir una dirección como:

```text
192.168.10.105
```

y no:

```text
192.168.20.105
```

ni:

```text
192.168.30.105
```

:::warning[DHCP debe respetar el diseño de red]

DHCP automatiza la entrega de direcciones, pero **no sustituye al diseño del direccionamiento**.

Primero debemos saber qué subred corresponde a cada LAN.

:::

## 3️⃣ Cada LAN necesita su propio gateway

Cada subred tendrá una interfaz del router que actuará como puerta de enlace para sus clientes.

Por ejemplo:

| LAN | Red | Gateway |
|---|---|---|
| LAN A | `192.168.10.0/24` | `192.168.10.1` |
| LAN B | `192.168.20.0/24` | `192.168.20.1` |
| LAN C | `192.168.30.0/24` | `192.168.30.1` |

Así:

```text
LAN A
192.168.10.0/24
Gateway → 192.168.10.1
```

```text
LAN B
192.168.20.0/24
Gateway → 192.168.20.1
```

```text
LAN C
192.168.30.0/24
Gateway → 192.168.30.1
```

El gateway entregado mediante DHCP debe corresponder a la red del cliente.

## 4️⃣ Cada LAN necesita un ámbito DHCP

Si el servidor debe atender tres subredes, necesitaremos configurar un ámbito para cada una.

Conceptualmente:

```text
SERVIDOR DHCP
      │
      ├── Ámbito LAN A
      │      192.168.10.0/24
      │
      ├── Ámbito LAN B
      │      192.168.20.0/24
      │
      └── Ámbito LAN C
             192.168.30.0/24
```

Cada ámbito contendrá los parámetros adecuados para su subred.

:::info[Relación fundamental]

Podemos pensar:

```text
SUBRED
   ↓
ÁMBITO DHCP
   ↓
RANGO + OPCIONES
```

Cada subred que queramos atender necesitará una configuración DHCP coherente con ella.

:::

## 5️⃣ Diseñar los rangos

Podríamos decidir los siguientes rangos:

| LAN | Red | Rango DHCP |
|---|---|---|
| LAN A | `192.168.10.0/24` | `192.168.10.100 - 192.168.10.150` |
| LAN B | `192.168.20.0/24` | `192.168.20.100 - 192.168.20.150` |
| LAN C | `192.168.30.0/24` | `192.168.30.100 - 192.168.30.150` |

El servidor central administrará los tres conjuntos de direcciones.

```text
Ámbito A
└── .10.100 - .10.150

Ámbito B
└── .20.100 - .20.150

Ámbito C
└── .30.100 - .30.150
```

Antes de configurar cualquier rango tendremos que comprobar que pertenece realmente a la subred correspondiente.

## 6️⃣ Configuración completa de cada ámbito

Un posible diseño sería:

### 🟩 LAN A

```text
Red:
192.168.10.0/24

Rango:
192.168.10.100 - 192.168.10.150

Gateway:
192.168.10.1
```

### 🟧 LAN B

```text
Red:
192.168.20.0/24

Rango:
192.168.20.100 - 192.168.20.150

Gateway:
192.168.20.1
```

### 🟥 LAN C

```text
Red:
192.168.30.0/24

Rango:
192.168.30.100 - 192.168.30.150

Gateway:
192.168.30.1
```

El DNS se configurará según el diseño concreto del escenario.

## 7️⃣ ¿Cómo sabe el servidor qué ámbito utilizar?

Esta es una de las preguntas más importantes.

El servidor recibe solicitudes procedentes de diferentes redes.

Necesita distinguir:

```text
¿Este cliente pertenece a LAN A?
¿A LAN B?
¿A LAN C?
```

Cuando interviene DHCP Relay, el servidor recibe información que permite determinar desde qué red se ha reenviado la solicitud.

Conceptualmente:

```text
Solicitud desde LAN A
        ↓
DHCP Relay
        ↓
Servidor identifica la red
        ↓
Selecciona Ámbito LAN A
        ↓
Entrega una IP 192.168.10.x
```

Y de la misma forma:

```text
LAN B → Ámbito LAN B → 192.168.20.x
LAN C → Ámbito LAN C → 192.168.30.x
```

:::tip[No elige un ámbito al azar]

El servidor no utiliza simplemente el primer ámbito que tenga direcciones disponibles.

Debe seleccionar el ámbito correspondiente a la red desde la que procede el cliente.

:::

## 8️⃣ ¿Dónde necesitamos DHCP Relay?

Si el servidor DHCP está en otra red, las solicitudes broadcast de los clientes no llegan directamente hasta él.

Por tanto, necesitaremos DHCP Relay en las redes remotas que deban utilizar ese servidor.

Conceptualmente:

```text
LAN A
  │
  │ DHCP broadcast
  ▼
ROUTER / RELAY
  │
  │
  ├──────────────► SERVIDOR DHCP

LAN B
  │
  │ DHCP broadcast
  ▼
ROUTER / RELAY
  │
  │
  ├──────────────► SERVIDOR DHCP

LAN C
  │
  │ DHCP broadcast
  ▼
ROUTER / RELAY
  │
  │
  └──────────────► SERVIDOR DHCP
```

En routers Cisco utilizaremos, donde corresponda:

```text
ip helper-address <IP-servidor-DHCP>
```

## 9️⃣ El relay se configura por interfaz

Recordamos que `ip helper-address` se configura en la interfaz que recibe las solicitudes DHCP de los clientes.

Si el router tiene una interfaz conectada a cada LAN:

```text
                ROUTER
              /    |    \
             /     |     \
          LAN A  LAN B  LAN C
```

tendremos que analizar qué interfaces reciben broadcasts DHCP y necesitan reenviarlos al servidor.

Conceptualmente:

```text
Interfaz LAN A
ip helper-address <servidor>

Interfaz LAN B
ip helper-address <servidor>

Interfaz LAN C
ip helper-address <servidor>
```

Siempre que el servidor esté situado fuera de esas redes y el escenario requiera relay.

:::warning[No copies comandos sin analizar la topología]

Antes de configurar cada `ip helper-address` debemos identificar:

- la red conectada a esa interfaz;
- los clientes que enviarán solicitudes por ella;
- la dirección real del servidor DHCP.

:::

## 🔟 Relación con subnetting

Hasta ahora hemos utilizado tres redes `/24` porque permiten visualizar fácilmente el funcionamiento.

Pero el principio es exactamente el mismo si las subredes tienen otros prefijos.

Por ejemplo:

```text
LAN A → 192.168.10.0/26
LAN B → 192.168.10.64/26
LAN C → 192.168.10.128/26
```

Antes de configurar DHCP tendríamos que calcular para cada una:

- dirección de red;
- máscara;
- broadcast;
- rango de hosts;
- gateway;
- rango que utilizaremos para DHCP.

Aquí DHCP depende directamente de que nuestros cálculos de subnetting sean correctos.

## 1️⃣1️⃣ Ejemplo con `/26`

Recordamos que:

```text
/26 = 255.255.255.192
```

Podríamos tener:

| LAN | Red | Hosts válidos | Broadcast |
|---|---|---|---|
| A | `192.168.10.0/26` | `.1 - .62` | `.63` |
| B | `192.168.10.64/26` | `.65 - .126` | `.127` |
| C | `192.168.10.128/26` | `.129 - .190` | `.191` |

Podríamos elegir como gateways:

```text
LAN A → 192.168.10.1
LAN B → 192.168.10.65
LAN C → 192.168.10.129
```

Y después diseñar los rangos DHCP.

Por ejemplo:

```text
LAN A:
192.168.10.20 - 192.168.10.50

LAN B:
192.168.10.80 - 192.168.10.110

LAN C:
192.168.10.145 - 192.168.10.175
```

Todos ellos se encuentran dentro de los rangos de host válidos de sus respectivas subredes.

:::warning[Error grave]

Un ámbito DHCP mal calculado puede entregar direcciones que no correspondan a la red del cliente.

Por eso antes de crear el ámbito debemos resolver correctamente el direccionamiento.

:::

## 1️⃣2️⃣ Planificar antes de configurar

Para un escenario con varias subredes prepararemos primero una tabla de direccionamiento.

Por ejemplo:

| LAN | Red/prefijo | Gateway | Rango DHCP |
|---|---|---|---|
| A | `192.168.10.0/24` | `192.168.10.1` | `.100 - .150` |
| B | `192.168.20.0/24` | `192.168.20.1` | `.100 - .150` |
| C | `192.168.30.0/24` | `192.168.30.1` | `.100 - .150` |

Después podremos transformar esa planificación en:

```text
Configuración del router
+
Configuración de DHCP Relay
+
Ámbitos del servidor
```

:::tip[Primero papel, después comandos]

En escenarios con varias redes, comenzar directamente a configurar dispositivos aumenta la posibilidad de errores.

Primero diseñamos el direccionamiento y después lo implementamos.

:::

## 1️⃣3️⃣ Qué recibe un cliente de LAN A

Supongamos:

```text
LAN A:
192.168.10.0/24

Gateway:
192.168.10.1

Rango DHCP:
192.168.10.100 - 192.168.10.150
```

Un cliente podría recibir:

```text
IP:      192.168.10.105
Máscara: 255.255.255.0
Gateway: 192.168.10.1
DNS:     según configuración
```

Esto sería coherente.

Pero si recibe:

```text
IP: 192.168.20.105
```

tenemos un problema porque esa dirección pertenece a LAN B.

## 1️⃣4️⃣ Qué recibe un cliente de LAN B

Para:

```text
LAN B:
192.168.20.0/24

Gateway:
192.168.20.1

Rango:
192.168.20.100 - 192.168.20.150
```

esperamos algo similar a:

```text
IP:      192.168.20.110
Máscara: 255.255.255.0
Gateway: 192.168.20.1
```

De nuevo debemos comprobar la coherencia entre:

```text
Red física/lógica del cliente
        ↓
Ámbito seleccionado
        ↓
IP entregada
        ↓
Gateway entregado
```

## 1️⃣5️⃣ Qué recibe un cliente de LAN C

Para:

```text
LAN C:
192.168.30.0/24

Gateway:
192.168.30.1

Rango:
192.168.30.100 - 192.168.30.150
```

un cliente podría obtener:

```text
IP:      192.168.30.120
Máscara: 255.255.255.0
Gateway: 192.168.30.1
```

Así podremos comprobar que un mismo servidor está entregando configuraciones diferentes dependiendo de la subred de origen.

## 1️⃣6️⃣ El servidor DHCP no tiene que estar en esas LAN

El servidor DHCP puede estar situado en una red diferente.

Por ejemplo:

```text
Red servidores:
192.168.100.0/24

Servidor DHCP:
192.168.100.10
```

Y atender:

```text
LAN A → 192.168.10.0/24
LAN B → 192.168.20.0/24
LAN C → 192.168.30.0/24
```

Conceptualmente:

```text
                 DHCP
          192.168.100.10
                  │
                ROUTER
           ┌──────┼──────┐
           │      │      │
         LAN A  LAN B  LAN C
```

La ubicación del servidor no determina qué red debe entregar al cliente.

Lo determina la red desde la que procede la solicitud y el ámbito correspondiente.

## 1️⃣7️⃣ ¿Qué ocurre si falta un ámbito?

Supongamos que el servidor dispone de:

```text
Ámbito LAN A
Ámbito LAN B
```

pero no existe:

```text
Ámbito LAN C
```

Aunque el relay consiga hacer llegar al servidor una solicitud procedente de LAN C, el servidor no dispone de un conjunto de direcciones adecuado para esa red.

Esto nos ayuda a diferenciar:

```text
RELAY
→ hace llegar la solicitud

ÁMBITO
→ define qué configuración puede entregarse
```

Necesitamos ambos elementos correctamente configurados.

## 1️⃣8️⃣ ¿Qué ocurre si el gateway está mal?

Supongamos que un cliente de LAN B recibe:

```text
IP:
192.168.20.105

Máscara:
255.255.255.0

Gateway:
192.168.10.1
```

La dirección IP pertenece a LAN B, pero el gateway pertenece a LAN A.

El cliente ha recibido una configuración incoherente.

Por tanto:

```text
IP correcta
≠
configuración completa correcta
```

Debemos comprobar también las **opciones de cada ámbito**.

## 1️⃣9️⃣ Escenario de Packet Tracer

Este apartado se presta a una simulación más completa.

Podremos construir:

```text
                         SERVER DHCP
                              │
                            SWITCH
                              │
                            ROUTER
                       ┌──────┼──────┐
                       │      │      │
                     LAN A  LAN B  LAN C
                       │      │      │
                     PC-A   PC-B   PC-C
```

La actividad consistirá en diseñar:

1. las subredes;
2. las IP de las interfaces del router;
3. los gateways;
4. los ámbitos DHCP;
5. los rangos;
6. las opciones de cada ámbito;
7. el DHCP Relay necesario.

Después comprobaremos qué recibe cada cliente.

:::info[Objetivo de la simulación]

La práctica no consistirá únicamente en conseguir que los tres PCs reciban una IP.

Tendremos que demostrar que **cada uno recibe una configuración coherente con su propia subred**.

:::

## 2️⃣0️⃣ Tabla de comprobación

Al terminar podremos utilizar una tabla como esta:

| Cliente | LAN | IP esperada | Gateway esperado | Resultado |
|---|---|---|---|---|
| PC-A | LAN A | `192.168.10.x` | `192.168.10.1` | Por comprobar |
| PC-B | LAN B | `192.168.20.x` | `192.168.20.1` | Por comprobar |
| PC-C | LAN C | `192.168.30.x` | `192.168.30.1` | Por comprobar |

Además comprobaremos:

```text
¿La IP está dentro del rango?
¿La máscara es correcta?
¿El gateway corresponde a la LAN?
¿El servidor DHCP es el esperado?
```

## 2️⃣1️⃣ Diagnóstico por capas del problema

Si un cliente no obtiene la configuración esperada, seguiremos un orden.

```text
1. SUBNETTING
¿La red está bien calculada?
        ↓
2. ROUTER
¿Las interfaces tienen IP correcta?
        ↓
3. RELAY
¿Está configurado donde corresponde?
        ↓
4. SERVIDOR
¿Existe el ámbito de esa red?
        ↓
5. RANGO
¿Hay direcciones disponibles?
        ↓
6. OPCIONES
¿Gateway y DNS son correctos?
        ↓
7. CLIENTE
¿Qué configuración ha recibido?
```

Este método evita cambiar configuraciones al azar.

## 2️⃣2️⃣ Relación entre todos los conceptos

En este escenario ya podemos relacionar gran parte de la unidad:

```text
SUBNETTING
     ↓
SUBREDES
     ↓
ÁMBITOS DHCP
     ↓
RANGOS
     ↓
OPCIONES
     ↓
DHCP RELAY
     ↓
CONCESIONES
     ↓
CLIENTES CONFIGURADOS
```

Y el proceso DORA sigue siendo la base del intercambio DHCP.

## 2️⃣3️⃣ Preguntas que debemos saber responder

Al finalizar debemos poder explicar:

1. ¿Por qué necesitamos un ámbito por cada subred?
2. ¿Por qué cada LAN tiene un gateway diferente?
3. ¿Cómo determina el servidor qué ámbito debe utilizar?
4. ¿Qué función realiza DHCP Relay?
5. ¿Dónde se configura el relay?
6. ¿Qué ocurriría si falta el ámbito de una LAN?
7. ¿Qué ocurriría si un ámbito entrega el gateway de otra LAN?
8. ¿Cómo comprobamos que un cliente ha recibido la configuración correcta?
9. ¿Qué cálculos de subnetting debemos realizar antes de configurar DHCP?
10. ¿Por qué un servidor centralizado puede atender varias redes?

## 2️⃣4️⃣ Resumen

En una red con varias subredes:

```text
                       DHCP
                        │
                      ROUTER
                  ┌─────┼─────┐
                  │     │     │
                LAN A LAN B LAN C
```

cada LAN necesita:

```text
Red diferente
      +
Gateway propio
      +
Ámbito DHCP propio
```

El servidor DHCP central puede administrar todos los ámbitos y **DHCP Relay** permite que las solicitudes de las redes remotas lleguen hasta él.

La configuración correcta depende directamente de un buen diseño de direccionamiento:

> **Primero calculamos y diseñamos las subredes. Después configuramos DHCP.**

Este escenario será la base de las simulaciones más completas de DHCP que realizaremos con **Packet Tracer**.
