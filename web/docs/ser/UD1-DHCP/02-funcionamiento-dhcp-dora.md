---
sidebar_position: 3
title: "1.2. Funcionamiento de DHCP: proceso DORA"
---

# 1.2. Funcionamiento de DHCP: proceso DORA

Ya sabemos que DHCP permite que un equipo obtenga automáticamente su configuración de red.

Pero aparece un problema interesante: cuando un cliente acaba de conectarse, **todavía no tiene una dirección IP válida y tampoco conoce la dirección del servidor DHCP**.

Entonces, ¿cómo consigue comunicarse con él?

La respuesta está en el proceso **DORA**, una secuencia de mensajes mediante la que cliente y servidor negocian la configuración de red.

## 1️⃣ Antes de DORA: ¿qué sabe el cliente?

Imaginemos un ordenador que acaba de arrancar y tiene configurada su tarjeta de red para obtener una dirección IP automáticamente.

En ese momento:

- conoce su propia dirección **MAC**;
- todavía no dispone de una dirección IPv4 válida para esa red;
- no conoce la dirección IP del servidor DHCP;
- necesita localizar algún servidor DHCP disponible.

Por tanto, no puede enviar inicialmente una petición a una dirección IP concreta del servidor.

:::info[Idea clave]

El cliente DHCP necesita pedir ayuda **antes de conocer su propia dirección IP y antes de saber dónde está el servidor DHCP**.

Por eso, al comienzo del proceso se utiliza **broadcast**.

:::

## 2️⃣ DHCP utiliza UDP

DHCP utiliza como protocolo de transporte **UDP (User Datagram Protocol)**.

Los puertos principales son:

| Elemento | Puerto UDP |
|---|---:|
| Servidor DHCP | 67 |
| Cliente DHCP | 68 |

De forma sencilla podemos recordarlo así:

```text
Servidor DHCP → UDP 67
Cliente DHCP  → UDP 68
```

DHCP utiliza UDP porque el cliente necesita intercambiar mensajes sencillos incluso cuando todavía no dispone de una configuración IP completa.

:::tip[Recuerda]

Un **puerto** permite identificar el servicio o aplicación que debe recibir los datos dentro de un equipo.

En DHCP:

- el servidor escucha normalmente en **UDP 67**;
- el cliente utiliza **UDP 68**.

:::

## 3️⃣ El proceso DORA

El proceso habitual mediante el que un cliente obtiene una configuración DHCP se resume con las siglas **DORA**:

```text
D → Discover
O → Offer
R → Request
A → Acknowledgement
```

La secuencia es:

```text
CLIENTE DHCP                         SERVIDOR DHCP

     │                                      │
     │──── DHCP DISCOVER ──────────────────>│
     │                                      │
     │<──── DHCP OFFER ─────────────────────│
     │                                      │
     │──── DHCP REQUEST ───────────────────>│
     │                                      │
     │<──── DHCP ACK ───────────────────────│
     │                                      │
```

Vamos a estudiar qué ocurre en cada paso.

## 4️⃣ DHCP Discover: «¿Hay algún servidor DHCP?»

El primer mensaje lo envía el **cliente**.

Se denomina:

```text
DHCP DISCOVER
```

Su objetivo es localizar servidores DHCP disponibles.

El cliente todavía no conoce la dirección IP de ningún servidor DHCP, por lo que envía inicialmente la solicitud mediante **broadcast**.

Conceptualmente está preguntando:

> «¿Hay algún servidor DHCP en esta red que pueda proporcionarme configuración?»

En IPv4, en esta fase inicial podemos encontrarnos con:

```text
IP origen:   0.0.0.0
IP destino:  255.255.255.255
```

`0.0.0.0` indica que el cliente todavía no dispone de una dirección IPv4 utilizable.

`255.255.255.255` es una dirección de **broadcast limitado**, dirigida a los equipos de la red local.

:::info[Relaciona conceptos]

Aquí reaparece un concepto de la UT0.

El **broadcast** permite enviar información a todos los equipos del dominio de broadcast.

Como el cliente no sabe qué servidor DHCP existe ni cuál es su dirección, inicialmente no puede dirigirse a uno concreto.

:::

## 5️⃣ DHCP Offer: «Puedo ofrecerte esta configuración»

Cuando un servidor DHCP recibe el Discover, puede responder con un:

```text
DHCP OFFER
```

El servidor propone al cliente una configuración.

Entre la información ofrecida puede encontrarse:

- una dirección IP;
- la máscara de red;
- la duración de la concesión;
- la identificación del servidor DHCP;
- otras opciones de configuración.

Por ejemplo:

```text
Dirección ofrecida: 192.168.10.100
Máscara:             255.255.255.0
Duración:            8 horas
Servidor DHCP:       192.168.10.10
```

:::tip[Importante]

**Offer significa oferta.**

El servidor está proponiendo una dirección al cliente. El proceso todavía no ha terminado.

:::

### ¿Puede haber más de un servidor DHCP?

Sí.

En una red podría haber varios servidores DHCP y el cliente podría recibir más de una oferta.

Por ejemplo:

```text
Servidor DHCP A ──> OFFER: 192.168.10.100
Servidor DHCP B ──> OFFER: 192.168.10.150
```

El cliente continuará el proceso con una de las ofertas recibidas.

## 6️⃣ DHCP Request: «Solicito esta oferta»

Después de recibir una oferta, el cliente envía:

```text
DHCP REQUEST
```

Con este mensaje indica qué configuración desea aceptar.

Conceptualmente:

> «Quiero utilizar la dirección que me ha ofrecido este servidor DHCP.»

Este mensaje también permite que los servidores DHCP implicados conozcan la decisión del cliente.

Si existían varias ofertas, los otros servidores pueden saber que su propuesta no ha sido seleccionada y mantener esas direcciones disponibles para otros clientes.

## 7️⃣ DHCP ACK: «Configuración confirmada»

El servidor seleccionado responde normalmente con:

```text
DHCP ACK
```

**ACK** procede de **Acknowledgement**, que podemos interpretar como confirmación.

Con este mensaje el servidor confirma la concesión y proporciona los parámetros correspondientes.

Por ejemplo:

```text
IP:       192.168.10.100
Máscara:  255.255.255.0
Gateway:  192.168.10.1
DNS:      192.168.10.10
Lease:    8 horas
```

A partir de ese momento el cliente puede aplicar esa configuración a su interfaz de red.

La secuencia completa queda:

```text
DISCOVER
   ↓
El cliente busca servidores DHCP.

OFFER
   ↓
Un servidor ofrece una configuración.

REQUEST
   ↓
El cliente solicita la oferta elegida.

ACK
   ↓
El servidor confirma la concesión.
```

:::tip[Cómo recordar DORA]

**D**iscover → descubrir servidores.

**O**ffer → recibir una oferta.

**R**equest → solicitar la oferta elegida.

**A**CK → confirmar la concesión.

:::

## 8️⃣ ¿Qué información puede recibir el cliente?

Aunque solemos decir que DHCP «da una IP», el servidor puede proporcionar mucha más información.

Entre los parámetros más habituales están:

| Parámetro | Ejemplo | Función |
|---|---|---|
| Dirección IP | `192.168.10.100` | Identifica al cliente en la red |
| Máscara | `255.255.255.0` | Permite determinar qué direcciones pertenecen a su red |
| Gateway | `192.168.10.1` | Permite comunicarse con otras redes |
| DNS | `192.168.10.10` | Permite resolver nombres |
| Duración de concesión | `8 horas` | Indica durante cuánto tiempo se concede la configuración |

Más adelante estudiaremos cómo se configuran estas opciones en nuestro servidor DHCP.

## 9️⃣ DORA y las direcciones MAC

Si inicialmente el cliente no dispone de una dirección IP válida, necesitamos otra forma de identificarlo en la red local.

Aquí interviene la **dirección MAC** de su interfaz de red.

El servidor puede identificar al cliente durante el intercambio DHCP utilizando información incluida en los mensajes, entre ella datos relacionados con su interfaz.

Esto será especialmente importante cuando estudiemos las **reservas DHCP**, donde podremos asociar una dirección determinada a un dispositivo concreto.

:::info[Conexión con la UT0]

En DHCP aparecen juntos varios conceptos que ya hemos estudiado:

- **MAC**, para identificar interfaces en la red local;
- **broadcast**, para localizar inicialmente el servicio;
- **IPv4**, para configurar el cliente;
- **UDP**, como protocolo de transporte;
- **puertos**, para identificar cliente y servidor.

DHCP es un buen ejemplo de cómo las distintas capas y protocolos de una red trabajan conjuntamente.

:::

## 🔟 ¿Qué ocurre si no responde ningún servidor?

Supongamos que el cliente envía:

```text
DHCP DISCOVER
```

pero ningún servidor responde.

El cliente no podrá completar:

```text
DISCOVER → OFFER → REQUEST → ACK
```

y, por tanto, no obtendrá la configuración esperada mediante DHCP.

Las causas podrían ser muy diferentes:

- no existe ningún servidor DHCP;
- el servicio DHCP está detenido;
- existe un problema de conectividad;
- la configuración del servidor es incorrecta;
- cliente y servidor están en redes diferentes y no existe un mecanismo que reenvíe las solicitudes.

A lo largo de la unidad aprenderemos a distinguir estas situaciones.

:::warning[No confundas el síntoma con la causa]

Que un cliente no obtenga una dirección mediante DHCP **no significa necesariamente que el servidor esté averiado**.

El problema puede encontrarse en distintos puntos de la red.

Por eso aprenderemos a comprobar el servicio de forma sistemática.

:::

## 1️⃣1️⃣ Primera comprobación desde Windows

En Windows podemos consultar la configuración de red con:

```cmd
ipconfig /all
```

Cuando trabajemos con nuestro cliente podremos observar información como:

- si DHCP está habilitado;
- dirección IPv4;
- máscara;
- puerta de enlace;
- servidor DHCP;
- servidores DNS;
- datos relacionados con la concesión.

También utilizaremos posteriormente:

```cmd
ipconfig /release
ipconfig /renew
```

Estos comandos nos permitirán liberar y solicitar de nuevo una configuración DHCP.

:::tip[De la teoría al laboratorio]

No vamos a quedarnos únicamente con el esquema DORA.

Durante la unidad provocaremos una solicitud DHCP y utilizaremos **Wireshark** para intentar localizar los mensajes:

```text
Discover
Offer
Request
ACK
```

Así podremos comprobar qué ocurre realmente en la red.

:::

## 1️⃣2️⃣ Resumen

Cuando un cliente necesita obtener configuración mediante DHCP:

```text
1. DISCOVER → busca servidores DHCP.
2. OFFER    → el servidor ofrece configuración.
3. REQUEST  → el cliente solicita la oferta seleccionada.
4. ACK      → el servidor confirma la concesión.
```

Los conceptos fundamentales de este proceso son:

| Concepto | Idea principal |
|---|---|
| DHCP | Configuración dinámica de equipos |
| DORA | Secuencia básica para obtener una concesión |
| Broadcast | Permite localizar inicialmente servidores |
| UDP | Protocolo de transporte utilizado por DHCP |
| UDP 67 | Puerto del servidor DHCP |
| UDP 68 | Puerto del cliente DHCP |
| MAC | Ayuda a identificar al cliente en la red local |
| ACK | Confirmación de la concesión |

En el siguiente apartado estudiaremos con más detalle qué significa que una dirección se entregue mediante una **concesión (lease)** y por qué una dirección obtenida mediante DHCP no tiene por qué pertenecer permanentemente al cliente.
