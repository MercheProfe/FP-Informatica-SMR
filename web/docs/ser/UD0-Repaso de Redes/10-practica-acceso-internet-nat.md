---
sidebar_position: 21
title: "    Práctica: acceso a Internet y NAT"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Práctica: acceso a Internet y NAT

En esta práctica relacionaremos **direccionamiento privado, gateway, routing y NAT/PAT**.

Antes de comprobar cada resultado, realiza una predicción razonada.

## 1️⃣ Parte A: diseña la LAN

Una pequeña empresa dispone de:

```text
192.168.50.0/26
```

Necesita configurar PC-ADMIN, PC-AULA, un servidor y la interfaz LAN del router.

Completa:

| Concepto | Valor |
|---|---|
| Máscara | |
| Dirección de red | |
| Primer host | |
| Último host | |
| Broadcast | |
| Hosts utilizables | |

Asigna una dirección válida a cada dispositivo y utiliza como gateway la primera dirección de host disponible.

## 2️⃣ Parte B: routing y NAT

<Tabs>
<TabItem value="pt" label="Packet Tracer" default>

Monta:

```text
PC-ADMIN ─┐
PC-AULA ──┼── SW1 ── R1 ── R2 ── SERVER-EXT
SERVER ───┘
```

Utiliza:

```text
LAN interna:       192.168.50.0/26
R1 LAN:            192.168.50.1/26

Enlace R1-R2:      10.0.0.0/30
R1 exterior:       10.0.0.1/30
R2 hacia R1:       10.0.0.2/30

Red del servidor:  198.51.100.0/24
R2 servidor:       198.51.100.1/24
SERVER-EXT:        198.51.100.20/24
Gateway servidor:  198.51.100.1
```

Asigna a los hosts internos direcciones válidas de `192.168.50.0/26` y gateway `192.168.50.1`.

### 🟩 Antes de NAT

Configura las rutas necesarias para disponer de camino de ida y retorno.

Comprueba progresivamente:

```text
PC-ADMIN → R1
R1 → R2
R2 → SERVER-EXT
PC-ADMIN → SERVER-EXT
```

Responde:

1. ¿Qué función realiza routing?
2. ¿Se traduce todavía la IP privada?
3. ¿Puede esta red de laboratorio comunicarse mediante routing aunque todavía no configuremos NAT?

:::info[Objetivo]
Esta fase separa **routing** y **NAT**. NAT no es el mecanismo que decide por qué interfaz debe viajar un paquete.
:::

### 🟧 Configura PAT

Configura R1 para distinguir:

- interfaz interior;
- interfaz exterior;
- red interna que debe traducirse.

Utiliza PAT u *overload* para compartir la dirección exterior de R1.

Genera tráfico desde varios hosts hacia SERVER-EXT.

Consulta:

```text
show ip nat translations
show ip nat statistics
```

Anota las traducciones observadas.

### 🟥 Analiza una traducción

Completa con una entrada real observada:

| Elemento | Valor observado |
|---|---|
| Host interno | |
| Dirección traducida | |
| Destino | |
| Protocolo/puertos, si aparecen | |

Explica cómo puede el router diferenciar las comunicaciones de varios hosts que comparten una dirección exterior.

</TabItem>

<TabItem value="lab" label="Laboratorio PC + servidor">

En nuestro laboratorio utilizaremos esta parte para **observar el acceso del equipo y relacionarlo con Packet Tracer**.

No convertiremos todavía Windows Server en router NAT.

### 🟩 Observa el cliente

Ejecuta:

```powershell
ipconfig /all
route print
arp -a
```

Identifica:

- IPv4;
- máscara;
- gateway;
- DNS;
- ruta por defecto;
- entrada ARP del gateway, si aparece.

### 🟧 Razona antes de probar

Para un destino remoto indicado por el profesor:

1. ¿pertenece a la red local?
2. ¿a qué equipo entregará el paquete?
3. ¿qué MAC necesita conocer?
4. ¿esperas encontrar la MAC del destino remoto en `arp -a`?

Después, si la conectividad del laboratorio lo permite:

```powershell
ping DIRECCION_REMOTA
tracert DIRECCION_REMOTA
```

### 🟥 ¿Dónde está NAT?

El cliente puede observar su configuración privada, pero NAT puede estar realizándose en otro dispositivo de la infraestructura.

Por tanto, `ipconfig` por sí solo no permite identificar una traducción NAT concreta.

:::warning[No modificar la infraestructura]
No cambies NAT, rutas ni adaptadores de VirtualBox sin indicación expresa.
:::

</TabItem>
</Tabs>

## 3️⃣ Parte C: identifica qué mecanismo falta

Analiza:

1. PC con IP correcta pero sin gateway intenta alcanzar otra red.
2. PC alcanza su gateway, pero el router no conoce ninguna ruta exterior.
3. Muchos hosts privados deben compartir una única IPv4 pública.
4. Funciona el acceso por IP, pero no mediante nombre.
5. Routing y NAT son correctos, pero una política bloquea la conexión.

Indica en cada caso qué investigarías: **gateway, routing, PAT, DNS o firewall**.

## 4️⃣ Parte D: NAT o PAT

Indica qué solución encaja mejor:

1. Correspondencia permanente entre un servidor interno y una dirección exterior concreta.
2. Cincuenta PCs deben navegar compartiendo una IPv4 pública.
3. Un router dispone de un pequeño pool de direcciones exteriores que asigna temporalmente.
4. Varios PCs comparten una IPv4 pública y realizan conexiones simultáneas.

Utiliza:

```text
NAT estático
NAT dinámico
PAT
```

## 5️⃣ Parte E: razonamiento completo

Tenemos:

```text
PC-A
IP:      172.16.20.70/27
Gateway: 172.16.20.65
DNS:     192.0.2.53
```

Responde:

1. ¿Cuál es la red de PC-A?
2. ¿Cuál es su broadcast?
3. ¿Cuál es su rango de hosts?
4. ¿Es válido el gateway?
5. ¿Qué MAC buscará mediante ARP para tráfico remoto?
6. ¿Qué función cumple DNS?
7. ¿Qué función cumple el gateway?
8. ¿Qué función cumple NAT/PAT?
9. ¿Qué información debe conservar el dispositivo NAT para entregar las respuestas?

## 6️⃣ Parte F: diagnóstico

Un usuario informa:

> «Tengo IP, pero no tengo Internet».

Diseña un procedimiento ordenado utilizando, cuando corresponda:

```text
ipconfig /all
ping
arp -a
tracert
```

Debes comprobar:

1. IP y máscara;
2. gateway;
3. comunicación con el gateway;
4. posibilidad de alcanzar una IP remota;
5. resolución DNS.

Explica qué investigarías si:

- no responde el gateway;
- responde el gateway pero no una IP remota;
- responde una IP remota pero falla un nombre.

## 7️⃣ Reto final

Un técnico afirma:

> «El problema es NAT porque el usuario no puede abrir una página web».

Explica por qué no dispone todavía de información suficiente.

Relaciona:

- configuración IP;
- gateway;
- routing;
- NAT/PAT;
- DNS;
- firewall.

## 8️⃣ Entrega

Entrega cálculos, esquema de direccionamiento, predicciones, comprobaciones, traducciones observadas, resolución de casos y procedimiento de diagnóstico.
