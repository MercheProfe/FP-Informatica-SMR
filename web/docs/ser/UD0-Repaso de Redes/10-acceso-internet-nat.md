---
sidebar_position: 20
title: "0.10 Acceso a Internet y NAT"
---

# Acceso a Internet y NAT

Hasta ahora hemos trabajado principalmente con redes privadas y hemos aprendido cómo un router permite comunicar redes diferentes.

En este punto damos un paso más: **¿qué ocurre cuando un equipo de nuestra LAN quiere acceder a Internet?**

Partiremos de:

```text
PC ── Switch ── Router ── Internet
```

El equipo utiliza una dirección IPv4 privada, pero para salir a Internet aparece un mecanismo fundamental: **NAT**.

## 1️⃣ De una red local a Internet

Ejemplo:

```text
PC-A
IP:      192.168.10.20/24
Gateway: 192.168.10.1
DNS:     8.8.8.8
```

El router conecta la LAN con una red exterior:

```text
PC-A                 Router                    Red exterior
192.168.10.20 ─── 192.168.10.1 | IP exterior ─── destino
```

Cuando PC-A quiere acceder a un servidor externo, primero determina si el destino está en su propia red. Si no lo está, entrega el tráfico a su **gateway**.

:::info[Conexión con el punto anterior]
El PC no necesita conocer toda la ruta hasta Internet. Necesita saber que el destino no es local y disponer de una puerta de enlace a la que entregar el paquete.
:::

## 2️⃣ Direcciones IPv4 privadas y públicas

Los rangos IPv4 privados son:

| Rango privado | Prefijo |
|---|---|
| `10.0.0.0 - 10.255.255.255` | `10.0.0.0/8` |
| `172.16.0.0 - 172.31.255.255` | `172.16.0.0/12` |
| `192.168.0.0 - 192.168.255.255` | `192.168.0.0/16` |

Una dirección privada puede reutilizarse en muchas redes internas y no se enruta globalmente por Internet como una dirección pública.

:::warning[Importante]
No toda dirección que no sea privada es automáticamente una dirección pública utilizable por un host. IPv4 contiene otros rangos reservados. En este punto nos centraremos en distinguir el direccionamiento privado de una LAN del direccionamiento utilizado en redes exteriores.
:::

## 3️⃣ ¿Por qué necesitamos NAT?

Tenemos varios equipos internos:

```text
PC-A → 192.168.10.20
PC-B → 192.168.10.30
PC-C → 192.168.10.40
```

**NAT** significa **Network Address Translation** o traducción de direcciones de red.

El dispositivo NAT modifica información de direccionamiento al reenviar determinados paquetes entre la red interna y la externa.

```text
Red privada

192.168.10.20 ─┐
192.168.10.30 ──┼── Router NAT ─── Red exterior
192.168.10.40 ─┘
```

## 4️⃣ NAT estático

El **NAT estático** establece una correspondencia fija entre una dirección interna y otra externa.

```text
192.168.10.50  ↔  dirección exterior
```

Es una asociación estable:

```text
1 dirección interna ↔ 1 dirección externa
```

Puede utilizarse cuando interesa mantener una traducción fija.

## 5️⃣ NAT dinámico

En **NAT dinámico**, el router dispone de un conjunto o *pool* de direcciones exteriores.

Cuando un equipo interno necesita una traducción, el router puede asignarle temporalmente una dirección disponible del conjunto.

Si no quedan direcciones libres en el pool, no puede realizarse una nueva traducción de este tipo hasta liberar alguna.

## 6️⃣ PAT: muchos equipos, una dirección pública

Es habitual que muchos equipos compartan una misma dirección IPv4 pública.

Para distinguir las comunicaciones se utiliza también información de transporte, especialmente los **puertos TCP o UDP**.

Este mecanismo se denomina **PAT** (*Port Address Translation*) o NAT con sobrecarga.

```text
192.168.10.20:51000 ─┐
192.168.10.30:52000 ──┼── una IPv4 pública
192.168.10.40:53000 ─┘
```

El dispositivo mantiene una tabla de traducciones para saber a qué comunicación interna corresponde cada respuesta.

:::info[Idea clave]
En el uso cotidiano se habla muchas veces simplemente de “NAT”, aunque el mecanismo que permite compartir una única IPv4 pública entre muchos hosts sea PAT.
:::

## 7️⃣ Qué ocurre al acceder a un servidor externo

Supongamos:

```text
PC-A
192.168.10.20/24
Gateway: 192.168.10.1
```

### 🟩 Paso 1. El PC comprueba el destino

Compara la dirección de destino con su propia red:

```text
192.168.10.0/24
```

Si el destino no pertenece a ella, es remoto.

### 🟧 Paso 2. Utiliza el gateway

PC-A entrega el paquete a:

```text
192.168.10.1
```

Si no conoce su MAC, utiliza ARP para obtenerla.

### 🟥 Paso 3. El router realiza la traducción

Con PAT, una comunicación podría pasar conceptualmente de:

```text
192.168.10.20:51000
```

a:

```text
IP pública del router:puerto traducido
```

### 🟪 Paso 4. El servidor responde

La respuesta llega a la dirección y puerto exteriores utilizados por la traducción.

### 🟦 Paso 5. El router consulta su tabla

El router identifica qué host y comunicación interna corresponden a esa traducción y entrega la respuesta.

## 8️⃣ Qué cambia con NAT

Antes de la traducción:

```text
Origen:  IP privada del host
Destino: IP del servidor externo
```

Después de NAT/PAT, hacia el exterior:

```text
Origen:  IP exterior traducida
Destino: IP del servidor externo
```

En el camino de regreso se aplica la traducción correspondiente.

Esto es diferente del routing sin NAT que vimos en el punto anterior: **NAT modifica información de direccionamiento**.

## 9️⃣ NAT no es lo mismo que routing

**Routing** responde:

```text
¿Por dónde envío el paquete?
```

**NAT** responde:

```text
¿Qué dirección debo traducir?
```

Un router puede enrutar tráfico sin realizar NAT.

## 🔟 NAT tampoco es un firewall

Son funciones distintas:

- **Routing**: selecciona caminos entre redes.
- **NAT/PAT**: realiza traducciones.
- **Firewall**: aplica reglas que permiten o bloquean tráfico.

Un mismo dispositivo puede realizar las tres funciones.

## 1️⃣1️⃣ El papel de DNS

Normalmente utilizamos nombres en lugar de escribir directamente una IP.

De forma simplificada:

```text
Nombre
  ↓
DNS
  ↓
Dirección IP
  ↓
¿Destino local o remoto?
  ↓
Gateway
  ↓
Routing / NAT
  ↓
Red exterior
```

:::info[No confundir]
**DNS** resuelve nombres. El **gateway** proporciona un siguiente salto para destinos remotos. **NAT/PAT** traduce direccionamiento.
:::

## 1️⃣2️⃣ Ruta por defecto hacia Internet

En el punto anterior vimos:

```text
0.0.0.0/0
```

Un router puede utilizar esta ruta cuando no dispone de otra más específica para el destino.

```text
LAN → Router local → proveedor → Internet
```

Por tanto, configurar NAT no elimina la necesidad de disponer de rutas adecuadas.

## 1️⃣3️⃣ Ejemplo completo

Tenemos:

```text
LAN: 192.168.50.0/26

PC-A:
192.168.50.20/26
Gateway: 192.168.50.1

Router LAN:
192.168.50.1/26
```

PC-A quiere acceder a un servidor externo.

El razonamiento es:

```text
1. ¿El servidor pertenece a 192.168.50.0/26?
   No.

2. ¿A quién entrega PC-A el paquete?
   A 192.168.50.1.

3. ¿Qué MAC necesita PC-A?
   La MAC de su gateway.

4. ¿Qué hace el router?
   Enruta el tráfico hacia el exterior.

5. Si está configurado NAT/PAT:
   realiza la traducción correspondiente.

6. ¿Cómo vuelve la respuesta?
   El dispositivo consulta la traducción y la entrega a PC-A.
```

## 1️⃣4️⃣ Tabla de traducciones

De forma simplificada:

| Host interno | Puerto interno | Dirección exterior | Puerto traducido |
|---|---:|---|---:|
| `192.168.50.20` | 51000 | IP exterior del router | 40001 |
| `192.168.50.30` | 52000 | IP exterior del router | 40002 |

Esto permite diferenciar comunicaciones de varios equipos que comparten una misma IPv4 exterior.

## 1️⃣5️⃣ Errores frecuentes

### 🟩 Confundir IP privada con IP pública

Las direcciones privadas están destinadas a redes internas y no se enrutan globalmente como direcciones públicas.

### 🟧 Pensar que NAT sustituye al gateway

El host sigue necesitando un siguiente salto para destinos remotos.

### 🟥 Pensar que NAT crea rutas

El dispositivo sigue necesitando una ruta hacia el destino.

### 🟪 Confundir NAT con DNS

DNS resuelve nombres. NAT traduce direccionamiento.

### 🟦 Pensar que todos los equipos necesitan una IP pública diferente

Con PAT, varios hosts pueden compartir una misma IPv4 pública.

## 1️⃣6️⃣ Comprueba lo aprendido

### 🟩 Actividad 1

Clasifica como privada o no privada:

```text
10.20.30.40
172.20.5.10
172.40.5.10
192.168.100.25
8.8.8.8
```

### 🟧 Actividad 2

Un equipo tiene:

```text
IP:      192.168.1.50/24
Gateway: 192.168.1.1
```

Quiere comunicarse con un destino remoto.

Explica:

1. cómo determina que el destino es remoto;
2. qué IP utiliza como gateway;
3. qué dirección MAC necesita inicialmente;
4. por qué no necesita conocer la MAC del servidor remoto.

### 🟥 Actividad 3

Tres PCs acceden simultáneamente a Internet utilizando una única IPv4 pública.

¿Qué mecanismo permite distinguir las distintas comunicaciones?

### 🟪 Actividad 4

Explica la diferencia entre:

- routing;
- NAT;
- PAT;
- DNS;
- firewall.

### 🟦 Actividad 5

Ordena el proceso:

- El router realiza la traducción.
- El PC determina que el destino es remoto.
- El servidor externo responde.
- El PC entrega el tráfico a su gateway.
- El router identifica a qué equipo interno corresponde la respuesta.
- El router reenvía la respuesta al PC.
