---
sidebar_position: 2
sidebar_label: "0.2. Dispositivos de Red"
title: "Dispositivos de red: NIC, switch, router y punto de acceso"
---

# Dispositivos de red: NIC, switch, router y punto de acceso

En una red no todos los dispositivos realizan la misma función. Algunos
son **equipos finales**, como un ordenador o un servidor, mientras que
otros se encargan de conectar dispositivos y transportar la información.

En este apartado estudiaremos cuatro elementos fundamentales:

-   **NIC --- Network Interface Card**
-   **Switch**
-   **Router**
-   **AP --- Access Point**

Al final veremos cómo aparecen estos elementos, físicamente o de forma
virtual, en nuestro laboratorio.

## 1️⃣ NIC --- Network Interface Card

`NIC` son las siglas de **Network Interface Card**, que podemos traducir
como **tarjeta de interfaz de red** o simplemente **tarjeta de red**.

Es el componente que permite que un dispositivo se conecte a una red.

```text
ORDENADOR
│
├── NIC Ethernet ───── cable ───── RED
│
└── NIC Wi-Fi ))) RED
```

Una NIC puede ser:

-   Una tarjeta Ethernet integrada en la placa base.
-   Una tarjeta Ethernet adicional.
-   Un adaptador Wi-Fi.
-   Un adaptador USB-Ethernet.
-   Una interfaz de red virtual.

### 🟩 ¿Qué hace una NIC?

Entre sus funciones encontramos:

-   Conectar el equipo al medio de transmisión.
-   Enviar información hacia la red.
-   Recibir información procedente de la red.
-   Identificar la interfaz mediante una **dirección MAC**.

```text
Ethernet
Dirección MAC: 48-2A-E3-15-8C-91

Wi-Fi
Dirección MAC: A4-71-74-22-19-03
```

Cada interfaz tiene su propia dirección MAC.

:::info[Idea fundamental]

La **dirección MAC identifica una interfaz
de red**, no al ordenador completo.

:::

Estudiaremos las direcciones MAC con detalle en el apartado 4.

## 2️⃣ Adaptadores de red físicos y virtuales

Es importante no asociar siempre una NIC con una tarjeta física. Cuando
utilizamos máquinas virtuales, podemos crear **adaptadores de red
virtuales**.

```text
PC FÍSICO
│
├── NIC Ethernet física
├── NIC Wi-Fi física
│
└── VirtualBox
    ├── SER-Servidor
    │   └── NIC virtual
    └── SER-Cliente
        └── NIC virtual
```

Desde el punto de vista de Windows instalado en la máquina virtual, esa
NIC virtual funciona prácticamente como una tarjeta de red normal.

Podremos comprobarlo posteriormente ejecutando:

```powershell
ipconfig /all
```

## 3️⃣ Switch

Un **switch** es un dispositivo utilizado para conectar dispositivos
dentro de una misma **LAN**. También podemos encontrarlo traducido como
**conmutador**.

Un switch dispone de varios puertos Ethernet:

```text
              SWITCH
       ┌─────┬─────┬─────┬─────┐
Puerto    1     2     3     4
          │     │     │     │
         PC1   PC2   PC3  SERVIDOR
```

Gracias al switch, los dispositivos de la LAN pueden intercambiar
información.

### 🟧 ¿Cómo funciona un switch?

El switch recibe **tramas Ethernet** por sus puertos y decide por qué
puerto debe enviarlas. Para tomar esta decisión utiliza las
**direcciones MAC**.

```text
              SWITCH
          ┌─────┼─────┐
          │     │     │
        PC-A  PC-B  PC-C
```

Si `PC-A` envía información a `PC-B`, el switch intenta enviarla
únicamente hacia el puerto donde se encuentra `PC-B`.

```text
PC-A ───→ SWITCH ───→ PC-B
              │
              X
             PC-C
```

Para hacerlo, el switch va aprendiendo qué direcciones MAC están
conectadas a cada uno de sus puertos.

| Puerto | Dirección MAC |
| --- | --- |
| **1** | MAC de PC-A |
| **2** | MAC de PC-B |
| **3** | MAC de PC-C |

Esta información se almacena en una **tabla MAC** o **tabla de
direcciones MAC**.

:::tip[Recuerda]

El **switch trabaja principalmente con direcciones MAC**.

:::

### 🟥 Switch frente a hub

Antiguamente se utilizaban dispositivos denominados **hub** o
**concentradores**.

Un hub no era capaz de decidir de forma inteligente por qué puerto debía
enviar una trama. Si recibía información, la repetía por todos sus
puertos:

```text
PC-A ───→ HUB
           │
       ┌───┼───┐
       ↓   ↓   ↓
     PC-B PC-C PC-D
```

Un switch, en cambio, aprende las direcciones MAC y puede enviar las
tramas hacia el puerto adecuado:

```text
PC-A ───→ SWITCH ───→ PC-B
```

Por este motivo, los switches sustituyeron prácticamente por completo a
los hubs en las redes Ethernet modernas.

## 4️⃣ Router

Un **router** es un dispositivo encargado de **comunicar redes
diferentes**. El término procede del inglés *route*, que significa ruta.
También podemos denominarlo **enrutador**.

Mientras que el switch conecta dispositivos dentro de una LAN:

```text
PC1 ─────┐
         │
PC2 ── SWITCH
         │
PC3 ─────┘
```

el router permite comunicar esa LAN con otras redes:

```text
     LAN
      │
    SWITCH
      │
    ROUTER
      │
   INTERNET
```

:::info[Idea fundamental]

**Switch → conecta dispositivos dentro de
una LAN.**

**Router → conecta redes diferentes.**

:::

### 🟪 El router y las direcciones IP

Un router toma sus decisiones principalmente utilizando **direcciones
IP**.

```text
RED A                                      RED B
192.168.1.0/24                         192.168.2.0/24

PC-A                                        PC-B
.20                                         .30
 │                                           │
SWITCH ─────────── ROUTER ─────────────── SWITCH
```

El router puede tener una interfaz conectada a cada red:

```text
               ROUTER
        ┌───────────────────┐
        │                   │
  192.168.1.1          192.168.2.1
        │                   │
      RED A               RED B
```

El router sabe que para alcanzar `192.168.2.30` debe enviar el paquete
hacia la red `192.168.2.0/24`.

Más adelante estudiaremos cómo realiza esta decisión mediante una
**tabla de enrutamiento**.

### 🟦 Gateway o puerta de enlace

Cuando un ordenador necesita comunicarse con un dispositivo que está
fuera de su propia red, normalmente envía el tráfico a un router.

La dirección del router que el ordenador utiliza para salir de su red se
denomina **Default Gateway** o **puerta de enlace predeterminada**.

```text
PC
IP:      192.168.1.20
Máscara: 255.255.255.0
Gateway: 192.168.1.1
             │
             ↓
          ROUTER
       192.168.1.1
             │
          INTERNET
```

En este caso, `192.168.1.1` es la puerta de enlace del PC.

:::note[Importante]

La **puerta de enlace no es un dispositivo diferente**: normalmente es
la dirección IP de una interfaz del router.

:::

## 5️⃣ Punto de acceso --- AP

`AP` son las siglas de **Access Point**, es decir, **punto de acceso**.

Un punto de acceso permite que dispositivos inalámbricos se conecten a
una red.

```text
              SWITCH
             ┌──┴───┐
             │      │
            PC      AP
                    )))
               ┌─────┼─────┐
              )))   )))   )))
             Móvil Tablet Portátil
```

El AP actúa como **punto de conexión entre la red inalámbrica y la red
cableada**.

### 🟩 Wi-Fi

**Wi-Fi** es el nombre utilizado para las redes inalámbricas basadas en
la familia de estándares `IEEE 802.11`.

`IEEE` son las siglas de **Institute of Electrical and Electronics
Engineers**, es decir, Instituto de Ingenieros Eléctricos y
Electrónicos.

| Estándar | Tecnología |
| --- | --- |
| `IEEE 802.3` | Ethernet |
| `IEEE 802.11` | Redes inalámbricas Wi-Fi |

No es necesario memorizar ahora las distintas versiones de `802.11`.

:::tip[Recuerda]

**Ethernet** → normalmente conexión cableada.

**Wi-Fi** → conexión inalámbrica.

:::

## 6️⃣ ¿Router Wi-Fi, switch o punto de acceso?

En una vivienda normalmente tenemos un dispositivo que denominamos
simplemente **router**. Sin embargo, ese dispositivo suele realizar
varias funciones simultáneamente.

```text
       ROUTER DOMÉSTICO
┌─────────────────────────┐
│         ROUTER          │
│           +             │
│         SWITCH          │
│           +             │
│      ACCESS POINT       │
│           +             │
│    otros servicios...   │
└─────────────────────────┘
```

Por eso podemos conectar ordenadores mediante cable Ethernet y, al mismo
tiempo, conectar móviles mediante Wi-Fi.

Aunque físicamente veamos **una sola caja**, desde el punto de vista
lógico está realizando varias funciones.

:::note[Importante]

En redes profesionales, **router, switch y punto de acceso pueden ser
dispositivos independientes**.

:::

## 7️⃣ Comparación de los principales dispositivos

| Elemento | Acrónimo | Función principal | Información que utiliza principalmente |
| --- | --- | --- | --- |
| **Tarjeta de red** | `NIC` — Network Interface Card | Conectar un dispositivo a la red | MAC |
| **Switch** | — | Conectar dispositivos de una LAN | MAC |
| **Router** | — | Comunicar redes diferentes | IP |
| **Punto de acceso** | `AP` — Access Point | Conectar dispositivos inalámbricos a la LAN | MAC |
| **Hub** | — | Repetir información por todos los puertos | No toma decisiones de destino |

:::tip[Regla para recordar]

**NIC** → conecta **EL EQUIPO** a la red.

**SWITCH** → conecta **EQUIPOS** dentro de una LAN.

**ROUTER** → conecta **REDES** diferentes.

**AP** → conecta **EQUIPOS INALÁMBRICOS** a la LAN.

:::

## 8️⃣ Ejemplo completo

```text
                 INTERNET
                    │
                  ROUTER
                    │
                  SWITCH
           ┌────────┼────────┐
           │        │        │
          PC     SERVIDOR    AP
                           )))
                      ┌──────┴──────┐
                     )))           )))
                  PORTÁTIL        MÓVIL
```

Podemos identificar:

-   **PC y servidor:** tienen una NIC Ethernet.
-   **Portátil:** puede utilizar una NIC Wi-Fi.
-   **Switch:** conecta los dispositivos de la LAN.
-   **AP:** permite incorporar dispositivos inalámbricos a la LAN.
-   **Router:** permite comunicar la LAN con Internet.

## 9️⃣ Actividades de consolidación

### 🟧 Actividad 1. ¿Qué dispositivo necesitamos?

Indica qué dispositivo utilizarías principalmente en cada situación:
**NIC, switch, router o AP**.

| Situación | Dispositivo |
| --- | --- |
| Conectar 20 ordenadores mediante |  |
| Ethernet en un aula |  |
| Comunicar la red del aula con otra |  |
| red |  |
| Permitir que los portátiles se |  |
| conecten mediante Wi-Fi |  |
| Dotar de conexión Ethernet a un |  |
| ordenador |  |
| Comunicar una LAN con Internet |  |
| Aumentar el número de equipos |  |
| cableados que podemos conectar a |  |
| una LAN |  |

Justifica brevemente cada respuesta.

### 🟥 Actividad 2. Analiza la red

```text
             INTERNET
                │
               R1
                │
               S1
          ┌─────┼─────┐
          │     │     │
         PC1   PC2   AP1
                    )))
                  Portátil
```

Responde:

1.  ¿Qué dispositivo representa `R1`?
2.  ¿Qué dispositivo representa `S1`?
3.  ¿Qué dispositivo representa `AP1`?
4.  ¿Qué dispositivo utilizará direcciones IP para decidir hacia qué red
    enviar un paquete?
5.  ¿Qué dispositivo aprenderá qué direcciones MAC están conectadas a
    sus puertos?
6.  Si eliminamos `R1`, ¿podrían `PC1` y `PC2` seguir comunicándose?
7.  Si eliminamos `R1`, ¿podría `PC1` acceder a Internet?
8.  ¿Necesita `PC1` una NIC aunque esté conectado a un switch?

## 🔟 Aplicación en nuestro laboratorio

En nuestro laboratorio no tenemos físicamente esta estructura:

```text
SER-SERVIDOR ─── SWITCH ─── SER-CLIENTE
```

Pero podemos simularla mediante **VirtualBox**.

Cada máquina virtual dispone de una o varias NIC virtuales:

```text
PC ANFITRIÓN
│
└── VirtualBox
    ├── SER-SERVIDOR
    │   └── NIC virtual
    └── SER-CLIENTE
        └── NIC virtual
```

Cuando conectamos ambas NIC a la misma **Red interna** de VirtualBox,
podemos imaginar la estructura lógica como:

```text
             RED INTERNA
              "LAN-SER"
                  │
         ┌────────┴────────┐
         │                 │
   SER-SERVIDOR       SER-CLIENTE
      NIC 1              NIC 1
```

La infraestructura de virtualización realiza aquí una función
equivalente a la infraestructura de conexión que, en un laboratorio
físico, proporcionaríamos mediante un switch.

### 🟪 Estructura final del laboratorio

Nuestro laboratorio terminará teniendo una estructura similar a esta:

```text
               INTERNET
                  │
          ┌──────────────┐
          │  VirtualBox  │
          │     NAT      │
          └──────┬───────┘
                 │
               NIC 1
          SER-SERVIDOR
               NIC 2
                 │
        ═════════════════
              LAN-SER
        ═════════════════
                 │
               NIC 1
           SER-CLIENTE
```

`SER-Servidor` tendrá **dos interfaces de red**:

```text
NIC 1 → NAT → Internet
NIC 2 → LAN-SER
```

Mientras que `SER-Cliente` estará conectado a:

```text
NIC 1 → LAN-SER
```

Esta configuración nos permitirá posteriormente utilizar `SER-Servidor`
para proporcionar **servicios de red** al cliente.

### 🟦 Actividad de laboratorio 2. Identificamos nuestras NIC

Arranca `SER-Servidor` y abre una consola:

```powershell
ipconfig /all
```

Localiza los adaptadores Ethernet. Después repite el comando en
`SER-Cliente`.

| Máquina | Adaptador | Dirección IPv4 | Dirección física (MAC) | Gateway |
| --- | --- | --- | --- | --- |
| `SER-Servidor` | NIC 1 |  |  |  |
| `SER-Servidor` | NIC 2, si existe |  |  |  |
| `SER-Cliente` | NIC 1 |  |  |  |

Finalmente, entra en **VirtualBox → Configuración → Red** de cada
máquina y relaciona lo que estás viendo:

| VirtualBox | Windows |
| --- | --- |
| Adaptador 1 | NIC / Ethernet |
| Adaptador 2 | NIC / Ethernet |

### 🟩 Pregunta final

Si `SER-Servidor` tiene dos NIC:

```text
        NIC 1
          ↑
          │
   SER-SERVIDOR
          │
          ↓
        NIC 2
```

¿Por qué crees que necesitaremos **dos interfaces** si queremos que el
servidor esté conectado simultáneamente a nuestra LAN de laboratorio y a
una red exterior?

:::note[Lo retomaremos más adelante]

No necesitamos resolver todavía
completamente la pregunta. Cuando lleguemos al punto 9, **Enrutamiento
básico**, volveremos sobre este esquema y veremos exactamente qué ocurre
con el tráfico entre ambas redes.

:::
