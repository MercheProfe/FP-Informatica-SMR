---
sidebar_position: 24
title: "0.12. Diagnóstico y resolución de problemas"
---

# Diagnóstico y resolución de problemas

En los puntos anteriores hemos estudiado los elementos fundamentales de una red: direccionamiento IPv4 e IPv6, máscaras, subredes, VLAN, gateway, routing, NAT, DNS y protocolos como ARP o Neighbor Discovery.

Ahora vamos a utilizarlos de forma conjunta.

Cuando una red falla, un buen técnico no cambia parámetros al azar. Sigue un **procedimiento ordenado**, realiza pruebas sencillas y utiliza cada resultado para decidir cuál debe ser la siguiente comprobación.

## 1️⃣ Diagnosticar antes de modificar

Ante un mensaje como:

> «No tengo Internet»

todavía no sabemos cuál es el problema.

Podría encontrarse en:

- la conexión física;
- la configuración IP;
- la máscara;
- el gateway;
- la VLAN;
- el routing;
- NAT;
- DNS;
- un firewall;
- el propio servicio al que intentamos acceder.

La primera regla será:

```text
Observar → comprobar → localizar → corregir → verificar
```

:::warning[Evita cambiar varias cosas a la vez]
Si modificamos IP, máscara, gateway y DNS simultáneamente y el problema desaparece, no sabremos qué parámetro era incorrecto.
:::

## 2️⃣ Método de diagnóstico por niveles

Podemos organizar el diagnóstico desde lo más próximo al equipo hacia lo más lejano.

```text
1. Interfaz y enlace
        ↓
2. Configuración IP
        ↓
3. Comunicación local
        ↓
4. Gateway
        ↓
5. Otras redes
        ↓
6. DNS
        ↓
7. Servicio o aplicación
```

La idea es sencilla: **no tiene sentido investigar DNS si el equipo ni siquiera puede alcanzar su gateway**.

## 3️⃣ Paso 1: comprobar la interfaz y el enlace

Antes de estudiar direcciones IP debemos comprobar que existe conectividad básica.

En una red real podemos revisar:

- cable conectado;
- adaptador habilitado;
- estado de la interfaz;
- conexión Wi-Fi;
- LEDs del puerto;
- puerto correcto del switch;
- adaptador correcto de la máquina virtual.

En Windows:

```powershell
ipconfig /all
```

nos permite identificar los adaptadores y observar su configuración.

También podemos utilizar:

```powershell
Get-NetAdapter
```

para consultar el estado de las interfaces.

:::info[En Packet Tracer]
Comprueba que los enlaces estén activos y que las interfaces necesarias no permanezcan administrativamente deshabilitadas.
:::

## 4️⃣ Paso 2: revisar la configuración IP

Debemos comprobar conjuntamente:

```text
IP
máscara o prefijo
gateway
DNS
```

Ejemplo:

```text
IP:      192.168.10.70
Máscara: 255.255.255.192
Gateway: 192.168.10.65
DNS:     192.168.10.10
```

La máscara `/26` crea bloques de 64.

La dirección `192.168.10.70/26` pertenece a:

```text
Red:       192.168.10.64/26
Hosts:     192.168.10.65 - 192.168.10.126
Broadcast: 192.168.10.127
```

Por tanto, `192.168.10.65` es un gateway posible.

No basta con comprobar que cada número «parece correcto». Los parámetros deben ser **coherentes entre sí**.

## 5️⃣ Una dirección 169.254.x.x

Si un equipo Windows configurado para obtener IPv4 automáticamente muestra una dirección del rango:

```text
169.254.0.0/16
```

es una dirección IPv4 link-local, conocida habitualmente en Windows como APIPA.

Es una pista importante: puede indicar que el equipo no ha conseguido obtener la configuración IPv4 esperada mediante DHCP.

:::warning[Es una pista, no el diagnóstico completo]
Ver una dirección `169.254.x.x` debe llevarnos a investigar la configuración automática y el acceso al servicio DHCP, no a concluir sin más cuál es la causa concreta.
:::

## 6️⃣ Paso 3: comprobar la pila TCP/IP local

Antes de salir a la red podemos comprobar el propio equipo.

IPv4:

```powershell
ping 127.0.0.1
```

IPv6:

```powershell
ping ::1
```

Estas pruebas utilizan las direcciones de loopback.

Si funcionan, estamos comprobando el funcionamiento local de la pila correspondiente, no la tarjeta de red, el cable ni el switch.

## 7️⃣ Paso 4: comprobar la red local

Después podemos probar otro equipo del mismo segmento IP.

Por ejemplo:

```powershell
ping 192.168.10.80
```

Si ambos hosts deberían pertenecer a la misma red pero no se comunican, debemos revisar, entre otras posibilidades:

- IP;
- máscara;
- VLAN;
- enlace;
- configuración del switch;
- firewall del equipo.

También podemos observar la tabla ARP:

```powershell
arp -a
```

Esto permite relacionar el diagnóstico con lo estudiado en el punto 4.

## 8️⃣ Paso 5: comprobar el gateway

Si queremos llegar a otras redes, una prueba fundamental es:

```powershell
ping DIRECCION_DEL_GATEWAY
```

Ejemplo:

```powershell
ping 192.168.10.65
```

Si el host no alcanza su gateway, todavía no tiene sentido empezar culpando a Internet o DNS.

Debemos investigar primero la comunicación entre:

```text
Host ↔ Gateway
```

:::info[Un ping puede estar filtrado]
Que un equipo no responda a ICMP no demuestra por sí solo que esté desconectado. Hay que interpretar cada prueba junto con el resto de evidencias.
:::

## 9️⃣ Paso 6: comprobar una dirección remota

Si el gateway es alcanzable, podemos comprobar una dirección de otra red.

La pregunta pasa a ser:

```text
¿puedo salir de mi red local?
```

Si el tráfico no llega, podemos investigar:

- tabla de routing;
- ruta por defecto;
- rutas de retorno;
- NAT/PAT cuando corresponda;
- ACL o firewall;
- enlaces entre routers.

En un router Cisco podemos consultar:

```text
show ip interface brief
show ip route
```

Y, si hemos configurado NAT:

```text
show ip nat translations
show ip nat statistics
```

## 🔟 Paso 7: comprobar DNS

Supongamos que:

```text
ping a una IP remota → funciona
acceso mediante nombre → falla
```

Esto orienta la investigación hacia la resolución de nombres.

En Windows podemos utilizar:

```powershell
nslookup nombre
```

Debemos comprobar:

- qué servidor DNS utiliza el equipo;
- si responde;
- si puede resolver el nombre solicitado.

:::info[Idea clave]
Si funciona la conectividad IP pero falla únicamente el acceso por nombre, DNS se convierte en una de las primeras comprobaciones.
:::

## 1️⃣1️⃣ `tracert`: observar el camino

En Windows:

```powershell
tracert DESTINO
```

permite observar los saltos de capa 3 que responden durante el recorrido.

Puede ayudarnos a determinar hasta qué punto avanza el tráfico.

Ejemplo conceptual:

```text
PC
 ↓
Gateway
 ↓
Router 2
 ↓
...
 ↓
Destino
```

Sin embargo, algunos dispositivos pueden no responder a las sondas utilizadas por `tracert`.

Por tanto:

```text
* * *
```

no significa automáticamente que ese router esté averiado.

## 1️⃣2️⃣ Tabla ARP y tabla MAC del switch

No debemos confundirlas.

En un PC:

```powershell
arp -a
```

muestra asociaciones relacionadas con:

```text
IPv4 ↔ MAC
```

En un switch Cisco:

```text
show mac address-table
```

muestra asociaciones:

```text
MAC ↔ puerto
```

Estas tablas responden a preguntas diferentes.

Ejemplo:

```text
¿qué MAC corresponde a mi gateway?
→ ARP

¿por qué puerto conoce el switch esa MAC?
→ tabla MAC
```

## 1️⃣3️⃣ Diagnóstico de VLAN

Si dos equipos conectados al mismo switch no se comunican, no podemos asumir que están en la misma LAN lógica.

Debemos comprobar:

```text
show vlan brief
```

y, cuando existan enlaces troncales:

```text
show interfaces trunk
```

Preguntas:

1. ¿están los puertos en la VLAN correcta?
2. ¿la VLAN existe?
3. ¿el trunk transporta la VLAN?
4. ¿las IP pertenecen a la subred prevista para esa VLAN?
5. si son VLAN diferentes, ¿existe routing inter-VLAN?

## 1️⃣4️⃣ Diagnóstico de routing

Supongamos:

```text
PC-A → gateway: funciona
PC-A → PC remoto: falla
```

Ahora debemos mirar más allá de la LAN.

En los routers:

```text
show ip interface brief
show ip route
```

Debemos comprobar:

- interfaces activas;
- redes directamente conectadas;
- rutas hacia redes remotas;
- siguiente salto;
- ruta por defecto;
- ruta de retorno.

:::warning[La ruta de ida no basta]
Para que una comunicación funcione, la respuesta también necesita encontrar un camino de vuelta.
:::

## 1️⃣5️⃣ Diagnóstico de NAT/PAT

Si la red utiliza NAT/PAT, podemos comprobar las traducciones.

En Cisco:

```text
show ip nat translations
show ip nat statistics
```

Debemos preguntarnos:

- ¿está correctamente definida la red interna?
- ¿son correctas las interfaces interior y exterior?
- ¿se generan traducciones cuando producimos tráfico?
- ¿existe routing además de NAT?

No debemos olvidar:

```text
Routing ≠ NAT
```

## 1️⃣6️⃣ Firewall y filtrado

Un firewall puede bloquear tráfico aunque la configuración IP y las rutas sean correctas.

Esto puede producir situaciones como:

```text
ping falla
pero otro servicio funciona
```

o:

```text
un puerto concreto no responde
pero existe conectividad IP
```

Por ello, una prueba negativa no debe interpretarse de forma aislada.

En un diagnóstico debemos distinguir entre:

```text
No hay conectividad
```

y:

```text
Hay conectividad, pero determinado tráfico está filtrado
```

## 1️⃣7️⃣ Comandos fundamentales

### 🟩 Windows

| Comando | Utilidad principal |
|---|---|
| `ipconfig /all` | Consultar configuración IP |
| `ping` | Comprobar alcance mediante ICMP |
| `arp -a` | Consultar la caché ARP |
| `route print` | Consultar la tabla de rutas |
| `tracert` | Observar saltos hacia un destino |
| `nslookup` | Comprobar resolución DNS |
| `Get-NetAdapter` | Consultar interfaces de red |

### 🟧 Cisco IOS

| Comando | Utilidad principal |
|---|---|
| `show ip interface brief` | Estado y direcciones de interfaces |
| `show ip route` | Tabla de routing IPv4 |
| `show vlan brief` | VLAN y puertos de acceso |
| `show interfaces trunk` | Enlaces trunk |
| `show mac address-table` | Tabla MAC del switch |
| `show ip nat translations` | Traducciones NAT |
| `show ip nat statistics` | Estado de NAT |

## 1️⃣8️⃣ Árbol básico de diagnóstico

Podemos resumir el procedimiento así:

```text
¿La interfaz está activa?
        │
        ├── NO → revisar enlace/adaptador
        │
        └── SÍ
             ↓
¿IP y máscara son correctas?
        │
        ├── NO → corregir configuración
        │
        └── SÍ
             ↓
¿Alcanza un host local?
        │
        ├── NO → revisar LAN/VLAN/máscara/firewall
        │
        └── SÍ
             ↓
¿Alcanza el gateway?
        │
        ├── NO → revisar gateway/LAN/VLAN
        │
        └── SÍ
             ↓
¿Alcanza una IP remota?
        │
        ├── NO → revisar routing/NAT/filtrado
        │
        └── SÍ
             ↓
¿Funciona mediante nombre?
        │
        ├── NO → revisar DNS
        │
        └── SÍ
             ↓
Revisar servicio o aplicación concreta
```

## 1️⃣9️⃣ Casos rápidos

### 🟩 Caso A

```text
IP:      192.168.10.20/24
Gateway: 192.168.20.1
```

El gateway no pertenece a la red local del host.

### 🟧 Caso B

```text
IP: 169.254.35.8/16
```

Si el equipo esperaba obtener configuración IPv4 mediante DHCP, debemos investigar por qué no la ha recibido.

### 🟥 Caso C

```text
Ping al gateway → correcto
Ping a una IP remota → correcto
Nombre de servidor → falla
```

La conectividad IP funciona. Debemos investigar DNS.

### 🟪 Caso D

```text
PC-A y PC-B
Misma subred IP
Mismo switch físico
VLAN diferentes
```

La coincidencia de subred IP configurada no elimina la separación de capa 2 creada por las VLAN.

### 🟦 Caso E

```text
Router R1 conoce la red de PC-B
Router R2 no conoce la red de PC-A
```

Puede existir camino de ida pero faltar la ruta de retorno.

## 2️⃣0️⃣ Método de trabajo del técnico

Ante una incidencia:

```text
1. Recoger síntomas.
2. No asumir la causa.
3. Comprobar lo más próximo.
4. Realizar una prueba cada vez.
5. Interpretar el resultado.
6. Reducir el área del problema.
7. Aplicar una corrección.
8. Volver a probar.
9. Restaurar o documentar los cambios.
```

:::tip[Objetivo]
No buscamos memorizar una lista de comandos. Buscamos aprender **qué pregunta responde cada comando** y utilizar esa respuesta para decidir el siguiente paso.
:::

## 2️⃣1️⃣ Comprueba lo aprendido

### 🟩 Actividad 1

Un equipo tiene:

```text
IP:      192.168.50.70/26
Gateway: 192.168.50.1
DNS:     192.168.50.10
```

1. Calcula su red.
2. Decide si el gateway es válido para ese host.
3. Indica qué corregirías.

### 🟧 Actividad 2

Ordena estas pruebas de forma razonable:

- comprobar DNS;
- comprobar el gateway;
- revisar `ipconfig /all`;
- probar una IP remota;
- comprobar el enlace;
- probar un host local.

### 🟥 Actividad 3

Un PC alcanza `192.168.1.1`, alcanza una IP remota, pero `nslookup` no consigue resolver nombres.

¿En qué parte centrarías el diagnóstico?

### 🟪 Actividad 4

Explica la diferencia entre:

```text
arp -a
show mac address-table
show ip route
```

### 🟦 Actividad 5

Un usuario dice:

> «El router está roto porque `ping` no responde».

Explica por qué esa conclusión no está suficientemente justificada.
