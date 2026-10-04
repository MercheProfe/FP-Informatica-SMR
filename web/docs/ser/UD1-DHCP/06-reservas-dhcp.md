---
sidebar_position: 7
title: "1.6. Reservas DHCP"
---

# 1.6. Reservas DHCP

En el apartado anterior hemos utilizado **exclusiones** para impedir que determinadas direcciones del rango sean entregadas automáticamente.

Ahora queremos resolver una situación diferente:

> **¿Qué hacemos si queremos que un dispositivo utilice DHCP, pero reciba siempre la misma dirección IP?**

Para ello utilizamos una **reserva DHCP**.

## 1️⃣ ¿Qué es una reserva DHCP?

Una **reserva DHCP** es una configuración que hace que el servidor asigne una dirección IP determinada a un cliente concreto.

Por ejemplo, queremos que una impresora utilice DHCP pero reciba siempre:

```text
192.168.10.120
```

El servidor tendrá una asociación similar a:

```text
Cliente concreto  ─────────>  192.168.10.120
```

Cuando ese cliente solicite configuración mediante DHCP, el servidor reconocerá que existe una reserva para él y le ofrecerá la dirección correspondiente.

:::info[Idea clave]

Una reserva permite combinar dos características:

- el dispositivo obtiene su configuración mediante **DHCP**;
- recibe de forma controlada **una dirección IP determinada**.

:::

## 2️⃣ ¿Cómo identifica DHCP al cliente?

Para poder realizar una reserva, el servidor necesita identificar al dispositivo.

En nuestro nivel trabajaremos principalmente con la **dirección MAC** de la interfaz de red del cliente.

Ejemplo:

```text
Impresora
MAC: 00-1A-2B-3C-4D-5E
```

Creamos una reserva:

```text
MAC: 00-1A-2B-3C-4D-5E
        ↓
IP reservada: 192.168.10.120
```

Cuando el dispositivo solicita configuración, el servidor puede reconocerlo y asignarle la dirección reservada.

:::tip[Conexión con la UT0]

La dirección **MAC** identifica una interfaz de red en el ámbito local.

Ya la utilizamos al estudiar Ethernet y ARP. Ahora vuelve a aparecer con una función práctica en la administración de DHCP.

:::

## 3️⃣ ¿Para qué dispositivos puede ser útil?

Las reservas pueden ser útiles cuando necesitamos que un equipo mantenga una dirección predecible, pero queremos seguir administrando su configuración desde DHCP.

Por ejemplo:

- impresoras de red;
- determinados equipos de administración;
- dispositivos de red;
- equipos que deben ser localizados siempre en una dirección conocida;
- algunos servicios o dispositivos del laboratorio.

Ejemplo:

```text
Impresora-A  → 192.168.10.120
Impresora-B  → 192.168.10.121
Equipo-Aula  → 192.168.10.130
```

Cada dirección está asociada a un cliente concreto.

## 4️⃣ Dirección estática y reserva DHCP

Una reserva DHCP **no es lo mismo** que configurar manualmente una dirección estática.

### 🟩 Dirección estática

La configuración se introduce directamente en el dispositivo.

Por ejemplo:

```text
IP:       192.168.10.120
Máscara:  255.255.255.0
Gateway:  192.168.10.1
DNS:      192.168.10.10
```

El equipo no necesita solicitar esos parámetros a DHCP.

### 🟧 Reserva DHCP

El cliente continúa configurado para obtener sus parámetros automáticamente.

```text
Cliente
   │
   │ solicita configuración DHCP
   ▼
Servidor DHCP
   │
   │ reconoce al cliente
   ▼
Entrega la dirección reservada
192.168.10.120
```

La configuración se administra desde el servidor DHCP.

:::info[Diferencia fundamental]

**IP estática:** la dirección se configura en el propio dispositivo.

**Reserva DHCP:** el dispositivo utiliza DHCP, pero el servidor tiene preparada una dirección concreta para él.

:::

## 5️⃣ ¿Qué ventajas tiene una reserva?

Una reserva permite mantener una dirección predecible sin renunciar a la administración centralizada mediante DHCP.

Por ejemplo, si necesitamos modificar el servidor DNS utilizado por varios dispositivos:

### Configuración manual

Podríamos tener que entrar en cada dispositivo y modificar su configuración.

### Configuración mediante DHCP

Podemos administrar determinados parámetros desde el servidor DHCP y los clientes los obtendrán a través del servicio.

Por tanto, las reservas pueden facilitar:

- la administración centralizada;
- la identificación de determinados equipos;
- el mantenimiento de direcciones conocidas;
- la reducción de configuraciones manuales en los clientes.

## 6️⃣ Reserva y concesión

Aunque un cliente tenga una reserva, sigue participando en el funcionamiento de DHCP.

De forma simplificada:

```text
Cliente
   │
   │ DHCP Discover
   ▼
Servidor DHCP
   │
   │ identifica al cliente
   │ encuentra su reserva
   ▼
Ofrece la dirección reservada
```

Por ejemplo:

```text
MAC del cliente:
00-1A-2B-3C-4D-5E

Reserva:
192.168.10.120
```

El servidor intentará proporcionar a ese cliente la dirección asociada a la reserva.

:::tip[No confundas los conceptos]

Una **reserva** determina qué dirección debe recibir un cliente concreto.

Una **concesión** representa la asignación DHCP que el servidor realiza al cliente.

Son conceptos relacionados, pero no significan lo mismo.

:::

## 7️⃣ Exclusión y reserva: diferencias

Ya podemos comparar ambos mecanismos.

| Exclusión | Reserva |
|---|---|
| Evita que una dirección sea entregada dentro de las asignaciones dinámicas normales | Asocia una dirección concreta a un cliente |
| Se utiliza para proteger direcciones que no queremos asignar automáticamente | Se utiliza cuando queremos una asignación predecible mediante DHCP |
| No identifica necesariamente a un cliente | Necesita identificar al cliente |
| Puede abarcar una dirección o un intervalo | Se crea para un cliente concreto |

Podemos resumirlo así:

```text
EXCLUSIÓN
«No entregues esta dirección dinámicamente»

RESERVA
«Entrega esta dirección a este cliente concreto»
```

## 8️⃣ Ejemplo completo

Tenemos:

```text
Red:        192.168.20.0/24
Rango DHCP: 192.168.20.100 - 192.168.20.200
```

Queremos que una impresora utilice DHCP y reciba siempre:

```text
192.168.20.120
```

Su dirección MAC es:

```text
00-50-56-AA-BB-CC
```

Creamos una asociación:

```text
Nombre:       IMPRESORA-AULA
MAC:          00-50-56-AA-BB-CC
IP reservada: 192.168.20.120
```

Cuando la impresora solicite configuración DHCP:

```text
IMPRESORA
MAC 00-50-56-AA-BB-CC
        │
        │ solicitud DHCP
        ▼
SERVIDOR DHCP
        │
        │ consulta las reservas
        ▼
192.168.20.120
```

El resultado esperado es que esa impresora obtenga la dirección prevista.

## 9️⃣ ¿Qué ocurre si cambia la tarjeta de red?

La reserva depende de la identificación del cliente.

Si estamos utilizando la dirección MAC y sustituimos la tarjeta de red, la nueva interfaz tendrá normalmente otra dirección MAC.

Por ejemplo:

```text
MAC antigua:
00-50-56-AA-BB-CC

MAC nueva:
00-50-56-11-22-33
```

La reserva anterior ya no coincide con el nuevo identificador.

Será necesario actualizar la configuración de la reserva.

:::warning[Diagnóstico]

Si un equipo que tenía una reserva deja de recibir la dirección esperada, una de las comprobaciones será verificar que el identificador configurado en el servidor coincide con el del cliente.

:::

## 🔟 ¿Cómo averiguamos la MAC en Windows?

En un equipo Windows podemos consultar información de los adaptadores mediante:

```cmd
ipconfig /all
```

Entre los datos mostrados encontraremos la **dirección física** del adaptador.

También podemos utilizar:

```cmd
getmac
```

Cuando configuremos una reserva en el laboratorio, necesitaremos identificar correctamente la interfaz de red que estamos utilizando.

:::warning[Un equipo puede tener varias MAC]

Un ordenador puede disponer de varios adaptadores:

- Ethernet;
- Wi-Fi;
- adaptadores virtuales;
- otras interfaces.

Cada interfaz puede tener su propia dirección MAC.

Debemos utilizar la correspondiente a la interfaz que participa en nuestra red DHCP.

:::

## 1️⃣1️⃣ ¿Dónde lo veremos en Windows Server?

Cuando tengamos configurado nuestro servidor DHCP en **SER-Servidor**, podremos crear una reserva dentro del ámbito.

Necesitaremos, como mínimo, relacionar:

```text
Cliente
   ↓
Identificador / MAC
   ↓
Dirección IP reservada
```

Después, desde **SER-Cliente**, podremos solicitar de nuevo la configuración:

```cmd
ipconfig /release
ipconfig /renew
```

y comprobar:

```cmd
ipconfig /all
```

El objetivo será verificar que el cliente recibe la dirección que hemos reservado.

## 1️⃣2️⃣ Comprobar una reserva

Configurar una reserva no es suficiente. Debemos demostrar que funciona.

Una comprobación básica será:

```text
1. Identificar la MAC del cliente.
2. Crear la reserva en el servidor.
3. Liberar la configuración del cliente.
4. Solicitar una nueva configuración.
5. Consultar la IP obtenida.
6. Compararla con la IP reservada.
```

Esperamos:

```text
IP obtenida = IP reservada
```

Si no coincide, tendremos que revisar la configuración.

:::tip[Administrar es configurar y comprobar]

En las prácticas de esta unidad no consideraremos terminado un servicio simplemente porque hayamos completado un asistente.

Después de cada configuración tendremos que **comprobar el resultado**.

:::

## 1️⃣3️⃣ Comprueba que lo has entendido

Tenemos esta red:

```text
Red:        192.168.30.0/24
Rango DHCP: 192.168.30.100 - 192.168.30.200
```

Una impresora tiene:

```text
MAC: 00-AA-BB-CC-DD-EE
```

Queremos que utilice DHCP pero que siempre obtenga:

```text
192.168.30.125
```

Piensa:

1. ¿Necesitamos configurar manualmente `192.168.30.125` en la impresora?
2. ¿Qué mecanismo DHCP utilizaríamos?
3. ¿Qué dato permite al servidor reconocer al cliente?
4. ¿Qué deberíamos comprobar después de crear la configuración?
5. ¿Qué podría ocurrir si sustituimos la interfaz de red de la impresora?

## 1️⃣4️⃣ Resumen

| Concepto | Significado |
|---|---|
| Reserva DHCP | Asociación de una dirección IP con un cliente concreto |
| MAC | Identificador de la interfaz que podemos utilizar para reconocer al cliente |
| IP estática | Dirección configurada manualmente en el dispositivo |
| Exclusión | Dirección que DHCP no debe entregar dentro de las asignaciones dinámicas normales |
| Concesión | Asignación realizada por DHCP durante un periodo determinado |

Podemos diferenciar las tres situaciones:

```text
IP ESTÁTICA
El dispositivo tiene la configuración introducida manualmente.

EXCLUSIÓN
DHCP no debe entregar determinadas direcciones.

RESERVA
El cliente utiliza DHCP y recibe una dirección concreta.
```

Las reservas nos permiten controlar **qué dirección recibe un cliente**.

En los siguientes apartados ampliaremos la configuración que puede proporcionar DHCP, incluyendo parámetros como la **puerta de enlace y los servidores DNS**.
