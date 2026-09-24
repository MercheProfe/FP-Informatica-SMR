---
sidebar_position: 9
title: "Solución orientativa: configuración IPv4"
sidebar_class_name: solucion
---

# Solución orientativa: configuración IPv4

:::warning[Consulta la solución después de realizar la práctica]
Comprueba primero los resultados directamente en Packet Tracer y utiliza después esta solución para revisar tus conclusiones.
:::

## 1️⃣ Configuración inicial

| Equipo | IPv4 | Máscara |
|---|---|---|
| PC0 | `192.168.1.10` | `255.255.255.0` |
| PC1 | `192.168.1.20` | `255.255.255.0` |
| PC2 | `192.168.1.30` | `255.255.255.0` |

Son direcciones **privadas** porque pertenecen al bloque privado `192.168.0.0/16`.

La configuración es **estática** porque hemos introducido manualmente los parámetros.

## 2️⃣ Comprobación con ipconfig

El comando:

```text
ipconfig
```

permite consultar la configuración IP del equipo.

En esta práctica:

- **IP Configuration** permite establecer gráficamente la configuración.
- `ipconfig` permite consultarla desde la consola.

## 3️⃣ Comunicación inicial

Los resultados esperados son:

```text
PC0 → PC1    funciona
PC0 → PC2    funciona
PC1 → PC0    funciona
```

Los tres equipos tienen una configuración que les permite comunicarse directamente en la LAN planteada.

## 4️⃣ Loopback

Al ejecutar:

```text
ping 127.0.0.1
```

el propio equipo debe responder.

El tráfico no necesita pasar por Switch0 ni llegar a otro ordenador.

`127.0.0.1` es una dirección de **loopback** y permite comprobar el funcionamiento local de la pila TCP/IP.

## 5️⃣ Octeto incorrecto

La dirección:

```text
192.168.1.300
```

no es una IPv4 válida.

Cada octeto tiene 8 bits y puede representar valores entre:

```text
0 y 255
```

Por tanto, `300` está fuera del intervalo permitido.

## 6️⃣ Dirección duplicada

Dos interfaces de la misma red no deben utilizar simultáneamente la misma dirección IPv4.

Una dirección duplicada provoca un **conflicto de direccionamiento** y puede producir problemas de comunicación.

## 7️⃣ Cambio a 192.168.2.30

Al cambiar PC2 a:

```text
192.168.2.30
```

manteniendo:

```text
255.255.255.0
```

deja de pertenecer a la misma red que PC0:

```text
PC0 → 192.168.1.10/24 → red 192.168.1.0/24
PC2 → 192.168.2.30/24 → red 192.168.2.0/24
```

Por tanto, pertenecen a **redes diferentes**.

Para comunicar esas redes necesitaremos posteriormente un router y una configuración adecuada de puerta de enlace.

## 8️⃣ Puerta de enlace

Los tres equipos de la configuración inicial pueden comunicarse sin puerta de enlace porque el tráfico permanece en su propia red local.

La puerta de enlace será necesaria para alcanzar **otras redes**.

## 9️⃣ Configuración estática y dinámica

En esta práctica hemos utilizado:

```text
Static
```

porque hemos asignado manualmente los parámetros.

Con **DHCP**, los clientes pueden obtener automáticamente su configuración de red desde un servidor DHCP.

## 🔟 Resumen

```text
IPv4 = 32 bits
     = 4 octetos
     = 8 bits por octeto

Valores de un octeto:
0 – 255

127.0.0.1:
loopback

192.168.x.x:
direcciones incluidas en el bloque privado 192.168.0.0/16

Configuración utilizada:
estática
```
