---
sidebar_position: 6
title: "Práctica guiada: configuración IPv4 con Packet Tracer"
---

# Práctica guiada: configuración IPv4 con Packet Tracer

En esta práctica vamos a utilizar **Cisco Packet Tracer** para comprobar cómo se configura IPv4 en los equipos de una LAN.

El objetivo no es todavía calcular redes ni subredes. Eso lo haremos cuando estudiemos **máscara y CIDR**.

Nos centraremos en:

- configurar direcciones IPv4;
- consultar la configuración;
- comprobar la comunicación;
- provocar errores sencillos de direccionamiento;
- interpretar los resultados.

:::info[ Objetivos]
Al finalizar deberás ser capaz de configurar manualmente una IPv4 en Packet Tracer, comprobarla desde la consola y detectar errores básicos en el direccionamiento de un equipo.
:::

---

## 1️⃣ Construcción de la LAN

Utilizaremos una topología sencilla:

```text
             Switch0
            /   |   \
           /    |    \
         PC0   PC1   PC2
```

Necesitas:

- 1 switch Cisco **2960**.
- 3 equipos **PC-PT**.

Conecta mediante **Copper Straight-Through**:

| Equipo | Interfaz | Puerto del switch |
|---|---|---|
| PC0 | FastEthernet0 | FastEthernet0/1 |
| PC1 | FastEthernet0 | FastEthernet0/2 |
| PC2 | FastEthernet0 | FastEthernet0/3 |

Espera hasta que los enlaces estén activos.

:::tip
Si conservas la topología de la práctica anterior de ARP, puedes reutilizarla.
:::



## 2️⃣ Configuración manual de IPv4

En cada PC entra en:

**Desktop → IP Configuration**

Selecciona **Static**.

Configura:

| Equipo | IPv4 | Máscara |
|---|---|---|
| PC0 | `192.168.1.10` | `255.255.255.0` |
| PC1 | `192.168.1.20` | `255.255.255.0` |
| PC2 | `192.168.1.30` | `255.255.255.0` |

Deja vacíos:

- Default Gateway.
- DNS Server.

### 🟩 Anota

¿Qué tipo de direcciones hemos utilizado?

```text
Públicas / Privadas:

Estáticas / Dinámicas:
```

Justifica ambas respuestas:

```text
Respuesta:
```

---

## 3️⃣ Consulta de la configuración

Abre en PC0:

**Desktop → Command Prompt**

Ejecuta:

```text
ipconfig
```

Haz lo mismo en PC1 y PC2.

Completa con lo que muestra Packet Tracer:

| Equipo | IPv4 | Máscara |
|---|---|---|
| PC0 | | |
| PC1 | | |
| PC2 | | |

### 🟩 Comprueba

¿Coincide la configuración mostrada por `ipconfig` con la que has introducido gráficamente?

```text
Respuesta:
```

### 🟧 Razona

¿Qué diferencia existe entre:

```text
IP Configuration
```

y:

```text
ipconfig
```

en esta práctica?

```text
Respuesta:
```

---

## 4️⃣ Primera prueba de comunicación

Desde PC0 ejecuta:

```text
ping 192.168.1.20
```

Después:

```text
ping 192.168.1.30
```

Anota:

| Prueba | ¿Responde? |
|---|---|
| PC0 → PC1 | |
| PC0 → PC2 | |

Desde PC1 prueba también:

```text
ping 192.168.1.10
```

### 🟩 Conclusión inicial

¿Pueden comunicarse los tres equipos?

```text
Respuesta:
```

:::info
En esta práctica utilizamos deliberadamente una configuración sencilla.

En el siguiente apartado aprenderemos a utilizar la **máscara** para determinar formalmente qué direcciones pertenecen a una misma red.
:::

---

## 5️⃣ Comprobación de loopback

En PC0 ejecuta:

```text
ping 127.0.0.1
```

Anota el resultado:

```text
Resultado:
```

### 🟩 Investiga

1. ¿A qué otro equipo de la topología se ha enviado este `ping`?
2. ¿Ha tenido que pasar por Switch0?
3. ¿Qué estamos comprobando realmente al utilizar `127.0.0.1`?

```text
Respuesta:
```

### 🟧 Predicción

Si desconectáramos el cable de PC0, ¿esperarías que `ping 127.0.0.1` siguiera funcionando?

```text
Hipótesis:
```

---

## 6️⃣ Provocamos un error de dirección

Vamos a comprobar qué ocurre cuando configuramos mal una dirección.

Antes de modificar nada, anota la configuración correcta de PC2:

```text
IPv4:    ______________________
Máscara: ______________________
```

Ahora entra en:

**PC2 → Desktop → IP Configuration**

y cambia temporalmente su IPv4 por:

```text
192.168.1.300
```

### 🟩 Observa

¿Qué ocurre al intentar introducirla?

```text
Resultado:
```

### 🟧 Explica

¿Por qué `300` no puede utilizarse como valor de un octeto IPv4?

```text
Respuesta:
```

No continúes hasta comprender el motivo.

---

## 7️⃣ Otro error: dirección duplicada

Restaura PC2 con:

```text
192.168.1.30
```

Ahora vamos a provocar otro problema.

Consulta primero la IPv4 de PC1.

Después intenta asignar **esa misma IPv4** a PC2, manteniendo:

```text
255.255.255.0
```

### 🟩 Observa

Anota cualquier aviso o comportamiento que muestre Packet Tracer:

```text
Resultado:
```

### 🟧 Razona

Tenemos dos interfaces intentando utilizar la misma dirección IPv4.

Responde:

1. ¿Permite una dirección IPv4 identificar correctamente a un equipo si está duplicada?
2. ¿Qué problema introduce esta situación?
3. ¿Considerarías correcta esta configuración aunque en alguna prueba concreta pudiera aparecer una respuesta?

```text
Respuesta:
```

:::warning
Una dirección IPv4 asignada a una interfaz debe ser **única dentro del ámbito de red en el que se utiliza**. Una IP duplicada provoca conflictos y resultados de comunicación no fiables.
:::

Al terminar, devuelve PC2 a:

```text
192.168.1.30
```

---

## 8️⃣ Cambiamos la dirección de un equipo

Ahora configura PC2 con:

```text
192.168.2.30
```

Mantén:

```text
255.255.255.0
```

Desde PC0 prueba:

```text
ping 192.168.2.30
```

Anota el resultado:

```text
Resultado:
```

### 🟩 Observa

Compara con la situación anterior:

```text
PC0 → 192.168.1.30
```

frente a:

```text
PC0 → 192.168.2.30
```

¿Qué ha cambiado?

```text
Respuesta:
```

### 🟧 No adelantes conclusiones

Todavía no vamos a realizar el cálculo matemático que explica completamente el resultado.

Anota tu hipótesis:

```text
¿Por qué crees que ha cambiado el comportamiento?

____________________________________________________
____________________________________________________
```

:::info[ Próximo apartado]
Para explicar correctamente este resultado necesitaremos estudiar:

- máscara de red;
- parte de red y parte de host;
- notación CIDR;
- dirección de red;
- broadcast;
- rango de hosts.

Lo haremos en el **apartado 6**.
:::

Devuelve finalmente PC2 a:

```text
192.168.1.30
```



## 9️⃣ ¿Necesitamos puerta de enlace?

Observa la configuración actual:

```text
PC0: 192.168.1.10
PC1: 192.168.1.20
PC2: 192.168.1.30
```

No hemos configurado **Default Gateway**.

Comprueba nuevamente:

```text
PC0> ping 192.168.1.20
PC0> ping 192.168.1.30
```

### 🟩 Razona

1. ¿Funcionan las comunicaciones?
2. ¿Hemos utilizado un router?
3. ¿Han salido los paquetes de nuestra LAN?
4. ¿Para qué crees que necesitaremos una puerta de enlace?

```text
Respuesta:
```

:::tip[Idea para conservar]
Los equipos de esta práctica pueden comunicarse localmente sin utilizar un router.

Cuando necesitemos alcanzar **otras redes**, entrará en juego la **puerta de enlace predeterminada**.
:::



## 🔟 Dirección estática frente a dinámica

Hasta ahora hemos seleccionado:

**IP Configuration → Static**

Observa que Packet Tracer también dispone de la opción:

**DHCP**

No es necesario utilizarla todavía.

### 🟩 Responde

1. ¿Quién ha decidido las direcciones IPv4 utilizadas en esta práctica?
2. ¿Qué significa que nuestra configuración sea estática?
3. Si utilizáramos DHCP, ¿esperaríamos introducir manualmente la dirección de cada PC?

```text
Respuesta:
```

:::info
En una práctica posterior configuraremos un **servicio DHCP real** y observaremos cómo los clientes obtienen automáticamente sus parámetros de red.
:::

---

## 1️⃣1️⃣ Tabla de resultados

Antes de finalizar, deja los equipos con su configuración correcta y completa:

| Equipo | IPv4 final | Máscara | Tipo de dirección | Configuración |
|---|---|---|---|---|
| PC0 | | | Pública / Privada | Estática / Dinámica |
| PC1 | | | Pública / Privada | Estática / Dinámica |
| PC2 | | | Pública / Privada | Estática / Dinámica |

Comprueba desde PC0:

```text
ping 192.168.1.20
ping 192.168.1.30
ping 127.0.0.1
```

Los resultados finales deben ser coherentes con una configuración correcta.

---

## 1️⃣2️⃣ Conclusiones

Completa con tus propias palabras.

### 🟩 IPv4

Una dirección IPv4 tiene:

```text
________ bits divididos en ________ octetos.
```

### 🟧 Valores de un octeto

Un octeto puede tomar valores decimales entre:

```text
________ y ________
```

### 🟥 Direcciones privadas

Las direcciones utilizadas en nuestra LAN pertenecen al bloque privado:

```text
________________________________________
```

### 🟪 Configuración

En esta práctica hemos configurado las direcciones de forma:

```text
________________________________________
```

### 🟦 Loopback

La dirección:

```text
127.0.0.1
```

se utiliza para:

```text
________________________________________
```

---

## 1️⃣3️⃣ Reto final

Sin modificar todavía la red, observa:

```text
PC0 → 192.168.1.10
PC1 → 192.168.1.20
PC2 → 192.168.1.30
```

Todos utilizan:

```text
255.255.255.0
```

Sabemos que se comunican entre sí.

La pregunta que resolveremos en el siguiente apartado es:

> **¿Cómo sabe un equipo qué parte de una dirección IPv4 identifica la red y qué parte identifica al host?**

La respuesta está en:

```text
          MÁSCARA DE RED
                 │
                 ▼
       PARTE DE RED / HOST
                 │
                 ▼
             CIDR
                 │
                 ▼
      RED - BROADCAST - HOSTS
```

:::tip[ Siguiente paso]
En el apartado 6 dejaremos de limitarnos a configurar direcciones y aprenderemos a **calcular e interpretar redes IPv4 utilizando máscara y CIDR**.
:::
