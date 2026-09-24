---
sidebar_position: 14
title: "Práctica: subredes y VLSM"
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Práctica: subredes y VLSM

La práctica combina **cálculo, predicción y comprobación**. No realices primero el `ping`: calcula antes qué debería ocurrir.

## 1️⃣ Parte A: divide una red

Disponemos de:

``` text
192.168.40.0/24
```

Divídela en **4 subredes iguales**.

 | Dato | Resultado |
|---|---|
| Bits tomados de host | |
| Nuevo prefijo | |
| Máscara | |
| Tamaño de bloque | |
| Hosts utilizables | |

 | Subred | Red | Primer host | Último host | Broadcast |
|---:|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

## 2️⃣ Comprueba las subredes

<Tabs> <TabItem value="pt" label="Packet Tracer" default>

### 🟩 Montaje

``` text
PC0 ─┐
PC1 ─┼── Switch0
PC2 ─┼
PC3 ─┘
```

Configura:

  | Equipo | IPv4 | Prefijo |
|---|---|---:|
| PC0 | `192.168.40.10` | `/26` |
| PC1 | `192.168.40.50` | `/26` |
| PC2 | `192.168.40.70` | `/26` |
| PC3 | `192.168.40.120` | `/26` |

No configures gateway.

Antes de probar:

1.  Calcula la red de cada PC.
2.  Predice qué parejas pueden comunicarse directamente.
3.  Explica por qué estar conectados al mismo switch no garantiza pertenecer a la misma red IPv4.

Comprueba:

``` text
PC0 → PC1
PC0 → PC2
PC2 → PC3
PC1 → PC3
```

  Prueba      Predicción   Resultado   ¿Coincide?
  ----------- ------------ ----------- ------------
  PC0 → PC1                            
  PC0 → PC2                            
  PC2 → PC3                            
  PC1 → PC3                            

</TabItem>

<TabItem value="lab" label="Laboratorio PC + servidor">

### 🟩 Misma subred

Antes de modificar nada ejecuta `ipconfig` en cliente y servidor y **anota la configuración actual**.

Configura temporalmente:

``` text
Cliente:  192.168.40.10/26
Servidor: 192.168.40.50/26
```

Sin gateway para esta prueba.

Comprueba en ambos sentidos con `ping`.

### 🟧 Subred diferente

Mantén:

``` text
Cliente: 192.168.40.10/26
```

Cambia el servidor a:

``` text
Servidor: 192.168.40.70/26
```

Antes del `ping`, calcula la red de ambos y predice el resultado.

Ejecuta:

``` powershell
ipconfig
ping DIRECCION_DEL_OTRO_EQUIPO
arp -a
```

:::warning\[Firewall de Windows\] Un `ping` fallido no demuestra por sí solo que el direccionamiento sea incorrecto. ICMP puede estar bloqueado por el firewall. Comprueba siempre `ipconfig` y la configuración del firewall antes de concluir. :::

Al terminar, **restaura la configuración original** de las dos máquinas.

</TabItem> </Tabs>

## 3️⃣ Parte B: una configuración problemática

Un técnico ha configurado:

  Equipo   Dirección
  -------- --------------------
  PC-A     `192.168.60.20/27`
  PC-B     `192.168.60.30/27`
  PC-C     `192.168.60.40/27`
  PC-D     `192.168.60.62/27`

Responde:

1.  ¿A qué subred pertenece cada equipo?
2.  ¿Cuál es el broadcast de cada subred utilizada?
3.  ¿Qué parejas pueden comunicarse directamente?
4.  Queremos que los cuatro estén en una sola `/27`. ¿Podemos conservar todas las IP?
5.  Propón el **mínimo número de cambios** necesario.

Comprueba tu propuesta en Packet Tracer.

## 4️⃣ Parte C: diseña con VLSM

Dispones de:

``` text
192.168.80.0/24
```

Necesitas:

  Zona               Hosts
  ---------------- -------
  Administración        55
  Aula                  28
  Taller                13
  Servidores             6

Completa:

  Zona             Prefijo   Red   Primer host   Último host   Broadcast
  ---------------- --------- ----- ------------- ------------- -----------
  Administración                                               
  Aula                                                         
  Taller                                                       
  Servidores                                                   

Responde:

1.  ¿Por qué debes empezar por la red mayor?
2.  ¿Cuál es la primera dirección que queda sin utilizar?
3.  ¿Podemos añadir después una red para 20 hosts?
4.  Si es posible, indica una subred válida para esos 20 hosts.

## 5️⃣ Comprueba el VLSM

<Tabs> <TabItem value="pt-vlsm" label="Packet Tracer" default>

Crea un switch con cuatro PCs, uno por zona:

``` text
PC-ADM ─┐
PC-AULA ─┼── Switch0
PC-TALL ─┼
PC-SRV ──┘
```

Asigna a cada PC una dirección válida de la subred diseñada para su zona.

No añadas router.

Antes de probar, responde:

1.  ¿Deberían comunicarse PC-ADM y PC-AULA?
2.  ¿Deberían comunicarse PC-TALL y PC-SRV?
3.  ¿Por qué el switch no resuelve por sí solo este problema?
4.  ¿Qué tipo de dispositivo necesitaremos para comunicar las subredes?

Realiza los `ping` y contrasta la predicción.

</TabItem>

<TabItem value="lab-vlsm" label="Laboratorio PC + servidor">

Con dos máquinas no podemos representar simultáneamente las cuatro zonas, pero sí comprobar el principio.

1.  Configura cliente y servidor con dos direcciones válidas de **una misma subred VLSM** y prueba la comunicación.
2.  Mantén el cliente y mueve el servidor a **otra de las subredes VLSM**.
3.  Antes de hacer `ping`, completa:

  Dato            Cliente   Servidor
  --------------- --------- ----------
  IPv4                      
  Máscara                   
  Red calculada             
  Broadcast                 

Ejecuta:

``` powershell
ipconfig
ping DIRECCION_DEL_OTRO_EQUIPO
arp -a
```

¿Qué elemento falta para comunicar dos subredes diferentes?

:::info\[Conexión con el siguiente punto\] No configuraremos todavía ese elemento. Lo haremos en el punto 8: **Configuración y comunicación entre redes**. :::

Restaura la configuración original al finalizar.

</TabItem> </Tabs>

## 6️⃣ Entrega

Entrega:

-   cálculos de las partes A, B y C;
-   tablas completadas;
-   capturas significativas de Packet Tracer;
-   explicación breve de las pruebas;
-   comprobación del laboratorio cuando se realice en clase.
