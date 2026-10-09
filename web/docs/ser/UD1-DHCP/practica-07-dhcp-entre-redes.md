---
sidebar_position: 22
title: "Práctica 7. DHCP entre redes: ¿por qué falla?"
---

# Práctica 7. DHCP entre redes: ¿por qué falla?

En las prácticas anteriores conseguimos que los clientes obtuvieran una dirección IP mediante DHCP dentro de una misma LAN. Ahora vamos a colocar **el cliente y el servidor DHCP en subredes diferentes**, separadas por un router.

**Nuestro objetivo no es conseguir que DHCP funcione todavía**, sino provocar el fallo, observarlo y explicar su causa. La solución con **DHCP Relay** se realizará en la práctica 8.

## 1️⃣ Objetivos

Al finalizar esta práctica deberás ser capaz de:

- Configurar dos subredes IPv4 distintas en Packet Tracer.
- Configurar las interfaces de un router y comprobar el direccionamiento.
- Configurar un servidor DHCP en una subred y un cliente en otra.
- Observar por qué el mensaje DHCP Discover no llega directamente al servidor remoto.
- Relacionar el problema con el broadcast y los routers.
- Diferenciar un problema de enrutamiento de un problema de descubrimiento DHCP.

## 2️⃣ Escenario de trabajo

Utilizaremos **Cisco Packet Tracer** con los siguientes dispositivos:

- 1 router Cisco con dos interfaces Ethernet.
- 2 switches.
- 1 PC cliente.
- 1 servidor (`Server-PT`).

```text
         RED A: 192.168.10.0/24           RED B: 192.168.20.0/24

 PC0 ─── Switch0 ─── Router0 ─── Switch1 ─── Server0
                        |    |
                  192.168.10.1 192.168.20.1
```

### Plan de direccionamiento

| Dispositivo | Interfaz / función | IPv4 | Máscara | Gateway |
|---|---|---|---|---|
| Router0 | Hacia RED A | `192.168.10.1` | `255.255.255.0` | — |
| Router0 | Hacia RED B | `192.168.20.1` | `255.255.255.0` | — |
| Server0 | Servidor DHCP | `192.168.20.10` | `255.255.255.0` | `192.168.20.1` |
| PC0 | Cliente DHCP | Automática | Automática | Automática |

:::info[Importante]
Los nombres de las interfaces del router dependen del modelo elegido. Identifica las dos interfaces Ethernet disponibles antes de introducir comandos. En los ejemplos se utiliza `GigabitEthernet0/0` y `GigabitEthernet0/1`; sustitúyelas si tu router utiliza otros nombres.
:::

## 3️⃣ Montaje de la topología

1. Abre Packet Tracer y crea un archivo nuevo.
2. Añade el router, los dos switches, `PC0` y `Server0`.
3. Conecta `PC0` a `Switch0`.
4. Conecta `Switch0` a una interfaz Ethernet del router.
5. Conecta la otra interfaz Ethernet del router a `Switch1`.
6. Conecta `Server0` a `Switch1`.
7. Espera a que los enlaces estén activos.

Guarda el archivo como `practica-07-dhcp-entre-redes.pkt`.

## 4️⃣ Configuración del router

Entra en la CLI de `Router0` y configura la interfaz de la RED A:

```text
Router> enable
Router# configure terminal
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ip address 192.168.10.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
```

Configura la interfaz de la RED B:

```text
Router(config)# interface gigabitEthernet 0/1
Router(config-if)# ip address 192.168.20.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# end
```

Comprueba las interfaces:

```text
Router# show ip interface brief
```

**Anota** las interfaces utilizadas y su estado. Ambas deben estar operativas.

:::warning[No configures DHCP Relay]
En esta práctica **no debes introducir `ip helper-address`**. Queremos comprobar qué ocurre cuando no existe un mecanismo de reenvío DHCP entre subredes.
:::

## 5️⃣ Configuración del servidor DHCP

En `Server0`, entra en **Desktop → IP Configuration** y configura:

```text
IP Address:       192.168.20.10
Subnet Mask:      255.255.255.0
Default Gateway:  192.168.20.1
```

Después entra en **Services → DHCP**, activa el servicio y configura un pool para los clientes de la RED A:

| Campo | Valor |
|---|---|
| Pool Name | `LAN_A` |
| Default Gateway | `192.168.10.1` |
| DNS Server | Déjalo sin configurar si el escenario lo permite |
| Start IP Address | `192.168.10.100` |
| Subnet Mask | `255.255.255.0` |
| Maximum Number of Users | `20` |

Guarda o añade el pool según la interfaz de Packet Tracer.

:::tip[¿Por qué este ámbito?]
Aunque `Server0` se encuentra en `192.168.20.0/24`, queremos que `PC0` reciba una dirección de **su propia red**, `192.168.10.0/24`.
:::

## 6️⃣ Comprobación de conectividad entre las redes

Antes de probar DHCP, necesitamos comprobar que el router y el servidor están bien configurados.

En `Server0`, abre **Desktop → Command Prompt** y ejecuta:

```text
ping 192.168.20.1
```

Desde la CLI del router, comprueba que puede alcanzar el servidor:

```text
Router# ping 192.168.20.10
```

Registra el resultado:

| Prueba | Resultado |
|---|---|
| Server0 → interfaz del router en RED B | |
| Router0 → Server0 | |

Estas pruebas verifican la conectividad del **servidor con el router**. No demuestran todavía que el cliente pueda obtener DHCP.

## 7️⃣ Intentamos obtener una dirección DHCP

En `PC0`, entra en **Desktop → IP Configuration** y selecciona **DHCP**.

Espera a que termine el intento y observa el resultado.

Registra:

| Comprobación | Resultado observado |
|---|---|
| ¿Obtiene una dirección del pool `LAN_A`? | |
| ¿Qué dirección IPv4 aparece? | |
| ¿Qué máscara aparece? | |
| ¿Qué gateway aparece? | |
| ¿Aparece algún mensaje de error? | |

:::warning[Dirección APIPA]
Si Windows o el dispositivo simulado se autoconfigura con una dirección `169.254.x.x`, **no significa que el servidor DHCP le haya concedido esa dirección**. Es una dirección de autoconfiguración local utilizada cuando no se obtiene una configuración DHCP válida.
:::

## 8️⃣ Observamos el fallo en Simulation

Vamos a buscar una evidencia del problema.

1. Cambia de **Realtime** a **Simulation**.
2. En los filtros de eventos, deja visible **DHCP**.
3. Limpia los eventos anteriores si es necesario.
4. En `PC0`, vuelve a solicitar DHCP desde **Desktop → IP Configuration**. Si ya estaba seleccionado, cambia temporalmente a **Static** y vuelve a **DHCP** para iniciar una nueva solicitud.
5. Utiliza **Capture/Forward** para avanzar paso a paso.
6. Selecciona los eventos DHCP y examina su información.

Completa:

| Pregunta de observación | Respuesta |
|---|---|
| ¿Qué mensaje DHCP envía primero PC0? | |
| ¿Se utiliza broadcast? | |
| ¿Hasta qué dispositivo llega la solicitud? | |
| ¿Aparece un DHCP Offer procedente de Server0? | |
| ¿Se completa el proceso DORA? | |

:::info[Qué debemos demostrar]
La observación debe ayudarnos a explicar por qué **un broadcast local no atraviesa normalmente un router**. No basta con indicar que «DHCP no funciona».
:::

## 9️⃣ Actividad de razonamiento

Responde con tus propias palabras:

1. ¿En qué subred está `PC0` y en cuál está `Server0`?
2. ¿Por qué `PC0` utiliza broadcast al comenzar el proceso DHCP?
3. ¿Qué dispositivo separa los dominios de broadcast?
4. ¿Por qué el servidor remoto no recibe directamente el Discover?
5. ¿Es suficiente que el servidor tenga un ámbito para `192.168.10.0/24`? Justifica la respuesta.
6. ¿Por qué no podemos suponer que el cliente ya conoce y utiliza correctamente su gateway antes de recibir DHCP?
7. ¿Qué mecanismo necesitaríamos para que las solicitudes alcanzaran al servidor sin instalar otro servidor DHCP en RED A?

## 🔟 Evidencias de la práctica

Entrega:

- El archivo de Packet Tracer `.pkt`.
- Una captura de la topología y del direccionamiento del router.
- Una captura de la configuración del pool DHCP del servidor.
- Una captura del resultado de solicitar DHCP desde `PC0`.
- Una captura del modo Simulation que muestre hasta dónde llega el Discover.
- Las respuestas a las preguntas de los apartados 8 y 9.

## 1️⃣1️⃣ Conclusión

En esta práctica hemos construido un escenario donde el servidor DHCP está operativo, pero **el cliente pertenece a otra subred**.

El problema que debemos explicar es:

```text
PC0 ── broadcast Discover ──> Router0   ✕   Server0
```

Un router no reenvía normalmente los broadcasts locales hacia otras subredes. Por tanto, necesitamos un mecanismo específico que permita hacer llegar las solicitudes DHCP al servidor remoto.

**En la práctica 8 resolveremos este problema mediante DHCP Relay y `ip helper-address`.**
