---
sidebar_position: 12
title: "Práctica 5. DHCP en Packet Tracer"
---

# Práctica 5. DHCP en Packet Tracer

## 1️⃣ Objetivos

En esta práctica vamos a reproducir en **Cisco Packet Tracer** el funcionamiento básico de DHCP que ya hemos estudiado en el laboratorio con VirtualBox.

Al finalizar deberás ser capaz de:

- Diseñar una red local sencilla con un servidor DHCP y varios clientes.
- Configurar una dirección IPv4 estática en el servidor.
- Crear y activar un servicio DHCP con un rango de direcciones.
- Configurar los clientes para obtener automáticamente su dirección IP.
- Comprobar que las direcciones recibidas son válidas y pertenecen a la misma subred.
- Observar el intercambio DHCP mediante el modo **Simulation**.

## 2️⃣ Escenario de trabajo

Una pequeña aula dispone de tres ordenadores conectados a un switch. Queremos evitar configurar manualmente la dirección IPv4 de cada equipo.

Construiremos esta topología:

```text
                  SERVIDOR DHCP
                        |
                      SWITCH
                    /   |   \
                  PC0  PC1  PC2
```

**Dispositivos de Packet Tracer:**

- 1 servidor `Server-PT`.
- 1 switch `2960`.
- 3 ordenadores `PC-PT`.
- Cables Ethernet adecuados para conectar cada equipo al switch.

:::info[¿Qué estamos simulando?]

El servidor DHCP y los tres clientes están en **la misma subred**. En esta práctica **no necesitamos un router ni DHCP Relay**.

:::

## 3️⃣ Planificación del direccionamiento

Utilizaremos el siguiente diseño de ejemplo:

| Elemento | Configuración |
|---|---|
| Red | `192.168.10.0/24` |
| Máscara | `255.255.255.0` |
| Servidor DHCP | `192.168.10.10` (estática) |
| Inicio del rango DHCP | `192.168.10.100` |
| Número máximo de usuarios | `50` |
| Direcciones previstas del rango | `192.168.10.100` a `192.168.10.149` |

:::warning[Gateway y DNS]

Como no hay router ni servidor DNS en esta topología, **no necesitamos configurar una puerta de enlace ni un DNS operativo** para comprobar DHCP dentro de la LAN. No debemos inventar servicios que no existen. Si Packet Tracer muestra valores predeterminados en esos campos, los anotaremos y no los interpretaremos como servicios realmente disponibles.

:::

Antes de comenzar, responde:

1. ¿Cuál es la dirección de red?
2. ¿Cuál es la dirección de broadcast?
3. ¿Cuántas direcciones de host válidas permite una red `/24`?
4. ¿Por qué la IP del servidor no debe incluirse en el rango dinámico que hemos definido?

## 4️⃣ Construcción de la topología

1. Abre **Cisco Packet Tracer**.
2. Coloca un servidor, un switch y tres PCs en el área de trabajo.
3. Conecta los cuatro equipos al switch mediante cables Ethernet.
4. Espera a que los enlaces estén activos.
5. Guarda el proyecto con un nombre identificativo, por ejemplo: `P05-DHCP-LAN.pkt`.

Comprueba que todos los dispositivos están conectados al mismo switch.

## 5️⃣ Configuración del servidor

### 🟩 Dirección IPv4 estática

1. Haz clic en el servidor.
2. Abre **Desktop → IP Configuration**.
3. Selecciona **Static**.
4. Introduce:

```text
IPv4 Address: 192.168.10.10
Subnet Mask: 255.255.255.0
```

No es necesario introducir un gateway para esta LAN sin router.

### 🟧 Activación del servicio DHCP

1. Abre **Services → DHCP**.
2. Selecciona el servicio DHCP y comprueba que esté en **On**.
3. Crea o configura un pool con los siguientes datos:

| Campo | Valor |
|---|---|
| Pool Name | `AULA-SMR` |
| Start IP Address | `192.168.10.100` |
| Subnet Mask | `255.255.255.0` |
| Maximum Number of Users | `50` |

4. Guarda los cambios mediante **Add** o **Save**, según corresponda a la interfaz de Packet Tracer.
5. Comprueba que el pool aparece en la lista.

:::tip[Recuerda]

Un **ámbito o pool** define qué direcciones puede asignar el servidor. El servidor tiene una IP fija para que los clientes y el administrador puedan identificarlo.

:::

## 6️⃣ Configuración de los clientes

Realiza los siguientes pasos en **PC0**, **PC1** y **PC2**:

1. Abre el equipo.
2. Entra en **Desktop → IP Configuration**.
3. Selecciona **DHCP**.
4. Espera a que se complete la solicitud.
5. Anota la dirección IPv4 y la máscara obtenidas.

Completa la tabla con los resultados reales:

| Cliente | IPv4 recibida | Máscara | ¿Dentro del rango? |
|---|---|---|---|
| PC0 | | | |
| PC1 | | | |
| PC2 | | | |

Responde:

1. ¿Los tres PCs han recibido direcciones diferentes?
2. ¿Todas pertenecen a `192.168.10.0/24`?
3. ¿Se ha asignado a algún cliente la IP `192.168.10.10`? ¿Por qué no debería ocurrir?

## 7️⃣ Comprobación mediante comandos

En cada PC abre **Desktop → Command Prompt** y ejecuta:

```cmd
ipconfig /all
```

Comprueba los parámetros disponibles en la salida. Después, desde PC0, intenta comunicarte con PC1 y PC2 mediante sus direcciones IPv4:

```cmd
ping <IP-de-PC1>
ping <IP-de-PC2>
```

Sustituye los marcadores por las direcciones que hayas obtenido.

:::info[Interpretación]

Un ping correcto demuestra conectividad IP entre los equipos de la LAN. **No demuestra por sí solo que DHCP haya funcionado**: para eso también debemos comprobar cómo se obtuvo la configuración.

:::

## 8️⃣ Observación de DHCP en Simulation

Ahora vamos a observar los mensajes del protocolo.

1. Cambia de **Realtime** a **Simulation**.
2. Abre **Edit Filters** y deja visible el protocolo **DHCP**.
3. En **PC0**, vuelve a **Desktop → IP Configuration**.
4. Selecciona temporalmente **Static** y después **DHCP** para provocar una nueva solicitud.
5. Utiliza **Capture/Forward** para avanzar por los eventos.
6. Abre los detalles de los paquetes DHCP y localiza los mensajes que aparezcan.

Identifica, cuando se muestre una negociación inicial completa:

```text
Discover → Offer → Request → ACK
```

:::warning[Si no aparecen los cuatro mensajes]

Puede que la captura se haya iniciado tarde, que el filtro no sea correcto o que el simulador no haya generado una negociación inicial completa. Repite el procedimiento desde antes de solicitar DHCP. No inventes mensajes que no aparezcan en la simulación.

:::

## 9️⃣ Análisis del proceso DORA

Completa la tabla utilizando la simulación:

| Mensaje | Emisor | Destinatario | ¿Qué función cumple? |
|---|---|---|---|
| Discover | | | |
| Offer | | | |
| Request | | | |
| ACK | | | |

Responde:

1. ¿Por qué el cliente puede enviar el primer mensaje sin conocer todavía su dirección IPv4?
2. ¿Qué mensaje contiene una oferta de dirección IP?
3. ¿Qué mensaje confirma la concesión?
4. ¿Qué puertos UDP utiliza DHCP para cliente y servidor?
5. ¿Qué relación existe entre los mensajes de la simulación y los que observamos anteriormente con Wireshark en VirtualBox?

## 🔟 Comprobación final

Antes de dar la práctica por terminada, verifica:

- [ ] El servidor tiene una IP estática válida.
- [ ] El servicio DHCP está activado.
- [ ] El pool contiene el rango previsto.
- [ ] Los tres clientes están configurados mediante DHCP.
- [ ] Cada cliente ha recibido una IP diferente dentro del rango.
- [ ] Existe conectividad entre los clientes de la LAN.
- [ ] He observado e interpretado los mensajes DHCP en Simulation.

## 1️⃣1️⃣ Entrega

Entrega los siguientes materiales:

1. **Archivo de Packet Tracer**: `P05-DHCP-LAN.pkt`.
2. **Tabla de direccionamiento** completada con los valores reales.
3. **Captura** de la configuración del servicio DHCP.
4. **Captura** de la configuración de uno de los clientes.
5. **Captura** de los eventos DHCP en Simulation.
6. **Respuestas** a las preguntas de los apartados 3, 6 y 9.

## 1️⃣2️⃣ Conclusión

En esta práctica hemos comprobado que un servidor DHCP puede proporcionar automáticamente direcciones IPv4 a varios clientes conectados a una misma LAN.

También hemos relacionado la configuración del servicio con el intercambio de mensajes **DORA** y con la comprobación de la configuración recibida por los clientes.

En la siguiente práctica estudiaremos otra posibilidad: **utilizar un router Cisco como servidor DHCP**, sin necesidad de un servidor Windows o Server-PT independiente.
