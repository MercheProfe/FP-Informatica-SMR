---
sidebar_position: 17
title: "Práctica 6. DHCP en un router Cisco"
---

# Práctica 6. Configuramos DHCP en un router Cisco

En la práctica anterior configuramos DHCP en un servidor de Packet Tracer. Ahora comprobaremos que **DHCP es un servicio de red que también puede proporcionar un router**, sin necesidad de utilizar Windows Server ni un dispositivo Server de Packet Tracer.

## 1️⃣ Objetivos

Al finalizar podrás:

- Configurar una interfaz LAN de un router Cisco.
- Crear un pool DHCP desde la CLI del router.
- Reservar direcciones fuera de la asignación dinámica mediante exclusiones.
- Proporcionar máscara, gateway y DNS a los clientes.
- Verificar las concesiones desde el router y desde los PCs.
- Diagnosticar problemas básicos de configuración.

## 2️⃣ Topología y direccionamiento

En **Cisco Packet Tracer**, incorpora un router (por ejemplo, 1941 o 2911), un switch 2960 y tres PCs. Conéctalos mediante cables de cobre directos (*Copper Straight-Through*).

```text
                 R1 (router Cisco)
                 G0/0: 192.168.10.1/24
                         │
                       SW1
                    ┌────┼────┐
                    │    │    │
                   PC0  PC1  PC2
                   DHCP DHCP DHCP
```

| Elemento | Configuración |
|---|---|
| Red LAN | `192.168.10.0/24` |
| Máscara | `255.255.255.0` |
| Router / gateway | `192.168.10.1` |
| Pool DHCP | `AULA_SMR` |
| Direcciones excluidas | `192.168.10.1` a `192.168.10.99` |
| Direcciones previstas para clientes | `192.168.10.100` a `192.168.10.254` |
| DNS de ejemplo | `8.8.8.8` |

:::info[Sobre el DNS]
En esta simulación utilizaremos `8.8.8.8` para observar cómo se entrega una opción DNS. **No implica que los PCs tengan acceso a Internet ni que puedan resolver nombres**: para ello harían falta conectividad y servicios adicionales.
:::

:::warning[Comprueba el nombre de la interfaz]
El nombre puede variar según el modelo de router (`GigabitEthernet0/0`, `GigabitEthernet0/0/0`, etc.). Utiliza la interfaz que realmente hayas conectado al switch. Puedes comprobarlo con `show ip interface brief`.
:::

## 3️⃣ Configurar la interfaz del router

Haz clic en **R1 → CLI** y accede al modo de configuración:

```text
Router> enable
Router# configure terminal
Router(config)# hostname R1
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# exit
```

Comprueba el estado:

```text
R1# show ip interface brief
```

La interfaz conectada a SW1 debe mostrar la IP `192.168.10.1` y, cuando el enlace esté operativo, los estados **up/up**.

:::tip[Pregunta]
¿Por qué la interfaz del router necesita una IP fija si va a actuar como servidor DHCP?
:::

## 4️⃣ Excluir las direcciones reservadas

Vamos a impedir que DHCP entregue las direcciones `192.168.10.1` a `192.168.10.99`.

Desde el modo de configuración global:

```text
R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.99
```

Conservamos así una zona para infraestructura y otros dispositivos que puedan necesitar direcciones fijas.

:::info[¿Dónde se define el rango?]
En Cisco IOS, el pool se define por su **red y máscara**, y las exclusiones eliminan direcciones de la asignación dinámica. Por eso no configuramos un campo de «IP inicial» e «IP final» como en algunos servidores DHCP.
:::

## 5️⃣ Crear y configurar el pool DHCP

Entra en la configuración del pool:

```text
R1(config)# ip dhcp pool AULA_SMR
R1(dhcp-config)# network 192.168.10.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.10.1
R1(dhcp-config)# dns-server 8.8.8.8
R1(dhcp-config)# exit
R1(config)# end
```

Interpreta cada instrucción:

| Comando | Función |
|---|---|
| `ip dhcp pool AULA_SMR` | Crea o selecciona el pool |
| `network` | Indica la red y su máscara |
| `default-router` | Define el gateway entregado a los clientes |
| `dns-server` | Define el DNS anunciado |
| `ip dhcp excluded-address` | Excluye direcciones de la asignación |

## 6️⃣ Configurar los clientes

En cada PC, abre **Desktop → IP Configuration → DHCP**.

Espera a que se complete la solicitud y anota los valores recibidos:

| Cliente | IP recibida | Máscara | Gateway | DNS |
|---|---|---|---|---|
| PC0 | | | | |
| PC1 | | | | |
| PC2 | | | | |

Comprueba que las tres direcciones son distintas, pertenecen a `192.168.10.0/24` y están fuera del intervalo excluido.

:::warning[No esperes direcciones consecutivas obligatoriamente]
El router puede asignar direcciones disponibles sin seguir el orden que hayas imaginado. Lo importante es comprobar que son **válidas, únicas y no excluidas**.
:::

## 7️⃣ Comprobar las concesiones en el router

En la CLI de R1, ejecuta:

```text
R1# show ip dhcp binding
R1# show ip dhcp pool
R1# show running-config
```

Localiza las direcciones asignadas y la configuración del pool. Responde:

1. ¿Qué direcciones aparecen concedidas?
2. ¿Puedes relacionarlas con los PCs?
3. ¿Qué comando permite revisar las direcciones excluidas en la configuración?
4. ¿Qué información muestra `show ip dhcp pool`?

## 8️⃣ Comprobar conectividad

Desde **Desktop → Command Prompt** de PC0, ejecuta:

```text
ipconfig /all
ping 192.168.10.1
```

Después realiza un ping a la dirección que haya recibido PC1.

Anota:

| Prueba | Resultado | Explicación |
|---|---|---|
| PC0 → gateway | | |
| PC0 → PC1 | | |

:::tip[Interpreta el resultado]
Obtener una IP por DHCP y conseguir conectividad son comprobaciones relacionadas, pero diferentes. Si una falla, debemos investigar en qué punto ocurre.
:::

## 9️⃣ Observar DHCP en modo Simulation

1. Cambia a **Simulation**.
2. Deja visible el tráfico DHCP en los filtros de eventos.
3. En PC2, cambia temporalmente de DHCP a Static y vuelve a DHCP para provocar una nueva solicitud.
4. Avanza los eventos con **Capture/Forward**.
5. Inspecciona los mensajes DHCP que aparezcan.

Completa:

| Mensaje | ¿Quién lo envía? | ¿Para qué sirve? |
|---|---|---|
| Discover | | |
| Offer | | |
| Request | | |
| ACK | | |

Compara esta negociación con la que observaste en Wireshark en el laboratorio VirtualBox.

## 🔟 Comprobación de diagnóstico

Realiza estas pruebas **de una en una**. Después de cada una, restablece la configuración correcta.

### 🟩 Prueba A. Interfaz desactivada

Desactiva la interfaz LAN del router con `shutdown`. ¿Qué ocurre con la conectividad? Reactívala con `no shutdown`.

### 🟧 Prueba B. Gateway incorrecto

Cambia temporalmente el valor `default-router` del pool por una dirección equivocada de la misma subred, por ejemplo `192.168.10.254` (sin otro equipo usando esa IP). Renueva la configuración de un PC desde la opción DHCP y observa el gateway recibido. ¿Puede seguir comunicándose con equipos de su misma LAN? ¿Qué problema tendría al salir a otras redes? Restablece `192.168.10.1`.

### 🟥 Prueba C. Exclusión

Comprueba que ninguno de los PCs ha recibido una dirección del intervalo excluido. Explica por qué.

## 1️⃣1️⃣ Preguntas finales

1. ¿Qué diferencia existe entre un servidor DHCP de Windows y el servicio DHCP de un router Cisco?
2. ¿Qué hace `network` dentro de un pool?
3. ¿Qué función tiene `default-router`?
4. ¿Por qué se excluye la dirección del router?
5. ¿Qué diferencia existe entre una dirección excluida y una dirección concedida?
6. ¿Qué comandos utilizas para comprobar las concesiones en el router?
7. ¿Por qué el DNS recibido no garantiza acceso a Internet?
8. ¿Qué has comprobado en Packet Tracer que ya habías observado con Wireshark?

## 1️⃣2️⃣ Evidencias a entregar

Incluye en un documento:

- Captura de la topología completa.
- Captura o transcripción de la configuración relevante de R1.
- Tabla con las configuraciones DHCP de PC0, PC1 y PC2.
- Resultado de `show ip dhcp binding`.
- Resultados de las pruebas de conectividad.
- Captura de los mensajes DHCP observados en Simulation.
- Respuestas a las preguntas de diagnóstico y reflexión.

:::info[Resultado esperado]
Los tres PCs reciben automáticamente direcciones de `192.168.10.0/24` no excluidas, identifican `192.168.10.1` como gateway y pueden comunicarse con el router y entre sí. **El servicio DHCP lo proporciona el router Cisco**, sin un servidor independiente.
:::
