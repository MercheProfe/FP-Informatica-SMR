---
sidebar_position: 23
title: "    Práctica: introducción a IPv6"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Práctica: introducción a IPv6

En esta práctica trabajaremos con la representación de direcciones IPv6 y comprobaremos en Packet Tracer y en nuestro laboratorio cómo aparecen las direcciones **globales y link-local**.

## 1️⃣ Parte A: abreviación

Abrevia al máximo estas direcciones:

1.
```text
2001:0db8:0000:0000:0000:0000:0000:0010
```

2.
```text
2001:0db8:0010:0000:0000:0000:00ab:0020
```

3.
```text
fe80:0000:0000:0000:0210:5aff:feaa:0020
```

4.
```text
2001:0db8:0000:0010:0000:0000:0000:0001
```

En cada caso indica qué regla has aplicado.

## 2️⃣ Parte B: expansión

Expande hasta ocho bloques de cuatro cifras:

```text
2001:db8::1
2001:db8:10:20::25
fe80::abcd:12
::1
```

:::warning[Comprobación]
Después de expandir, cada dirección debe contener exactamente ocho bloques de cuatro cifras hexadecimales.
:::

## 3️⃣ Parte C: primera LAN IPv6

<Tabs>
<TabItem value="pt-local" label="Packet Tracer" default>

Construye:

```text
PC0 ─┐
     Switch0
PC1 ─┘
```

Configura manualmente:

```text
PC0:
2001:db8:10:1::10/64

PC1:
2001:db8:10:1::20/64
```

No necesitamos un router para esta primera prueba.

### 🟩 Predicción

Antes de hacer `ping`:

1. ¿pertenecen al mismo `/64`?
2. ¿esperas que puedan comunicarse?
3. ¿necesitan gateway para comunicarse entre ellos?

### 🟧 Comprobación

Desde PC0:

```text
ping 2001:db8:10:1::20
```

Desde PC1:

```text
ping 2001:db8:10:1::10
```

Comprueba además la configuración IPv6 disponible en el equipo.

Anota:

| Equipo | IPv6 global | IPv6 link-local |
|---|---|---|
| PC0 | | |
| PC1 | | |

### 🟥 Simulation Mode

Activa Simulation Mode y observa el tráfico relacionado con IPv6 e ICMPv6.

Responde:

1. ¿aparece una ARP Request IPv4?
2. ¿qué protocolo interviene en el descubrimiento de vecinos IPv6?
3. ¿observas mensajes ICMPv6?
4. ¿qué diferencia encuentras respecto a la práctica de ARP?

</TabItem>

<TabItem value="lab-local" label="Laboratorio PC + servidor">

En Windows, ejecuta en cliente y servidor:

```powershell
ipconfig /all
```

Busca las entradas IPv6.

Anota:

| Equipo | IPv6 global, si existe | IPv6 link-local |
|---|---|---|
| Cliente | | |
| Servidor | | |

Identifica especialmente las direcciones que comiencen por:

```text
fe80::
```

Después ejecuta:

```powershell
ping ::1
```

Responde:

1. ¿qué dirección estás comprobando?
2. ¿qué concepto IPv4 recuerda?
3. ¿aparece una dirección link-local aunque no hayas configurado manualmente una IPv6 global?

:::info[Objetivo del laboratorio]
No es necesario que el laboratorio tenga conectividad IPv6 con Internet. Queremos comprobar que Windows utiliza IPv6 y reconocer las direcciones presentes en una interfaz real.
:::

</TabItem>
</Tabs>

## 4️⃣ Parte D: dos redes IPv6

En Packet Tracer construye:

```text
Red A                              Red B

PC-A ── SW1 ── R1 ── SW2 ── PC-B
```

Utiliza:

```text
Red A:
2001:db8:10:1::/64

R1-A:
2001:db8:10:1::1/64

PC-A:
2001:db8:10:1::10/64

Red B:
2001:db8:10:2::/64

R1-B:
2001:db8:10:2::1/64

PC-B:
2001:db8:10:2::20/64
```

Configura el router para IPv6 según las indicaciones de clase.

### 🟩 Antes de probar

Responde:

1. ¿PC-A y PC-B pertenecen al mismo `/64`?
2. ¿necesitan routing?
3. ¿qué dispositivo comunica las dos redes?

### 🟧 Comprueba

Realiza pruebas progresivas:

```text
PC-A → R1-A
PC-B → R1-B
PC-A → PC-B
```

Registra:

| Prueba | Predicción | Resultado | Explicación |
|---|---|---|---|
| PC-A → R1-A | | | |
| PC-B → R1-B | | | |
| PC-A → PC-B | | | |

## 5️⃣ Parte E: SLAAC

<Tabs>
<TabItem value="pt-slaac" label="Packet Tracer" default>

Mantén una LAN conectada al router.

Configura en la interfaz del router un prefijo IPv6 `/64` y habilita el funcionamiento IPv6 necesario.

En el PC selecciona la opción de configuración automática IPv6 disponible en Packet Tracer.

Utiliza como prefijo:

```text
2001:db8:30:1::/64
```

Observa la dirección obtenida.

Completa:

| Dato | Valor observado |
|---|---|
| Prefijo | |
| IPv6 global del PC | |
| IPv6 link-local del PC | |
| Información del gateway/router | |

Responde:

1. ¿has escrito manualmente la dirección global completa del PC?
2. ¿pertenece al prefijo anunciado?
3. ¿qué mecanismo ha permitido la autoconfiguración?
4. ¿qué papel tienen los Router Advertisements?

</TabItem>

<TabItem value="lab-slaac" label="Laboratorio PC + servidor">

Ejecuta:

```powershell
ipconfig /all
```

Observa si alguna interfaz dispone de:

- dirección IPv6 global;
- dirección IPv6 temporal;
- dirección link-local;
- gateway IPv6.

No fuerces una configuración SLAAC nueva si la infraestructura del aula no dispone de un router IPv6 que anuncie prefijos.

Responde:

1. ¿qué información IPv6 aparece automáticamente?
2. ¿qué direcciones son link-local?
3. ¿puedes afirmar solo con `ipconfig` que la red utiliza SLAAC? Justifica.

:::warning[No modificar la infraestructura]
En esta parte observaremos la configuración disponible. No modificaremos routers, adaptadores ni servicios IPv6 del laboratorio sin indicación expresa.
:::

</TabItem>
</Tabs>

## 6️⃣ Parte F: IPv4 frente a IPv6

Completa:

| Pregunta | IPv4 | IPv6 |
|---|---|---|
| Longitud de dirección | | |
| Representación habitual | | |
| Loopback | | |
| Descubrimiento de vecinos | | |
| ¿Utiliza broadcast? | | |
| Prefijo habitual de LAN trabajado | | |
| Autoconfiguración estudiada | | |

## 7️⃣ Reto de diagnóstico

Un alumno configura:

```text
PC-A:
2001:db8:40:1::10/64

PC-B:
2001:db8:40:2::20/64
```

Los conecta al mismo switch y afirma:

> «Como están en el mismo switch, deberían comunicarse directamente».

Responde:

1. ¿en qué red está PC-A?
2. ¿en qué red está PC-B?
3. ¿están en el mismo `/64`?
4. ¿qué falta para comunicar ambas redes?
5. ¿qué concepto ya estudiado en IPv4 explica exactamente el mismo problema?

## 8️⃣ Entrega

Entrega:

- ejercicios de abreviación y expansión;
- tabla de direcciones observadas;
- comprobaciones de la LAN IPv6;
- pruebas entre las dos redes;
- observaciones sobre SLAAC;
- comparación IPv4/IPv6;
- resolución razonada del reto final.
