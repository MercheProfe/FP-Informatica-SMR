---
sidebar_position: 6
title: "Solución orientativa: ARP y tabla MAC"
sidebar_class_name: solucion
---

# Solución orientativa: ARP y tabla MAC

:::warning[Consulta la solución después de realizar la práctica]
Utiliza este apartado para comprobar tus respuestas una vez terminada la simulación.
:::

## 1️⃣ Tabla ARP inicial

Antes de generar tráfico, la tabla ARP puede estar vacía:

```text
No ARP Entries Found
```

Si existen entradas de pruebas anteriores, pueden eliminarse antes de comenzar.

## 2️⃣ ARP Request

Al ejecutar desde PC0:

```text
ping 192.168.1.20
```

PC0 conoce la IPv4 de PC1, pero necesita conocer su dirección MAC. Por ello genera una **ARP Request**.

Las MAC concretas dependen de cada simulación, pero debemos observar:

```text
Ethernet Source Address      → MAC de PC0
Ethernet Destination Address → FFFF.FFFF.FFFF
ARP Opcode                   → 0x0001
Source MAC                   → MAC de PC0
Source IP                    → 192.168.1.10
Target MAC                   → 0000.0000.0000
Target IP                    → 192.168.1.20
```

`FFFF.FFFF.FFFF` indica que la trama es **broadcast**.

La MAC objetivo dentro del mensaje ARP aparece inicialmente como desconocida porque es precisamente el dato que PC0 intenta averiguar.

## 3️⃣ Paso por el switch

El switch recibe la trama por el puerto conectado a PC0 y puede aprender, observando la **MAC de origen**:

```text
MAC de PC0 → Fa0/1
```

Como la trama es broadcast, la reenvía por los demás puertos del mismo dominio de broadcast.

PC1 y PC2 reciben la petición, pero únicamente PC1 debe generar la respuesta solicitada porque:

```text
Target IP = 192.168.1.20
IP de PC1 = 192.168.1.20
```

PC2 no es el equipo buscado.

## 4️⃣ ARP Reply

PC1 genera una **ARP Reply**.

Debemos observar:

```text
Ethernet Source Address      → MAC de PC1
Ethernet Destination Address → MAC de PC0
ARP Opcode                   → 0x0002
Source MAC                   → MAC de PC1
Source IP                    → 192.168.1.20
Target MAC                   → MAC de PC0
Target IP                    → 192.168.1.10
```

La respuesta puede ser **unicast** porque PC1 conoce la MAC de PC0 a partir de la petición recibida.

## 5️⃣ Tabla ARP de PC0

Después de la resolución ARP debe aparecer una asociación equivalente a:

```text
192.168.1.20 → MAC de PC1
```

La MAC concreta dependerá de la generada por Packet Tracer.

## 6️⃣ Tabla MAC del switch

Después de la primera comunicación deben aparecer las MAC de los equipos que hayan enviado tramas:

```text
MAC de PC0 → Fa0/1
MAC de PC1 → Fa0/2
```

PC2 puede no aparecer inicialmente.

El switch **aprende observando la MAC de origen de las tramas que recibe**. El hecho de recibir una trama broadcast no hace que aprenda automáticamente la MAC de PC2.

Después de generar tráfico con PC2:

```text
ping 192.168.1.30
```

el switch podrá aprender:

```text
MAC de PC2 → Fa0/3
```

## 7️⃣ Segundo ping

Si PC0 conserva:

```text
192.168.1.20 → MAC de PC1
```

en su tabla ARP, no necesita realizar una nueva resolución ARP antes de comunicarse de nuevo con PC1.

Mientras la asociación siga almacenada, en la simulación podremos observar el tráfico del `ping` sin una nueva ARP Request previa.

## 8️⃣ Conclusión

```text
ARP:
IPv4 ↔ MAC

Tabla MAC del switch:
MAC ↔ puerto
```

La **ARP Request** utiliza broadcast porque todavía se desconoce la MAC buscada.

La **ARP Reply** comunica la asociación solicitada y puede dirigirse al equipo que realizó la petición.
