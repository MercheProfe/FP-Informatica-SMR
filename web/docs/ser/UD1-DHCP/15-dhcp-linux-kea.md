---
title: "1.15 DHCP en Linux: servidor Kea"
description: "Fundamentos, configuración y administración de Kea DHCP en Ubuntu Server para 2.º de SMR."
sidebar_position: 27
---

# DHCP en Linux: servidor Kea

En esta parte de la UT1 aprenderemos a **prestar el servicio DHCP desde un servidor Linux**, utilizando **Kea DHCP** en Ubuntu Server. Partiremos de los conceptos de direcciones IP, máscaras y redes estudiados anteriormente.

Nuestro objetivo es comprender **qué configuramos, por qué y cómo comprobamos su funcionamiento**. La instalación y las pruebas completas se realizarán en una práctica guiada independiente.

## 1️⃣ ¿Para qué sirve un servidor DHCP en Linux?

**DHCP** (*Dynamic Host Configuration Protocol*, protocolo de configuración dinámica de host) permite que un equipo obtenga automáticamente los parámetros de red necesarios para comunicarse.

Un servidor DHCP puede proporcionar:

- **Dirección IPv4**, por ejemplo `192.168.10.130`.
- **Máscara de subred**, por ejemplo `255.255.255.0`.
- **Puerta de enlace predeterminada**, cuando la red dispone de un router.
- **Servidores DNS**, cuando se desea proporcionar resolución de nombres.
- **Duración de la concesión**, es decir, durante cuánto tiempo puede utilizarse la dirección asignada.

DHCP no necesita que configuremos obligatoriamente una puerta de enlace o un DNS: en una red interna donde solo nos comunicamos por IP, basta con la dirección y la máscara.

:::info[DHCP y DNS no son lo mismo]
DHCP entrega parámetros de configuración de red. DNS traduce nombres de dominio a direcciones IP. Un servidor DHCP puede indicar qué DNS deben usar los clientes, pero no realiza por ello la resolución de nombres.
:::

## 2️⃣ Kea DHCP en Ubuntu Server

**Kea** es un servidor DHCP que permite administrar direcciones IPv4 y, mediante otros componentes, IPv6. En nuestro laboratorio utilizamos el servicio **Kea DHCPv4**.

Para instalar el componente IPv4 en Ubuntu:

```bash
sudo apt update
sudo apt install kea-dhcp4-server
```

El archivo principal de configuración es:

```text
/etc/kea/kea-dhcp4.conf
```

Kea lee este archivo al iniciarse. En él se definen la interfaz de red, las subredes, los rangos de direcciones, los tiempos de concesión y las reservas.

### 🟩 Administración del servicio

Linux utiliza `systemd` para gestionar servicios. Estos son los comandos básicos:

| Comando | Función |
|---|---|
| `sudo systemctl status kea-dhcp4-server --no-pager` | Consultar el estado y los mensajes recientes. |
| `sudo systemctl is-active kea-dhcp4-server` | Comprobar si está activo. |
| `sudo systemctl is-enabled kea-dhcp4-server` | Comprobar si está habilitado para arrancar con Ubuntu. |
| `sudo systemctl start kea-dhcp4-server` | Iniciar el servicio. |
| `sudo systemctl stop kea-dhcp4-server` | Detener el servicio. |
| `sudo systemctl restart kea-dhcp4-server` | Reiniciarlo para aplicar cambios. |

`active (running)` indica que el proceso está en ejecución. **No garantiza, por sí solo, que los clientes reciban direcciones**: hay que comprobarlo desde un equipo cliente.

## 3️⃣ Escenario de nuestro laboratorio

Trabajamos con tres máquinas virtuales en VirtualBox:

| Máquina | Función | Configuración |
|---|---|---|
| `SER-SERVUBUNTU` | Servidor DHCP Kea | `192.168.10.20/24` en `enp0s8` |
| `SER-CLIENTE` | Cliente Windows | IPv4 automática por DHCP |
| `SER-SERVIDOR` | Servidor Windows de prácticas anteriores | Apagado durante las pruebas de Kea |

Ubuntu tiene dos adaptadores de red:

- **`enp0s3` (NAT):** permite a Ubuntu acceder a Internet para instalar paquetes.
- **`enp0s8` (red interna `LAN-SER`):** conecta Ubuntu con el cliente Windows. Es la interfaz en la que debe atender Kea.

La red interna es `192.168.10.0/24`, cuya máscara es `255.255.255.0`.

:::warning[Evitar dos servidores DHCP en el mismo segmento]
Si el servidor DHCP de Windows y Kea responden simultáneamente en `LAN-SER`, un cliente podría recibir la configuración de cualquiera de ellos. En nuestras pruebas mantenemos apagado el servidor Windows.
:::

## 4️⃣ Estructura del archivo de configuración

Kea utiliza un archivo de configuración con estructura similar a JSON, organizado mediante objetos `{ }` y listas `[ ]`.

Esta es una configuración mínima equivalente a la que utilizamos en el laboratorio, con el rango y el tiempo de concesión actualizados:

```json
{
    "Dhcp4": {
        "interfaces-config": {
            "interfaces": ["enp0s8"]
        },
        "lease-database": {
            "type": "memfile",
            "persist": true,
            "name": "/var/lib/kea/kea-leases4.csv"
        },
        "valid-lifetime": 7200,
        "subnet4": [
            {
                "id": 1,
                "subnet": "192.168.10.0/24",
                "pools": [
                    {
                        "pool": "192.168.10.120 - 192.168.10.160"
                    }
                ]
            }
        ]
    }
}
```

### 🟩 Interfaz de escucha

```json
"interfaces-config": {
    "interfaces": ["enp0s8"]
}
```

Indica en qué interfaz de red atenderá Kea las solicitudes DHCP. En nuestro caso, **solo en la red interna**, no en el adaptador NAT.

### 🟧 Base de datos de concesiones

```json
"lease-database": {
    "type": "memfile",
    "persist": true,
    "name": "/var/lib/kea/kea-leases4.csv"
}
```

`memfile` permite almacenar las concesiones en un archivo CSV. `persist: true` indica que se conservan en disco.

### 🟥 Tiempo de concesión

```json
"valid-lifetime": 7200
```

El valor se expresa en **segundos**: `7200` equivale a **2 horas**.

### 🟪 Subred y rango (*pool*)

```json
"subnet": "192.168.10.0/24",
"pools": [
    { "pool": "192.168.10.120 - 192.168.10.160" }
]
```

La **subred** identifica la red a la que pertenecen los clientes. El **pool** delimita qué direcciones puede repartir dinámicamente el servidor.

La IP fija del servidor, `192.168.10.20`, queda fuera del rango dinámico.

:::tip[Relación con subnetting]
Antes de definir un rango DHCP, comprueba que sus direcciones pertenecen a la subred y que no incluyen la dirección de red ni la de broadcast.
:::

## 5️⃣ Validar y modificar la configuración mediante comandos

No es imprescindible editar siempre el archivo con `nano`. Podemos utilizar herramientas de terminal para consultar y modificar parámetros.

### 🟩 Copia de seguridad

Antes de realizar cambios, conviene conservar una versión funcional:

```bash
sudo cp /etc/kea/kea-dhcp4.conf /etc/kea/kea-dhcp4.conf.funcionando
```

### 🟧 Consultar parámetros con `grep`

```bash
sudo grep '"valid-lifetime"' /etc/kea/kea-dhcp4.conf
sudo grep '"pool"' /etc/kea/kea-dhcp4.conf
```

`grep` busca líneas que contienen el texto indicado. Utilizamos `sudo` porque el archivo está protegido.

### 🟥 Sustituir un valor con `sed`

Por ejemplo, para cambiar la duración de una concesión de una a dos horas:

```bash
sudo sed -i 's/"valid-lifetime": 3600/"valid-lifetime": 7200/' /etc/kea/kea-dhcp4.conf
```

`sed` sustituye texto; **no comprende la estructura de la configuración**. Por ello debemos comprobar que la cadena original existe y que la sustitución se ha realizado correctamente.

### 🟪 Validar antes de reiniciar

```bash
sudo -u _kea /usr/sbin/kea-dhcp4 -t /etc/kea/kea-dhcp4.conf
```

La opción `-t` comprueba la configuración sin poner en marcha otra instancia del servidor. En nuestro laboratorio realizamos esta comprobación con el usuario de servicio `_kea`.

Si la validación es correcta, aplicamos los cambios:

```bash
sudo systemctl restart kea-dhcp4-server
sudo systemctl is-active kea-dhcp4-server
```

El procedimiento recomendado es siempre: **copia de seguridad → modificación → comprobación → validación → aplicación → prueba desde el cliente**.

## 6️⃣ Las concesiones DHCP (*leases*)

Una **concesión DHCP** es la autorización temporal que recibe un cliente para utilizar una dirección IP.

En nuestro laboratorio, Windows obtuvo inicialmente `192.168.10.100`. Después cambiamos el rango y, al liberar la configuración y solicitar una nueva, recibió `192.168.10.122`.

### 🟩 Renovar y liberar una concesión en Windows

```cmd
ipconfig /all
ipconfig /renew
ipconfig /release
```

- `ipconfig /all`: muestra los parámetros recibidos, el servidor DHCP y las fechas de concesión.
- `ipconfig /renew`: solicita una renovación; **no implica necesariamente cambiar de dirección**.
- `ipconfig /release`: libera la concesión y retira temporalmente la configuración IPv4 del adaptador.

Cuando se cambia el rango de un servidor DHCP, las concesiones ya otorgadas **no desaparecen instantáneamente**. Su comportamiento posterior depende de la renovación y de las decisiones del servidor.

### 🟧 Consultar las concesiones en Ubuntu

En nuestro laboratorio, Kea almacena sus registros en:

```text
/var/lib/kea/kea-leases4.csv
```

Para consultarlos:

```bash
sudo cat /var/lib/kea/kea-leases4.csv
sudo tail -n 5 /var/lib/kea/kea-leases4.csv
```

Entre los campos más importantes se encuentran:

| Campo | Significado |
|---|---|
| `address` | Dirección IPv4 concedida. |
| `hwaddr` | Dirección MAC del cliente. |
| `client_id` | Identificador DHCP del cliente. |
| `valid_lifetime` | Duración de la concesión, en segundos. |
| `expire` | Momento de expiración, almacenado como marca de tiempo. |
| `state` | Estado de la concesión. |

Los valores habituales de `state` son `0` (asignada), `1` (declinada), `2` (caducada y recuperada) y `3` (liberada).

:::warning[El CSV no es una tabla de clientes activos]
El archivo `memfile` puede conservar registros históricos y varias líneas para una misma IP. No debemos contar todas sus filas como concesiones simultáneamente activas. Tampoco debemos editar o borrar sus líneas manualmente mientras Kea está funcionando.
:::

## 7️⃣ Reservas DHCP

Una **reserva DHCP** asocia un identificador de cliente, habitualmente su dirección MAC, con una dirección IPv4 concreta.

Esto permite que el cliente **siga configurado para obtener una IP automáticamente**, pero reciba la dirección reservada cuando solicite una concesión.

En nuestro laboratorio:

| Elemento | Valor |
|---|---|
| Cliente | `SER-CLIENTE` |
| Dirección MAC | `08:00:27:c6:80:de` |
| IP reservada | `192.168.10.130` |
| Red | `192.168.10.0/24` |

La reserva se define dentro de la subred:

```json
"reservations": [
    {
        "hw-address": "08:00:27:c6:80:de",
        "ip-address": "192.168.10.130"
    }
]
```

En nuestro caso, la dirección reservada está dentro del pool `.120–.160`. Kea admite reservas de este tipo; en otros diseños también se pueden utilizar direcciones fuera del rango dinámico, siempre que pertenezcan a la subred y la configuración lo permita.

### 🟩 Reserva frente a IP estática

| Reserva DHCP | IP estática configurada en el cliente |
|---|---|
| Se configura en el servidor DHCP. | Se configura en el sistema operativo del cliente. |
| El cliente mantiene DHCP habilitado. | El cliente utiliza configuración manual. |
| Permite centralizar la administración. | Requiere administrar el propio equipo. |

:::info[Comprobación real]
Después de configurar la reserva y solicitar una nueva concesión, nuestro cliente Windows recibió `192.168.10.130`, tal como habíamos establecido en Kea.
:::

## 8️⃣ Diagnóstico básico del servidor

Si un cliente no recibe dirección IP, debemos comprobar de forma ordenada:

1. Que la interfaz del cliente está conectada a `LAN-SER` y tiene DHCP habilitado.
2. Que Ubuntu tiene la dirección `192.168.10.20/24` en `enp0s8`.
3. Que Kea está activo.
4. Que la subred y el pool están bien definidos.
5. Que la configuración se ha validado antes del reinicio.
6. Que no hay otro servidor DHCP respondiendo en el mismo segmento.

Para consultar mensajes recientes:

```bash
sudo journalctl -u kea-dhcp4-server -n 30 --no-pager -o cat
```

Algunos mensajes útiles para el diagnóstico son `DHCPREQUEST`, `DHCPACK` y `DHCPNAK`. La presencia de una petición recibida no demuestra, por sí sola, que el servidor haya enviado una respuesta satisfactoria.

Si Windows obtiene una dirección `169.254.x.x`, puede indicar que no ha conseguido una configuración IPv4 mediante DHCP.

## 9️⃣ Resumen de conceptos

| Concepto | Idea fundamental |
|---|---|
| Servidor DHCP | Asigna automáticamente parámetros de red. |
| Interfaz de escucha | Tarjeta por la que el servidor atiende a los clientes. |
| Subred | Red a la que pertenecen las direcciones asignadas. |
| Pool | Rango disponible para asignación dinámica. |
| Concesión | Uso temporal de una dirección IP. |
| Renovación | Solicitud para prolongar una concesión. |
| Liberación | Devolución de la dirección concedida. |
| Reserva | Asociación de una IP concreta a un cliente identificado. |
| `systemctl` | Administración del servicio Kea. |
| `journalctl` | Consulta de registros y errores. |

## 🔟 Comprueba lo aprendido

1. ¿Por qué Kea escucha en `enp0s8` y no en `enp0s3`?
2. ¿Qué diferencia existe entre la subred `192.168.10.0/24` y el pool `192.168.10.120–192.168.10.160`?
3. ¿Qué representa `valid-lifetime: 7200`?
4. ¿Por qué cambiar un pool no elimina inmediatamente todas las concesiones anteriores?
5. ¿En qué se diferencia una reserva DHCP de una dirección IP configurada manualmente?
6. ¿Por qué el archivo CSV puede contener varias líneas de una misma dirección IP?
7. ¿Qué comprobarías si Windows no consigue renovar su concesión?
8. ¿Por qué validamos la configuración antes de reiniciar Kea?
