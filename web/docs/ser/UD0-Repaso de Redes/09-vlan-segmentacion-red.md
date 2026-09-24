---
sidebar_position: 18
title: "0.9. VLAN y segmentación de la red"
---

# VLAN y segmentación de la red

En el punto anterior hemos utilizado **subredes y routers** para separar y comunicar redes IP diferentes.

Ahora veremos otra forma de segmentar una red: las **VLAN**.

Una VLAN permite dividir lógicamente un switch en varios grupos independientes, aunque los equipos estén conectados físicamente al mismo dispositivo.

## 1️⃣ El problema: un switch, varios grupos

Imagina un pequeño centro con un único switch:

```text
PC-ADM ─┐
PC-PROF ─┼── Switch
PC-AULA1 ─┤
PC-AULA2 ─┘
```

Sin ninguna configuración adicional, todos los puertos pertenecen al mismo dominio de broadcast.

Si queremos separar:

- Administración.
- Profesorado.
- Alumnado.

podríamos instalar switches diferentes, pero no siempre es necesario.

Podemos crear **redes LAN virtuales**.

## 2️⃣ ¿Qué es una VLAN?

**VLAN** significa **Virtual Local Area Network**.

Una VLAN crea una separación lógica dentro de una infraestructura física de switching.

Por ejemplo:

```text
VLAN 10 → Administración
VLAN 20 → Profesorado
VLAN 30 → Alumnado
```

Aunque los equipos estén conectados al mismo switch:

```text
Switch0
├── Fa0/1 → VLAN 10
├── Fa0/2 → VLAN 10
├── Fa0/3 → VLAN 20
├── Fa0/4 → VLAN 30
└── Fa0/5 → VLAN 30
```

los equipos de VLAN diferentes quedan separados a nivel de capa 2.

:::info[Idea clave]
Una VLAN crea un **dominio de broadcast independiente**. Un broadcast generado dentro de una VLAN no se reenvía a los puertos pertenecientes a otras VLAN.
:::

## 3️⃣ VLAN no es lo mismo que subred

Son conceptos relacionados, pero no idénticos.

| VLAN | Subred IPv4 |
|---|---|
| Segmentación de capa 2 | Segmentación de capa 3 |
| Se configura principalmente en switches | Se define mediante IP y máscara |
| Se identifica mediante un VLAN ID | Se identifica mediante dirección de red/prefijo |
| Separa dominios de broadcast | Define qué hosts se consideran locales |

En una red bien diseñada suele existir una correspondencia:

```text
VLAN 10 → 192.168.10.0/24
VLAN 20 → 192.168.20.0/24
VLAN 30 → 192.168.30.0/24
```

No es la VLAN la que asigna esas direcciones IP. Es una decisión de diseño.

## 4️⃣ Identificador de VLAN

Las VLAN se identifican mediante un número denominado **VLAN ID**.

Ejemplos:

```text
VLAN 10
VLAN 20
VLAN 30
```

En switches Cisco, inicialmente los puertos suelen pertenecer a la **VLAN 1**.

Podemos crear nuevas VLAN y asignarles un nombre:

```text
VLAN 10 → ADMIN
VLAN 20 → PROFES
VLAN 30 → ALUMNOS
```

Los nombres ayudan a administrar la red, pero el identificador fundamental es el número.

## 5️⃣ Puertos access

Un puerto configurado como **access** pertenece normalmente a una única VLAN y se utiliza para conectar dispositivos finales:

- ordenadores;
- impresoras;
- servidores;
- teléfonos u otros equipos finales, según el diseño.

Ejemplo:

```text
Fa0/1 → VLAN 10
Fa0/2 → VLAN 10
Fa0/3 → VLAN 20
Fa0/4 → VLAN 30
```

En Cisco IOS:

```text
interface fa0/1
 switchport mode access
 switchport access vlan 10
```

Para configurar varios puertos:

```text
interface range fa0/1-2
 switchport mode access
 switchport access vlan 10
```

## 6️⃣ Creación de VLAN en un switch Cisco

Ejemplo:

```text
enable
configure terminal

vlan 10
 name ADMIN
exit

vlan 20
 name PROFES
exit

vlan 30
 name ALUMNOS
exit
```

Después podemos comprobarlas:

```text
show vlan brief
```

La salida permite observar:

- VLAN existentes;
- nombre;
- estado;
- puertos asociados.

### 🟩 Ejemplo

Queremos:

```text
Fa0/1 y Fa0/2 → VLAN 10
Fa0/3 y Fa0/4 → VLAN 20
```

Configuración:

```text
interface range fa0/1-2
 switchport mode access
 switchport access vlan 10
exit

interface range fa0/3-4
 switchport mode access
 switchport access vlan 20
exit
```

## 7️⃣ ¿Qué ocurre con la comunicación?

Supongamos:

```text
PC-A → Fa0/1 → VLAN 10
PC-B → Fa0/2 → VLAN 10
PC-C → Fa0/3 → VLAN 20
```

Si PC-A y PC-B tienen una configuración IP compatible, podrán comunicarse a través del switch.

PC-A y PC-C están en VLAN diferentes.

Aunque tengan direcciones IP aparentemente compatibles, el switch no reenviará directamente las tramas entre ambas VLAN.

:::warning[Una VLAN no es una máscara]
Cambiar la IP o la máscara de un PC no cambia la VLAN del puerto del switch. Son configuraciones de capas distintas.
:::

## 8️⃣ Dos switches y varias VLAN

Ahora tenemos:

```text
            ┌────── enlace entre switches ──────┐
            │                                    │
        Switch1                              Switch2
       /       \                            /       \
 PC-A VLAN10  PC-B VLAN20            PC-C VLAN10  PC-D VLAN20
```

Queremos que PC-A y PC-C sigan perteneciendo a VLAN 10 aunque estén conectados a switches distintos.

Necesitamos transportar tráfico de varias VLAN por el enlace entre switches.

Aquí aparece el **trunk**.

## 9️⃣ Puertos trunk

Un puerto **trunk** puede transportar tráfico de varias VLAN.

Ejemplo:

```text
Switch1 Gi0/1 ───────── Gi0/1 Switch2
          trunk         trunk
```

Configuración básica:

```text
interface gi0/1
 switchport mode trunk
```

Para comprobar:

```text
show interfaces trunk
```

### 🟧 Access frente a trunk

| Access | Trunk |
|---|---|
| Normalmente una VLAN | Varias VLAN |
| Conecta dispositivos finales | Suele unir switches u otros dispositivos de red |
| Tráfico de una VLAN | Transporta tráfico identificado por VLAN |

## 🔟 Etiquetado 802.1Q

Cuando un enlace trunk transporta varias VLAN, el switch necesita identificar a cuál pertenece cada trama.

El estándar habitual es **IEEE 802.1Q**.

Simplificando, el switch incorpora información de VLAN en las tramas que atraviesan el trunk.

Así puede distinguir:

```text
tráfico VLAN 10
tráfico VLAN 20
tráfico VLAN 30
```

No necesitamos estudiar ahora todos los campos de la etiqueta 802.1Q. Lo importante es comprender su función.

## 1️⃣1️⃣ Ejemplo con dos switches

Tenemos:

```text
VLAN 10 → ADMIN → 192.168.10.0/24
VLAN 20 → AULA  → 192.168.20.0/24
```

Topología:

```text
PC-A ─ SW1 ═════ SW2 ─ PC-C
       │  trunk  │
PC-B ──┘         └──── PC-D
```

Asignación:

```text
PC-A → VLAN 10 → 192.168.10.10
PC-B → VLAN 20 → 192.168.20.10
PC-C → VLAN 10 → 192.168.10.20
PC-D → VLAN 20 → 192.168.20.20
```

Si el trunk funciona correctamente:

```text
PC-A ↔ PC-C → sí
PC-B ↔ PC-D → sí
```

Pero:

```text
VLAN 10 ↔ VLAN 20 → no directamente
```

## 1️⃣2️⃣ Comunicación entre VLAN

Si queremos comunicar:

```text
VLAN 10 → 192.168.10.0/24
```

con:

```text
VLAN 20 → 192.168.20.0/24
```

necesitamos **routing entre VLAN**.

Es decir, un dispositivo de capa 3:

- un router;
- o un switch multicapa.

En este punto nos centraremos en comprender la necesidad de routing. Una forma clásica de hacerlo con un router es **Router-on-a-Stick**, que utiliza un enlace trunk y subinterfaces.

Esquema:

```text
VLAN 10 ─┐
         ├── Switch ═══ Router
VLAN 20 ─┘       trunk
```

El router puede disponer lógicamente de una interfaz para cada VLAN mediante subinterfaces.

Ejemplo conceptual:

```text
VLAN 10 → gateway 192.168.10.1
VLAN 20 → gateway 192.168.20.1
```

## 1️⃣3️⃣ Ejemplo de diseño

Una pequeña empresa tiene:

| Departamento | Equipos | VLAN |
|---|---:|---:|
| Administración | 20 | 10 |
| Ventas | 35 | 20 |
| Taller | 12 | 30 |

Disponemos de:

```text
192.168.50.0/24
```

Podemos combinar lo aprendido sobre VLSM con VLAN:

```text
Ventas:         35 hosts → /26
Administración: 20 hosts → /27
Taller:         12 hosts → /28
```

Una posible asignación:

```text
VLAN 20 Ventas → 192.168.50.0/26
VLAN 10 Admin  → 192.168.50.64/27
VLAN 30 Taller → 192.168.50.96/28
```

Observa que ahora estamos combinando:

- diseño IPv4;
- VLSM;
- VLAN;
- gateway futuro para cada red.

## 1️⃣4️⃣ Errores frecuentes

### 🟩 Crear la VLAN pero no asignar el puerto

La VLAN existe, pero el PC continúa en otra VLAN.

### 🟧 Configurar VLAN distinta en cada extremo

Si un equipo de SW1 está en VLAN 10 y esperamos comunicarlo con otro equipo que realmente está en VLAN 20, no pertenecerán al mismo dominio de broadcast.

### 🟥 Olvidar el trunk

Con dos switches, las VLAN deben poder atravesar el enlace entre ellos.

### 🟪 Confundir VLAN con dirección IP

Dos equipos pueden tener IP de la misma subred pero estar en VLAN distintas. En ese caso no tienen conectividad directa de capa 2.

### 🟦 Esperar comunicación entre VLAN sin routing

Un switch de capa 2 no enruta automáticamente entre VLAN.

## 1️⃣5️⃣ Comandos básicos

```text
show vlan brief
```

Muestra VLAN y puertos access.

```text
show interfaces trunk
```

Muestra información sobre enlaces trunk.

```text
show interfaces fa0/1 switchport
```

Permite revisar el modo y VLAN asociados a un puerto.

## 1️⃣6️⃣ Comprueba lo aprendido

### 🟩 Actividad 1

Un switch tiene:

```text
Fa0/1 → VLAN 10
Fa0/2 → VLAN 10
Fa0/3 → VLAN 20
Fa0/4 → VLAN 20
```

Indica qué equipos pertenecen al mismo dominio de broadcast.

### 🟧 Actividad 2

Dos PCs tienen:

```text
PC-A: 192.168.10.10/24 → VLAN 10
PC-B: 192.168.10.20/24 → VLAN 20
```

¿Pueden comunicarse directamente aunque estén en la misma subred IPv4? Explica qué configuración impide la comunicación.

### 🟥 Actividad 3

Tenemos dos switches con equipos de VLAN 10 y VLAN 20 en ambos.

¿Qué tipo de puerto debe utilizarse en el enlace entre switches y por qué?

### 🟪 Actividad 4

Diseña VLAN y direccionamiento para:

- Administración: 25 hosts.
- Aula: 50 hosts.
- Servidores: 10 hosts.

Dispones de `192.168.100.0/24`.

Utiliza VLSM y asigna:

- VLAN ID;
- nombre;
- subred;
- rango de hosts;
- broadcast.
