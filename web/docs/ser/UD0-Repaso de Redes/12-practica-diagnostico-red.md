---
sidebar_position: 25
title: "    Práctica: diagnóstico y resolución de problemas"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Práctica: diagnóstico y resolución de problemas

En esta práctica no recibirás una red completamente correcta para limitarte a comprobarla.

Tu tarea será **localizar fallos de forma ordenada, justificar cada prueba y corregir únicamente aquello que hayas demostrado que está mal**.

## 1️⃣ Regla de trabajo

En cada incidencia utiliza:

```text
Síntoma
  ↓
Hipótesis
  ↓
Prueba
  ↓
Resultado
  ↓
Conclusión
  ↓
Corrección
  ↓
Verificación
```

No realices cambios sin anotarlos.

## 2️⃣ Caso 1: ¿por qué no se comunican?

<Tabs>
<TabItem value="pt1" label="Packet Tracer" default>

Monta:

```text
PC0 ─┐
     SW1
PC1 ─┘
```

Configuración:

```text
PC0:
192.168.10.20/26

PC1:
192.168.10.70/26
```

Antes de hacer ninguna modificación:

1. calcula la red de PC0;
2. calcula la red de PC1;
3. predice el resultado del `ping`;
4. realiza la prueba;
5. corrige el problema modificando el mínimo número de parámetros.

Completa:

| Elemento | PC0 | PC1 |
|---|---|---|
| IP/prefijo | `192.168.10.20/26` | `192.168.10.70/26` |
| Red calculada | | |
| Broadcast | | |
| ¿Misma red? | | |

</TabItem>

<TabItem value="lab1" label="Laboratorio PC + servidor">

En cliente y servidor ejecuta:

```powershell
ipconfig /all
```

Sin modificar nada, registra:

| Parámetro | Cliente | Servidor |
|---|---|---|
| IPv4 | | |
| Máscara | | |
| Gateway | | |
| DNS | | |

Después determina si ambos equipos pertenecen a la red que esperabas para el laboratorio.

Realiza únicamente las pruebas autorizadas:

```powershell
ping DIRECCION_DEL_OTRO_EQUIPO
arp -a
```

No cambies la configuración hasta haber anotado una hipótesis.

</TabItem>
</Tabs>

## 3️⃣ Caso 2: el gateway incorrecto

En Packet Tracer:

```text
PC-A ── SW1 ── R1 ── SW2 ── PC-B
```

Utiliza:

```text
Red A:
192.168.20.0/26

R1-A:
192.168.20.1/26

PC-A:
192.168.20.20/26
Gateway configurado: 192.168.20.70

Red B:
192.168.30.0/27

R1-B:
192.168.30.1/27

PC-B:
192.168.30.20/27
Gateway: 192.168.30.1
```

No corrijas nada inicialmente.

Realiza, en este orden:

```text
PC-A → otro host de su LAN, si existe
PC-A → gateway configurado
PC-A → R1-A
PC-A → PC-B
```

Responde:

1. ¿a qué red pertenece PC-A?
2. ¿es válido `192.168.20.70` como gateway de PC-A?
3. ¿qué parámetro está mal?
4. ¿cuál debe ser su valor?
5. después de corregirlo, ¿qué prueba confirma la solución?

## 4️⃣ Caso 3: mismo switch, pero sin comunicación

<Tabs>
<TabItem value="pt-vlan" label="Packet Tracer" default>

Monta cuatro PCs en un switch.

Configuración:

```text
PC0 → 192.168.40.10/24
PC1 → 192.168.40.20/24
PC2 → 192.168.40.30/24
PC3 → 192.168.40.40/24
```

Configura:

```text
PC0 y PC1 → VLAN 10
PC2 y PC3 → VLAN 20
```

Realiza:

```text
PC0 → PC1
PC0 → PC2
PC2 → PC3
```

Después consulta:

```text
show vlan brief
show mac address-table
```

Explica:

1. por qué PC0 puede o no puede alcanzar a PC1;
2. por qué PC0 puede o no puede alcanzar a PC2;
3. qué demuestra `show vlan brief`;
4. por qué estar conectado al mismo switch no garantiza pertenecer a la misma LAN lógica.

</TabItem>

<TabItem value="lab-vlan" label="Laboratorio PC + servidor">

Nuestro laboratorio de un PC y un servidor no reproduce necesariamente una infraestructura VLAN 802.1Q equivalente a la de Packet Tracer.

Utiliza esta pestaña para comparar conceptos.

Ejecuta:

```powershell
ipconfig /all
arp -a
```

Responde:

1. ¿puedes conocer desde `ipconfig` a qué VLAN pertenece físicamente el puerto del switch?
2. ¿puede una configuración IP aparentemente correcta fallar si el puerto está en una VLAN equivocada?
3. ¿qué dispositivo deberías revisar para confirmar la VLAN de un puerto de acceso?

</TabItem>
</Tabs>

## 5️⃣ Caso 4: falta una ruta

Monta:

```text
PC-A ── R1 ── R2 ── PC-B
```

Redes:

```text
LAN A:       192.168.10.0/26
R1-R2:       10.10.10.0/30
LAN B:       192.168.30.0/27
```

Configura correctamente las interfaces y gateways de los hosts.

Añade en R1 la ruta hacia LAN B, pero **no añadas todavía en R2 la ruta hacia LAN A**.

Comprueba:

```text
PC-A → gateway
R1 → R2
R1 → LAN B
PC-A → PC-B
```

Consulta:

```text
show ip route
```

Responde:

1. ¿qué red conoce R1?
2. ¿qué red remota no conoce R2?
3. ¿por qué es importante la ruta de retorno?
4. añade la ruta que falta;
5. repite las pruebas.

## 6️⃣ Caso 5: ¿red o DNS?

Supón que un equipo presenta:

```text
ping al gateway → correcto
ping a una IP remota → correcto
acceso mediante nombre → falla
```

Responde:

1. ¿funciona la conectividad IP básica?
2. ¿qué servicio investigarías?
3. ¿qué comando utilizarías en Windows?
4. ¿qué parámetro consultarías en `ipconfig /all`?

En el laboratorio, si existe conectividad adecuada, utiliza:

```powershell
nslookup NOMBRE
```

y registra el servidor DNS utilizado y el resultado.

## 7️⃣ Caso 6: diagnóstico con comandos

Relaciona cada pregunta con el comando más útil.

| Pregunta | Comando |
|---|---|
| ¿Qué IP, máscara, gateway y DNS tiene el PC? | |
| ¿Qué vecinos IPv4 conoce? | |
| ¿Qué rutas tiene Windows? | |
| ¿Hasta qué saltos llega el tráfico? | |
| ¿Resuelve un nombre DNS? | |
| ¿Qué VLAN tiene un puerto Cisco? | |
| ¿Qué redes conoce un router Cisco? | |
| ¿Qué MAC ha aprendido un switch? | |
| ¿Se están creando traducciones NAT? | |

## 8️⃣ Caso 7: incidencia acumulativa

Un PC presenta:

```text
IP:      172.16.50.130/26
Gateway: 172.16.50.129
DNS:     172.16.50.10
```

El usuario informa:

> «Puedo trabajar con algunos equipos, pero no puedo abrir una aplicación mediante su nombre».

Debes responder sin asumir que existe un único fallo.

1. Calcula red, broadcast y rango de hosts del PC.
2. Comprueba si el gateway es válido.
3. Decide si el DNS configurado pertenece a la misma subred.
4. ¿Que el DNS esté en otra subred significa necesariamente que sea incorrecto?
5. Diseña las pruebas que realizarías desde el PC.
6. Explica qué resultado te haría investigar DNS.
7. Explica qué resultado te haría investigar routing.

## 9️⃣ Reto final: técnico de guardia

Recibes esta incidencia:

> «Desde PC-A no funciona el servidor de otra VLAN. Ayer sí funcionaba».

La red contiene:

- varias VLAN;
- routing entre VLAN;
- un router con salida exterior;
- DNS;
- firewall.

No conoces todavía la causa.

Escribe un procedimiento de diagnóstico de **máximo diez pasos**.

Para cada paso indica:

| Paso | Qué compruebo | Herramienta/comando | Qué concluyo según el resultado |
|---:|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| ... | | | |

:::tip[Lo que se evalúa]
No se valora adivinar rápidamente el fallo. Se valora que el procedimiento permita **aislarlo de forma lógica y reproducible**.
:::

## 🔟 Entrega

Entrega:

- cálculos de red de los casos;
- hipótesis antes de cada modificación;
- comandos utilizados;
- resultados observados;
- correcciones realizadas;
- explicación de la ruta de retorno;
- diagnóstico DNS;
- procedimiento final de técnico de guardia.
