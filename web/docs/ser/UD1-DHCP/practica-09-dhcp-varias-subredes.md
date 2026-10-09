---
sidebar_position: 24
title: "Práctica 9. DHCP centralizado para tres subredes"
---

# Práctica 9. DHCP centralizado para tres subredes

En la práctica 8 conseguimos que un cliente de una red recibiera su configuración desde un servidor DHCP situado en otra subred. Ahora ampliaremos el laboratorio a **tres redes LAN**, atendidas por **un único servidor DHCP**.

El reto consiste en diseñar el direccionamiento, crear los ámbitos adecuados, configurar el router como agente DHCP Relay donde sea necesario y comprobar que **cada cliente recibe una dirección de su propia subred**.

## 1️⃣ Objetivos

Al finalizar la práctica serás capaz de:

- Diferenciar las direcciones estáticas de infraestructura de las direcciones asignadas por DHCP.
- Configurar tres subredes conectadas mediante un router.
- Crear varios ámbitos en un servidor DHCP centralizado.
- Configurar `ip helper-address` en las interfaces que lo necesitan.
- Verificar direcciones, máscaras, puertas de enlace y conectividad.
- Diagnosticar errores habituales de ámbito, gateway y relay.

## 2️⃣ Escenario y material

Trabajaremos en **Cisco Packet Tracer** con:

- Un router Cisco con **tres interfaces Ethernet**, por ejemplo, un modelo 2911.
- Tres switches, uno por LAN.
- Un servidor `Server0`, situado en la LAN C.
- Tres ordenadores: `PC-A`, `PC-B` y `PC-C`.

```text
 PC-A                   PC-B                    PC-C
   |                      |                       |
Switch-A               Switch-B                Switch-C
   |                      |                       | 
   | G0/0                 | G0/1                  | G0/2
   +------------------- Router0 ------------------+---- Server0
   |                      |                       |
LAN A                  LAN B                   LAN C
192.168.10.0/24        192.168.20.0/24         192.168.30.0/24
```

:::info[Importante]
Los nombres `GigabitEthernet0/0`, `GigabitEthernet0/1` y `GigabitEthernet0/2` son orientativos. **Comprueba qué interfaces tiene tu router** con `show ip interface brief` y adapta los comandos.
:::

### 🟩 Plan de direccionamiento

| Red | Dirección de red | Gateway (router) | Clientes |
|---|---|---|---|
| LAN A | `192.168.10.0/24` | `192.168.10.1` | `PC-A` |
| LAN B | `192.168.20.0/24` | `192.168.20.1` | `PC-B` |
| LAN C | `192.168.30.0/24` | `192.168.30.1` | `PC-C` y `Server0` |

El servidor DHCP tendrá configuración **estática**:

| Parámetro | Valor |
|---|---|
| IPv4 | `192.168.30.10` |
| Máscara | `255.255.255.0` |
| Gateway | `192.168.30.1` |

Los tres ámbitos asignarán direcciones desde `.100` hasta `.119` de su red correspondiente.

## 3️⃣ Montamos y guardamos la topología

1. Coloca los dispositivos y conecta cada PC a su switch.
2. Conecta los tres switches a las interfaces del router.
3. Conecta `Server0` a `Switch-C`.
4. Renombra los equipos y añade etiquetas con las tres subredes.
5. Guarda el proyecto como `practica-09-dhcp-varias-subredes.pkt`.

**Evidencia 1:** captura de la topología completa, con las redes identificadas.

## 4️⃣ Configuramos el router

Accede a **Router0 → CLI**. Configura las tres interfaces, ajustando los nombres si tu modelo es diferente:

```text
Router> enable
Router# configure terminal
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ip address 192.168.10.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# interface gigabitEthernet 0/1
Router(config-if)# ip address 192.168.20.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# interface gigabitEthernet 0/2
Router(config-if)# ip address 192.168.30.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# end
```

Comprueba el estado de las interfaces:

```text
Router# show ip interface brief
```

Completa la tabla:

| Interfaz | Dirección IP | Estado |
|---|---|---|
| Hacia LAN A | | |
| Hacia LAN B | | |
| Hacia LAN C | | |

:::tip[Enrutamiento]
Las tres redes están conectadas directamente al mismo router. En este escenario **no es necesario crear rutas estáticas** para comunicar estas LAN.
:::

## 5️⃣ Configuramos el servidor DHCP central

En `Server0`:

1. Abre **Desktop → IP Configuration**.
2. Configura `192.168.30.10`, máscara `255.255.255.0` y gateway `192.168.30.1`.
3. Abre **Services → DHCP** y activa el servicio (**On**).
4. Crea los tres ámbitos de la tabla siguiente. Utiliza **Add** o **Save**, según corresponda en tu versión de Packet Tracer.

| Parámetro | Ámbito `LAN_A` | Ámbito `LAN_B` | Ámbito `LAN_C` |
|---|---|---|---|
| Default Gateway | `192.168.10.1` | `192.168.20.1` | `192.168.30.1` |
| Start IP Address | `192.168.10.100` | `192.168.20.100` | `192.168.30.100` |
| Subnet Mask | `255.255.255.0` | `255.255.255.0` | `255.255.255.0` |
| Maximum Number of Users | `20` | `20` | `20` |
| DNS Server | `8.8.8.8` | `8.8.8.8` | `8.8.8.8` |

:::info[Sobre el DNS]
La dirección `8.8.8.8` se utiliza aquí como **valor de ejemplo de la opción DNS**. No necesitamos acceso real a Internet para comprobar que DHCP entrega esa opción.
:::

:::warning[Revisa los ámbitos]
No confundas el gateway de cada ámbito con la puerta de enlace del propio servidor. **Server0 utiliza `192.168.30.1`**, pero debe entregar a cada cliente el gateway de **su propia LAN**.
:::

**Evidencia 2:** capturas de los tres ámbitos configurados.

## 6️⃣ Configuramos DHCP Relay

Los clientes de LAN A y LAN B están en redes distintas de la del servidor. El router debe reenviar sus solicitudes DHCP hacia `192.168.30.10`.

Configura `ip helper-address` en las **interfaces que reciben las solicitudes de esos clientes**:

```text
Router> enable
Router# configure terminal
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ip helper-address 192.168.30.10
Router(config-if)# exit
Router(config)# interface gigabitEthernet 0/1
Router(config-if)# ip helper-address 192.168.30.10
Router(config-if)# end
```

Comprueba la configuración:

```text
Router# show running-config
```

Responde antes de continuar:

1. ¿Por qué configuramos el relay en LAN A y LAN B?
2. ¿Por qué **no** necesitamos `ip helper-address` en LAN C para que `PC-C` contacte con `Server0`?
3. ¿Qué dirección aparece como destino en los dos comandos `ip helper-address`?

**Evidencia 3:** captura de la configuración de ambas interfaces con relay.

## 7️⃣ Solicitamos direcciones DHCP

En cada PC, abre **Desktop → IP Configuration** y selecciona **DHCP**. Espera a que termine la solicitud.

Si el equipo conserva una configuración anterior, selecciona **Static** y después vuelve a **DHCP** para iniciar una nueva solicitud.

Comprueba también la información desde **Desktop → Command Prompt**:

```text
ipconfig /all
```

Anota los resultados reales:

| Cliente | IPv4 recibida | Máscara | Gateway | DNS |
|---|---|---|---|---|
| PC-A | | | | |
| PC-B | | | | |
| PC-C | | | | |

Verifica que cada cliente recibe una dirección de su ámbito: LAN A (`192.168.10.100–119`), LAN B (`192.168.20.100–119`) o LAN C (`192.168.30.100–119`). **No es obligatorio que cada PC reciba exactamente la primera dirección del rango**.

:::warning[Si aparece una dirección 169.254.x.x]
El cliente no ha obtenido una concesión DHCP válida. Comprueba el cableado, las interfaces del router, el ámbito correspondiente, el estado del servicio y la configuración del relay.
:::

**Evidencia 4:** captura de la configuración DHCP de cada PC.

## 8️⃣ Comprobamos la comunicación entre redes

Desde cada PC, comprueba primero su gateway. Después realiza las pruebas siguientes:

| Origen | Destino | Comando | ¿Responde? |
|---|---|---|---|
| PC-A | Gateway LAN A | `ping 192.168.10.1` | |
| PC-A | Server0 | `ping 192.168.30.10` | |
| PC-A | PC-B | `ping <IP_de_PC-B>` | |
| PC-B | PC-C | `ping <IP_de_PC-C>` | |
| PC-C | Server0 | `ping 192.168.30.10` | |

Sustituye los valores entre `< >` por las direcciones obtenidas en el paso anterior.

Si un primer ping falla, repítelo y revisa la conectividad antes de concluir que la red no funciona.

**Evidencia 5:** capturas de al menos dos pruebas de conectividad entre subredes.

## 9️⃣ Observamos DHCP en modo Simulation

1. Cambia a **Simulation**.
2. Filtra los eventos para mostrar **DHCP**.
3. Limpia los eventos anteriores.
4. Fuerza una nueva solicitud DHCP desde `PC-A` (Static → DHCP).
5. Avanza con **Capture/Forward** y observa el recorrido por `Switch-A`, `Router0` y `Server0`.
6. Repite con `PC-B` y, después, con `PC-C`.

Completa:

| Pregunta | Respuesta |
|---|---|
| ¿Qué dispositivo reenvía las solicitudes de PC-A y PC-B? | |
| ¿Qué dirección tiene el servidor DHCP central? | |
| ¿Qué ámbito corresponde a PC-A? | |
| ¿Qué ámbito corresponde a PC-B? | |
| ¿Qué ámbito corresponde a PC-C? | |
| ¿Qué diferencia observas entre el recorrido de PC-C y el de PC-A? | |

:::tip[Qué debes comprender]
El servidor puede mantener varios ámbitos. Cuando recibe una solicitud a través de un relay, utiliza la información de la red de origen que aporta el agente para seleccionar el ámbito adecuado. Un cliente de la misma LAN que el servidor puede comunicarse con él sin relay.
:::

## 🔟 Reto de diagnóstico

**Antes de modificar nada, guarda una copia funcional** del proyecto.

Realiza las siguientes pruebas **de una en una**. Después de cada prueba, restaura la configuración correcta y comprueba que el cliente vuelve a obtener DHCP.

### 🟩 Incidencia A. Relay incorrecto

Cambia temporalmente el `ip helper-address` de LAN B para que apunte a una dirección en la que no exista servidor DHCP. Fuerza una nueva solicitud de `PC-B`.

- ¿Qué ocurre?
- ¿Sigue funcionando DHCP para `PC-A`?
- ¿Qué comando corrige el problema?

### 🟧 Incidencia B. Gateway equivocado

En el ámbito `LAN_A`, cambia temporalmente **Default Gateway** a `192.168.20.1`. Solicita una nueva concesión en `PC-A`.

- ¿Recibe una dirección IPv4 de LAN A?
- ¿Qué gateway recibe?
- ¿Puede comunicarse correctamente con otras redes?
- ¿Por qué una concesión DHCP puede ser válida y, sin embargo, la configuración de red ser incorrecta?

### 🟥 Incidencia C. Ámbito ausente

Guarda una copia y desactiva o elimina temporalmente el ámbito `LAN_B` (si tu versión de Packet Tracer no permite desactivarlo, elimínalo **solo en la copia**). Fuerza una nueva solicitud en `PC-B`.

- ¿Qué sucede con `PC-B`?
- ¿Qué ocurre con `PC-A` y `PC-C`?
- ¿Qué relación existe entre la subred del cliente y el ámbito que necesita?

:::warning[Interpretación de los resultados]
No basta con que un PC conserve una IP de una concesión anterior. **Fuerza una solicitud nueva** y utiliza Simulation para justificar lo observado.
:::

## 1️⃣1️⃣ Preguntas finales

Responde con tus propias palabras:

1. ¿Por qué utilizamos tres ámbitos en lugar de uno solo?
2. ¿Qué elementos de la red deben tener direcciones estáticas en este escenario? ¿Por qué?
3. ¿En qué interfaces del router configuramos DHCP Relay y por qué?
4. ¿Qué diferencia hay entre el gateway configurado en `Server0` y el gateway entregado a `PC-A`?
5. ¿Cómo compruebas que un cliente ha recibido una configuración de **su subred**?
6. ¿Qué ventajas tiene un servidor DHCP centralizado frente a mantener uno distinto en cada LAN?
7. Si añadimos una cuarta LAN, ¿qué configuraciones habría que revisar o ampliar?

## 1️⃣2️⃣ Entrega

Entrega en Classroom:

- El archivo **`practica-09-dhcp-varias-subredes.pkt`**, funcionando y con los tres clientes configurados por DHCP.
- Las **cinco evidencias** solicitadas en los apartados anteriores.
- Las tablas de comprobación completadas.
- Las respuestas de los apartados 6, 9, 10 y 11.

### 🟩 Criterios de comprobación

| Aspecto | Qué se comprobará |
|---|---|
| Topología y direccionamiento | Tres LAN correctamente identificadas y conectadas |
| Servidor DHCP | Tres ámbitos coherentes con las tres redes |
| DHCP Relay | Configurado en las interfaces adecuadas |
| Clientes | Cada PC obtiene IP, máscara y gateway correctos |
| Conectividad | Comunicación entre las tres subredes |
| Diagnóstico | Identificación y justificación de los errores |
| Evidencias | Archivo `.pkt`, capturas y respuestas completas |

## 1️⃣3️⃣ Conclusión

Explica en un párrafo cómo hemos conseguido que **un único servidor DHCP**, situado en LAN C, configure automáticamente equipos de **tres subredes diferentes**. Utiliza los términos **ámbito, gateway, broadcast, DHCP Relay e `ip helper-address`**.

En la siguiente práctica trabajaremos con **incidencias de DHCP**: partiremos de redes que no funcionan correctamente y tendremos que localizar y corregir los errores.
