---
sidebar_position: 12
title: "Solución orientativa: máscara y CIDR"
sidebar_class_name: solucion
---

# Solución orientativa: máscara y CIDR

:::warning[Consulta la solución después de realizar la práctica]
Realiza primero los cálculos y las comprobaciones en Packet Tracer. Utiliza después este apartado para corregir tus resultados.
:::

## 1️⃣ Caso /24

```text
Máscara:           255.255.255.0
CIDR:              /24
Bits de red:       24
Bits de host:      8

Red:               192.168.1.0
Broadcast:         192.168.1.255
Primer host:       192.168.1.1
Último host:       192.168.1.254
Hosts utilizables: 254
```

Los tres equipos pertenecen a `192.168.1.0/24`.

```text
PC0 → PC1    funciona
PC0 → PC2    funciona
```

## 2️⃣ Caso /25

```text
Máscara:           255.255.255.128
CIDR:              /25
Bits de host:      7
Tamaño de bloque:  128
```

Los bloques son:

```text
192.168.1.0   – 192.168.1.127
192.168.1.128 – 192.168.1.255
```

Primer bloque:

```text
Red:          192.168.1.0
Primer host:  192.168.1.1
Último host:  192.168.1.126
Broadcast:    192.168.1.127
```

Segundo bloque:

```text
Red:          192.168.1.128
Primer host:  192.168.1.129
Último host:  192.168.1.254
Broadcast:    192.168.1.255
```

| Equipo | Dirección | Red |
|---|---|---|
| PC0 | `192.168.1.10/25` | `192.168.1.0/25` |
| PC1 | `192.168.1.20/25` | `192.168.1.0/25` |
| PC2 | `192.168.1.200/25` | `192.168.1.128/25` |

Por tanto:

```text
PC0 → PC1    funciona
PC0 → PC2    no funciona directamente
```

Aunque estén conectados al mismo switch, PC2 pertenece a otra red IPv4 y no hay un router configurado para comunicar ambas redes.

## 3️⃣ Caso /26

```text
Máscara:           255.255.255.192
CIDR:              /26
Bits de host:      6
Tamaño de bloque:  64
```

Bloques:

```text
0   – 63
64  – 127
128 – 191
192 – 255
```

| Equipo | Dirección | Red | Broadcast |
|---|---|---|---|
| PC0 | `192.168.1.10/26` | `192.168.1.0` | `192.168.1.63` |
| PC1 | `192.168.1.50/26` | `192.168.1.0` | `192.168.1.63` |
| PC2 | `192.168.1.70/26` | `192.168.1.64` | `192.168.1.127` |

Por tanto:

```text
PC0 y PC1 → misma red
PC0 y PC2 → redes diferentes
PC1 y PC2 → redes diferentes
```

Sin router:

```text
PC0 → PC1    funciona
PC0 → PC2    no funciona directamente
```

## 4️⃣ Dirección 192.168.1.126/26

`126` pertenece al bloque:

```text
64 – 127
```

Por tanto:

```text
Red:          192.168.1.64
Primer host:  192.168.1.65
Último host:  192.168.1.126
Broadcast:    192.168.1.127
```

`192.168.1.126` es una dirección válida de host, pero no pertenece a la misma red que PC0 (`192.168.1.10/26`).

Que una dirección sea válida para un host **no significa que pertenezca a nuestra red**.

## 5️⃣ Red y broadcast

Para:

```text
192.168.1.64/26
```

tenemos:

```text
Red:       192.168.1.64
Broadcast: 192.168.1.127
```

Ninguna de las dos debe asignarse como dirección normal de host.

## 6️⃣ Número de hosts

| CIDR | Bits de host | Direcciones totales | Hosts utilizables |
|---|---:|---:|---:|
| `/24` | 8 | 256 | 254 |
| `/25` | 7 | 128 | 126 |
| `/26` | 6 | 64 | 62 |
| `/27` | 5 | 32 | 30 |

En el cálculo convencional:

```text
Hosts utilizables = 2^h - 2
```

Se descuentan:

```text
dirección de red
dirección de broadcast
```

## 7️⃣ Reto final

Para:

```text
PC0 → 192.168.10.10/26
PC1 → 192.168.10.60/26
PC2 → 192.168.10.100/26
```

obtenemos:

| Equipo | Red | Broadcast |
|---|---|---|
| PC0 | `192.168.10.0` | `192.168.10.63` |
| PC1 | `192.168.10.0` | `192.168.10.63` |
| PC2 | `192.168.10.64` | `192.168.10.127` |

Por tanto:

```text
PC0 → PC1    funciona
PC0 → PC2    no funciona directamente
PC1 → PC2    no funciona directamente
```

## 8️⃣ Resumen

```text
Máscara → separa red y host

/26 → 26 bits de red
       6 bits de host

Red → bits de host a 0

Broadcast → bits de host a 1

Hosts utilizables → 2^h - 2
```
