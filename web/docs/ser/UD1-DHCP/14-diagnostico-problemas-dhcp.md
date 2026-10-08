---
sidebar_position: 15
title: "1.14. Diagnóstico de problemas DHCP"
---

# 1.14. Diagnóstico de problemas DHCP

Configurar un servicio DHCP es solo una parte del trabajo de administración de redes.

Cuando un cliente no recibe la configuración esperada, debemos ser capaces de determinar **dónde está el problema**.

La forma correcta de hacerlo no es cambiar parámetros al azar, sino seguir un **procedimiento sistemático de diagnóstico**.

:::info[Objetivo]

Ante un fallo DHCP debemos poder responder:

> **¿En qué punto del proceso deja de funcionar el servicio y qué evidencia demuestra que el problema está ahí?**

:::

## 1️⃣ Diagnosticar antes de modificar

Imaginemos que un cliente no obtiene una dirección IP.

Podríamos empezar a cambiar:

- la IP del servidor;
- el ámbito;
- el router;
- el relay;
- la configuración del cliente.

Pero si modificamos varias cosas sin comprobar nada, podemos crear nuevos errores y no sabremos cuál era el problema original.

El procedimiento correcto será:

```text
OBSERVAR
   ↓
COMPROBAR
   ↓
LOCALIZAR
   ↓
CORREGIR
   ↓
VOLVER A COMPROBAR
```

:::warning[Regla de diagnóstico]

No cambies una configuración simplemente porque «podría ser eso».

Primero busca una evidencia que permita localizar el fallo.

:::

## 2️⃣ Orden general de diagnóstico

Seguiremos este orden:

```text
1. Cliente
      ↓
2. Conectividad física/lógica
      ↓
3. Existencia del servidor
      ↓
4. Servicio DHCP
      ↓
5. Ámbito
      ↓
6. Rango disponible
      ↓
7. Opciones DHCP
      ↓
8. Routing
      ↓
9. DHCP Relay
      ↓
10. Captura de tráfico
```

No todos los escenarios necesitarán llegar hasta el último paso.

Si encontramos el problema en el punto 3, lo corregiremos y volveremos a comprobar antes de continuar.

## 3️⃣ Paso 1. Comprobar el cliente

Empezaremos siempre por el equipo que presenta el problema.

En Windows podemos utilizar:

```cmd
ipconfig /all
```

Comprobaremos:

- si DHCP está habilitado;
- qué dirección IPv4 tiene;
- qué máscara utiliza;
- qué gateway aparece;
- qué DNS ha recibido;
- qué servidor DHCP figura;
- los datos de la concesión.

También podremos utilizar:

```cmd
ipconfig /release
ipconfig /renew
```

para provocar una nueva solicitud cuando sea necesario.

### 🟩 Pregunta fundamental

```text
¿El cliente está realmente configurado para utilizar DHCP?
```

Un cliente configurado manualmente no solicitará su configuración de la forma que esperamos.

## 4️⃣ Problema: cliente configurado estáticamente

Supongamos que observamos:

```text
DHCP habilitado: No
IP: 192.168.10.120
```

Aunque esa dirección pertenezca a la red correcta, el cliente no está obteniendo su configuración mediante DHCP.

El problema no está necesariamente en el servidor.

```text
CLIENTE
   │
   └── configuración manual
```

Debemos corregir primero la configuración del cliente y volver a probar.

:::tip[Primera comprobación]

Antes de investigar el servidor durante varios minutos, comprueba que el cliente realmente está configurado para obtener la dirección automáticamente.

:::

## 5️⃣ Paso 2. Comprobar conectividad física y lógica

Después comprobaremos que los dispositivos están correctamente conectados y que la topología corresponde al diseño previsto.

En un laboratorio podemos revisar:

```text
¿Está activa la interfaz?
¿Está conectada a la red correcta?
¿Cliente y servidor están donde creemos?
¿Las interfaces del router están activas?
```

En VirtualBox también será importante comprobar que las máquinas utilizan el adaptador y la red previstos.

En Packet Tracer podremos comprobar visualmente enlaces e interfaces.

No tiene sentido investigar DHCP si el cliente está conectado a una red distinta de la esperada.

## 6️⃣ Paso 3. Comprobar la existencia del servidor

Debemos identificar qué servidor DHCP esperamos que atienda al cliente.

Por ejemplo:

```text
Servidor esperado:
192.168.20.10
```

Nos preguntaremos:

```text
¿Existe ese servidor?
¿Está encendido?
¿Tiene la IP prevista?
¿Está conectado a la red correcta?
```

Cuando el cliente ya dispone de configuración suficiente y el escenario lo permite, podremos utilizar otras pruebas de conectividad para comprobar el acceso al servidor.

Pero debemos recordar que un cliente que todavía no tiene configuración IPv4 válida puede no permitirnos realizar todas las pruebas habituales.

## 7️⃣ Paso 4. Comprobar el servicio DHCP

Que el servidor esté encendido no significa que DHCP esté funcionando.

Debemos comprobar que el **servicio DHCP está activo**.

### 🟩 Problema: servidor DHCP detenido

Podemos tener:

```text
Servidor encendido
        ✓

Red correcta
        ✓

Servicio DHCP
        ✕
```

El cliente podrá enviar solicitudes, pero no obtendrá la respuesta esperada del servicio.

Conceptualmente:

```text
CLIENTE
   │
   │ Discover
   ▼
SERVIDOR
   │
   ✕ servicio DHCP detenido
```

Después de corregir el problema volveremos a provocar una solicitud y comprobaremos el resultado.

## 8️⃣ Paso 5. Comprobar el ámbito

El siguiente elemento será el ámbito correspondiente a la red del cliente.

Preguntas:

```text
¿Existe el ámbito?
¿Corresponde a la subred correcta?
¿Está activo?
```

### 🟧 Problema: ámbito desactivado

Podemos tener un servidor DHCP funcionando correctamente, pero un ámbito desactivado.

```text
SERVIDOR DHCP
      │
      ├── servicio activo ✓
      │
      └── ámbito LAN A ✕
```

En ese caso el problema no está en el servicio completo, sino en la configuración del ámbito.

:::info[Servidor activo ≠ ámbito activo]

Son comprobaciones diferentes.

Un servidor puede tener el servicio DHCP funcionando y, al mismo tiempo, tener un ámbito concreto desactivado.

:::

## 9️⃣ Paso 6. Comprobar el rango disponible

Un ámbito activo tampoco garantiza que queden direcciones disponibles.

Supongamos:

```text
Rango:
192.168.10.100 - 192.168.10.110
```

Si todas las direcciones disponibles están concedidas, el servidor puede encontrarse sin una dirección adecuada para un nuevo cliente.

### 🟥 Problema: pool agotado

```text
POOL DHCP
┌─────────────────────────┐
│ .100 → ocupada          │
│ .101 → ocupada          │
│ .102 → ocupada          │
│ ...                     │
│ .110 → ocupada          │
└─────────────────────────┘

Nueva solicitud
       ↓
No hay dirección disponible
```

Revisaremos:

- tamaño del rango;
- concesiones activas;
- exclusiones;
- reservas;
- direcciones realmente disponibles.

## 🔟 Paso 7. Comprobar las opciones DHCP

Un cliente puede recibir una IP y, aun así, tener una configuración incorrecta.

Por ejemplo:

```text
IP:      192.168.10.105
Máscara: 255.255.255.0
Gateway: 192.168.20.1
```

La IP parece correcta, pero el gateway pertenece a otra red.

Por eso debemos revisar las opciones entregadas por DHCP.

## 1️⃣1️⃣ Problema: máscara incorrecta

La máscara determina qué parte de la dirección identifica la red y qué destinos considera el cliente locales.

Una máscara incorrecta puede provocar decisiones de comunicación equivocadas.

Por ejemplo, si esperamos:

```text
192.168.10.105/24
```

pero el cliente recibe una máscara diferente de la diseñada, debemos revisar la configuración del ámbito.

La pregunta será:

> **¿La máscara recibida corresponde realmente a la subred del cliente?**

## 1️⃣2️⃣ Problema: gateway incorrecto

Un cliente puede comunicarse dentro de su red y fallar al intentar llegar a otras redes.

Podríamos encontrar:

```text
IP correcta       ✓
Máscara correcta  ✓
Gateway incorrecto ✕
```

Por ejemplo:

```text
Cliente LAN A:
192.168.10.105/24

Gateway esperado:
192.168.10.1

Gateway recibido:
192.168.20.1
```

El problema está en la opción DHCP correspondiente al gateway.

## 1️⃣3️⃣ Problema: DNS incorrecto

Otro escenario frecuente es:

```text
IP correcta       ✓
Máscara correcta  ✓
Gateway correcto  ✓
DNS incorrecto    ✕
```

El cliente puede tener conectividad IP y, sin embargo, presentar problemas al utilizar nombres.

Esto nos obliga a distinguir:

```text
Problema de conectividad IP
          ≠
Problema de resolución DNS
```

No debemos afirmar que «DHCP no funciona» si DHCP ha entregado una configuración y el fallo concreto se encuentra en una opción DNS incorrecta.

## 1️⃣4️⃣ Paso 8. Comprobar routing

Cuando cliente y servidor están en redes diferentes entra en juego el **enrutamiento**.

Antes de culpar a DHCP Relay debemos comprobar que existe un camino válido entre las redes implicadas.

Preguntas:

```text
¿Las interfaces del router tienen las IP correctas?
¿Están activas?
¿Las redes están correctamente conectadas?
¿Existe ruta entre la red del relay y el servidor?
```

Un relay no puede hacer llegar correctamente una solicitud a un servidor si la red no permite alcanzar ese destino.

## 1️⃣5️⃣ Problema: servidor fuera de la subred

Si cliente y servidor están en la misma subred, el procedimiento básico puede funcionar directamente.

Pero si están separados por un router:

```text
CLIENTE ── SWITCH ── ROUTER ── SWITCH ── DHCP
```

debemos recordar:

```text
Broadcast DHCP
      ↓
No atraviesa normalmente el router
```

Por tanto, el hecho de que el servidor DHCP exista y esté funcionando no garantiza que reciba las solicitudes de una red remota.

## 1️⃣6️⃣ Paso 9. Comprobar DHCP Relay

Si el servidor está en otra red, comprobaremos el mecanismo de relay.

Preguntas fundamentales:

```text
¿Necesitamos DHCP Relay?
¿Está configurado?
¿Está en la interfaz correcta?
¿Apunta al servidor DHCP correcto?
```

En routers Cisco podremos encontrar:

```text
ip helper-address <IP-servidor-DHCP>
```

## 1️⃣7️⃣ Problema: DHCP Relay inexistente

Escenario:

```text
CLIENTE
   │
   │ Discover
   ▼
ROUTER
   │
   ✕ no hay relay
   │
SERVIDOR DHCP
```

El cliente envía su solicitud, pero no existe un mecanismo que la haga llegar hasta el servidor remoto.

La solución no consiste en modificar el rango DHCP al azar.

Primero debemos resolver el problema de comunicación entre la red cliente y el servidor.

## 1️⃣8️⃣ Problema: DHCP Relay incorrecto

También puede existir el comando y seguir sin funcionar.

Por ejemplo:

```text
ip helper-address 192.168.20.50
```

cuando el servidor real es:

```text
192.168.20.10
```

O el comando puede estar configurado en una interfaz que no recibe los broadcasts de los clientes.

Por tanto:

```text
«Hay ip helper-address»
```

no es suficiente.

Debemos comprobar:

```text
Interfaz correcta
        +
IP de servidor correcta
```

## 1️⃣9️⃣ Problema: conflictos o direccionamiento mal diseñado

No todos los fallos proceden directamente del servicio DHCP.

También podemos tener un diseño de direccionamiento incorrecto.

Ejemplos:

```text
Rango DHCP incluye direcciones usadas manualmente
```

```text
Dos equipos utilizan la misma IP
```

```text
El rango cruza los límites de la subred
```

```text
Gateway fuera de la subred del cliente
```

```text
Ámbito configurado con una red equivocada
```

Por eso el diagnóstico DHCP también exige dominar subnetting y planificación de direcciones.

:::warning[DHCP no corrige un mal diseño]

Automatizar una configuración incorrecta solo consigue distribuir el error a más equipos.

:::

## 2️⃣0️⃣ Paso 10. Capturar tráfico

Si las comprobaciones anteriores no permiten localizar el fallo, podemos observar directamente el tráfico.

Utilizaremos **Wireshark** en el laboratorio real o el modo **Simulation** de Packet Tracer cuando corresponda.

Buscaremos la secuencia:

```text
Discover
   ↓
Offer
   ↓
Request
   ↓
ACK
```

La ausencia de un mensaje puede proporcionarnos una pista.

Por ejemplo:

```text
Discover ✓
Offer    ✕
```

indica que el cliente está solicitando configuración, pero no estamos observando una oferta.

A partir de ahí investigaremos:

```text
¿Llega el Discover al servidor?
¿Está activo el servicio?
¿Existe un ámbito válido?
¿Hay direcciones disponibles?
¿Funciona el relay?
```

## 2️⃣1️⃣ Leer DORA como herramienta de diagnóstico

Podemos utilizar el proceso DORA como una secuencia de comprobación.

```text
¿Hay Discover?
       │
       ├── NO → investigar cliente/interfaz
       │
       └── SÍ
             ↓
        ¿Hay Offer?
             │
             ├── NO → investigar servidor,
             │        ámbito, pool, routing o relay
             │
             └── SÍ
                   ↓
              ¿Hay Request?
                   │
                   └── analizar respuesta del cliente
                         ↓
                    ¿Hay ACK?
                         │
                         └── comprobar confirmación
                             y opciones entregadas
```

La captura no nos da automáticamente el diagnóstico, pero nos permite saber **hasta qué punto avanza el proceso**.

## 2️⃣2️⃣ Tabla de síntomas y primeras comprobaciones

| Síntoma | Primera comprobación |
|---|---|
| Cliente no solicita DHCP | Configuración del cliente |
| No aparece Offer | Servidor, servicio, ámbito, pool, routing o relay |
| IP correcta pero no sale de su red | Gateway |
| Funciona por IP pero no por nombre | DNS |
| Solo falla una subred | Ámbito, routing y relay de esa red |
| Nuevos clientes no obtienen IP | Direcciones disponibles en el pool |
| Recibe configuración de red equivocada | Diseño de ámbitos y direccionamiento |

Esta tabla sirve como orientación inicial, no como sustituto del procedimiento completo.

## 2️⃣3️⃣ Un ejemplo de diagnóstico completo

Tenemos:

```text
PC-A
LAN A: 192.168.10.0/24

Servidor DHCP:
192.168.100.10

Gateway LAN A:
192.168.10.1
```

El cliente no obtiene configuración.

### 🟩 1. Cliente

Comprobamos que está configurado para utilizar DHCP.

```text
Correcto ✓
```

### 🟧 2. Conectividad

La interfaz está activa y conectada a LAN A.

```text
Correcto ✓
```

### 🟥 3. Servidor

El servidor está encendido y tiene la IP prevista.

```text
Correcto ✓
```

### 🟪 4. Servicio

DHCP está activo.

```text
Correcto ✓
```

### 🟦 5. Ámbito

Existe un ámbito:

```text
192.168.10.0/24
```

y está activo.

```text
Correcto ✓
```

### 🟩 6. Rango

Quedan direcciones disponibles.

```text
Correcto ✓
```

### 🟧 7. Routing

El router puede alcanzar la red del servidor.

```text
Correcto ✓
```

### 🟥 8. Relay

Revisamos la interfaz de LAN A.

No aparece:

```text
ip helper-address 192.168.100.10
```

Hemos localizado una causa coherente con el síntoma.

La configuramos, volvemos a solicitar DHCP y comprobamos de nuevo.

:::tip[Diagnóstico reproducible]

Lo importante no es haber «adivinado» que faltaba el relay.

Lo importante es haber seguido un procedimiento que nos permitió **descartar posibilidades hasta localizar el fallo**.

:::

## 2️⃣4️⃣ Después de corregir, siempre comprobar

Una corrección no termina cuando introducimos un comando.

Después debemos demostrar que el problema ha desaparecido.

Por ejemplo:

```text
CORRECCIÓN
   ↓
ipconfig /release
   ↓
ipconfig /renew
   ↓
ipconfig /all
   ↓
comprobar IP, máscara, gateway y DNS
   ↓
comprobar concesión en servidor
   ↓
probar conectividad
```

Si es necesario, repetiremos la captura para comprobar que el intercambio DHCP se completa.

## 2️⃣5️⃣ Método general que utilizaremos en las prácticas

Ante cualquier incidencia DHCP seguiremos:

```text
1. Comprobar cliente
2. Comprobar conectividad física/lógica
3. Comprobar servidor
4. Comprobar servicio DHCP
5. Comprobar ámbito
6. Comprobar rango disponible
7. Comprobar opciones
8. Comprobar routing
9. Comprobar DHCP Relay
10. Capturar tráfico si es necesario
```

Este orden será nuestra **lista de diagnóstico** durante las prácticas.

## 2️⃣6️⃣ Preguntas que debemos saber responder

Después de este apartado debemos poder explicar:

1. ¿Por qué no debemos cambiar configuraciones al azar?
2. ¿Qué debemos comprobar primero en el cliente?
3. ¿Qué diferencia existe entre servidor activo y servicio DHCP activo?
4. ¿Puede estar DHCP funcionando y un ámbito desactivado?
5. ¿Qué ocurre si el pool se agota?
6. ¿Cómo puede afectar una máscara incorrecta?
7. ¿Qué síntoma puede producir un gateway incorrecto?
8. ¿Qué síntoma puede producir un DNS incorrecto?
9. ¿Cuándo debemos comprobar routing?
10. ¿Cuándo necesitamos comprobar DHCP Relay?
11. ¿Cómo puede ayudarnos Wireshark?
12. ¿Por qué debemos volver a comprobar después de corregir?

## 2️⃣7️⃣ Resumen

El diagnóstico DHCP debe ser **ordenado y basado en evidencias**.

```text
CLIENTE
   ↓
RED
   ↓
SERVIDOR
   ↓
SERVICIO
   ↓
ÁMBITO
   ↓
RANGO
   ↓
OPCIONES
   ↓
ROUTING
   ↓
RELAY
   ↓
CAPTURA
```

Los problemas que estudiaremos incluyen:

- servidor DHCP detenido;
- ámbito desactivado;
- pool agotado;
- cliente configurado estáticamente;
- máscara incorrecta;
- gateway incorrecto;
- DNS incorrecto;
- servidor fuera de la subred;
- DHCP Relay inexistente;
- DHCP Relay incorrecto;
- conflictos o direccionamiento mal diseñado.

La pregunta final ante una incidencia no será:

> **¿Qué puedo cambiar para ver si funciona?**

Sino:

> **¿Qué evidencia tengo, dónde se interrumpe el proceso y qué configuración concreta debo corregir?**
