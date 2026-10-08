---
title: "Práctica 1. Observamos DHCP"
---

# Práctica 1. Observamos DHCP

## 1️⃣ Objetivos

En esta práctica vamos a reconocer el funcionamiento básico de DHCP y relacionarlo con el proceso **DORA**.

Al finalizar deberás ser capaz de:

- identificar Discover, Offer, Request y ACK;
- explicar por qué aparece tráfico broadcast;
- reconocer que DHCP utiliza UDP;
- identificar los puertos UDP 67 y 68;
- distinguir el papel del cliente y del servidor.

## 2️⃣ Recordatorio

El proceso de obtención inicial de una configuración DHCP puede resumirse como:

```text
CLIENTE                         SERVIDOR DHCP

Discover  ────────────────────>
          <──────────────────── Offer
Request   ────────────────────>
          <──────────────────── ACK
```

## 3️⃣ Actividad

Completa la siguiente tabla antes de continuar:

| Mensaje | Lo envía | Finalidad |
|---|---|---|
| Discover | | |
| Offer | | |
| Request | | |
| ACK | | |

Después responde:

1. ¿Por qué el cliente necesita utilizar broadcast al comienzo?
2. ¿Qué protocolo de transporte utiliza DHCP?
3. ¿Qué puerto utiliza el servidor DHCP?
4. ¿Qué puerto utiliza el cliente DHCP?
5. ¿En qué momento obtiene el cliente una configuración confirmada?

## 4️⃣ Observación del tráfico

Cuando dispongamos de una captura DHCP, localiza los cuatro mensajes DORA.

Para cada uno anota:

| Mensaje | Origen | Destino | UDP origen | UDP destino | ¿Broadcast? |
|---|---|---|---|---|---|
| Discover | | | | | |
| Offer | | | | | |
| Request | | | | | |
| ACK | | | | | |

:::tip[No copies sin interpretar]
El objetivo no es encontrar cuatro líneas en una captura, sino explicar qué función realiza cada mensaje.
:::

## 5️⃣ Conclusiones

Explica con tus palabras el proceso completo desde que un cliente sin configuración solicita DHCP hasta que puede utilizar la dirección concedida.
