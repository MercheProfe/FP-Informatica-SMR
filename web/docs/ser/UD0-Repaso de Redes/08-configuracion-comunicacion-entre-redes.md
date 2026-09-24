---
sidebar_position: 16
title: "0.8 Configuración y comunicación entre redes"
---

# Configuración y comunicación entre redes

Hasta ahora hemos aprendido a determinar si dos equipos pertenecen a la misma red y a diseñar subredes. En este punto veremos qué hace realmente un equipo cuando necesita comunicarse con un destino y qué cambia cuando ese destino se encuentra en **otra red**.

La idea fundamental será distinguir entre:

```text
Destino local  → envío directo al equipo
Destino remoto → envío a la puerta de enlace
```

## 1️⃣ La configuración IPv4 de un equipo

Para comunicarse correctamente, un equipo suele necesitar varios parámetros:

| Parámetro | Función |
|---|---|
| Dirección IPv4 | Identifica al equipo dentro de la red |
| Máscara / prefijo | Permite determinar qué direcciones son locales |
| Puerta de enlace | Permite alcanzar otras redes |
| DNS | Traduce nombres a direcciones IP |

Ejemplo:

```text
IP:                192.168.10.25
Máscara:           255.255.255.0
Prefijo:           /24
Puerta de enlace:  192.168.10.1
DNS:               8.8.8.8
```

:::info[Idea clave]
La puerta de enlace no es necesaria para que dos equipos de la **misma red** se comuniquen. Es necesaria cuando el destino está en **otra red**.
:::

## 2️⃣ ¿El destino es local o remoto?

Antes de enviar un paquete, el equipo utiliza su dirección IP y su máscara para determinar si la dirección de destino pertenece a su propia red.

Supongamos:

```text
PC-A: 192.168.10.20/24
```

### 🟩 Destino local

PC-A quiere comunicarse con:

```text
192.168.10.80/24
```

Ambos pertenecen a:

```text
192.168.10.0/24
```

PC-A puede comunicarse directamente con PC-B.

Necesitará conocer la MAC de PC-B, por lo que utilizará **ARP** si todavía no la conoce.

```text
PC-A → ARP → MAC de PC-B → trama hacia PC-B
```

### 🟧 Destino remoto

Ahora PC-A quiere comunicarse con:

```text
192.168.20.50
```

Esa dirección no pertenece a `192.168.10.0/24`.

PC-A no intenta localizar mediante ARP la MAC del equipo remoto. Envía el paquete a su **puerta de enlace**.

Si la puerta de enlace es:

```text
192.168.10.1
```

PC-A necesitará conocer la MAC de `192.168.10.1`.

```text
PC-A
  │
  ├── destino IP final: 192.168.20.50
  │
  └── destino MAC de la trama: MAC del router
```

Esta diferencia es muy importante.

## 3️⃣ La puerta de enlace predeterminada

La **puerta de enlace predeterminada** o *default gateway* es la dirección IP de una interfaz de router situada en la misma red que el equipo.

Ejemplo:

```text
Red A: 192.168.10.0/24

PC-A
IP:      192.168.10.20
Gateway: 192.168.10.1

Router
Interfaz Red A: 192.168.10.1
```

El gateway debe ser alcanzable directamente por el host.

:::warning[Error frecuente]
No tendría sentido configurar como gateway de `192.168.10.20/24` una dirección como `192.168.20.1`, porque esa dirección está fuera de su red local.
:::

## 4️⃣ El router comunica redes diferentes

Un **router** trabaja principalmente en la capa de red y dispone de interfaces conectadas a redes distintas.

Ejemplo:

```text
192.168.10.0/24                 192.168.20.0/24

PC-A ─ Switch ── R1 ── Switch ─ PC-B
                │  │
      192.168.10.1  192.168.20.1
```

Configuración:

```text
PC-A
IP:      192.168.10.20/24
Gateway: 192.168.10.1

PC-B
IP:      192.168.20.30/24
Gateway: 192.168.20.1
```

R1 tiene una interfaz en cada red.

El router recibe el paquete por una interfaz, consulta la red de destino y lo reenvía por la interfaz adecuada.

## 5️⃣ Qué cambia y qué se mantiene durante el recorrido

Supongamos que PC-A envía un `ping` a PC-B.

Direcciones IP:

```text
Origen:  192.168.10.20
Destino: 192.168.20.30
```

En el primer tramo:

```text
PC-A → R1
```

la trama Ethernet utiliza:

```text
MAC origen:  MAC de PC-A
MAC destino: MAC de la interfaz 192.168.10.1 de R1
```

El paquete IP sigue indicando:

```text
IP origen:  192.168.10.20
IP destino: 192.168.20.30
```

Cuando R1 reenvía el paquete hacia PC-B, crea una **nueva trama**:

```text
R1 → PC-B

MAC origen:  MAC de la interfaz de R1 en la Red B
MAC destino: MAC de PC-B
```

Las direcciones MAC cambian en cada enlace Ethernet. Las IP origen y destino permanecen asociadas a los extremos de la comunicación mientras no intervengan mecanismos como NAT, que estudiaremos más adelante.

## 6️⃣ ARP cuando el destino está en otra red

Este punto conecta directamente con lo aprendido anteriormente.

Si:

```text
PC-A = 192.168.10.20/24
PC-B = 192.168.20.30/24
Gateway PC-A = 192.168.10.1
```

PC-A sabe, gracias a su máscara, que PC-B es remoto.

Por tanto, PC-A realiza ARP para:

```text
192.168.10.1
```

y no para:

```text
192.168.20.30
```

La tabla ARP de PC-A podría mostrar:

```text
192.168.10.1 → AA-BB-CC-DD-EE-01
```

No necesita contener la MAC de PC-B.

:::tip[Pregunta para clase]
Si PC-B está en otra red, ¿por qué PC-A no necesita conocer su MAC?

Porque las direcciones MAC solo permiten entregar la trama en el enlace local. El router construirá una nueva trama para el siguiente enlace.
:::

## 7️⃣ Una topología con tres redes

Aumentemos ligeramente la complejidad:

```text
Red A                  Red B                  Red C
192.168.10.0/24        10.0.0.0/30           192.168.30.0/24

PC-A ─ SW1 ─ R1 ───────────── R2 ─ SW2 ─ PC-C
             .1      .1   .2              .1
```

Una posible configuración sería:

```text
PC-A: 192.168.10.20/24
GW:   192.168.10.1

R1 LAN: 192.168.10.1/24
R1 enlace: 10.0.0.1/30

R2 enlace: 10.0.0.2/30
R2 LAN: 192.168.30.1/24

PC-C: 192.168.30.50/24
GW:   192.168.30.1
```

Aquí ya no basta con que cada router conozca sus redes directamente conectadas.

R1 necesita saber cómo alcanzar:

```text
192.168.30.0/24
```

y R2 necesita saber cómo alcanzar:

```text
192.168.10.0/24
```

Esto introduce el concepto de **ruta**.

## 8️⃣ Tabla de enrutamiento

Un router mantiene una **tabla de enrutamiento** con información sobre las redes que sabe alcanzar.

De forma simplificada:

| Red destino | Cómo alcanzarla |
|---|---|
| `192.168.10.0/24` | Directamente conectada |
| `10.0.0.0/30` | Directamente conectada |
| `192.168.30.0/24` | A través de `10.0.0.2` |

Una ruta puede indicar un **siguiente salto** (*next hop*).

En R1 podríamos necesitar:

```text
Destino:        192.168.30.0/24
Siguiente salto:10.0.0.2
```

En R2:

```text
Destino:        192.168.10.0/24
Siguiente salto:10.0.0.1
```

### 🟩 Redes directamente conectadas

Cuando una interfaz del router tiene:

```text
192.168.10.1/24
```

el router sabe directamente que puede alcanzar:

```text
192.168.10.0/24
```

### 🟧 Redes remotas

Para llegar a una red que no está conectada directamente, necesita una ruta que le indique hacia dónde enviar el paquete.

## 9️⃣ Ruta por defecto

También existe una **ruta por defecto**.

Conceptualmente significa:

> Si no conozco una ruta más específica para el destino, envío el paquete por aquí.

Suele representarse como:

```text
0.0.0.0/0
```

La utilizaremos especialmente cuando estudiemos el acceso a Internet.

No debemos confundir:

- **gateway predeterminado de un PC**: router al que entrega tráfico remoto;
- **ruta por defecto de un router**: ruta utilizada cuando no existe otra más específica.

## 🔟 Ejemplo completo de razonamiento

Tenemos:

```text
PC-A: 172.16.10.25/26
GW:   172.16.10.1

R1:
172.16.10.1/26
192.168.5.1/27

PC-B: 192.168.5.20/27
GW:   192.168.5.1
```

PC-A quiere comunicarse con PC-B.

### 🟩 Paso 1

PC-A calcula su red:

```text
172.16.10.0/26
```

PC-B no pertenece a esa red.

### 🟧 Paso 2

PC-A decide utilizar:

```text
172.16.10.1
```

su gateway.

### 🟥 Paso 3

Si desconoce su MAC, PC-A realiza ARP para `172.16.10.1`.

### 🟪 Paso 4

Envía una trama al router, pero el paquete mantiene como destino:

```text
192.168.5.20
```

### 🟦 Paso 5

R1 tiene `192.168.5.0/27` directamente conectada, por lo que puede entregar el paquete a PC-B.

## 1️⃣1️⃣ Errores frecuentes

### 🟩 Gateway fuera de la red

```text
PC:      192.168.1.20/24
Gateway: 192.168.2.1
```

Configuración incorrecta para una puerta de enlace directamente alcanzable.

### 🟧 Máscara incorrecta

Dos equipos pueden tener direcciones aparentemente similares, pero una máscara incorrecta puede hacer que uno interprete al otro como local y el otro como remoto.

### 🟥 Falta de gateway

El equipo puede comunicarse con su LAN, pero no sabe dónde enviar tráfico dirigido a otras redes.

### 🟪 Falta de ruta en un router

El host puede entregar correctamente el paquete al gateway, pero el router puede no conocer un camino hacia la red de destino.

### 🟦 Falta de ruta de retorno

No basta con que el paquete llegue al destino. La respuesta también necesita un camino de vuelta.

## 1️⃣2️⃣ Comprueba lo aprendido

### 🟩 Actividad 1

Un PC tiene:

```text
IP:      192.168.5.70/26
Gateway: 192.168.5.65
```

Indica si utilizará el gateway para comunicarse con:

```text
192.168.5.100
192.168.5.130
8.8.8.8
```

Justifica cada respuesta.

### 🟧 Actividad 2

Tenemos:

```text
PC-A: 192.168.10.10/24
GW:   192.168.10.1

PC-B: 192.168.20.20/24
GW:   192.168.20.1
```

Un router tiene `192.168.10.1/24` y `192.168.20.1/24`.

Explica qué direcciones IP y MAC intervienen en el primer tramo cuando PC-A envía un paquete a PC-B.

### 🟥 Actividad 3

En una topología con dos routers:

```text
LAN A ─ R1 ─ R2 ─ LAN B
```

R1 conoce LAN A y la red entre routers. R2 conoce LAN B y la red entre routers.

¿Qué información adicional necesita cada router para que un equipo de LAN A pueda comunicarse con LAN B y recibir respuesta?
