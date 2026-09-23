---
sidebar_position: 5
title: "Práctica guiada: ARP y tabla MAC con Packet Tracer"
---

# Práctica guiada: ARP y tabla MAC con Packet Tracer

En esta práctica vamos a comprobar experimentalmente los conceptos estudiados sobre **direcciones MAC, broadcast, ARP y tabla MAC del switch**.

Trabajaremos en **Cisco Packet Tracer** y utilizaremos el modo **Simulation** para detener la comunicación y observar qué ocurre en cada paso.

:::info[Objetivos]
Al finalizar la práctica deberás ser capaz de:

- Identificar las direcciones IPv4 y MAC de varios equipos.
- Observar una **ARP Request** y una **ARP Reply**.
- Comprobar el uso del broadcast.
- Consultar la tabla ARP de un PC.
- Consultar la tabla MAC de un switch.
- Explicar cómo aprende dinámicamente un switch las direcciones MAC.
:::

---

## 1️⃣ Construcción de la red

### 🟩 Paso 1. Añade los dispositivos

Crea un proyecto nuevo en Packet Tracer.

Añade:

- 1 switch **2960**.
- 3 equipos **PC-PT**.

Organízalos aproximadamente así:

```text
             Switch0
            /   |   \
           /    |    \
         PC0   PC1   PC2
```

### 🟧 Paso 2. Realiza las conexiones

Utiliza cable **Copper Straight-Through**.

Realiza las siguientes conexiones:

| Equipo | Interfaz del PC | Puerto del switch |
|---|---|---|
| PC0 | FastEthernet0 | FastEthernet0/1 |
| PC1 | FastEthernet0 | FastEthernet0/2 |
| PC2 | FastEthernet0 | FastEthernet0/3 |

Espera hasta que los enlaces estén activos.

:::tip[Comprueba]

Los indicadores de las conexiones deben terminar apareciendo en verde antes de continuar.

:::

---

## 2️⃣ Configuración IPv4

En cada equipo entra en:

**Desktop → IP Configuration**

Selecciona configuración **Static** e introduce:

| Equipo | Dirección IPv4 | Máscara |
|---|---|---|
| PC0 | `192.168.1.10` | `255.255.255.0` |
| PC1 | `192.168.1.20` | `255.255.255.0` |
| PC2 | `192.168.1.30` | `255.255.255.0` |

Deja sin configurar:

- Default Gateway.
- DNS Server.

### 🟩 Antes de continuar

¿Por qué crees que no necesitamos configurar una puerta de enlace para realizar esta práctica?

```text
Respuesta:
```

---

## 3️⃣ Identificación de las direcciones MAC

En cada equipo entra en:

**Config → FastEthernet0**

Localiza el campo **MAC Address**.

Completa:

| Equipo | IPv4 | MAC |
|---|---|---|
| PC0 | `192.168.1.10` | |
| PC1 | `192.168.1.20` | |
| PC2 | `192.168.1.30` | |

:::info Observa el formato
Packet Tracer puede mostrar una dirección MAC de esta forma:

```text
0090.2B07.10AB
```

Anota las direcciones que aparezcan en **tu propia simulación**.
:::

---

## 4️⃣ Estado inicial de la tabla ARP

Todavía no realices ningún `ping`.

Entra en:

**PC0 → Desktop → Command Prompt**

Ejecuta:

```text
arp -a
```

### 🟩 Observa y anota

¿Qué aparece?

```text
Resultado:
```

Si ya existen entradas debido a pruebas anteriores, ejecuta:

```text
arp -d
```

y vuelve a comprobar:

```text
arp -a
```

### 🟧 Razona

¿Qué información falta todavía para que PC0 pueda construir una trama Ethernet dirigida a PC1?

```text
Respuesta:
```

---

## 5️⃣ Preparación de la simulación

Cambia de:

**Realtime → Simulation**

En el panel **Simulation**, pulsa **Edit Filters**.

Deja visibles únicamente:

- ARP
- ICMP

Utilizaremos el control **Capture/Forward (`▶|`)** para avanzar un evento cada vez.

:::warning

No utilices inicialmente **Auto Capture/Play**. Queremos detenernos en cada etapa para inspeccionar las PDU.

:::

---

## 6️⃣ Primera comunicación entre PC0 y PC1

Desde:

**PC0 → Desktop → Command Prompt**

ejecuta:

```text
ping 192.168.1.20
```

No avances todavía la simulación.

### 🟩 Predicción

Antes de inspeccionar el primer mensaje, responde:

1. PC0 conoce la IPv4 de PC1. ¿Conoce también su MAC?
2. ¿Qué protocolo esperas que aparezca antes de ICMP?
3. ¿Esperas un envío unicast o broadcast?

```text
Respuesta:
```

---

## 7️⃣ Inspección de la primera PDU

Haz clic sobre el sobre generado en **PC0**.

Abre:

**PDU Information → Outbound PDU Details**

No busques todavía una respuesta concreta. Localiza los campos y anota lo que realmente aparece en tu simulación.

| Campo | Valor observado |
|---|---|
| Ethernet Source Address | |
| Ethernet Destination Address | |
| ARP Opcode | |
| Source MAC | |
| Source IP | |
| Target MAC | |
| Target IP | |

### 🟩 Analiza los datos

1. ¿Qué equipo está originando la PDU?
2. ¿Qué IPv4 se está buscando?
3. ¿Qué valor aparece en `Target MAC`?
4. ¿Qué valor aparece como dirección Ethernet de destino?
5. ¿Qué significado tiene esa dirección de destino?
6. Según el `Opcode`, ¿se trata de una petición o de una respuesta?

No continúes hasta haber anotado los datos.

---

## 8️⃣ Paso de la trama por el switch

Cierra la ventana de información de la PDU.

Pulsa **una sola vez**:

**Capture/Forward (`▶|`)**

La PDU llegará al switch.

Haz clic sobre ella e inspecciona:

**PDU Information → Outbound PDU Details**

### 🟩 Observa

1. ¿Mantiene la trama la misma dirección Ethernet de destino?
2. ¿Ha sustituido el switch esa dirección por la MAC de PC1?
3. ¿Qué crees que hará ahora el switch con la trama?

```text
Respuesta:
```

Avanza **un evento más**.

Observa qué equipos reciben la petición.

### 🟧 Anota

| Equipo | ¿Recibe la petición? | ¿Debe responder? | ¿Por qué? |
|---|---|---|---|
| PC1 | | | |
| PC2 | | | |

---

## 9️⃣ Inspección de la respuesta

Haz clic sobre la PDU generada por el equipo que responde correctamente.

Entra en:

**PDU Information → Outbound PDU Details**

Completa:

| Campo | Valor observado |
|---|---|
| Ethernet Source Address | |
| Ethernet Destination Address | |
| ARP Opcode | |
| Source MAC | |
| Source IP | |
| Target MAC | |
| Target IP | |

### 🟩 Compara las dos PDU

Utilizando los datos que has obtenido, completa:

| Característica | Primera PDU | Respuesta |
|---|---|---|
| Opcode | | |
| Source IP | | |
| Source MAC | | |
| Target IP | | |
| Target MAC | | |
| Ethernet Destination | | |
| Broadcast / Unicast | | |

### 🟧 Explica

¿Por qué el primer mensaje necesita enviarse mediante broadcast y la respuesta puede dirigirse a un único equipo?

```text
Respuesta:
```

---

## 🔟 Comprobación de la tabla ARP

Continúa con **Capture/Forward** hasta que la respuesta llegue a PC0.

Después abre:

**PC0 → Desktop → Command Prompt**

y ejecuta:

```text
arp -a
```

Anota la entrada correspondiente a PC1:

```text
IPv4 de PC1: __________________________

MAC asociada: _________________________
```

### 🟩 Razona

1. ¿Existía esta asociación antes del primer `ping`?
2. ¿Cómo la ha obtenido PC0?
3. ¿Qué ventaja tiene almacenarla temporalmente?

---

## 1️⃣1️⃣ Consulta de la tabla MAC del switch

Haz clic en:

**Switch0 → CLI**

Si aparece:

```text
Press RETURN to get started!
```

pulsa **Enter**.

Después ejecuta:

```text
enable
```

y:

```text
show mac address-table
```

Completa únicamente con las entradas dinámicas relacionadas con nuestros equipos:

| MAC | Tipo | Puerto | ¿A qué PC corresponde? |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### 🟩 Investiga

1. ¿Qué equipos aparecen?
2. ¿Qué puerto está asociado a cada MAC?
3. ¿Aparece PC2?
4. Si PC2 no aparece, formula una hipótesis sobre el motivo.

```text
Hipótesis:
```

---

## 1️⃣2️⃣ Conseguir que el switch aprenda PC2

Desde PC0 genera ahora tráfico hacia PC2:

```text
ping 192.168.1.30
```

Deja que se complete la comunicación.

Vuelve a Switch0 y ejecuta:

```text
show mac address-table
```

Completa:

| Equipo | MAC | Puerto |
|---|---|---|
| PC0 | | |
| PC1 | | |
| PC2 | | |

### 🟩 Compara

¿Qué ha cambiado respecto a la consulta anterior?

```text
Respuesta:
```

### 🟧 Razona

¿Qué ha tenido que ocurrir para que el switch pudiera aprender la MAC de PC2?

```text
Respuesta:
```

---

## 1️⃣3️⃣ Segunda comunicación con PC1

Volvemos a PC0.

Comprueba primero:

```text
arp -a
```

Localiza la asociación correspondiente a `192.168.1.20`.

### 🟩 Formula una hipótesis

Si PC0 ya conoce la MAC asociada a `192.168.1.20`:

> ¿Será necesario realizar de nuevo todo el proceso ARP antes de enviar otro `ping`?

Justifica tu predicción:

```text
Hipótesis:
```

Mantén **Simulation Mode** con ARP e ICMP visibles y ejecuta:

```text
ping 192.168.1.20
```

Observa los eventos.

### 🟧 Comprueba tu hipótesis

1. ¿Aparece una nueva ARP Request?
2. ¿Qué protocolo relacionado con el `ping` observas?
3. ¿Coincide el resultado con tu hipótesis?
4. Explica el motivo.

```text
Conclusión:
```

---

## 1️⃣4️⃣ Conclusiones de la práctica

Completa sin consultar las respuestas anteriores.

### 🟩 Dirección MAC

Una dirección MAC sirve para:

```text

```

### 🟧 ARP

ARP permite relacionar:

```text
________________________ ↔ ________________________
```

### 🟥 ARP Request

Una ARP Request necesita utilizar broadcast cuando:

```text

```

### 🟪 ARP Reply

El equipo que responde comunica:

```text

```

### 🟦 Tabla ARP y tabla MAC

Completa:

```text
Tabla ARP:

________________________ ↔ ________________________


Tabla MAC del switch:

________________________ ↔ ________________________
```

---

## 1️⃣5️⃣ Esquema final

A partir de lo observado durante la simulación, completa mentalmente el recorrido:

```text
PC0 quiere comunicarse con una IPv4
                │
                ▼
       ¿Conoce su __________?
                │
                ▼
        Si no la conoce
                │
                ▼
         _______________
                │
                ▼
        Petición broadcast
                │
                ▼
     El destinatario responde
                │
                ▼
 PC0 actualiza su tabla __________
                │
                ▼
   Puede construir la trama Ethernet
```

:::tip[Objetivo conseguido]
No basta con recordar que «ARP relaciona IP y MAC».

Debes ser capaz de explicar **por qué se necesita ARP, por qué la petición es broadcast, qué información aprende el PC y qué información aprende el switch**.

:::
