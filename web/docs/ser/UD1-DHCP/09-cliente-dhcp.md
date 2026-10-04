---
sidebar_position: 10
title: "1.9. El cliente DHCP"
---

# 1.9. El cliente DHCP

Hasta ahora hemos estudiado DHCP principalmente desde el punto de vista del servidor: ámbitos, rangos, concesiones, exclusiones, reservas y opciones.

Ahora cambiaremos de perspectiva.

Nos situaremos en el **cliente DHCP** y aprenderemos a comprobar qué configuración ha recibido, de qué servidor procede y qué ocurre cuando liberamos o renovamos una concesión.

## 1️⃣ ¿Qué hace un cliente DHCP?

Un cliente DHCP es un equipo configurado para obtener automáticamente sus parámetros de red mediante DHCP.

En lugar de introducir manualmente:

```text
Dirección IP
Máscara
Gateway
DNS
```

el cliente solicita la configuración a un servidor DHCP.

De forma simplificada:

```text
CLIENTE DHCP
     │
     │ solicita configuración
     ▼
SERVIDOR DHCP
     │
     │ entrega una concesión
     ▼
CLIENTE CONFIGURADO
```

:::info[Idea clave]

Desde el cliente no debemos limitarnos a comprobar que «hay una IP».

Tenemos que ser capaces de determinar **qué configuración ha recibido, de dónde procede y durante cuánto tiempo es válida**.

:::

## 2️⃣ Configuración automática en Windows

En Windows, una interfaz puede configurarse para obtener automáticamente:

- una dirección IPv4;
- los parámetros proporcionados por DHCP;
- la configuración DNS cuando se entregue mediante DHCP.

Cuando trabajemos con `SER-Cliente`, su adaptador de la red del laboratorio deberá estar preparado para utilizar DHCP.

Conceptualmente:

```text
Configuración manual
        ↓
El usuario escribe los parámetros

Configuración mediante DHCP
        ↓
El cliente solicita los parámetros al servidor
```

## 3️⃣ Consultar la configuración: `ipconfig /all`

La herramienta principal que utilizaremos será:

```cmd
ipconfig /all
```

Este comando muestra información detallada sobre los adaptadores de red del equipo.

Entre los datos relevantes podremos encontrar:

```text
DHCP habilitado
Dirección IPv4
Máscara de subred
Puerta de enlace predeterminada
Servidor DHCP
Servidores DNS
Concesión obtenida
Concesión expira
Dirección física
```

:::tip[No mires solo la IPv4]

En las prácticas tendremos que interpretar varios campos de `ipconfig /all`.

Una dirección IP aparentemente correcta no demuestra por sí sola que toda la configuración recibida sea adecuada.

:::

## 4️⃣ ¿Cómo sabemos si el cliente utiliza DHCP?

En la salida de:

```cmd
ipconfig /all
```

buscaremos el campo que indica si **DHCP está habilitado** para el adaptador.

Conceptualmente:

```text
DHCP habilitado: Sí
```

indica que esa interfaz está preparada para obtener su configuración mediante DHCP.

Si aparece:

```text
DHCP habilitado: No
```

la interfaz no está utilizando DHCP para obtener su configuración IPv4.

:::warning[Revisa el adaptador correcto]

Un equipo puede tener varios adaptadores:

- Ethernet;
- Wi-Fi;
- adaptadores virtuales;
- otros interfaces.

Debemos analizar el adaptador conectado a la red de nuestro laboratorio.

:::

## 5️⃣ ¿Qué dirección ha recibido?

También comprobaremos la dirección IPv4.

Por ejemplo:

```text
Dirección IPv4: 192.168.10.105
```

Después la compararemos con el ámbito configurado en el servidor.

Si nuestro rango DHCP es:

```text
192.168.10.100 - 192.168.10.150
```

la dirección:

```text
192.168.10.105
```

es coherente con ese rango.

La comprobación será:

```text
IP recibida
     ↓
¿Pertenece a la subred?
     ↓
¿Es coherente con el ámbito y la configuración prevista?
```

## 6️⃣ ¿Qué servidor proporcionó la configuración?

`ipconfig /all` también permite consultar el **servidor DHCP** asociado a la concesión.

Por ejemplo:

```text
Servidor DHCP: 192.168.10.10
```

Este dato es especialmente importante.

Si esperamos que `SER-Servidor` proporcione DHCP, debemos comprobar que la dirección mostrada corresponde realmente a nuestro servidor.

:::warning[Una IP válida puede venir del servidor equivocado]

Que un cliente reciba una dirección aparentemente correcta no demuestra que haya respondido nuestro servidor DHCP.

Siempre que sea necesario comprobaremos **qué servidor realizó la asignación**.

:::

## 7️⃣ ¿Cuándo se obtuvo la concesión?

El cliente también puede mostrar cuándo comenzó la concesión.

Conceptualmente:

```text
Concesión obtenida:
04/10/2026 10:00
```

Este dato indica cuándo el cliente obtuvo la concesión actual.

Podemos relacionarlo con lo estudiado anteriormente:

```text
Servidor entrega configuración
          ↓
Comienza la concesión
          ↓
Cliente utiliza la dirección
          ↓
Intenta renovarla antes de que expire
```

## 8️⃣ ¿Cuándo caduca?

También podemos consultar la fecha y hora de expiración.

Por ejemplo:

```text
Concesión obtenida:
04/10/2026 10:00

Concesión expira:
04/10/2026 18:00
```

En este ejemplo, la concesión tiene una duración de:

```text
8 horas
```

Esto nos permitirá comprobar desde el cliente si la duración configurada en el servidor se refleja en la concesión recibida.

:::info[Servidor y cliente deben contar la misma historia]

Si configuramos una determinada duración de concesión en el servidor, podremos observar sus efectos desde el cliente.

Así relacionamos la **configuración del servidor** con el **resultado real en el cliente**.

:::

## 9️⃣ ¿Qué gateway recibió?

Revisaremos también la **puerta de enlace predeterminada**.

Por ejemplo:

```text
Puerta de enlace predeterminada:
192.168.10.1
```

No basta con que aparezca algún valor.

Debemos comprobar que corresponde al gateway previsto para esa red.

Si el servidor DHCP entrega un gateway incorrecto, el cliente puede obtener correctamente una dirección IP y tener problemas para comunicarse con otras redes.

## 🔟 ¿Qué DNS recibió?

Otro dato fundamental será el servidor o servidores DNS.

Por ejemplo:

```text
Servidores DNS:
192.168.10.10
```

De nuevo, comprobaremos que coincide con la configuración que esperábamos recibir.

Una configuración DNS incorrecta puede provocar problemas de resolución de nombres aunque el cliente tenga una dirección IP válida.

## 1️⃣1️⃣ Liberar una concesión: `ipconfig /release`

Windows permite liberar la configuración DHCP de un adaptador mediante:

```cmd
ipconfig /release
```

Con esta operación el cliente deja de utilizar la concesión IPv4 que tenía asignada en ese adaptador.

Conceptualmente:

```text
ANTES

SER-Cliente
IP: 192.168.10.105
        │
        │ ipconfig /release
        ▼

CONCESIÓN LIBERADA
```

Después podremos volver a consultar la configuración para observar el cambio.

:::warning[La conectividad puede perderse]

Al liberar la dirección DHCP, el cliente puede quedarse temporalmente sin una configuración IPv4 válida para comunicarse por esa red.

Es precisamente lo que queremos provocar de forma controlada para estudiar el comportamiento del servicio.

:::

## 1️⃣2️⃣ Solicitar una configuración: `ipconfig /renew`

Para solicitar una nueva configuración DHCP utilizaremos:

```cmd
ipconfig /renew
```

El cliente volverá a intentar obtener una concesión.

Conceptualmente:

```text
ipconfig /renew
        │
        ▼
Cliente solicita configuración
        │
        ▼
Servidor DHCP responde
        │
        ▼
Cliente obtiene una concesión
```

Después volveremos a ejecutar:

```cmd
ipconfig /all
```

y comprobaremos el resultado.

## 1️⃣3️⃣ `release` y `renew` no significan lo mismo

Debemos diferenciar claramente ambas operaciones:

| Comando | Acción |
|---|---|
| `ipconfig /release` | Libera la concesión DHCP actual |
| `ipconfig /renew` | Solicita obtener o renovar una configuración DHCP |
| `ipconfig /all` | Muestra información detallada de la configuración |

Una secuencia habitual en nuestras pruebas será:

```cmd
ipconfig /all
ipconfig /release
ipconfig /all
ipconfig /renew
ipconfig /all
```

Así podremos observar el estado **antes**, **durante** y **después** de la operación.

## 1️⃣4️⃣ ¿Tiene que cambiar la dirección después de renovar?

No necesariamente.

Supongamos que antes de liberar la concesión el cliente tenía:

```text
192.168.10.105
```

Después de:

```cmd
ipconfig /release
ipconfig /renew
```

podría volver a recibir:

```text
192.168.10.105
```

Esto no significa que `renew` haya fallado.

El servidor puede volver a asignar la misma dirección si corresponde y está disponible.

:::tip[No busques únicamente un cambio de IP]

Para comprobar una renovación no debemos exigir que la dirección cambie.

Debemos comprobar que el cliente vuelve a disponer de una **concesión válida** y analizar sus datos.

:::

## 1️⃣5️⃣ Relación con DORA

Cuando forzamos al cliente a solicitar nuevamente configuración podemos observar en la práctica los mecanismos estudiados en el proceso DHCP.

Recordamos:

```text
D   DHCP Discover
O   DHCP Offer
R   DHCP Request
A   DHCP ACK
```

Desde el cliente veremos el **resultado final**:

```text
Dirección IP
Máscara
Gateway
DNS
Servidor DHCP
Concesión
```

Más adelante utilizaremos **Wireshark** para observar los mensajes DHCP que circulan por la red durante este proceso.

## 1️⃣6️⃣ Comprobación desde los dos extremos

Una buena comprobación de DHCP utiliza tanto el cliente como el servidor.

### 🟩 Desde `SER-Cliente`

```cmd
ipconfig /all
```

Comprobamos qué configuración se ha recibido.

### 🟧 Desde `SER-Servidor`

Consultamos las concesiones del ámbito.

Esperamos relacionar:

```text
CLIENTE                         SERVIDOR

IP recibida              ↔      IP concedida
MAC / cliente            ↔      cliente registrado
Inicio de concesión      ↔      concesión activa
```

Esto permite demostrar que el servicio está funcionando de extremo a extremo.

## 1️⃣7️⃣ Preguntas que debemos saber responder

Después de consultar un cliente DHCP debemos ser capaces de responder:

1. ¿Está DHCP habilitado?
2. ¿Qué dirección IPv4 ha recibido?
3. ¿Qué máscara tiene?
4. ¿Qué servidor DHCP proporcionó la configuración?
5. ¿Cuándo se obtuvo la concesión?
6. ¿Cuándo caduca?
7. ¿Qué gateway recibió?
8. ¿Qué DNS recibió?
9. ¿La configuración coincide con lo que habíamos definido en el servidor?

Estas preguntas serán más importantes que limitarse a copiar la salida de un comando.

## 1️⃣8️⃣ Ejemplo de análisis

Supongamos que `SER-Cliente` muestra:

```text
DHCP habilitado:             Sí
Dirección IPv4:              192.168.20.110
Máscara de subred:           255.255.255.0
Puerta de enlace:            192.168.20.1
Servidor DHCP:               192.168.20.10
Servidores DNS:              192.168.20.10
Concesión obtenida:          04/10/2026 10:00
Concesión expira:            04/10/2026 18:00
```

Y sabemos que el servidor está configurado así:

```text
Servidor DHCP:
192.168.20.10

Rango:
192.168.20.100 - 192.168.20.150

Gateway:
192.168.20.1

DNS:
192.168.20.10
```

Podemos comprobar:

```text
192.168.20.110 pertenece al rango        → Sí
Servidor DHCP esperado                   → Sí
Gateway esperado                         → Sí
DNS esperado                             → Sí
Existe información de concesión          → Sí
```

La información obtenida es coherente con nuestra configuración.

## 1️⃣9️⃣ ¿Y si el cliente no recibe lo esperado?

Si algo no coincide, utilizaremos la información obtenida para diagnosticar.

Por ejemplo:

```text
IP fuera del rango esperado
        ↓
¿Qué servidor DHCP respondió?

Gateway incorrecto
        ↓
¿Qué opción está configurada en el ámbito?

DNS incorrecto
        ↓
¿Qué DNS está entregando el servidor?

No se obtiene concesión
        ↓
¿Cliente y servidor pueden comunicarse?
¿Está activo el ámbito?
¿Hay direcciones disponibles?
```

:::warning[No cambies parámetros al azar]

Primero debemos **observar**, después **comparar** con la configuración prevista y finalmente localizar dónde está la diferencia.

:::

## 2️⃣0️⃣ Resumen

Desde un cliente Windows utilizaremos principalmente:

```cmd
ipconfig /all
ipconfig /release
ipconfig /renew
```

| Herramienta | Para qué la utilizaremos |
|---|---|
| `ipconfig /all` | Consultar la configuración DHCP detallada |
| `ipconfig /release` | Liberar la concesión actual |
| `ipconfig /renew` | Solicitar una configuración DHCP |

Y tendremos que interpretar:

```text
IP
máscara
servidor DHCP
inicio de concesión
fin de concesión
gateway
DNS
```

La pregunta no será simplemente:

> **¿Tiene IP el cliente?**

Sino:

> **¿Qué configuración ha recibido, quién se la ha proporcionado y coincide con la configuración que habíamos diseñado?**

En el siguiente apartado podremos avanzar desde el resultado que muestra el cliente hacia lo que realmente ocurre en la red, observando el intercambio DHCP con herramientas de análisis.
