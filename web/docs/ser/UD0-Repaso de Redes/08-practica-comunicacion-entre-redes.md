---
sidebar_position: 17
title: "    Práctica: comunicación entre redes"
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Práctica: comunicación entre redes

En esta práctica comprobaremos la diferencia entre **comunicación local** y **comunicación entre redes**. Primero utilizaremos un router para unir dos LAN y después aumentaremos la dificultad introduciendo dos routers y rutas estáticas.

## 1️⃣ Parte A: dos redes y un router

Queremos construir:

``` text
192.168.10.0/26                 192.168.20.0/27

PC-A ── SW1 ── R1 ── SW2 ── PC-B
```

Antes de configurar nada, completa:

| Elemento | Red A | Red B |
|---|---|---|
| Red | `192.168.10.0/26` | `192.168.20.0/27` |
| Máscara | | |
| Primer host | | |
| Último host | | |
| Broadcast | | |

Propón después:

-   una IP válida para PC-A;
-   una IP para la interfaz de R1 en Red A;
-   una IP para la interfaz de R1 en Red B;
-   una IP válida para PC-B;
-   gateway de cada PC.

## 2️⃣ Comprobación con un router

<Tabs> <TabItem value="pt-a" label="Packet Tracer" default>

### 🟩 Montaje

Crea:

-   2 PCs;
-   2 switches 2960;
-   1 router con al menos dos interfaces Ethernet.

Utiliza:

``` text
PC-A: 192.168.10.20/26
GW:   192.168.10.1

R1 interfaz A: 192.168.10.1/26
R1 interfaz B: 192.168.20.1/27

PC-B: 192.168.20.20/27
GW:   192.168.20.1
```

Activa las interfaces del router si fuese necesario.

### 🟧 Prueba progresiva

No empieces haciendo `ping` de PC-A a PC-B.

Comprueba en este orden:

``` text
PC-A → 192.168.10.1
PC-B → 192.168.20.1
PC-A → PC-B
```

Registra:

| Prueba | Predicción | Resultado | Explicación |
|---|---|---|---|
| PC-A → R1 | | | |
| PC-B → R1 | | | |
| PC-A → PC-B | | | |

### 🟥 Observa ARP

En PC-A consulta la tabla ARP después de comunicar con PC-B.

Responde:

1.  ¿Aparece la IP de PC-B asociada a su MAC?
2.  ¿Qué dirección relacionada con el router esperas encontrar?
3.  ¿Por qué?

### 🟪 Simulation Mode

Utiliza **Simulation Mode** y filtra, al menos, ARP e ICMP.

Borra o reinicia la simulación y genera un `ping` de PC-A a PC-B.

Observa:

1.  qué equipo recibe la primera trama;
2.  qué MAC se utiliza como destino en el tramo PC-A → R1;
3.  qué ocurre con las MAC cuando R1 reenvía el paquete;
4.  si la IP final de destino cambia.

</TabItem>

<TabItem value="lab-a" label="Laboratorio PC + servidor">

### 🟩 Qué podemos reproducir

Con el cliente y Windows Server podemos comprobar el papel del **gateway**, pero necesitamos que el servidor pueda actuar como elemento de capa 3 para reproducir exactamente un router.

En esta primera comprobación no habilitaremos todavía routing en Windows Server. Utilizaremos el laboratorio para observar la configuración y preparar el siguiente paso.

En cliente y servidor ejecuta:

``` powershell
ipconfig /all
route print
arp -a
```

Identifica:

-   IPv4;
-   máscara;
-   gateway;
-   rutas directamente conectadas;
-   ruta por defecto, si existe;
-   entradas ARP.

### 🟧 Experimento controlado

Con las dos máquinas en la misma red interna:

1.  comprueba que pueden comunicarse;
2.  observa `arp -a`;
3.  identifica la entrada correspondiente a la otra máquina;
4.  compara esta situación con Packet Tracer.

Responde:

> Cuando el destino está en la misma red, ¿qué MAC necesita resolver el cliente?

En una práctica posterior podremos hacer que Windows Server enrute entre interfaces si añadimos una segunda interfaz virtual y habilitamos el servicio correspondiente.

:::info[Límite del laboratorio actual] 
Con un único cliente, un servidor y una sola red interna podemos demostrar perfectamente la comunicación local y examinar rutas/ARP. Para reproducir **dos redes unidas por un router**, el servidor necesita dos interfaces de red o debemos modificar temporalmente el montaje.
:::

</TabItem> </Tabs>

## 3️⃣ Parte B: detecta una configuración incorrecta

Tenemos:

``` text
PC-A
IP:      172.16.5.70/26
Gateway: 172.16.5.1

R1
Interfaz A: 172.16.5.65/26
Interfaz B: 192.168.50.1/27

PC-B
IP:      192.168.50.20/27
Gateway: 192.168.50.1
```

Sin simular todavía:

1.  Calcula la red de PC-A.
2.  Calcula la red de la interfaz A de R1.
3.  ¿Puede PC-A utilizar `172.16.5.1` como gateway?
4.  Identifica el error.
5.  Propón una corrección cambiando **un único dato**.

Configura después la topología corregida y comprueba el resultado.

## 4️⃣ Parte C: dos routers

Aumentamos la dificultad:

``` text
LAN A                     Enlace R1-R2                    LAN B
192.168.10.0/26           10.10.10.0/30                  192.168.30.0/27

PC-A ─ SW1 ─ R1 ───────────────── R2 ─ SW2 ─ PC-B
```

Utiliza:

``` text
PC-A: 192.168.10.20/26
GW:   192.168.10.1

R1 LAN: 192.168.10.1/26
R1 enlace: 10.10.10.1/30

R2 enlace: 10.10.10.2/30
R2 LAN: 192.168.30.1/27

PC-B: 192.168.30.20/27
GW:   192.168.30.1
```

### 🟩 Antes de configurar rutas

Predice qué ocurrirá con:

``` text
PC-A → R1
R1 → 10.10.10.2
PC-A → PC-B
```

Explica por qué.

### 🟧 Rutas estáticas

R1 necesita conocer la red:

``` text
192.168.30.0/27
```

a través de:

``` text
10.10.10.2
```

R2 necesita conocer:

``` text
192.168.10.0/26
```

a través de:

``` text
10.10.10.1
```

Configura las rutas estáticas con la sintaxis adecuada del router de Packet Tracer.

Después comprueba:

``` text
PC-A → PC-B
PC-B → PC-A
```

### 🟥 Analiza

Responde:

1.  ¿Por qué era necesaria una ruta en R1?
2.  ¿Por qué también era necesaria una ruta en R2?
3.  ¿Qué ocurriría si solo configurásemos la ruta de ida?
4.  ¿Qué redes conoce R1 directamente?
5.  ¿Qué red conoce R1 gracias a la ruta estática?

## 5️⃣ Comprobación ampliada

<Tabs> <TabItem value="pt-c" label="Packet Tracer" default>

Utiliza:

``` text
show ip interface brief
show ip route
```

En cada router.

Localiza en la tabla:

-   redes directamente conectadas;
-   ruta estática;
-   interfaz o siguiente salto utilizado.

Después utiliza Simulation Mode para seguir un ICMP desde PC-A hasta PC-B y su respuesta.

Anota el recorrido:

``` text
PC-A → ______ → ______ → ______ → PC-B
```

Indica en qué puntos cambian las direcciones MAC.

</TabItem>

<TabItem value="lab-c" label="Laboratorio PC + servidor">

Nuestro laboratorio actual no reproduce directamente dos routers, pero permite relacionar los conceptos con Windows.

Ejecuta:

``` powershell
route print
```

Localiza:

-   rutas de red local;
-   ruta `0.0.0.0`;
-   gateway asociado;
-   interfaz utilizada.

Después ejecuta:

``` powershell
tracert DIRECCION_ACCESIBLE
```

si el montaje dispone de salida hacia otra red.

Compara:

-   `ping`: comprueba alcanzabilidad;
-   `tracert`: muestra saltos;
-   `route print`: muestra las decisiones de encaminamiento disponibles en el equipo.

:::warning\[No modificar rutas del equipo real sin indicación\] En esta parte solo observaremos la tabla. No añadas ni elimines rutas permanentes en Windows salvo que se indique expresamente en clase. :::

</TabItem> </Tabs>

## 6️⃣ Reto final

Un técnico afirma:

> «Si PC-A puede hacer ping a su gateway, entonces podrá llegar a cualquier red que esté conectada detrás de otros routers».

¿Es correcta la afirmación?

Utiliza lo aprendido sobre:

-   gateway;
-   redes directamente conectadas;
-   rutas;
-   camino de ida;
-   camino de retorno.

Redacta una explicación técnica de entre 5 y 8 líneas.

## 7️⃣ Entrega

Entrega:

-   cálculos y predicciones;
-   tabla de pruebas de la parte A;
-   corrección razonada de la parte B;
-   configuración y comprobaciones de la parte C;
-   capturas de `show ip route`;
-   respuestas de análisis;
-   comparación con el laboratorio cuando se realice.
