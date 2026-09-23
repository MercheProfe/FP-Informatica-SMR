---
sidebar_position: 4
title: "4. Direcciones MAC y protocolo ARP"
---

# Direcciones MAC y protocolo ARP

En una red local no basta con conocer la dirección IP de un equipo. Cuando la comunicación se realiza mediante Ethernet, las tramas utilizan **direcciones MAC** para identificar las interfaces de origen y destino.

En este apartado veremos qué es una dirección MAC, qué significa enviar una trama por **broadcast** y cómo el protocolo **ARP** permite relacionar una dirección IPv4 con una dirección MAC.

---

## 1️⃣ ¿Qué es una dirección MAC?

**MAC** significa **Media Access Control** (*Control de Acceso al Medio*).

Una dirección MAC es un identificador asociado a una **interfaz de red**. También suele denominarse **dirección física**.

En Ethernet, una dirección MAC tiene **48 bits**, es decir, **6 bytes**.

Normalmente se representa mediante 12 dígitos hexadecimales agrupados de dos en dos:

```text
00:90:2B:07:10:AB
```

También podemos encontrar otros formatos:

```text
00-90-2B-07-10-AB
0090.2B07.10AB
```

Todos representan una dirección de 48 bits:

```text
00 : 90 : 2B : 07 : 10 : AB
 ↓    ↓    ↓    ↓    ↓    ↓
8b   8b   8b   8b   8b   8b

6 × 8 = 48 bits
```

:::tip[Idea clave]

La dirección MAC identifica una **interfaz de red**, no al ordenador en abstracto.
Un equipo que tenga, por ejemplo, Ethernet y Wi-Fi dispone normalmente de una dirección MAC para cada interfaz.

:::

---

## 2️⃣ Dirección MAC frente a dirección IP

Una dirección MAC y una dirección IP no realizan la misma función.

| Dirección MAC | Dirección IP |
|---|---|
| Se utiliza en la capa de enlace | Se utiliza en la capa de red |
| Identifica una interfaz dentro de la LAN | Identifica y localiza un equipo en una red IP |
| En Ethernet tiene 48 bits | IPv4 tiene 32 bits |
| Se representa normalmente en hexadecimal | IPv4 se representa normalmente en decimal |
| Ejemplo: `00:90:2B:07:10:AB` | Ejemplo: `192.168.1.10` |

Podemos simplificarlo así:

```text
             COMUNICACIÓN

        IP                  MAC
         │                   │
         ▼                   ▼
    Capa de red        Capa de enlace
         │                   │
     Paquetes              Tramas
```

Cuando un equipo quiere enviar información a otro equipo de su LAN mediante Ethernet, necesita conocer la **dirección MAC de destino**.

---

## 3️⃣ Comunicación broadcast

**Broadcast** significa **difusión**.

En una comunicación broadcast, una trama se dirige a todos los equipos del mismo **dominio de broadcast**.

Ethernet utiliza una dirección MAC especial para ello:

```text
FF:FF:FF:FF:FF:FF
```

En algunos dispositivos también puede aparecer con este formato:

```text
FFFF.FFFF.FFFF
```

Por ejemplo:

```text
             SWITCH
          ┌────┼────┐
          │    │    │
         PC0  PC1  PC2
```

Si PC0 envía una trama a la dirección MAC de broadcast, el switch la reenvía por los demás puertos del mismo dominio de broadcast.

:::info[Importante]
**Broadcast no significa enviar información a todo Internet.**

La difusión queda limitada al correspondiente dominio de broadcast. Más adelante veremos cómo los routers separan estos dominios.
:::

---

## 4️⃣ ¿Qué problema resuelve ARP?

Supongamos que dos equipos pertenecen a la misma LAN:

```text
PC-A
IP:  192.168.1.10
MAC: AA:AA:AA:AA:AA:AA

          │
        SWITCH
          │

PC-B
IP:  192.168.1.20
MAC: BB:BB:BB:BB:BB:BB
```

PC-A quiere comunicarse con la dirección:

```text
192.168.1.20
```

Conoce la **IPv4 de destino**, pero para enviar una trama Ethernet necesita conocer también su **MAC**:

```text
IP destino  = 192.168.1.20
MAC destino = ¿?
```

Para resolver este problema se utiliza **ARP**.

**ARP** significa **Address Resolution Protocol**, o **Protocolo de Resolución de Direcciones**.

Su función es obtener la **dirección MAC asociada a una dirección IPv4** dentro de la red local.

```text
Tengo una IPv4
      │
      ▼
192.168.1.20
      │
     ARP
      │
      ▼
¿Cuál es su MAC?
```

:::tip[Recuerda]
ARP responde a una pregunta muy concreta:

**«Conozco la dirección IPv4 del destino. ¿Cuál es la dirección MAC que necesito para comunicarme con él en la LAN?»**
:::

---

## 5️⃣ ¿Cómo funciona ARP?

El proceso se realiza fundamentalmente mediante dos mensajes:

- **ARP Request** → petición.
- **ARP Reply** → respuesta.

### 🟩 Paso 1. El equipo necesita conocer una MAC

PC-A quiere comunicarse con `192.168.1.20`, pero no conoce su dirección MAC.

Por tanto, necesita resolver:

```text
192.168.1.20 → ¿MAC?
```

### 🟧 Paso 2. ARP Request

PC-A genera una **ARP Request**.

La pregunta puede expresarse de forma sencilla como:

> ¿Quién tiene la dirección IP `192.168.1.20`?

Como todavía no conoce la MAC del equipo buscado, la petición se envía mediante **broadcast**:

```text
FF:FF:FF:FF:FF:FF
```

Todos los equipos del dominio de broadcast reciben la petición.

### 🟥 Paso 3. Los equipos comprueban la IP

Cada equipo que recibe la petición comprueba la IPv4 buscada.

Los equipos cuya IP no coincide no generan la respuesta solicitada.

El equipo que posee `192.168.1.20` reconoce que la petición se refiere a él.

### 🟪 Paso 4. ARP Reply

El equipo propietario de la dirección buscada genera una **ARP Reply** e informa de su MAC.

Conceptualmente:

```text
192.168.1.20 es
BB:BB:BB:BB:BB:BB
```

La respuesta puede dirigirse al equipo que realizó la petición.

### 🟦 Paso 5. Se guarda la asociación

El equipo solicitante ya conoce:

```text
192.168.1.20 → BB:BB:BB:BB:BB:BB
```

y puede utilizar esa dirección MAC para la comunicación Ethernet.

El proceso completo puede resumirse así:

```text
PC-A                                      PC-B
192.168.1.10                         192.168.1.20
       │                                   │
       │──── ARP Request ─────────────────►│
       │     "¿Quién tiene                 │
       │      192.168.1.20?"               │
       │                                   │
       │◄──── ARP Reply ───────────────────│
       │     "Soy yo. Esta es mi MAC"      │
       │                                   │
```

---

## 6️⃣ ARP Request y ARP Reply

Es importante distinguir los dos mensajes:

| Característica | ARP Request | ARP Reply |
|---|---|---|
| Función | Preguntar por una MAC | Comunicar la MAC solicitada |
| Tipo de envío | Broadcast | Normalmente unicast |
| MAC Ethernet destino | `FF:FF:FF:FF:FF:FF` | MAC del solicitante |
| Información buscada | MAC asociada a una IPv4 | Respuesta a esa búsqueda |

Podemos resumirlo así:

```text
ARP REQUEST

"¿Quién tiene esta IPv4?"
          │
          ▼
       BROADCAST
          │
          ▼
Todos los equipos de la LAN
```

```text
ARP REPLY

"Esta IPv4 es mía.
 Esta es mi MAC."
          │
          ▼
      SOLICITANTE
```

---

## 7️⃣ La tabla ARP

No tendría sentido realizar una petición ARP cada vez que un equipo necesita enviar información al mismo destino.

Por ello, los equipos mantienen temporalmente una **tabla ARP** con asociaciones conocidas entre direcciones IPv4 y direcciones MAC.

Por ejemplo:

| Dirección IPv4 | Dirección MAC |
|---|---|
| `192.168.1.20` | `BB:BB:BB:BB:BB:BB` |
| `192.168.1.30` | `CC:CC:CC:CC:CC:CC` |

En un sistema podemos consultar esta información mediante:

```text
arp -a
```

Mientras la asociación permanezca almacenada, el equipo puede reutilizarla sin necesitar una nueva resolución ARP.

:::info[Importante]
Las entradas ARP no tienen por qué permanecer indefinidamente. Las asociaciones dinámicas se mantienen temporalmente y pueden actualizarse o eliminarse.
:::

---

## 8️⃣ Tabla ARP frente a tabla MAC del switch

La **tabla ARP** y la **tabla MAC** no son lo mismo.

| Tabla ARP | Tabla MAC |
|---|---|
| La mantienen los hosts | La mantiene el switch |
| Relaciona IPv4 ↔ MAC | Relaciona MAC ↔ puerto |
| Ayuda al host a construir la trama | Ayuda al switch a reenviar la trama |

Un equipo puede necesitar resolver:

```text
192.168.1.20
      │
     ARP
      ▼
BB:BB:BB:BB:BB:BB
```

Mientras que un switch necesita resolver:

```text
BB:BB:BB:BB:BB:BB
      │
 Tabla MAC
      ▼
   Puerto
```

### 🟩 ¿Cómo aprende el switch?

El switch observa la **MAC de origen** de las tramas que recibe y la relaciona con el puerto por el que han entrado.

Conceptualmente:

```text
Trama recibida por Fa0/1
MAC origen: AA:AA:AA:AA:AA:AA

              ↓

AA:AA:AA:AA:AA:AA → Fa0/1
```

Estas asociaciones permiten posteriormente al switch decidir por qué puerto debe reenviar determinadas tramas.

:::warning[No confundas]
**Tabla ARP:** `IPv4 ↔ MAC`

**Tabla MAC del switch:** `MAC ↔ puerto`
:::

---

## 9️⃣ Comandos que utilizaremos

Para consultar la tabla ARP:

```text
arp -a
```

Para generar tráfico hacia otro equipo podemos utilizar:

```text
ping DIRECCION_IP
```

En un switch Cisco, la tabla MAC puede consultarse desde la CLI con:

```text
enable
show mac address-table
```

Estos comandos los utilizaremos en la práctica con **Cisco Packet Tracer**.

---

## 🔟 Comprueba lo aprendido

### 🟩 Actividad 1. MAC o IP

Indica si cada elemento corresponde a una dirección **MAC** o **IPv4**:

1. `192.168.10.25`
2. `08:00:27:A4:2F:91`
3. Tiene 48 bits en Ethernet.
4. IPv4 tiene 32 bits.
5. Puede representarse utilizando números hexadecimales.
6. Se utiliza como dirección de una interfaz en una trama Ethernet.

### 🟧 Actividad 2. ARP

Un equipo conoce la dirección:

```text
192.168.1.30
```

pero desconoce su MAC.

Responde:

1. ¿Qué protocolo puede utilizar para averiguarla?
2. ¿Qué mensaje se enviará primero?
3. ¿Por qué ese mensaje utiliza broadcast?
4. ¿Qué equipo debe responder?
5. ¿Qué información podrá guardar después el equipo solicitante?

### 🟥 Actividad 3. Diferencia las tablas

Indica qué tabla utilizarías para resolver cada situación:

1. Conozco `192.168.1.20` y necesito averiguar su MAC.
2. Un switch conoce una MAC y necesita decidir por qué puerto reenviar la trama.
3. Necesito saber qué direcciones IPv4-MAC conoce actualmente un PC.
4. Quiero comprobar qué dispositivos ha aprendido dinámicamente un switch.

---

:::tip[Recuerda]
La secuencia fundamental es:

**IPv4 destino → ARP → MAC destino → trama Ethernet**

Y no debemos confundir:

**ARP: IPv4 ↔ MAC**

**Tabla MAC del switch: MAC ↔ puerto**
:::
