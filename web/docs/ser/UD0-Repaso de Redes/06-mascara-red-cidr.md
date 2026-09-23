---
sidebar_position: 6
title: "6. Máscara de red y notación CIDR"
---

# Máscara de red y notación CIDR

Una dirección IPv4 tiene **32 bits** y contiene una parte que identifica la **red** y otra que identifica al **host**. Para saber dónde termina una parte y empieza la otra necesitamos la **máscara de red**.

En este apartado aprenderemos a interpretar máscaras, utilizar **CIDR** y calcular la dirección de red, el broadcast, el rango de hosts y el número de hosts utilizables.



## 1️⃣ ¿Qué es una máscara de red?

Una máscara de red es un valor de **32 bits** que acompaña a una dirección IPv4.

Sus bits a `1` indican la parte de **red** y sus bits a `0` la parte de **host**.

```text
IP:       192.168.1.10
Máscara:  255.255.255.0

Máscara en binario:
11111111.11111111.11111111.00000000
└──────────── RED ───────────┘└ HOST ┘
```

:::tip[Idea clave]
La máscara no es una segunda dirección IP. Permite interpretar una IPv4 y determinar qué bits identifican la red y cuáles al host.
:::



## 2️⃣ Máscara en decimal y binario

Una máscara convencional está formada por una secuencia de bits `1` seguida de bits `0`.

```text
11111111.11111111.11111111.00000000
```

equivale a:

```text
255.255.255.0
```

Otro ejemplo:

```text
11111111.11111111.11111111.11000000
```

El último octeto `11000000` vale:

```text
128 + 64 = 192
```

Por tanto:

```text
255.255.255.192
```

### 🟩 Valores posibles en un octeto de máscara

| Binario | Decimal |
|---|---:|
| `00000000` | 0 |
| `10000000` | 128 |
| `11000000` | 192 |
| `11100000` | 224 |
| `11110000` | 240 |
| `11111000` | 248 |
| `11111100` | 252 |
| `11111110` | 254 |
| `11111111` | 255 |

:::warning[No todas las combinaciones son válidas]
Los bits a `1` deben ser consecutivos desde la izquierda. Por ejemplo, `10100000` no es un octeto válido de una máscara convencional.
:::



## 3️⃣ ¿Qué es la notación CIDR?

**CIDR** significa **Classless Inter-Domain Routing**.

En vez de escribir la máscara completa, indicamos cuántos bits consecutivos están dedicados al prefijo de red:

```text
192.168.1.10/24
```

`/24` significa que hay **24 bits a 1**:

```text
11111111.11111111.11111111.00000000
<----------- 24 bits ----------->
```

Por tanto:

```text
/24 = 255.255.255.0
```

| CIDR | Máscara |
|---|---|
| `/8` | `255.0.0.0` |
| `/16` | `255.255.0.0` |
| `/24` | `255.255.255.0` |
| `/25` | `255.255.255.128` |
| `/26` | `255.255.255.192` |
| `/27` | `255.255.255.224` |
| `/28` | `255.255.255.240` |
| `/29` | `255.255.255.248` |
| `/30` | `255.255.255.252` |

:::tip[Para recordar]
Cuanto mayor sea el prefijo CIDR, más bits se dedican a la red y menos quedan para hosts.
:::



## 4️⃣ Parte de red y parte de host

Para:

```text
192.168.1.10/24
```

tenemos:

```text
IP
11000000.10101000.00000001.00001010

Máscara
11111111.11111111.11111111.00000000
└──────────── RED ───────────┘└ HOST ┘
```

Hay 24 bits de red y 8 de host.

Pero con `/26`:

```text
11111111.11111111.11111111.11000000
└───────────── RED ─────────────┘└HOST┘
```

hay 26 bits de red y 6 de host.

:::info[La IP no basta]
La misma IPv4 puede interpretarse de forma diferente según su máscara. No debemos decidir qué parte es red observando únicamente los números de la dirección.
:::



## 5️⃣ Dirección de red

La **dirección de red** identifica la propia red. Se obtiene dejando todos los bits de host a `0`.

Para:

```text
192.168.1.10/24
```

los 8 últimos bits son de host. Al ponerlos a cero:

```text
192.168.1.00000000
```

obtenemos:

```text
Red: 192.168.1.0
```

:::warning[Dirección de red]
En una subred IPv4 convencional, la dirección cuyos bits de host son todos `0` identifica la red y no se asigna a un host.
:::

---

## 6️⃣ Dirección de broadcast

La **dirección de broadcast de la red** permite dirigirse a todos los hosts de esa subred.

Se obtiene poniendo todos los bits de host a `1`.

Para `192.168.1.10/24`:

```text
192.168.1.11111111
```

`11111111 = 255`, por tanto:

```text
Broadcast: 192.168.1.255
```

El bloque queda:

```text
192.168.1.0      → red
192.168.1.1      → primer host
      ...
192.168.1.254    → último host
192.168.1.255    → broadcast
```

:::info[Dos direcciones especiales]
En una subred IPv4 convencional, la dirección de **red** y la de **broadcast** no se asignan a hosts.
:::

---

## 7️⃣ Rango de hosts

Para `192.168.1.10/24`:

```text
Red:          192.168.1.0
Primer host:  192.168.1.1
Último host:  192.168.1.254
Broadcast:    192.168.1.255
```

```text
RED                                      BROADCAST
 │                                           │
 ▼                                           ▼
.0   .1   .2   .3   .............   .253   .254   .255
     └──────── HOSTS UTILIZABLES ───────────┘
```

:::warning[La puerta de enlace no es una dirección reservada]
Es frecuente utilizar la primera o la última dirección de host como puerta de enlace, pero IPv4 no reserva matemáticamente esa dirección para el gateway. Es una decisión de configuración.
:::

---

## 8️⃣ ¿Cuántos hosts caben?

IPv4 tiene 32 bits:

```text
bits de host = 32 - prefijo
```

Para `/24`:

```text
32 - 24 = 8 bits de host
2⁸ = 256 direcciones
```

En el cálculo convencional descontamos red y broadcast:

```text
Hosts utilizables = 2^h - 2
```

Por tanto:

```text
2⁸ - 2 = 254 hosts
```

| CIDR | Bits host | Direcciones | Hosts utilizables |
|---|---:|---:|---:|
| `/24` | 8 | 256 | 254 |
| `/25` | 7 | 128 | 126 |
| `/26` | 6 | 64 | 62 |
| `/27` | 5 | 32 | 30 |
| `/28` | 4 | 16 | 14 |
| `/29` | 3 | 8 | 6 |
| `/30` | 2 | 4 | 2 |

---

## 9️⃣ Cálculo mediante el tamaño de bloque

Cuando la máscara divide un octeto, podemos utilizar:

```text
Tamaño de bloque = 256 - valor del octeto de máscara
```

Para `/26`:

```text
/26 = 255.255.255.192
256 - 192 = 64
```

Los bloques avanzan de 64 en 64:

```text
0   - 63
64  - 127
128 - 191
192 - 255
```

### 🟩 Ejemplo: 192.168.1.70/26

`70` pertenece al bloque `64 - 127`.

Por tanto:

```text
Red:          192.168.1.64
Primer host:  192.168.1.65
Último host:  192.168.1.126
Broadcast:    192.168.1.127
```

---

## 🔟 Ejemplo completo

Analizamos:

```text
192.168.10.140/26
```

### 🟩 Paso 1. Máscara

```text
/26 = 255.255.255.192
```

### 🟧 Paso 2. Tamaño de bloque

```text
256 - 192 = 64
```

Bloques:

```text
0 - 63
64 - 127
128 - 191
192 - 255
```

### 🟥 Paso 3. Localizar la IP

`140` pertenece al bloque:

```text
128 - 191
```

### 🟪 Paso 4. Red y broadcast

```text
Red:        192.168.10.128
Broadcast:  192.168.10.191
```

### 🟦 Paso 5. Hosts

```text
Primer host: 192.168.10.129
Último host:  192.168.10.190

32 - 26 = 6 bits de host
2⁶ - 2 = 62 hosts utilizables
```

| Dato | Valor |
|---|---|
| IP | `192.168.10.140/26` |
| Máscara | `255.255.255.192` |
| Red | `192.168.10.128` |
| Primer host | `192.168.10.129` |
| Último host | `192.168.10.190` |
| Broadcast | `192.168.10.191` |
| Hosts utilizables | 62 |

---

## 1️⃣1️⃣ ¿Están dos equipos en la misma red?

Ejemplo:

```text
PC-A: 192.168.1.10/24
PC-B: 192.168.1.20/24
```

Ambos pertenecen a:

```text
192.168.1.0/24
```

Pero:

```text
PC-A: 192.168.1.10/24 → red 192.168.1.0/24
PC-C: 192.168.2.30/24 → red 192.168.2.0/24
```

pertenecen a redes distintas.

Para comunicar redes diferentes necesitaremos un dispositivo de capa 3, normalmente un **router**, y una configuración adecuada de la **puerta de enlace**.

:::info[Conexión con la práctica anterior]
Ahora podemos explicar por qué `192.168.1.10/24` y `192.168.2.30/24` no pertenecen a la misma red: la máscara `/24` determina qué bits forman el prefijo de red.
:::

---

## 1️⃣2️⃣ Comprueba lo aprendido

### 🟩 Actividad 1. Máscara y CIDR

Completa:

| CIDR | Máscara |
|---|---|
| `/8` | |
| `/16` | |
| `/24` | |
| `/25` | |
| `/26` | |
| `/27` | |
| `/28` | |

### 🟧 Actividad 2. Bits

Indica bits de red y de host para:

```text
/24
/25
/26
/27
/28
```

### 🟥 Actividad 3. Hosts

Calcula los hosts utilizables en:

```text
/24
/25
/26
/27
/28
/29
/30
```

### 🟪 Actividad 4. Calcula cada red

Obtén máscara, red, primer host, último host, broadcast y hosts utilizables:

```text
192.168.1.25/24
192.168.1.130/25
192.168.1.70/26
192.168.1.200/27
```

### 🟦 Actividad 5. ¿Misma red?

Indica si pertenecen a la misma red y justifica calculando la red:

```text
192.168.1.10/24     192.168.1.200/24

192.168.1.10/24     192.168.2.10/24

192.168.1.10/25     192.168.1.100/25

192.168.1.10/25     192.168.1.200/25
```

---

:::tip[Qué debes recordar]
Para analizar una dirección IPv4:

1. identifica el prefijo CIDR;
2. obtén la máscara;
3. calcula los bits de host;
4. localiza la dirección de red;
5. calcula el broadcast;
6. determina el rango de hosts;
7. calcula los hosts utilizables con `2^h - 2`.

En el cálculo convencional se descuentan la dirección de red y la de broadcast.
:::
