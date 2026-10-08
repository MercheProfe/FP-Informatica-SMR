---
sidebar_position: 11
title: "1.10. Análisis DHCP con Wireshark"
---

# 1.10. Análisis DHCP con Wireshark

Hasta ahora hemos estudiado DHCP desde el servidor y desde el cliente. Ahora vamos a observar qué ocurre realmente **en la red** mientras ambos negocian una configuración.

Para ello utilizaremos **Wireshark**. El objetivo será relacionar el proceso **DORA** con los paquetes DHCP reales.

:::info[Objetivo]
No utilizaremos Wireshark únicamente para «ver paquetes». Debemos identificar **quién envía cada mensaje, a quién va dirigido, qué información contiene y qué función cumple**.
:::

## 1️⃣ ¿Qué vamos a observar?

Recordamos DORA:

```text
CLIENTE                              SERVIDOR
   │                                    │
   │──── DHCP Discover ────────────────>│
   │<─── DHCP Offer ────────────────────│
   │──── DHCP Request ─────────────────>│
   │<─── DHCP ACK ──────────────────────│
```

```text
D → Discover
O → Offer
R → Request
A → ACK
```

Wireshark nos permitirá observar estos mensajes como tráfico real.

## 2️⃣ Nuestro escenario

Utilizaremos las máquinas del laboratorio:

```text
SER-Servidor (Windows Server / DHCP)
              │
         Red interna
              │
SER-Cliente (Windows / cliente DHCP)
```

Antes de capturar comprobaremos que el servidor DHCP funciona, existe un ámbito activo, quedan direcciones disponibles y el cliente utiliza DHCP.

:::warning[Primero debe funcionar DHCP]
Wireshark no sustituye a la configuración. Primero necesitamos un escenario DHCP operativo y después analizaremos su tráfico.
:::

## 3️⃣ Seleccionar la interfaz correcta

Wireshark captura tráfico de una **interfaz de red**. Un equipo puede mostrar Ethernet, Wi-Fi y varios adaptadores virtuales.

Debemos seleccionar la interfaz por la que circula la comunicación de nuestro laboratorio.

:::tip[Antes de capturar]
Si elegimos una interfaz incorrecta, no veremos el intercambio DHCP aunque el servicio funcione perfectamente.
:::

## 4️⃣ Provocar una nueva solicitud DHCP

Necesitamos generar tráfico mientras Wireshark captura.

En `SER-Cliente` podremos utilizar:

```cmd
ipconfig /release
ipconfig /renew
```

La secuencia de trabajo será:

```text
Preparar Wireshark
      ↓
Iniciar captura
      ↓
Provocar una solicitud DHCP
      ↓
Detener captura
      ↓
Localizar y analizar los mensajes
```

El procedimiento exacto lo realizaremos paso a paso en el laboratorio.

## 5️⃣ Filtrar el tráfico DHCP

Una captura contiene muchos paquetes. Para localizar el tráfico que nos interesa utilizaremos un **filtro de visualización**.

Podemos probar:

```text
dhcp
```

Según la versión de Wireshark, el protocolo puede aparecer relacionado con **BOOTP/DHCP**.

:::info[Filtro de visualización]
El filtro no elimina ni modifica paquetes. Únicamente controla qué paquetes de la captura se muestran.
:::

## 6️⃣ DHCP Discover

El primer mensaje que buscamos es:

```text
DHCP Discover
```

El cliente está intentando localizar un servidor DHCP.

Analizaremos:

- MAC del cliente;
- direcciones origen y destino;
- broadcast;
- UDP;
- puertos utilizados.

En una obtención inicial podremos observar conceptualmente:

```text
Origen IP:  0.0.0.0
Destino IP: 255.255.255.255
```

El cliente todavía no dispone de una configuración IPv4 válida.

## 7️⃣ La MAC del cliente

Aunque inicialmente el cliente no tenga una IP válida, su interfaz sí dispone de una **dirección MAC**.

La compararemos con la mostrada por:

```cmd
ipconfig /all
```

Buscaremos la relación:

```text
MAC de SER-Cliente
       │
       ├── Windows
       └── Wireshark
```

Así podremos demostrar qué equipo está originando la solicitud.

## 8️⃣ DHCP Offer

Después del Discover, un servidor puede responder con:

```text
DHCP Offer
```

Conceptualmente:

```text
SERVIDOR
«Puedo ofrecerte esta configuración».
```

Buscaremos especialmente:

- servidor que responde;
- dirección IP ofrecida;
- información de concesión;
- opciones DHCP.

Si aparece, por ejemplo:

```text
IP ofrecida: 192.168.10.105
```

comprobaremos que pertenece al rango configurado en nuestro ámbito.

## 9️⃣ DHCP Request

El cliente continúa con:

```text
DHCP Request
```

Conceptualmente:

```text
CLIENTE
«Solicito utilizar esta configuración».
```

Analizaremos la dirección solicitada, el servidor seleccionado y los datos que permitan relacionarlo con el Offer anterior.

## 🔟 DHCP ACK

Finalmente buscamos:

```text
DHCP ACK
```

`ACK` procede de **Acknowledgement**. El servidor confirma la concesión.

En este mensaje podremos localizar información como:

- dirección asignada;
- máscara;
- duración de concesión;
- gateway;
- DNS;
- otras opciones DHCP.

Después compararemos estos datos con:

```cmd
ipconfig /all
```

## 1️⃣1️⃣ UDP y los puertos DHCP

DHCP utiliza **UDP**.

Debemos reconocer:

```text
Servidor DHCP → UDP 67
Cliente DHCP  → UDP 68
```

:::info[Puertos importantes]
**UDP 67 → servidor DHCP**

**UDP 68 → cliente DHCP**
:::

## 1️⃣2️⃣ ¿Por qué aparece broadcast?

Al comenzar una obtención inicial, el cliente no dispone todavía de una configuración IPv4 válida y no conoce inicialmente qué servidor DHCP puede atenderlo.

Por eso utiliza difusión o **broadcast**.

Una dirección importante en este proceso es:

```text
255.255.255.255
```

Esto conecta DHCP con los conceptos de broadcast estudiados en la UT0.

## 1️⃣3️⃣ Analizar las opciones DHCP

Dentro de los mensajes buscaremos opciones relacionadas con:

- máscara;
- router o gateway;
- DNS;
- duración de la concesión;
- servidor DHCP;
- dirección solicitada, cuando corresponda.

No todas las opciones tienen que aparecer exactamente igual en todos los mensajes. Debemos interpretar qué información corresponde a cada fase.

## 1️⃣4️⃣ Relacionar DORA con paquetes reales

| Fase | Mensaje | Emisor | Qué buscamos |
|---|---|---|---|
| D | Discover | Cliente | MAC, broadcast, UDP |
| O | Offer | Servidor | IP ofrecida, servidor, opciones |
| R | Request | Cliente | IP solicitada, servidor seleccionado |
| A | ACK | Servidor | Confirmación, concesión y opciones |

El objetivo es pasar de:

```text
«Sé memorizar DORA»
```

a:

```text
«Sé reconocer DORA en una captura y explicar qué ocurre».
```

## 1️⃣5️⃣ Comparar Wireshark con `ipconfig /all`

Wireshark muestra el **intercambio** y `ipconfig /all` muestra el **resultado** en el cliente.

```text
WIRESHARK                      CLIENTE

IP confirmada            →    Dirección IPv4
Máscara                  →    Máscara
Router                   →    Gateway
DNS                      →    Servidor DNS
Servidor DHCP            →    Servidor DHCP
Lease                    →    Datos de concesión
```

Esta comparación permite relacionar los paquetes capturados con la configuración finalmente utilizada por el equipo.

## 1️⃣6️⃣ ¿Qué pasa si no vemos los cuatro mensajes?

Antes de concluir que existe un fallo revisaremos:

- si la captura comenzó antes de provocar la solicitud;
- si elegimos la interfaz correcta;
- si el filtro es adecuado;
- si el cliente ya tenía una concesión;
- si realmente provocamos una nueva obtención de configuración.

Además, una **renovación** no tiene por qué mostrar exactamente el mismo intercambio que una obtención inicial.

:::warning[No fuerces la teoría sobre la captura]
La captura muestra lo que realmente ocurrió. Si no coincide con lo esperado, debemos investigar la causa.
:::

## 1️⃣7️⃣ Secuencia de análisis

```text
1. Identificar interfaz
        ↓
2. Iniciar captura
        ↓
3. Provocar tráfico DHCP
        ↓
4. Detener captura
        ↓
5. Filtrar
        ↓
6. Localizar Discover
        ↓
7. Localizar Offer
        ↓
8. Localizar Request
        ↓
9. Localizar ACK
        ↓
10. Analizar campos
        ↓
11. Comparar con ipconfig /all
```

## 1️⃣8️⃣ Qué tendremos que demostrar

Después del análisis debemos poder responder:

1. ¿Cuál es la MAC del cliente?
2. ¿Qué mensaje inicia el proceso?
3. ¿Por qué se utiliza broadcast?
4. ¿Qué servidor responde?
5. ¿Qué dirección ofrece?
6. ¿Qué dirección solicita el cliente?
7. ¿Qué mensaje confirma la concesión?
8. ¿Qué protocolo de transporte utiliza DHCP?
9. ¿Qué puertos utilizan servidor y cliente?
10. ¿Qué opciones DHCP aparecen?
11. ¿Coinciden con la configuración final del cliente?

## 1️⃣9️⃣ Wireshark como herramienta de diagnóstico

Wireshark también puede ayudarnos a localizar problemas.

Por ejemplo:

```text
Discover
   ↓
¿No aparece Offer?
```

Podemos investigar si algún servidor está respondiendo.

O:

```text
Offer
   ↓
¿Las opciones son incorrectas?
```

Podemos revisar la configuración del ámbito.

Para diagnosticar combinaremos:

```text
Configuración del servidor
          +
Configuración del cliente
          +
Captura de tráfico
```

## 2️⃣0️⃣ Resumen

Con Wireshark observaremos:

```text
Discover → Offer → Request → ACK
```

| Elemento | Qué comprobaremos |
|---|---|
| Discover | Inicio de la búsqueda |
| Offer | IP ofrecida |
| Request | Configuración solicitada |
| ACK | Confirmación de la concesión |
| MAC | Identificación del cliente |
| Broadcast | Difusión inicial |
| UDP | Protocolo de transporte |
| Puerto 67 | Servidor DHCP |
| Puerto 68 | Cliente DHCP |
| Opciones | Máscara, gateway, DNS, lease, etc. |

La finalidad no es simplemente encontrar cuatro paquetes, sino poder explicar:

> **qué ocurre en cada mensaje y cómo ese intercambio termina produciendo la configuración que observamos en el cliente.**

Después podremos reproducir y ampliar estos escenarios mediante **Packet Tracer**.
