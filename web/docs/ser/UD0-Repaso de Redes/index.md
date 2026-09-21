---
sidebar_position: 0
sidebar_label: "Introducción"
title: "UD0 · Repaso de Redes"
slug: /ser/ud0-repaso-redes
description: "Repaso de los conceptos fundamentales de redes necesarios para trabajar con los servicios en red."
---

# UD0 · Repaso de Redes

Antes de comenzar a instalar y configurar servicios de red, necesitamos recuperar algunos de los conceptos estudiados en **1.º de SMR**.

En esta unidad repasaremos cómo se comunican los dispositivos de una red, cómo se identifican y qué elementos intervienen para que la información pueda viajar desde un equipo hasta otro.

:::info[Objetivo de la unidad]
El objetivo no es volver a estudiar Redes Locales desde cero, sino **recuperar los conocimientos que necesitaremos durante el módulo de Servicios en Red** y aplicarlos progresivamente en nuestro laboratorio.
:::

---

## ¿Qué vamos a repasar?

Durante esta unidad trabajaremos los siguientes contenidos:

### ■ 1. Conceptos básicos de redes

LAN, WAN, protocolos y topologías de red.

[Ir al apartado 1 →](./01-conceptos-basicos-redes)

### ■ 2. Dispositivos de red

Tarjeta de red, switch, router y punto de acceso.

### ■ 3. Modelo TCP/IP

Capas del modelo TCP/IP y principales protocolos de cada nivel.

### ■ 4. Direcciones MAC y ARP

Identificación de dispositivos dentro de una LAN y funcionamiento básico de ARP.

### ■ 5. Direccionamiento IPv4

Estructura de una dirección IPv4, direcciones públicas y privadas, y conceptos de red y host.

### ■ 6. Máscara de red y CIDR

Dirección de red, broadcast, rango de hosts y notación CIDR.

### ■ 7. IPv6

Estructura de las direcciones IPv6, abreviación, prefijo `/64`, direcciones globales y link-local y configuración mediante SLAAC.

### ■ 8. Configuración de un equipo

Dirección IP, máscara o prefijo, puerta de enlace y servidor DNS.

---

## Del repaso al laboratorio

Los conceptos de esta unidad los iremos aplicando sobre nuestro propio laboratorio de **Servicios en Red**.

Trabajaremos inicialmente con dos máquinas virtuales:

```text
                    RED VIRTUAL
                         │
              ┌──────────┴──────────┐
              │                     │
        SER-SERVIDOR           SER-CLIENTE
       Windows Server             Windows
              │                     │
              └──────────┬──────────┘
                         │
                     VirtualBox
```

A medida que avancemos, configuraremos la red y utilizaremos diferentes herramientas para observar qué está ocurriendo realmente en las comunicaciones.

:::tip[La idea]
No nos limitaremos a recordar conceptos. Intentaremos **verlos funcionando**: direcciones IP, conectividad, resolución de nombres, configuración automática y acceso a servicios.
:::

---

## ¿Por qué necesitamos este repaso?

Durante el módulo configuraremos servicios como **DHCP, DNS y servicios web**.

Para comprender qué estamos haciendo necesitaremos responder preguntas como:

- ¿Están dos equipos en la misma red?
- ¿Qué dirección IP tiene cada equipo?
- ¿Para qué sirve la máscara de red?
- ¿Cuándo interviene el router?
- ¿Cómo encuentra un equipo la dirección MAC de otro?
- ¿Cómo obtiene un cliente automáticamente su configuración de red?
- ¿Cómo se transforma un nombre en una dirección IP?

:::note[Siguiente paso]
Comenzamos repasando qué es una red, las diferencias entre **LAN y WAN**, los **protocolos** y las principales **topologías de red**.
:::

[Comenzar: 1. Conceptos básicos de redes →](./01-conceptos-basicos-redes)
