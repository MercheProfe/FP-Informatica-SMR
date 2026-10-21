---
sidebar_position: 3
title: "3.2. DNS en Windows Server"
description: "Instalación del servicio DNS, zonas y registros en Windows Server."
---

# 3.2. DNS en Windows Server

**RA2 · CE d), f) y h)**

Windows Server incorpora el rol **Servidor DNS**, que permite resolver nombres de equipos y servicios de una red. En nuestro laboratorio, `SER-Servidor` alojará la zona DNS y `SER-Cliente` realizará las consultas.

## 1️⃣ Instalación y configuración básica

El rol **Servidor DNS** se instala desde el Administrador del servidor (*Agregar roles y características*). Su administración se realiza desde **Herramientas → DNS**.

Para que el servicio funcione correctamente:

- El servidor debe disponer de **IP fija**.
- El cliente debe utilizar la **IP del servidor DNS**, no necesariamente la del router.
- Debe existir una zona con los registros que se desean resolver.
- La comunicación DNS utiliza normalmente **UDP 53** y, cuando procede, **TCP 53**.

:::info[Relación con DHCP]
El DHCP de la UT1 puede entregar al cliente la dirección del servidor DNS mediante la **opción 006 (DNS Servers)** y el sufijo de dominio mediante la **opción 015 (DNS Domain Name)**. DHCP asigna la configuración; DNS resuelve los nombres.
:::

## 2️⃣ Zonas de búsqueda

Una **zona DNS** es la parte del espacio de nombres cuyos registros administra un servidor.

| Zona | Función | Ejemplo |
|---|---|---|
| **Búsqueda directa** | Nombre → dirección IP | `servidor.empresa.test` → `192.168.10.10` |
| **Búsqueda inversa** | Dirección IP → nombre | `192.168.10.10` → `servidor.empresa.test` |

Una **zona primaria estándar** permite editar los registros y almacenarlos localmente. Una **zona secundaria** mantiene una copia de otra zona mediante transferencias; la estudiaremos con BIND9 en el apartado 3.4.

```text
Zona directa: empresa.test
    servidor.empresa.test ──── A ────> 192.168.10.10
    www.empresa.test ──────── A ────> 192.168.10.20

Zona inversa: 10.168.192.in-addr.arpa
    10.10.168.192.in-addr.arpa ─ PTR ─> servidor.empresa.test
```

*Las direcciones del esquema son ejemplos; en el laboratorio se emplearán las IP reales.*

## 3️⃣ Registros DNS principales

| Tipo | Función | Ejemplo |
|---|---|---|
| **A** | Nombre → IPv4 | `servidor` → `192.168.10.10` |
| **AAAA** | Nombre → IPv6 | `equipo` → `2001:db8::10` |
| **CNAME** | Alias de otro nombre | `intranet` → `www.empresa.test` |
| **MX** | Servidor receptor de correo del dominio, con prioridad | `empresa.test` → `correo.empresa.test` (10) |
| **NS** | Servidor autoritativo de la zona | `empresa.test` → `servidor.empresa.test` |
| **PTR** | IP → nombre (zona inversa) | `192.168.10.10` → `servidor.empresa.test` |
| **SOA** | Datos de autoridad y parámetros de la zona | Servidor principal, número de serie y temporizadores |

:::tip[Registro MX]
Un registro MX señala un **nombre**, no una dirección IP. Ese nombre debe poder resolverse mediante un registro A o AAAA. Crear un MX no instala ni configura un servidor de correo.
:::

## 4️⃣ Resolución desde el cliente

El cliente consulta el servidor DNS que tenga configurado. Si el servidor es autoritativo para la zona, responde con sus propios registros.

```text
SER-Cliente                    SER-Servidor (DNS)
    |                                |
    |  ¿IP de www.empresa.test?      |
    | -----------------------------> |
    |                                | Consulta zona empresa.test
    | <----------------------------- |
    |       Respuesta: dirección IP  |
```

Comandos útiles en Windows:

```powershell
ipconfig /all
nslookup www.empresa.test
nslookup -type=MX empresa.test
nslookup -type=NS empresa.test
nslookup 192.168.10.10
```

Para consultar un servidor concreto, aunque no sea el configurado por defecto:

```powershell
nslookup www.empresa.test 192.168.10.10
```

*Las IP son ilustrativas. Sustituirlas por las del laboratorio.*

## 5️⃣ Verificación y errores frecuentes

| Síntoma | Qué comprobar |
|---|---|
| No responde el servidor DNS | IP, conectividad, servicio DNS y cortafuegos |
| Responde el DNS, pero no encuentra el nombre | Zona, nombre completo y registro solicitado |
| El cliente usa otro DNS | Configuración IP y opción 006 de DHCP |
| La búsqueda inversa falla | Existencia de zona inversa y registro PTR |
| El alias o correo no resuelve | Destino del CNAME o MX y sus registros A/AAAA |

:::warning[Alcance de este apartado]
Aquí trabajaremos la **resolución de nombres internos**. Los reenviadores y la caché para consultas externas se estudiarán en el apartado **3.3**. La transferencia de zonas se estudiará en **3.4**.
:::
