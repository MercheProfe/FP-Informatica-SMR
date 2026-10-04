---
sidebar_position: 4
title: "1.3. Concesiones DHCP"
---

# 1.3. Concesiones DHCP

En el apartado anterior hemos visto que, durante el proceso **DORA**, el servidor DHCP ofrece una configuración al cliente y finalmente la confirma mediante un mensaje **DHCP ACK**.

Pero esa dirección IP no se entrega necesariamente para siempre. DHCP trabaja normalmente mediante **concesiones**.

Una concesión, también denominada **lease**, permite que un cliente utilice una dirección IP durante un periodo determinado.

## 1️⃣ ¿Qué es una concesión DHCP?

Una **concesión DHCP** es la asignación temporal de una dirección IP y otros parámetros de red a un cliente.

Por ejemplo:

```text
Cliente:              PC-AULA-01
Dirección concedida:  192.168.10.100
Máscara:              255.255.255.0
Gateway:              192.168.10.1
DNS:                  192.168.10.10
Duración:             8 horas
```

La dirección `192.168.10.100` no pasa a ser propiedad permanente del equipo. El servidor permite que ese cliente la utilice durante el tiempo establecido.

:::info[Idea clave]

DHCP no suele entregar una dirección IP de forma permanente.

La **concede durante un periodo de tiempo**. Cuando ese periodo se aproxima a su final, el cliente intenta renovar la concesión.

:::

## 2️⃣ ¿Por qué las direcciones se conceden temporalmente?

En una red pueden conectarse equipos que permanecen durante periodos muy diferentes. Si cada dispositivo conservara permanentemente la dirección que recibió la primera vez, muchas direcciones quedarían ocupadas aunque esos dispositivos ya no estuvieran conectados.

Las concesiones permiten **reutilizar las direcciones IP**.

Por ejemplo, si el servidor dispone de:

```text
192.168.10.100 - 192.168.10.150
```

y un portátil recibe `192.168.10.105`, esa dirección podrá volver a utilizarse cuando la concesión deje de estar vigente y vuelva a quedar disponible.

:::tip[Piensa en un préstamo]

Una concesión DHCP se parece más a un **préstamo** que a una entrega definitiva.

El servidor permite utilizar una dirección durante un tiempo determinado y controla qué direcciones tiene actualmente concedidas.

:::

## 3️⃣ Duración de la concesión

El periodo durante el cual el cliente puede utilizar la dirección se denomina **lease time** o **duración de la concesión**.

Por ejemplo:

```text
Inicio de la concesión: 10:00
Duración:                8 horas
Final previsto:          18:00
```

El administrador puede configurar esta duración según las características de la red.

### 🟩 Concesiones más largas

Pueden ser adecuadas cuando los dispositivos cambian poco, por ejemplo en ordenadores de un aula u oficina.

Reducen la frecuencia con la que los clientes necesitan renovar.

### 🟧 Concesiones más cortas

Pueden ser útiles cuando los dispositivos cambian continuamente, por ejemplo en redes de invitados, hoteles o eventos.

Permiten que las direcciones vuelvan a estar disponibles antes.

:::warning[No existe una duración ideal para todas las redes]

Una duración demasiado larga puede hacer que las direcciones tarden más en quedar disponibles.

Una duración demasiado corta provoca renovaciones más frecuentes.

:::

## 4️⃣ Renovación de una concesión

El cliente no espera normalmente hasta el último instante para perder su dirección. Durante la concesión intenta **renovarla**.

Si el servidor acepta la renovación, el cliente puede continuar utilizando su configuración y se amplía el periodo de concesión.

```text
CLIENTE                           SERVIDOR DHCP

192.168.10.100
     │
     │──── Solicitud de renovación ────>
     │
     │<── Renovación confirmada ────────
     │
Continúa usando
192.168.10.100
```

## 5️⃣ T1: primer intento de renovación

DHCP define diferentes momentos relacionados con la renovación.

El primero es **T1**. Habitualmente se sitúa en el **50 % de la duración de la concesión**, salvo que se hayan indicado otros valores.

Si una concesión dura 8 horas:

```text
T1 ≈ 4 horas
```

En esta fase, el cliente intenta renovar con el servidor que le concedió la dirección.

:::info[T1]

**T1** es el momento en el que el cliente comienza normalmente a intentar renovar su concesión con el servidor DHCP que se la proporcionó.

La concesión todavía sigue siendo válida.

:::

## 6️⃣ T2: rebinding

Si el servidor original no responde, el cliente continúa utilizando su dirección mientras la concesión siga siendo válida.

Más adelante alcanza **T2**, habitualmente alrededor del **87,5 % de la duración de la concesión**, salvo que se hayan indicado otros valores.

A partir de T2, el cliente entra en una fase de **rebinding** e intenta contactar con cualquier servidor DHCP adecuado que pueda renovar su concesión.

Para una concesión de 8 horas:

```text
Inicio                     T1                    T2        Fin
  │                         │                     │         │
  0 h                       4 h                   7 h       8 h
  │─────────────────────────│─────────────────────│─────────│
                       concesión válida
```

:::tip[Para entenderlo]

**T1:** «Intento renovar con el servidor que me dio la dirección».

**T2:** «La concesión se acerca al final; intento renovarla con un servidor DHCP disponible».

:::

## 7️⃣ ¿Qué ocurre si la concesión caduca?

Si el cliente no consigue renovar y la concesión expira, ya no puede seguir utilizando esa dirección basándose en esa concesión.

Tendrá que intentar obtener nuevamente una configuración DHCP válida.

La dirección podrá volver a estar disponible para otros clientes cuando corresponda.

```text
Cliente A usa 192.168.10.105
            │
            ▼
     finaliza la concesión
            │
            ▼
  dirección reutilizable
            │
            ▼
         Cliente B
```

## 8️⃣ Liberar una concesión

Un cliente puede comunicar que deja de necesitar una dirección antes de que termine la concesión.

En Windows utilizaremos:

```cmd
ipconfig /release
```

Después podremos solicitar nuevamente configuración mediante:

```cmd
ipconfig /renew
```

:::warning[Release y renew no significan lo mismo]

`ipconfig /release` libera la configuración DHCP.

`ipconfig /renew` intenta obtener o renovar una configuración DHCP.

:::

## 9️⃣ Renovar no significa cambiar de IP

Cuando un cliente renueva una concesión, **no significa necesariamente que vaya a recibir otra dirección**.

Por ejemplo:

```text
Antes de renovar:    192.168.10.105
Después de renovar:  192.168.10.105
```

Puede mantenerse la misma dirección y cambiar el periodo durante el que el cliente puede seguir utilizándola.

## 🔟 ¿Cómo controla el servidor las direcciones?

El servidor DHCP mantiene información sobre las concesiones realizadas.

De forma simplificada:

| Dirección IP | Cliente | Estado |
|---|---|---|
| 192.168.10.100 | PC01 | Concedida |
| 192.168.10.101 | PC02 | Concedida |
| 192.168.10.102 | — | Disponible |
| 192.168.10.103 | PC03 | Concedida |

Cuando instalemos DHCP en **Windows Server**, podremos consultar las concesiones desde la consola de administración.

Desde el cliente podremos compararlas con:

```cmd
ipconfig /all
```

## 1️⃣1️⃣ ¿Qué ocurre si apagamos un cliente?

Apagar un equipo no significa necesariamente que su dirección quede inmediatamente disponible para cualquier otro dispositivo.

El servidor mantiene la concesión mientras siga siendo válida.

Por tanto:

```text
Equipo apagado ≠ concesión eliminada inmediatamente
```

:::info[Importante]

DHCP debe controlar las direcciones concedidas para evitar que una misma dirección sea asignada simultáneamente a varios clientes.

:::

## 1️⃣2️⃣ Ejemplo completo

Supongamos que nuestro servidor dispone del rango:

```text
192.168.10.100 - 192.168.10.150
```

y una duración de concesión de 8 horas.

Un cliente se conecta a las 08:00 y obtiene:

```text
IP:       192.168.10.105
Máscara:  255.255.255.0
Gateway:  192.168.10.1
DNS:      192.168.10.10
```

De forma simplificada:

```text
08:00                   12:00                15:00     16:00
  │                       │                    │          │
INICIO                    T1                   T2        FIN
  │───────────────────────│────────────────────│──────────│
                         concesión válida
```

Si consigue renovarla, podrá continuar utilizando normalmente `192.168.10.105`.

## 1️⃣3️⃣ ¿Dónde lo veremos en nuestro laboratorio?

Cuando configuremos **SER-Servidor** como servidor DHCP podremos observar las concesiones desde Windows Server.

Desde **SER-Cliente** utilizaremos:

```cmd
ipconfig /all
```

Después experimentaremos con:

```cmd
ipconfig /release
ipconfig /renew
```

y comprobaremos qué cambia en el cliente y en el servidor.

:::tip[Objetivo de la práctica]

Antes de ejecutar cada comando intentaremos predecir **qué debería ocurrir** y después comprobaremos si nuestra predicción era correcta.

:::

## 1️⃣4️⃣ Resumen

| Concepto | Significado |
|---|---|
| Concesión / lease | Asignación temporal de configuración DHCP |
| Lease time | Duración de la concesión |
| Renovación | Proceso para ampliar una concesión |
| T1 | Primer momento habitual de renovación |
| T2 | Momento posterior de rebinding |
| Liberación | El cliente deja de utilizar voluntariamente la concesión |
| `ipconfig /release` | Libera la configuración DHCP |
| `ipconfig /renew` | Solicita o renueva configuración DHCP |

La idea fundamental es:

> **Las direcciones de un rango DHCP son recursos que el servidor administra y puede reutilizar.**

En el siguiente apartado veremos cómo decide el administrador **qué conjunto de direcciones puede entregar el servidor**, estudiando los **ámbitos, pools y rangos DHCP**.
