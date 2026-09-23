---
sidebar_position: 5
title: "5. IPv4: direccionamiento de los equipos"
---

# IPv4: direccionamiento de los equipos

Para que un equipo pueda comunicarse mediante una red TCP/IP necesita una **dirección IP**.

En este apartado estudiaremos **IPv4**, cómo se representa una dirección, qué información contiene y qué tipos de direcciones podemos encontrar.

Todavía no realizaremos cálculos de redes ni subredes. Para ello necesitaremos comprender primero la **máscara de red y la notación CIDR**, que veremos en el siguiente apartado.

---

## 1️⃣ ¿Qué es IPv4?

**IPv4** significa **Internet Protocol version 4**.

Es un protocolo de la **capa de red** cuya función permite identificar y direccionar equipos en redes IP.

Una dirección IPv4 tiene **32 bits**.

Estos 32 bits se dividen en **4 grupos de 8 bits**, llamados **octetos**:

```text
8 bits       8 bits       8 bits       8 bits
   ↓            ↓            ↓            ↓
11000000 . 10101000 . 00000001 . 00001010
```

Para facilitar su lectura, cada octeto se representa normalmente en decimal:

```text
11000000.10101000.00000001.00001010

                ↓

          192.168.1.10
```

A esta representación se la denomina **notación decimal punteada**.

:::tip[Idea clave]
Una dirección IPv4:

- tiene **32 bits**;
- está formada por **4 octetos**;
- cada octeto contiene **8 bits**;
- se representa habitualmente mediante cuatro números decimales separados por puntos.
  
:::



## 2️⃣ Los cuatro octetos de una IPv4

Cada octeto puede contener valores entre:

```text
0 y 255
```

Por tanto, son posibles direcciones como:

```text
10.0.0.15
172.16.20.4
192.168.1.100
```

Pero no sería válido escribir:

```text
192.168.1.300
```

porque `300` no puede representarse utilizando únicamente 8 bits.

### 🟩 ¿Por qué el máximo es 255?

Un octeto tiene 8 bits.

Cada posición binaria tiene un valor:

| Bit | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Valor | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Si todos los bits están a `1`:

```text
11111111
```

obtenemos:

```text
128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255
```

Por eso:

```text
00000000 = 0
11111111 = 255
```



## 3️⃣ Conversión sencilla entre binario y decimal

Para comprender IPv4 debemos ser capaces de interpretar un octeto binario.

Por ejemplo:

```text
11000000
```

Colocamos los valores de cada posición:

```text
128  64  32  16   8   4   2   1
 ↓    ↓   ↓   ↓   ↓   ↓   ↓   ↓
 1    1   0   0   0   0   0   0
```

Sumamos únicamente las posiciones cuyo bit vale `1`:

```text
128 + 64 = 192
```

Por tanto:

```text
11000000 = 192
```

Otro ejemplo:

```text
10101000
```

equivale a:

```text
128 + 32 + 8 = 168
```

Por tanto:

```text
10101000 = 168
```

Y:

```text
00000001 = 1
```

Así podemos interpretar:

```text
11000000.10101000.00000001.00001010
```

como:

```text
192.168.1.10
```

:::info[En este apartado]
Solo necesitamos comprender la representación binaria de una IPv4.

Los cálculos de **red, broadcast, rango de hosts y subredes** se realizarán cuando estudiemos máscara y CIDR.
:::



## 4️⃣ Parte de red y parte de host

Una dirección IPv4 contiene dos partes conceptuales:

- una parte que identifica la **red**;
- una parte que identifica al **host** dentro de esa red.

Podemos representarlo de forma simplificada:

```text
Dirección IPv4
      │
      ├──────── Parte de red
      │
      └──────── Parte de host
```

Por ejemplo, si observamos:

```text
192.168.1.10
```

no podemos decidir correctamente qué bits pertenecen a la red y cuáles al host mirando únicamente la dirección IP.

Necesitamos otro dato:

> **la máscara de red**.

:::warning[Importante]
No debemos asumir que en `192.168.1.10` los tres primeros octetos son siempre la red y el último es siempre el host.

La separación depende de la **máscara**, que estudiaremos en el siguiente apartado.
:::



## 5️⃣ Direcciones IPv4 públicas y privadas

No todas las direcciones IPv4 tienen el mismo uso.

Podemos distinguir entre **direcciones públicas** y **direcciones privadas**.

### 🟩 Direcciones públicas

Una dirección IPv4 pública puede utilizarse para identificar un dispositivo o conexión en Internet y debe ser globalmente única en ese ámbito.

Ejemplo conceptual:

```text
Internet
    │
    │ IPv4 pública
    ▼
 Router
    │
    └──── Red privada
```

### 🟧 Direcciones privadas

Las direcciones privadas se utilizan dentro de redes internas, como:

- una vivienda;
- un centro educativo;
- una empresa;
- un laboratorio.

Los rangos privados de IPv4 son:

| Rango | Bloque |
|---|---|
| `10.0.0.0` – `10.255.255.255` | `10.0.0.0/8` |
| `172.16.0.0` – `172.31.255.255` | `172.16.0.0/12` |
| `192.168.0.0` – `192.168.255.255` | `192.168.0.0/16` |

Por ejemplo:

```text
192.168.1.10
```

es una dirección privada.

También lo son:

```text
10.20.30.40
172.20.5.10
192.168.50.200
```

:::tip[Para recordar] 
Las direcciones privadas pueden repetirse en redes diferentes.

Dos viviendas distintas pueden utilizar internamente `192.168.1.10` sin que exista ningún problema, porque son redes privadas independientes.
:::

### 🟥 ¿Puede una IPv4 privada salir directamente a Internet?

Las direcciones privadas no se enrutan directamente por Internet.

En las redes domésticas y empresariales es habitual que el router realice una traducción entre direcciones privadas y públicas.

Ese mecanismo se denomina **NAT** y lo estudiaremos más adelante.



## 6️⃣ Direcciones IPv4 estáticas y dinámicas

La dirección IPv4 de un equipo puede configurarse de distintas formas.

### 🟩 Configuración estática

En una configuración estática, los datos se introducen manualmente.

Por ejemplo:

```text
IP:       192.168.1.10
Máscara:  255.255.255.0
```

Dependiendo de la red también configuraremos otros parámetros, como:

```text
Puerta de enlace
Servidor DNS
```

La configuración estática resulta útil cuando queremos que un dispositivo mantenga una configuración conocida y controlada.

Por ejemplo:

- servidores;
- determinados dispositivos de red;
- equipos de laboratorio.

### 🟧 Configuración dinámica

La configuración también puede obtenerse automáticamente.

Uno de los protocolos utilizados para ello es **DHCP**:

**Dynamic Host Configuration Protocol**

DHCP puede proporcionar automáticamente parámetros de red al equipo.

De forma simplificada:

```text
PC
 │
 │ Solicita configuración
 ▼
Servidor DHCP
 │
 │ Proporciona parámetros
 ▼
PC configurado
```

:::info[Más adelante]
DHCP es uno de los servicios que estudiaremos con más profundidad en Servicios en Red.

Por ahora basta con distinguir entre **configuración manual o estática** y **configuración automática o dinámica**.
:::



## 7️⃣ Algunas direcciones IPv4 especiales

Existen direcciones y rangos que tienen usos especiales.

### 🟩 Loopback: 127.0.0.1

La dirección:

```text
127.0.0.1
```

se utiliza como dirección de **loopback**.

Permite que un equipo se comunique consigo mismo a través de su pila TCP/IP.

Podemos probarla con:

```text
ping 127.0.0.1
```

Si responde, estamos comprobando el funcionamiento local de TCP/IP, no la comunicación con otro ordenador de la LAN.

### 🟧 Link-local: 169.254.0.0/16

El bloque:

```text
169.254.0.0/16
```

se utiliza para direccionamiento IPv4 **link-local**.

En Windows podemos encontrarnos una dirección `169.254.x.x` cuando un equipo configurado para obtener su dirección automáticamente no consigue obtener una configuración IPv4 mediante DHCP.

Por ejemplo:

```text
169.254.34.17
```

puede ser una pista de que existe un problema con la obtención automática de la configuración.

### 🟥 Dirección 0.0.0.0

La dirección:

```text
0.0.0.0
```

tiene usos especiales y puede representar una dirección **no especificada** según el contexto.

No debe utilizarse como dirección IPv4 normal de un equipo de nuestra LAN.

### 🟪 Broadcast limitado

La dirección:

```text
255.255.255.255
```

se utiliza como **broadcast limitado**.

Existe además una dirección de broadcast asociada a cada red IPv4.

Para calcularla necesitamos conocer la máscara, por lo que la estudiaremos en el siguiente apartado.



## 8️⃣ ¿Qué datos necesita normalmente un equipo?

Configurar una red no consiste únicamente en asignar una dirección IPv4.

Habitualmente encontraremos parámetros como:

```text
Dirección IPv4
Máscara de red
Puerta de enlace
Servidor DNS
```

Cada uno cumple una función diferente.

| Parámetro | Función básica |
|---|---|
| Dirección IPv4 | Identifica al equipo en la red IP |
| Máscara | Permite determinar qué parte corresponde a red y host |
| Puerta de enlace | Permite alcanzar otras redes |
| DNS | Permite resolver nombres a direcciones IP |

En esta unidad iremos estudiando cada elemento progresivamente.



## 9️⃣ Comprueba lo aprendido

### 🟩 Actividad 1. Estructura de IPv4

Responde:

1. ¿Cuántos bits tiene una dirección IPv4?
2. ¿Cuántos octetos contiene?
3. ¿Cuántos bits tiene cada octeto?
4. ¿Cuál es el menor valor decimal posible de un octeto?
5. ¿Cuál es el mayor?
6. ¿Es válida la dirección `192.168.300.10`? Justifica la respuesta.

### 🟧 Actividad 2. Binario y decimal

Convierte a decimal:

```text
00000000
00000001
10000000
11000000
11111111
```

Convierte a binario:

```text
10
192
255
```

### 🟥 Actividad 3. Pública o privada

Indica cuáles de estas direcciones pertenecen a los rangos privados:

```text
192.168.10.25
10.1.2.3
172.20.10.5
172.40.10.5
8.8.8.8
```

### 🟪 Actividad 4. Configuración

Indica si utilizarías preferentemente una configuración **estática** o **dinámica** en cada caso y explica por qué:

1. Un servidor de un laboratorio.
2. Un portátil que se conecta a la Wi-Fi de un centro.
3. Un equipo que debe mantener siempre una configuración conocida.
4. Los ordenadores de invitados de una red Wi-Fi.

### 🟦 Actividad 5. Direcciones especiales

Relaciona:

| Dirección/rango | Uso |
|---|---|
| `127.0.0.1` | |
| `169.254.0.0/16` | |
| `0.0.0.0` | |
| `255.255.255.255` | |

---

:::tip[Qué debes recordar] 
Antes de continuar debes tener claras estas ideas:

**IPv4 = 32 bits = 4 octetos**

Una IPv4 contiene una **parte de red** y una **parte de host**, pero necesitamos la máscara para saber dónde se encuentra la separación.

También debemos distinguir entre:

- direcciones públicas y privadas;
- configuración estática y dinámica;
- direcciones normales y direcciones de uso especial.
:::
