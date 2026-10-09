---
sidebar_position: 23
title: "Práctica 8. DHCP Relay: conectamos dos redes"
---

# Práctica 8. DHCP Relay: conectamos dos redes

En la práctica 7 comprobamos que un cliente no podía obtener una configuración DHCP de un servidor situado en otra subred: el mensaje inicial de difusión no atravesaba el router.

En esta práctica **recuperaremos el mismo escenario** y resolveremos el problema configurando **DHCP Relay** en el router Cisco. Después demostraremos que el cliente recibe una dirección del ámbito correcto.

## 1️⃣ Objetivos

Al terminar serás capaz de:

- Explicar qué problema resuelve DHCP Relay.
- Identificar la interfaz del router que recibe los mensajes DHCP de los clientes.
- Configurar `ip helper-address` hacia un servidor DHCP remoto.
- Comprobar el ámbito configurado en el servidor central.
- Verificar la concesión desde el cliente.
- Observar el intercambio DHCP en el modo Simulation de Packet Tracer.
- Distinguir entre configurar un servicio y demostrar que funciona.

## 2️⃣ Escenario de trabajo

Abre el archivo de la práctica anterior, `practica-07-dhcp-entre-redes.pkt`, y guárdalo con otro nombre:

`practica-08-dhcp-relay.pkt`

Mantendremos la topología:

```text
 RED A: 192.168.10.0/24                  RED B: 192.168.20.0/24

 PC0 ── Switch0 ── Router0 ── Switch1 ── Server0
                       │                      │
                192.168.10.1            192.168.20.10
                192.168.20.1            Servidor DHCP
```

| Dispositivo | Función | Dirección IPv4 | Máscara |
|---|---|---|---|
| Router0, interfaz RED A | Gateway de PC0 y agente relay | `192.168.10.1` | `255.255.255.0` |
| Router0, interfaz RED B | Conexión con servidor | `192.168.20.1` | `255.255.255.0` |
| Server0 | Servidor DHCP central | `192.168.20.10` | `255.255.255.0` |
| PC0 | Cliente DHCP | Automática | Automática |

:::info[Qué cambia respecto a la práctica 7]
No vamos a sustituir el servidor ni a cambiar las subredes. Añadiremos **el mecanismo que faltaba** para que las solicitudes DHCP lleguen desde RED A hasta Server0.
:::

## 3️⃣ Comprobaciones iniciales

Antes de modificar el router, revisa:

1. Que `Server0` tenga la dirección estática `192.168.20.10/24` y gateway `192.168.20.1`.
2. Que las dos interfaces de `Router0` estén activas.
3. Que `Server0` tenga activo el servicio DHCP.
4. Que exista el pool `LAN_A` para la red `192.168.10.0/24`.

En la CLI del router:

```text
enable
show ip interface brief
ping 192.168.20.10
```

Completa:

| Comprobación | Resultado |
|---|---|
| Interfaz hacia RED A y estado | |
| Interfaz hacia RED B y estado | |
| ¿Responde `192.168.20.10` al ping del router? | |
| ¿Está activo el servicio DHCP? | |

:::warning[Antes de continuar]
Si el router no alcanza al servidor, resuelve primero ese problema. DHCP Relay no sustituye al enrutamiento ni corrige direcciones incorrectas.
:::

## 4️⃣ Revisamos el ámbito del servidor

En `Server0`, abre **Services → DHCP**.

Comprueba que el servicio está activado y que existe un pool con estos valores:

| Parámetro | Valor |
|---|---|
| Pool Name | `LAN_A` |
| Default Gateway | `192.168.10.1` |
| Start IP Address | `192.168.10.100` |
| Subnet Mask | `255.255.255.0` |
| Maximum Number of Users | `20` |
| DNS Server | Según la configuración real del laboratorio |

Si el pool ya existe desde la práctica 7, **revísalo sin duplicarlo**. Si no existe, créalo.

Responde:

- ¿Por qué el ámbito utiliza `192.168.10.0/24` si el servidor está en `192.168.20.0/24`?
- ¿Por qué el gateway entregado debe ser `192.168.10.1` y no `192.168.20.1`?

## 5️⃣ Configuramos DHCP Relay en el router

El router recibe los broadcasts de PC0 a través de su interfaz conectada a **RED A**. Esa es la interfaz donde debemos configurar el reenvío DHCP.

En el ejemplo se utiliza `GigabitEthernet0/0`. **Comprueba el nombre real de la interfaz en tu router** y sustitúyelo si es diferente.

```text
Router> enable
Router# configure terminal
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ip helper-address 192.168.20.10
Router(config-if)# end
```

Comprueba la configuración de la interfaz:

```text
Router# show running-config
```

Localiza el bloque de la interfaz de RED A y comprueba que contiene:

```text
ip helper-address 192.168.20.10
```

:::tip[¿Qué significa el comando?]
Indica al router que reenvíe las solicitudes DHCP recibidas en esa interfaz hacia el servidor `192.168.20.10`. **No convierte al router en el servidor DHCP**.
:::

Completa:

| Pregunta | Respuesta |
|---|---|
| ¿En qué interfaz has configurado el relay? | |
| ¿A qué subred pertenece esa interfaz? | |
| ¿Qué IP has indicado en `ip helper-address`? | |
| ¿Por qué no lo has configurado en la interfaz hacia RED B? | |

## 6️⃣ Solicitamos una dirección desde PC0

En `PC0`, abre **Desktop → IP Configuration**.

Para iniciar una solicitud nueva, selecciona **Static** y después **DHCP**.

Espera a que termine la negociación y consulta la configuración recibida.

También puedes comprobarla desde **Desktop → Command Prompt**:

```text
ipconfig /all
```

Anota:

| Parámetro | Valor obtenido |
|---|---|
| Dirección IPv4 | |
| Máscara | |
| Gateway | |
| Servidor DHCP, si se muestra | |
| DNS, si se ha configurado | |

Comprueba que la IP pertenece al rango `192.168.10.100–192.168.10.119` y que el gateway es `192.168.10.1`.

:::warning[No basta con recibir una IP]
Debemos comprobar que la dirección, la máscara y el gateway corresponden a **RED A**, no a la red donde está físicamente el servidor.
:::

## 7️⃣ Comprobamos conectividad

En `PC0`, abre **Desktop → Command Prompt** y realiza:

```text
ping 192.168.10.1
ping 192.168.20.1
ping 192.168.20.10
```

Registra:

| Prueba | ¿Responde? | ¿Qué demuestra? |
|---|---|---|
| PC0 → gateway de RED A | | |
| PC0 → interfaz del router en RED B | | |
| PC0 → Server0 | | |

Si algún ping inicial falla, repítelo y revisa la configuración antes de sacar conclusiones.

## 8️⃣ Observamos DHCP Relay en Simulation

Vamos a comprobar cómo ha cambiado el comportamiento respecto a la práctica 7.

1. Selecciona **Simulation**.
2. Filtra los eventos para mostrar **DHCP**.
3. Limpia los eventos anteriores.
4. En `PC0`, cambia temporalmente de **DHCP** a **Static** y vuelve a **DHCP**.
5. Avanza con **Capture/Forward**.
6. Observa el recorrido de los mensajes DHCP entre PC0, Router0 y Server0.
7. Abre los detalles de los paquetes y busca la información del servidor y, cuando se muestre, del agente relay.

Completa:

| Observación | Resultado |
|---|---|
| ¿Qué mensaje envía primero PC0? | |
| ¿Qué dispositivo recibe la solicitud en RED A? | |
| ¿Se reenvía ahora la solicitud hasta Server0? | |
| ¿Qué servidor genera la oferta? | |
| ¿Qué dirección se ofrece? | |
| ¿Se completa la negociación DHCP? | |

:::info[Interpretación]
El cliente continúa iniciando DHCP desde su red local. El relay permite que el servidor remoto reciba la solicitud y seleccione el ámbito correspondiente a RED A.
:::

## 9️⃣ Comparamos las prácticas 7 y 8

| Aspecto | Práctica 7: sin relay | Práctica 8: con relay |
|---|---|---|
| Cliente y servidor en distintas subredes | Sí | Sí |
| Servidor DHCP configurado | Sí | Sí |
| `ip helper-address` | No | Sí |
| ¿Llega la solicitud al servidor remoto? | | |
| ¿Recibe PC0 una concesión válida? | | |
| ¿Se completa DHCP? | | |

Responde:

1. ¿Qué configuración concreta ha resuelto el problema?
2. ¿Qué diferencia existe entre un servidor DHCP y un agente relay?
3. ¿Por qué el servidor utiliza el ámbito de RED A?
4. ¿Qué ocurriría si el `ip helper-address` apuntara a una IP incorrecta?
5. ¿Qué ocurriría si el servidor no tuviera un ámbito para RED A?
6. ¿Por qué esta solución permite centralizar DHCP?

## 🔟 Comprobación de diagnóstico

Realiza esta prueba de forma controlada:

1. Guarda una copia del archivo que funciona.
2. Elimina temporalmente el comando de relay de la interfaz de RED A:

```text
Router> enable
Router# configure terminal
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# no ip helper-address 192.168.20.10
Router(config-if)# end
```

3. Fuerza una nueva solicitud DHCP en PC0 y observa el resultado.
4. Vuelve a configurar `ip helper-address 192.168.20.10`.
5. Solicita DHCP de nuevo y comprueba que vuelve a funcionar.

**Importante:** sustituye `GigabitEthernet0/0` por la interfaz real si es necesario.

Describe brevemente qué ocurrió antes y después de restaurar el relay.

## 1️⃣1️⃣ Evidencias de la práctica

Entrega:

- El archivo de Packet Tracer `practica-08-dhcp-relay.pkt`.
- Captura de la configuración `ip helper-address` en la interfaz correcta.
- Captura del ámbito `LAN_A` en `Server0`.
- Captura de la configuración DHCP recibida por `PC0`.
- Captura o explicación del recorrido DHCP en Simulation.
- Tabla comparativa de las prácticas 7 y 8 y respuestas a las preguntas.

## 1️⃣2️⃣ Conclusión

Redacta un párrafo que responda a esta cuestión:

> **¿Por qué DHCP no funcionaba en la práctica 7 y cómo hemos conseguido que un servidor situado en otra subred proporcione configuración a PC0?**

La explicación debe utilizar correctamente los conceptos **broadcast, router, DHCP Relay, `ip helper-address` y ámbito DHCP**.

En la siguiente práctica ampliaremos este escenario para atender **varias LAN desde un único servidor DHCP centralizado**.
