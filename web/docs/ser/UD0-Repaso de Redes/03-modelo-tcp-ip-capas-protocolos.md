---
sidebar_position: 3
sidebar_label: "0.3. Modelo TCP/IP"
title:  "Modelo TCP/IP: capas y protocolos"
---

# Modelo TCP/IP: capas y protocolos

Cuando dos equipos se comunican a través de una red intervienen muchos
elementos al mismo tiempo: **aplicaciones, puertos, direcciones IP,
direcciones MAC, tarjetas de red, switches, routers**, etc.

Para entender y organizar todo este proceso utilizamos **modelos de
red**.

En este apartado estudiaremos el **modelo TCP/IP**, que es el modelo en
el que se basa el funcionamiento de Internet y de las redes actuales.

## 1️⃣ ¿Qué significa TCP/IP?

`TCP/IP` procede de dos de los protocolos fundamentales de esta
arquitectura:

-   **TCP --- Transmission Control Protocol:** Protocolo de Control de
    Transmisión.
-   **IP --- Internet Protocol:** Protocolo de Internet.

Sin embargo, TCP/IP no es únicamente TCP e IP.

Cuando hablamos de **TCP/IP** nos referimos a un conjunto o **familia de
protocolos** que trabajan conjuntamente para permitir la comunicación
entre dispositivos.

Algunos de ellos son:

```text
HTTP   HTTPS   DNS   DHCP
TCP    UDP
IP     ICMP
ARP
Ethernet   Wi-Fi
```

Cada protocolo tiene una función diferente. Para organizarlos, los
agrupamos en **capas**.

## 2️⃣ ¿Por qué utilizamos capas?

Imaginemos que queremos acceder desde nuestro ordenador a una página
web.

El usuario únicamente ve:

```text
Navegador
    ↓
https://www.ejemplo.com
```

Pero para que esa petición llegue al servidor deben resolverse
diferentes problemas:

-   ¿Qué servicio quiero utilizar?
-   ¿Cómo identifico la aplicación destino?
-   ¿A qué equipo quiero llegar?
-   ¿Está en mi red o en otra?
-   ¿Qué dispositivo de mi LAN debe recibir la información?
-   ¿Cómo envío físicamente los bits?

En lugar de diseñar un único protocolo que resuelva todos estos
problemas, las funciones se dividen en **capas**.

Cada capa tiene unas responsabilidades concretas.

:::info[Idea fundamental]

Dividir la comunicación en capas permite que
los protocolos sean más independientes y facilita el **diseño,
mantenimiento y evolución de las redes**.

:::

## 3️⃣ Las cuatro capas del modelo TCP/IP

Utilizaremos el modelo TCP/IP de **cuatro capas**:

| Capa | Función principal | Ejemplos |
| --- | --- | --- |
| **4. Aplicación** | Servicios utilizados por las aplicaciones | `HTTP`, `HTTPS`, `DNS`, `DHCP` |
| **3. Transporte** | Comunicación entre aplicaciones | `TCP`, `UDP` |
| **2. Internet** | Comunicación entre equipos y redes | `IP`, `ICMP` |
| **1. Acceso a la red** | Comunicación dentro de la red local y transmisión por el medio | Ethernet, Wi-Fi, `ARP`\* |

Representado gráficamente:

```text
┌────────────────────────────────┐
│ 4. APLICACIÓN                  │
│ HTTP, HTTPS, DNS, DHCP...      │
├────────────────────────────────┤
│ 3. TRANSPORTE                  │
│ TCP, UDP                       │
├────────────────────────────────┤
│ 2. INTERNET                    │
│ IP, ICMP                       │
├────────────────────────────────┤
│ 1. ACCESO A LA RED             │
│ Ethernet, Wi-Fi, ARP*          │
└────────────────────────────────┘
```

:::note[Sobre ARP]

`ARP` tiene una posición particular porque
relaciona IPv4 con las direcciones MAC. En este nivel introductorio lo
estudiaremos asociado al **acceso a la red local**, sin entrar todavía
en discusiones más precisas sobre su clasificación.

:::

## 4️⃣ Capa de aplicación

La **capa de aplicación** es la más cercana al usuario.

Contiene los protocolos que permiten proporcionar diferentes **servicios
de red**.

| Protocolo | Acrónimo | Función |
| --- | --- | --- |
| `HTTP` | Hypertext Transfer Protocol | Acceso a páginas y recursos web |
| `HTTPS` | Hypertext Transfer Protocol Secure | HTTP con comunicación protegida mediante TLS |
| `DNS` | Domain Name System | Traduce nombres a direcciones IP |
| `DHCP` | Dynamic Host Configuration Protocol | Proporciona configuración de red automáticamente |
| `FTP` | File Transfer Protocol | Transferencia de archivos |
| `SSH` | Secure Shell | Acceso remoto seguro |

Por ejemplo, cuando utilizamos un navegador:

```text
USUARIO
   │
   ↓
NAVEGADOR
   │
   ↓
HTTP / HTTPS
```

Cuando escribimos:

```text
www.educarex.es
```

también será necesario utilizar `DNS` para averiguar la dirección IP
correspondiente.

### 🟩 Aplicación no significa protocolo

La capa se denomina **aplicación**, pero esto no significa que Chrome,
Firefox o Edge sean protocolos.

Debemos distinguir:

```text
Chrome / Firefox / Edge
          ↓
     APLICACIONES

HTTP / HTTPS
     ↓
 PROTOCOLOS
```

:::tip[Recuerda]

Una **aplicación** utiliza uno o varios **protocolos** para comunicarse.

:::

## 5️⃣ Capa de transporte

La **capa de transporte** se encarga de la comunicación entre las
aplicaciones que se ejecutan en los equipos origen y destino.

Sus dos protocolos principales son `TCP` y `UDP`.

### 🟧 TCP --- Transmission Control Protocol

`TCP` proporciona una comunicación **orientada a conexión y fiable**.

De forma simplificada, TCP incorpora mecanismos para controlar
cuestiones como:

-   ¿Ha llegado la información?
-   ¿Ha llegado correctamente?
-   ¿Ha llegado en el orden adecuado?

### 🟥 UDP --- User Datagram Protocol

`UDP` significa **User Datagram Protocol**, o Protocolo de Datagramas de
Usuario.

Es más sencillo y no ofrece las mismas garantías de entrega que TCP.

:::tip[Recuerda]

**TCP** → prioriza control y fiabilidad.

**UDP** → prioriza sencillez y baja sobrecarga.

:::

Estudiaremos ambos con detalle en el punto 10.

### 🟪 Los puertos aparecen en la capa de transporte

Un ordenador puede ejecutar simultáneamente muchos servicios y
aplicaciones.

La dirección IP identifica el equipo, pero necesitamos saber **qué
aplicación o servicio debe recibir los datos**.

Para ello se utilizan los **puertos**.

```text
SERVIDOR
IP: 192.168.1.10
│
├── TCP 80  → servicio HTTP
├── TCP 443 → servicio HTTPS
└── TCP 22  → servicio SSH
```

:::info[Idea fundamental]

La **dirección IP** nos ayuda a llegar al
equipo; el **puerto** permite identificar el proceso o servicio de
destino.

:::

Estudiaremos los puertos con detalle en el punto 11.

## 6️⃣ Capa de Internet

La **capa de Internet** se encarga principalmente del direccionamiento y
del envío de información entre equipos que pueden encontrarse en redes
diferentes.

El protocolo fundamental es:

**IP --- Internet Protocol**

IP utiliza direcciones IP para identificar las interfaces de los
dispositivos dentro de una red IP y permitir el encaminamiento de
paquetes.

```text
PC-A
192.168.1.20
      │
      │
   ROUTER
      │
      │
192.168.2.30
PC-B
```

El protocolo IP permite que la información pueda viajar desde
`192.168.1.20` hasta `192.168.2.30`, atravesando routers si es
necesario.

En esta capa estudiaremos:

-   `IPv4`
-   `IPv6`
-   Direcciones IP.
-   Máscaras.
-   Prefijos.
-   Redes.
-   Routers.
-   Enrutamiento.

### 🟦 ICMP

Otro protocolo importante relacionado con la capa de Internet es:

**ICMP --- Internet Control Message Protocol**, o Protocolo de Mensajes
de Control de Internet.

ICMP se utiliza para enviar información de **control y diagnóstico**
relacionada con IP.

Una herramienta que utiliza ICMP habitualmente es `ping`.

```powershell
ping 192.168.1.10
```

De forma simplificada:

```text
PC-A                                      PC-B
 │                                         │
 │────── ICMP Echo Request ───────────────>│
 │                                         │
 │<───── ICMP Echo Reply ─────────────────│
 │                                         │
```

:::tip[Herramienta de diagnóstico]

`ping` será una de nuestras
herramientas fundamentales para comprobar y diagnosticar la conectividad
de red.

:::

## 7️⃣ Capa de acceso a la red

La capa inferior es la **capa de acceso a la red**.

Se encarga de la comunicación a través de la red directamente conectada
y de la transmisión de la información utilizando el medio
correspondiente.

Aquí encontramos tecnologías como:

-   **Ethernet** → redes cableadas.
-   **Wi-Fi** → redes inalámbricas.

En una LAN Ethernet aparecen elementos que ya conocemos:

-   NIC.
-   Direcciones MAC.
-   Switches.
-   Cables Ethernet.
-   Tramas.

```text
PC-A ───────── SWITCH ───────── PC-B
MAC-A                            MAC-B
```

El switch utiliza principalmente las **direcciones MAC** para entregar
las tramas dentro de la LAN.

### 🟩 ¿Dónde encaja ARP?

`ARP` significa **Address Resolution Protocol --- Protocolo de
Resolución de Direcciones**.

ARP permite relacionar una **dirección IPv4** con una **dirección MAC**
dentro de la red local.

Supongamos que `PC-A` quiere comunicarse con:

```text
192.168.1.20
```

Para enviar una trama Ethernet necesita conocer la dirección MAC
correspondiente.

ARP permite resolver:

```text
IPv4
192.168.1.20
      │
      ↓ ARP
      │
MAC
A4-71-74-22-19-03
```

Lo estudiaremos detenidamente en el punto 4.

## 8️⃣ Una comunicación completa

Supongamos que nuestro ordenador quiere acceder mediante HTTP a un
servidor web:

```text
CLIENTE
192.168.1.20
      ↓
SERVIDOR
192.168.1.10
```

Podemos analizar la comunicación por capas.

### 🟧 Capa de aplicación

Queremos acceder a una página web:

```text
HTTP
```

### 🟥 Capa de transporte

HTTP utilizará TCP. Por ejemplo:

```text
TCP
Puerto destino: 80
```

### 🟪 Capa de Internet

Necesitamos alcanzar:

```text
IP destino: 192.168.1.10
```

### 🟦 Capa de acceso a la red

Si el destino está directamente en nuestra LAN, necesitaremos enviar la
información mediante Ethernet hacia la MAC correspondiente:

```text
MAC destino: 48-2A-E3-15-8C-91
```

Podemos representarlo así:

```text
┌─────────────────────────────────┐
│ APLICACIÓN                      │
│ HTTP                            │
│ "Quiero una página web"         │
├─────────────────────────────────┤
│ TRANSPORTE                      │
│ TCP → puerto 80                 │
│ "Quiero este servicio"          │
├─────────────────────────────────┤
│ INTERNET                        │
│ IP → 192.168.1.10               │
│ "Quiero llegar a este host"     │
├─────────────────────────────────┤
│ ACCESO A LA RED                 │
│ Ethernet → MAC destino          │
│ "Lo envío por esta LAN"         │
└─────────────────────────────────┘
```

:::info[Idea fundamental]

Una de las relaciones más importantes de
esta unidad es:

**Servicio → puerto → dirección IP → dirección MAC**

Cada elemento resuelve un problema diferente.

:::

## 9️⃣ Encapsulación y desencapsulación

### 🟩 Encapsulación

Cuando una aplicación genera información, esta va pasando de la capa
superior a la inferior.

Cada capa añade información necesaria para realizar su función.

Este proceso se denomina **encapsulación**.

```text
APLICACIÓN
    │
    │ Datos
    ↓
TRANSPORTE
    │
    │ Cabecera TCP/UDP + Datos
    ↓
INTERNET
    │
    │ Cabecera IP + TCP/UDP + Datos
    ↓
ACCESO A LA RED
    │
    │ Cabecera Ethernet + IP + TCP/UDP + Datos
    ↓
   RED
```

Podemos imaginarlo como introducir una carta dentro de varios sobres,
cada uno con información diferente.

### 🟧 Unidades de datos: trama, paquete y segmento

Dependiendo de la capa, la información recibe diferentes nombres.

| Capa | Unidad de datos |
| --- | --- |
| **Aplicación** | Datos |
| **Transporte con TCP** | Segmento |
| **Transporte con UDP** | Datagrama |
| **Internet** | Paquete IP |
| **Acceso a la red** | Trama |

Por ejemplo:

```text
HTTP
 │
 ↓
DATOS
 │
 ↓ TCP
SEGMENTO
 │
 ↓ IP
PAQUETE
 │
 ↓ Ethernet
TRAMA
```

No es exactamente lo mismo hablar de **trama Ethernet** que de **paquete
IP**.

Una trama puede transportar un paquete IP:

```text
┌─────────────────────────────────────┐
│ TRAMA ETHERNET                      │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ PAQUETE IP                    │  │
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ SEGMENTO TCP            │  │  │
│  │  │                         │  │  │
│  │  │ DATOS                   │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

Esto es la **encapsulación**.

### 🟥 Desencapsulación

Cuando la información llega al equipo destino ocurre el proceso
contrario:

```text
RED
 ↓
TRAMA ETHERNET
 ↓
PAQUETE IP
 ↓
SEGMENTO TCP
 ↓
DATOS
 ↓
APLICACIÓN
```

Este proceso se denomina **desencapsulación**.

```text
ORIGEN                                DESTINO

Aplicación                            Aplicación
    ↓                                    ↑
Transporte                            Transporte
    ↓                                    ↑
Internet                              Internet
    ↓                                    ↑
Acceso ───────────── RED ───────────→ Acceso

ENCAPSULACIÓN                    DESENCAPSULACIÓN
```

## 🔟 El modelo OSI y su relación con TCP/IP

En redes también encontraremos frecuentemente el **modelo OSI**.

`OSI` significa **Open Systems Interconnection --- Interconexión de
Sistemas Abiertos**.

El modelo OSI utiliza **siete capas**, mientras que el modelo TCP/IP que
estamos utilizando tiene cuatro.

Una correspondencia aproximada sería:

| Modelo OSI | Modelo TCP/IP |
| --- | --- |
| 7\. Aplicación | Aplicación |
| 6\. Presentación | Aplicación |
| 5\. Sesión | Aplicación |
| 4\. Transporte | Transporte |
| 3\. Red | Internet |
| 2\. Enlace de datos | Acceso a la red |
| 1\. Física | Acceso a la red |

Gráficamente:

```text
OSI                         TCP/IP

7 Aplicación      ┐
6 Presentación    ├──────→  Aplicación
5 Sesión          ┘

4 Transporte      ───────→  Transporte

3 Red             ───────→  Internet

2 Enlace          ┐
1 Física          ┴──────→  Acceso a la red
```

:::note[Importante]

En esta unidad utilizaremos principalmente **TCP/IP**, aunque es
importante reconocer el modelo **OSI** porque aparece continuamente en
documentación técnica y en el estudio de redes.

:::

## 1️⃣1️⃣ ¿En qué capa trabaja cada elemento?

Podemos hacer una primera asociación:

| Elemento | Capa TCP/IP relacionada principalmente |
| --- | --- |
| `HTTP` | Aplicación |
| `DNS` | Aplicación |
| `DHCP` | Aplicación |
| `TCP` | Transporte |
| `UDP` | Transporte |
| Puerto TCP/UDP | Transporte |
| `IPv4` / `IPv6` | Internet |
| `ICMP` | Internet |
| Router | Internet |
| Ethernet | Acceso a la red |
| Wi-Fi | Acceso a la red |
| Dirección MAC | Acceso a la red |
| Switch | Acceso a la red |
| NIC | Acceso a la red |
| `ARP` | Acceso a la red / relación IPv4-MAC |

:::warning[No simplifiques demasiado]

No debemos interpretar esta
tabla de forma demasiado rígida. Un dispositivo real puede realizar
funciones de varias capas.

:::

## 1️⃣2️⃣ Una regla útil para diagnosticar redes

El modelo de capas no es solamente teoría. También nos ayuda a buscar
averías de forma ordenada.

Si un usuario dice:

> «No me funciona Internet».

No deberíamos empezar directamente cambiando DNS.

Podemos comprobar progresivamente:

```text
¿Existe conexión de red?
        ↓
ACCESO A LA RED

¿Tengo una configuración IP válida?
        ↓
INTERNET

¿Puedo alcanzar otro equipo?
        ↓
IP / ICMP

¿Funciona la comunicación TCP/UDP?
        ↓
TRANSPORTE

¿Funciona DNS, HTTP, etc.?
        ↓
APLICACIÓN
```

:::tip[Método de diagnóstico]

Podemos diagnosticar una red **desde las
capas inferiores hacia las superiores**.

Esta metodología será especialmente importante en el punto 15:
**Resolución sistemática de averías**.

:::

## 1️⃣3️⃣ Actividades de consolidación

### 🟩 Actividad 1. Clasifica por capas

Indica a qué capa del modelo TCP/IP asociarías principalmente cada
elemento:

| Elemento | Capa |
| --- | --- |
| `HTTP` |  |
| `TCP` |  |
| Dirección IP |  |
| Ethernet |  |
| `UDP` |  |
| Switch |  |
| Router |  |
| `DNS` |  |
| Dirección MAC |  |
| `ICMP` |  |
| Wi-Fi |  |
| `DHCP` |  |

### 🟧 Actividad 2. Ordena la comunicación

Un usuario abre el navegador y accede a una página web mediante HTTP.

Ordena de arriba hacia abajo:

```text
Ethernet
HTTP
IP
TCP
```

Después indica qué identifica o utiliza principalmente cada nivel:

```text
Dirección MAC
Dirección IP
Puerto
Servicio web
```

El resultado debería permitir explicar la relación:

```text
¿QUÉ servicio?
       ↓
¿QUÉ aplicación/proceso?
       ↓
¿QUÉ equipo/red?
       ↓
¿QUÉ interfaz en la LAN?
```

### 🟥 Actividad 3. ¿Qué está fallando?

Relaciona cada problema con la capa que investigarías inicialmente.

| Problema | Capa a comprobar |
| --- | --- |
| El cable Ethernet está desconectado |  |
| El equipo tiene una dirección IP incorrecta |  |
| El servidor web no responde |  |
| El switch está apagado |  |
| `ping` no alcanza la puerta de enlace |  |
| El nombre `servidor.local` no se resuelve |  |

No buscamos todavía diagnosticar completamente el problema, sino
acostumbrarnos a **pensar la red por capas**.

## 1️⃣4️⃣ Aplicación en nuestro laboratorio

Nuestro laboratorio también puede analizarse mediante el modelo TCP/IP.

Tenemos:

```text
SER-CLIENTE
     │
     │
NIC VIRTUAL
     │
     │
RED INTERNA VIRTUAL
     │
     │
NIC VIRTUAL
     │
     │
SER-SERVIDOR
```

Aunque la red sea virtual, los sistemas operativos siguen utilizando
TCP/IP exactamente igual que si estuvieran conectados mediante tarjetas
y switches físicos.

### 🟪 Actividad de laboratorio 3. Observamos las capas

Arranca `SER-Servidor` y `SER-Cliente`.

En ambos equipos ejecuta:

```powershell
ipconfig /all
```

Intenta localizar información relacionada con diferentes capas:

| Información | Concepto relacionado |
| --- | --- |
| Dirección física | MAC |
| Dirección IPv4 | IP |
| Máscara de subred | IP |
| Puerta de enlace | IP |
| Servidores DNS | Servicio de aplicación |

Después, desde `SER-Cliente`, ejecutaremos:

```powershell
ping IP_DEL_SERVIDOR
```

Por ejemplo, si la dirección del servidor fuese `192.168.10.10`:

```powershell
ping 192.168.10.10
```

Si obtenemos respuestas similares a:

```text
Respuesta desde 192.168.10.10...
```

sabemos que existe comunicación IP entre ambas máquinas y que `ICMP`
está funcionando entre ellas.

A continuación ejecuta:

```powershell
arp -a
```

Busca la dirección IP de `SER-Servidor`.

Si aparece, deberíamos encontrar una relación similar a:

| Dirección de Internet | Dirección física |
| --- | --- |
| `192.168.10.10` | `08-00-27-xx-xx-xx` |

Acabamos de observar dos niveles diferentes:

```text
IPv4 del servidor
192.168.10.10
       │
       │ ARP
       ↓
MAC del servidor
08-00-27-xx-xx-xx
```

### 🟦 Lo que acabamos de comprobar

Nuestro laboratorio ya permite relacionar conceptos que iremos
desarrollando durante toda la UD0:

```text
SER-CLIENTE
     │
     │ ping
     ↓
    ICMP
     │
     ↓
     IP
192.168.10.10
     │
     ↓
    ARP
     │
     ↓
    MAC
08-00-27-xx-xx-xx
     │
     ↓
RED VIRTUAL
     │
     ↓
SER-SERVIDOR
```

:::note[Siguiente paso]

Todavía no necesitamos comprender todos los
detalles de este proceso.

El siguiente punto, **Direcciones MAC y ARP**, nos permitirá bajar un
nivel más y explicar exactamente por qué un equipo que conoce la IP de
otro necesita averiguar también su dirección MAC para comunicarse con él
dentro de una LAN.

:::
