---
sidebar_position: 19
title: "Práctica: VLAN y segmentación"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Práctica: VLAN y segmentación

En esta práctica comprobaremos que **estar conectado al mismo switch no significa necesariamente pertenecer a la misma LAN lógica**.

Trabajaremos progresivamente:

1.  un switch sin VLAN;
2.  un switch con varias VLAN;
3.  dos switches unidos mediante trunk;
4.  diseño combinado de VLAN y VLSM.

## 1️⃣ Parte A: situación inicial

En Packet Tracer crea:

```text
PC0 ─┐
PC1 ─┼── Switch0
PC2 ─┼
PC3 ─┘
```

Configura:

| Equipo | IP |
|---|---|
| PC0 | `192.168.10.10/24` |
| PC1 | `192.168.10.20/24` |
| PC2 | `192.168.10.30/24` |
| PC3 | `192.168.10.40/24` |

No configures gateway.

Antes de continuar, comprueba que existe comunicación entre los cuatro equipos.

## 2️⃣ Divide el switch en dos VLAN

<Tabs>
<TabItem value="pt-vlan" label="Packet Tracer" default>

Crea:

```text
VLAN 10 → ADMIN
VLAN 20 → AULA
```

Asigna:

```text
PC0 y PC1 → VLAN 10
PC2 y PC3 → VLAN 20
```

Utiliza los puertos a los que realmente hayas conectado cada PC.

### 🟩 Antes de hacer ping

Los cuatro PCs siguen teniendo direcciones `192.168.10.0/24`.

Predice:

| Prueba | ¿Funcionará? | Motivo |
|---|---|---|
| PC0 → PC1 | | |
| PC0 → PC2 | | |
| PC2 → PC3 | | |
| PC1 → PC3 | | |

### 🟧 Configuración

Crea las VLAN y asigna los puertos en modo access.

Comprueba:

```text
show vlan brief
```

Guarda una captura o anota qué puertos aparecen en cada VLAN.

### 🟥 Pruebas

Realiza los `ping`.

Explica por qué algunos fallan aunque las cuatro IP pertenezcan aparentemente a la misma `/24`.

### 🟪 Observa el broadcast

Utiliza Simulation Mode.

Desde PC0 genera tráfico ARP hacia PC1 y observa hasta qué puertos se distribuye la solicitud.

Después intenta generar comunicación desde PC0 hacia PC2.

Responde:

1.  ¿Cruza el broadcast de VLAN 10 hacia VLAN 20?
2.  ¿Qué relación existe entre VLAN y dominio de broadcast?

</TabItem>

<TabItem value="lab-vlan" label="Laboratorio PC + servidor">

### 🟩 Qué podemos comprobar

Con una única red interna de VirtualBox, cliente y servidor se encuentran inicialmente en el mismo segmento virtual.

Podemos observar la situación equivalente a **una LAN sin segmentación VLAN**:

```powershell
ipconfig
arp -a
ping DIRECCION_DEL_OTRO_EQUIPO
```

Sin embargo, una VLAN 802.1Q real requiere que la infraestructura virtual o física soporte y configure el etiquetado/segmentación correspondiente.

Por tanto, **no modificaremos todavía VirtualBox para simular VLAN**.

Utiliza el laboratorio para comparar:

| Concepto | Laboratorio actual | Packet Tracer |
|---|---|---|
| Segmento LAN común | Sí | Sí |
| ARP entre cliente y servidor | Sí | Sí |
| VLAN access configurables de forma didáctica | No en el montaje actual | Sí |
| Trunk 802.1Q | No en el montaje actual | Sí |

:::info[Objetivo de esta pestaña]
En este punto Packet Tracer es la herramienta adecuada para comprobar VLAN. El laboratorio nos sirve para identificar qué cambia respecto a nuestra LAN virtual actual y evitar confundir **red virtual de VirtualBox** con **VLAN 802.1Q**.
:::

</TabItem>
</Tabs>

## 3️⃣ Parte B: direccionamiento coherente

Ahora modifica las IP para que cada VLAN tenga también su propia subred:

```text
VLAN 10 ADMIN → 192.168.10.0/26
VLAN 20 AULA  → 192.168.20.0/26
```

Configura:

```text
PC0 → 192.168.10.10/26
PC1 → 192.168.10.20/26

PC2 → 192.168.20.10/26
PC3 → 192.168.20.20/26
```

Sin router y sin gateway:

1.  comprueba PC0 → PC1;
2.  comprueba PC2 → PC3;
3.  comprueba PC0 → PC2.

Explica los resultados indicando qué separación corresponde a **capa 2** y cuál a **capa 3**.

## 4️⃣ Parte C: dos switches y trunk

Amplía la topología:

```text
PC0 ─ SW1 ═════════ SW2 ─ PC4
PC2 ──┘     trunk     └── PC5
```

Mantén también los PCs anteriores si lo deseas.

Configura:

```text
PC0 → VLAN 10 → 192.168.10.10/26
PC2 → VLAN 20 → 192.168.20.10/26

PC4 → VLAN 10 → 192.168.10.30/26
PC5 → VLAN 20 → 192.168.20.30/26
```

Crea VLAN 10 y 20 en ambos switches.

El enlace SW1-SW2 debe funcionar como **trunk**.

### 🟩 Predicción

Antes de configurar el trunk:

1.  ¿debería PC0 comunicarse con PC4?
2.  ¿debería PC2 comunicarse con PC5?
3.  ¿qué necesita atravesar el enlace entre switches?

### 🟧 Comprobación

Configura el trunk.

Utiliza:

```text
show vlan brief
show interfaces trunk
```

Comprueba:

```text
PC0 → PC4
PC2 → PC5
PC0 → PC5
```

Completa:

| Prueba | VLAN origen | VLAN destino | Resultado | Explicación |
|---|---:|---:|---|---|
| PC0 → PC4 | | | | |
| PC2 → PC5 | | | | |
| PC0 → PC5 | | | | |

## 5️⃣ Parte D: detecta errores

Un técnico ha configurado:

```text
SW1
Fa0/1 → VLAN 10 → PC-A
Fa0/2 → VLAN 20 → PC-B
Gi0/1 → trunk hacia SW2

SW2
Fa0/1 → VLAN 20 → PC-C
Fa0/2 → VLAN 20 → PC-D
Gi0/1 → access VLAN 10 hacia SW1
```

Direcciones:

```text
PC-A: 192.168.10.10/24
PC-C: 192.168.10.20/24
```

El técnico espera que PC-A y PC-C puedan comunicarse porque tienen IP de la misma subred.

Identifica **todos los problemas relevantes** que encuentres.

Propón una configuración coherente para que PC-A y PC-C pertenezcan realmente a la misma VLAN y puedan comunicarse.

## 6️⃣ Parte E: diseño VLAN + VLSM

Una empresa dispone de:

```text
192.168.100.0/24
```

Necesita:

| Zona | Hosts | VLAN |
|---|---:|---:|
| Aula | 50 | 20 |
| Administración | 25 | 10 |
| Servidores | 10 | 30 |

Diseña el direccionamiento mediante VLSM.

Completa:

| VLAN | Zona | Prefijo | Red | Primer host | Último host | Broadcast |
|---:|---|---|---|---|---|---|
| 20 | Aula | | | | | |
| 10 | Administración | | | | | |
| 30 | Servidores | | | | | |

Después responde:

1.  ¿Por qué has asignado primero el Aula?
2.  ¿Qué puertos serían access?
3.  Si las VLAN existen en dos switches, ¿qué tipo de enlace utilizarías entre ellos?
4.  ¿Podrían comunicarse directamente VLAN 10 y VLAN 20?
5.  ¿Qué necesitaríamos añadir para conseguirlo?

## 7️⃣ Reto de diagnóstico

Un PC no puede comunicarse con otro equipo que debería pertenecer a su misma VLAN.

Ordena o diseña un procedimiento de diagnóstico utilizando, cuando corresponda:

```text
ipconfig
ping
show vlan brief
show interfaces trunk
show interfaces fa0/1 switchport
```

Tu procedimiento debe comprobar al menos:

- dirección IP y máscara;
- VLAN del puerto;
- estado del enlace;
- trunk si los equipos están en switches diferentes;
- conectividad final.

## 8️⃣ Entrega

Entrega:

- predicciones y tablas;
- capturas de `show vlan brief`;
- captura de `show interfaces trunk`;
- pruebas de conectividad;
- resolución de los errores de la parte D;
- diseño VLAN + VLSM;
- procedimiento de diagnóstico final.
