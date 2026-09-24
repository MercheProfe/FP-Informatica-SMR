---
sidebar_position: 13
title: "0.7. Subredes y VLSM"
---

# Subredes y VLSM

Hasta ahora hemos utilizado la dirección IPv4 y la máscara para calcular **red, broadcast, rango de hosts y pertenencia a una red**. Ahora utilizaremos esos conocimientos para diseñar redes más pequeñas a partir de una red mayor.

## 1️⃣ ¿Qué es una subred?

Una **subred** es una división lógica de una red IP. Al crear subredes utilizamos algunos bits que antes identificaban hosts para identificar nuevas redes.

Por ejemplo:

``` text
192.168.10.0/24
```

Si aumentamos el prefijo:

``` text
/24 → /25 → /26 → /27
```

obtenemos más redes, pero cada una admite menos hosts.

 | Prefijo | Máscara | Direcciones | Hosts utilizables |
|---|---|---:|---:|
| `/24` | `255.255.255.0` | 256 | 254 |
| `/25` | `255.255.255.128` | 128 | 126 |
| `/26` | `255.255.255.192` | 64 | 62 |
| `/27` | `255.255.255.224` | 32 | 30 |
| `/28` | `255.255.255.240` | 16 | 14 |
| `/29` | `255.255.255.248` | 8 | 6 |
| `/30` | `255.255.255.252` | 4 | 2 |

:::info[Idea clave] 
Al aumentar el prefijo CIDR obtenemos **más subredes**, pero cada subred dispone de **menos direcciones para hosts**. 
:::

## 2️⃣ ¿Por qué dividir una red?

Las subredes permiten:

-   separar departamentos, aulas o servicios;
-   reducir el tamaño de los dominios de broadcast;
-   organizar el direccionamiento;
-   facilitar administración y diagnóstico;
-   preparar la red para aplicar políticas distintas.

Cada subred tiene su propia **dirección de red, broadcast, rango de hosts y prefijo**.

## 3️⃣ Subnetting: subredes del mismo tamaño

### 🟩 Ejemplo: dividir una `/24` en cuatro subredes

Partimos de:

``` text
192.168.20.0/24
```

Queremos 4 subredes iguales. Necesitamos 2 bits:

``` text
2² = 4
/24 → /26
```

La máscara es `255.255.255.192`.

Cada `/26` contiene:

``` text
2^(32-26) = 64 direcciones
64 - 2 = 62 hosts utilizables
```

El tamaño de bloque es:

``` text
256 - 192 = 64
```

 | Subred | Red | Primer host | Último host | Broadcast |
|---:|---|---|---|---|
| 1 | `192.168.20.0/26` | `192.168.20.1` | `192.168.20.62` | `192.168.20.63` |
| 2 | `192.168.20.64/26` | `192.168.20.65` | `192.168.20.126` | `192.168.20.127` |
| 3 | `192.168.20.128/26` | `192.168.20.129` | `192.168.20.190` | `192.168.20.191` |
| 4 | `192.168.20.192/26` | `192.168.20.193` | `192.168.20.254` | `192.168.20.255` |

### 🟧 ¿A qué subred pertenece un host?

Para:

``` text
192.168.20.150/26
```

los bloques comienzan en `.0`, `.64`, `.128` y `.192`.

`150` está entre `128` y `191`, por tanto:

``` text
Red:        192.168.20.128
Primer host:192.168.20.129
Último host:192.168.20.190
Broadcast:  192.168.20.191
```

## 4️⃣ Elegir máscara según los hosts

Buscamos el menor número de bits de host que cumpla:

``` text
2^h - 2 >= hosts necesarios
```

### 🟥 Ejemplo: 50 equipos

``` text
2^5 - 2 = 30   → no basta
2^6 - 2 = 62   → sí basta
```

Necesitamos 6 bits de host:

``` text
32 - 6 = /26
```

### 🟪 Ejemplo: 100 equipos

``` text
2^6 - 2 = 62
2^7 - 2 = 126
```

Necesitamos una `/25`.

## 5️⃣ Cuando las redes necesitan tamaños diferentes

Disponemos de:

``` text
192.168.10.0/24
```

y necesitamos:

  | Zona | Hosts |
|---|---:|
| Administración | 50 |
| Aula | 25 |
| Taller | 12 |

Si todas fueran `/26`, cada zona reservaría 62 hosts. Para el Taller sería un desperdicio importante.

## 6️⃣ VLSM

**VLSM (Variable Length Subnet Mask)** permite utilizar máscaras diferentes dentro del bloque original.

La regla práctica es:

> **Ordena las necesidades de mayor a menor y asigna primero las redes más grandes.**

### 🟦 Ejemplo completo

Para `192.168.10.0/24`:

-   50 hosts → `/26`
-   25 hosts → `/27`
-   12 hosts → `/28`

Asignamos consecutivamente:

  | Zona | Subred | Hosts válidos | Broadcast |
|---|---|---|---|
| Administración | `192.168.10.0/26` | `192.168.10.1 - 192.168.10.62` | `192.168.10.63` |
| Aula | `192.168.10.64/27` | `192.168.10.65 - 192.168.10.94` | `192.168.10.95` |
| Taller | `192.168.10.96/28` | `192.168.10.97 - 192.168.10.110` | `192.168.10.111` |

La primera dirección todavía libre es `.112`.

:::warning[El orden importa]
 En VLSM se asignan primero los bloques grandes. Repartir primero bloques pequeños puede fragmentar el espacio y dificultar una asignación posterior.
:::

## 7️⃣ Ejemplo de mayor complejidad

Una empresa recibe:

``` text
172.16.8.0/24
```

Necesita:

  | Zona | Hosts | Prefijo mínimo | Capacidad |
|---|---:|---:|---:|
| Oficina | 70 | `/25` | 126 |
| Aula 1 | 40 | `/26` | 62 |
| Aula 2 | 20 | `/27` | 30 |
| Servidores | 10 | `/28` | 14 |

Una asignación válida es:

``` text
Oficina:    172.16.8.0/25
Aula 1:     172.16.8.128/26
Aula 2:     172.16.8.192/27
Servidores: 172.16.8.224/28
```

Queda libre desde `.240`, pero recuerda: **la primera dirección libre no siempre es un comienzo válido para cualquier prefijo nuevo**.

## 8️⃣ Errores frecuentes

### 🟩 Confundir direcciones totales y hosts

Una `/26` tiene 64 direcciones y 62 hosts utilizables.

### 🟧 Usar red o broadcast como host

En `192.168.1.64/26`:

``` text
Red:       192.168.1.64
Broadcast: 192.168.1.127
```

Ninguna de las dos se asigna a un host.

### 🟥 Crear redes solapadas

No podemos asignar simultáneamente:

``` text
192.168.1.0/25
192.168.1.64/26
```

La segunda está dentro de la primera.

### 🟪 Empezar una subred en cualquier dirección

Una `/26` dentro de un `/24` empieza en `.0`, `.64`, `.128` o `.192`.

`192.168.1.70/26` es una dirección de host, no una dirección de red.

## 9️⃣ Método de resolución

1.  Anota la red inicial.
2.  Determina las subredes o hosts necesarios.
3.  En VLSM, ordena de mayor a menor.
4.  Calcula el prefijo mínimo.
5.  Calcula el tamaño del bloque.
6.  Asigna la dirección de red.
7.  Obtén primer host, último host y broadcast.
8.  Comprueba que no existen solapamientos.

## 🔟 Comprueba lo aprendido

### 🟩 Actividad 1

Divide `192.168.50.0/24` en **4 subredes iguales**. Indica red, primer host, último host, broadcast y hosts utilizables.

### 🟧 Actividad 2

Determina la subred, broadcast y rango de hosts de:

``` text
192.168.50.173/26
```

### 🟥 Actividad 3

Diseña la subred mínima para **28 equipos**: bits de host, CIDR, máscara y hosts utilizables.

### 🟪 Actividad 4

Dispones de `192.168.100.0/24` y necesitas:

-   Red A: 60 hosts.
-   Red B: 30 hosts.
-   Red C: 12 hosts.

Diseña las tres redes mediante VLSM.
