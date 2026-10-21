---
sidebar_position: 4
title: "P02. DNS de empresa en Windows Server"
description: "Instalación del servicio DNS, creación de zonas y registros y comprobación desde un cliente."
---

# P02. DNS de empresa en Windows Server

**Unidad:** UT3 · DNS  
**RA2:** CE d), f) y h)  
**Duración orientativa:** 2 sesiones de 2 horas  
**Modalidad:** individual o parejas

## 1️⃣ Objetivo y escenario

Una pequeña empresa necesita resolver por nombre sus equipos y servicios internos. Configurarás un servidor DNS en Windows Server y comprobarás su funcionamiento desde un cliente Windows.

**Máquinas:** `SER-Servidor` y `SER-Cliente`, conectadas a la red interna de VirtualBox. No se utilizará la red física del centro.

**Datos del laboratorio:** conserva las direcciones IP y el ámbito DHCP ya configurados en la UT1. Antes de comenzar, anota la IP del servidor, la IP del cliente y la máscara.

| Parámetro | Valor |
|---|---|
| IP de `SER-Servidor` | __________________ |
| IP de `SER-Cliente` | __________________ |
| Máscara de red | __________________ |
| Zona directa de la práctica | `empresa.test` |
| Nombre del servidor DNS | `servidor.empresa.test` |

:::warning[Antes de empezar]
Comprueba que solo está activo el servidor DHCP previsto para el laboratorio. No modifiques la red del centro ni cambies el direccionamiento existente sin autorización.
:::

## 2️⃣ Tareas

1. **Instala el rol DNS** en `SER-Servidor` y comprueba que el servicio está operativo.
2. **Crea una zona de búsqueda directa primaria estándar** denominada `empresa.test`.
3. Añade los registros necesarios para obtener estos resultados:

   | Nombre | Tipo | Destino |
   |---|---|---|
   | `servidor.empresa.test` | A | IP real de `SER-Servidor` |
   | `www.empresa.test` | A | IP real de `SER-Cliente` |
   | `intranet.empresa.test` | CNAME | `www.empresa.test` |
   | `correo.empresa.test` | A | IP real de `SER-Cliente` |
   | `empresa.test` | MX | `correo.empresa.test` (prioridad 10) |

4. **Crea la zona de búsqueda inversa** correspondiente a la subred IPv4 del laboratorio y añade al menos el PTR del servidor.
5. **Configura `SER-Cliente` para utilizar `SER-Servidor` como DNS**, preferiblemente mediante la opción 006 del DHCP existente. Renueva la concesión si es necesario.
6. Comprueba desde el cliente la resolución directa, el alias, el registro MX y la resolución inversa del servidor.
7. Cambia temporalmente la dirección IP del registro `www` por otra IP válida de la red (sin asignarla a otro equipo), verifica el cambio en DNS y **restaura el valor inicial**.

:::info[Importante]
Un registro DNS puede existir aunque no haya una web o un servidor de correo funcionando. En esta práctica verificamos **resolución de nombres**, no servicios HTTP o SMTP.
:::

## 3️⃣ Comprobaciones

Utiliza `ipconfig /all` y `nslookup` para justificar los resultados. Consulta expresamente el servidor DNS de la práctica si necesitas descartar otros servidores.

Responde brevemente:

1. ¿Qué diferencia hay entre la zona directa y la inversa?
2. ¿Qué diferencia existe entre los registros A y CNAME?
3. ¿Qué información aporta el registro MX? ¿Significa que ya funciona el correo?
4. ¿Qué ocurre si el cliente tiene configurado un servidor DNS distinto?
5. ¿Por qué una respuesta DNS correcta no garantiza que funcione una página web?

## 4️⃣ Entrega

Entrega un documento PDF con:

- Tabla del direccionamiento real utilizado.
- Captura de la zona directa y de sus registros.
- Captura de la zona inversa y del registro PTR.
- Captura de la configuración DNS del cliente.
- Resultados de las consultas de nombre, alias, MX y PTR.
- Respuestas a las cinco preguntas.

**Criterio de logro:** DNS instalado, zona y registros correctos, cliente configurado y consultas verificadas.
