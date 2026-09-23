---
sidebar_position: 7
title: "Práctica guiada: máscara y CIDR con Packet Tracer"
---

# Práctica guiada: máscara y CIDR con Packet Tracer

Vamos a comprobar con **Cisco Packet Tracer** cómo la máscara determina a qué red pertenece un equipo.

Primero realizaremos los cálculos y formularemos una predicción. **Después** utilizaremos Packet Tracer para comprobarla.

:::info[Objetivos]
Al finalizar deberás poder configurar IPv4 y máscaras, convertir máscara ↔ CIDR, calcular red y broadcast, determinar si dos hosts pertenecen a la misma red y contrastar tus cálculos mediante `ping`.
:::

---

## 1️⃣ Prepara la topología

Reutiliza, si la conservas, la topología anterior:

```text
             Switch0
            /   |   \
           /    |    \
         PC0   PC1   PC2
```

Conexiones:

| Equipo | Interfaz | Switch |
|---|---|---|
| PC0 | FastEthernet0 | Fa0/1 |
| PC1 | FastEthernet0 | Fa0/2 |
| PC2 | FastEthernet0 | Fa0/3 |

No utilizaremos router ni configuraremos puerta de enlace.

---

## 2️⃣ Caso 1: una red /24

Configura:

| Equipo | IPv4 | Máscara |
|---|---|---|
| PC0 | `192.168.1.10` | `255.255.255.0` |
| PC1 | `192.168.1.20` | `255.255.255.0` |
| PC2 | `192.168.1.200` | `255.255.255.0` |

### 🟩 Calcula antes de probar

```text
CIDR:             /____
Bits de red:      ____
Bits de host:     ____

Red:              __________________
Broadcast:        __________________
Primer host:      __________________
Último host:      __________________
Hosts utilizables: ________________
```

### 🟧 Predice

```text
PC0 → PC1: funcionará / no funcionará
PC0 → PC2: funcionará / no funcionará
```

Justifica tu respuesta.

---

## 3️⃣ Comprueba el caso /24

En PC0:

```text
ipconfig
ping 192.168.1.20
ping 192.168.1.200
```

Completa:

| Comunicación | Predicción | Resultado |
|---|---|---|
| PC0 → PC1 | | |
| PC0 → PC2 | | |

### 🟩 Conclusión

¿Coincide la simulación con tus cálculos?

```text
Respuesta:
```

---

## 4️⃣ Caso 2: cambiamos a /25

Mantén las mismas IPv4, pero cambia la máscara de **los tres equipos** a:

```text
255.255.255.128
```

Completa:

```text
255.255.255.128 = /____
Bits de host = ____
Tamaño de bloque = 256 - ____ = ____
```

### 🟩 Calcula los dos bloques

#### Primer bloque

```text
Red:          __________________
Primer host:  __________________
Último host:  __________________
Broadcast:    __________________
```

#### Segundo bloque

```text
Red:          __________________
Primer host:  __________________
Último host:  __________________
Broadcast:    __________________
```

### 🟧 Clasifica

| Equipo | Dirección | Red a la que pertenece |
|---|---|---|
| PC0 | `192.168.1.10/25` | |
| PC1 | `192.168.1.20/25` | |
| PC2 | `192.168.1.200/25` | |

### 🟥 Predice antes de hacer ping

```text
PC0 → PC1: __________________
PC0 → PC2: __________________
```

Justifica utilizando las direcciones de red calculadas.

---

## 5️⃣ Comprueba el caso /25

Desde PC0:

```text
ping 192.168.1.20
ping 192.168.1.200
```

| Comunicación | ¿Misma red? | Resultado |
|---|---|---|
| PC0 → PC1 | | |
| PC0 → PC2 | | |

### 🟩 Analiza

1. ¿Coincide con tu predicción?
2. ¿Los tres PC siguen conectados físicamente al mismo switch?
3. ¿Pertenecen por ello necesariamente a la misma red IPv4?
4. ¿Existe un router que pueda comunicar las dos redes?

```text
Conclusión:
```

:::tip[Idea importante]
Estar conectado al mismo switch no implica pertenecer a la misma **red IPv4**. La dirección y la máscara determinan la red IP.
:::

---

## 6️⃣ Caso 3: trabajamos con /26

Configura:

| Equipo | IPv4 | Máscara |
|---|---|---|
| PC0 | `192.168.1.10` | `255.255.255.192` |
| PC1 | `192.168.1.50` | `255.255.255.192` |
| PC2 | `192.168.1.70` | `255.255.255.192` |

### 🟩 Calcula

```text
255.255.255.192 = /____

Tamaño de bloque:
256 - ______ = ______
```

Escribe los bloques:

```text
Bloque 1: ______ a ______
Bloque 2: ______ a ______
Bloque 3: ______ a ______
Bloque 4: ______ a ______
```

---

## 7️⃣ Calcula antes de probar

| Equipo | IPv4 | Red | Broadcast |
|---|---|---|---|
| PC0 | `192.168.1.10/26` | | |
| PC1 | `192.168.1.50/26` | | |
| PC2 | `192.168.1.70/26` | | |

### 🟩 Predicción

```text
PC0 y PC1 → misma red: SÍ / NO
PC0 y PC2 → misma red: SÍ / NO
PC1 y PC2 → misma red: SÍ / NO
```

Sin router:

```text
PC0 → PC1 debería __________________
PC0 → PC2 debería __________________
```

---

## 8️⃣ Comprueba el caso /26

Desde PC0:

```text
ping 192.168.1.50
ping 192.168.1.70
```

| Comunicación | Predicción | Resultado |
|---|---|---|
| PC0 → PC1 | | |
| PC0 → PC2 | | |

### 🟩 Explica

Utiliza en tu explicación los términos **IPv4**, **máscara**, **/26**, **dirección de red** y **host**.

```text
Explicación:
```

---

## 9️⃣ Localiza un host dentro de un bloque

Mantén `/26` y cambia temporalmente PC2 a:

```text
192.168.1.126
```

Calcula antes de probar:

```text
Red:          __________________
Primer host:  __________________
Último host:  __________________
Broadcast:    __________________
```

### 🟩 Predice

¿Es `192.168.1.126` una dirección válida de host?

```text
Respuesta:
```

¿Pertenece a la misma red que PC0?

```text
Respuesta:
```

Compruébalo desde PC0:

```text
ping 192.168.1.126
```

Explica el resultado.

---

## 🔟 Red y broadcast no son hosts

Para:

```text
192.168.1.64/26
```

calcula:

```text
Dirección de red: __________________
Broadcast:        __________________
```

### 🟩 Prueba controlada

Intenta configurar temporalmente PC2 con la dirección de red calculada y después con la dirección de broadcast.

Anota el comportamiento de Packet Tracer:

```text
Dirección de red:
____________________________________

Dirección de broadcast:
____________________________________
```

### 🟧 Conclusión

¿Deben asignarse estas direcciones a hosts?

```text
Respuesta:
```

:::warning[Restaura la configuración]
Después de la prueba, vuelve a asignar a PC2 una dirección de host válida.
:::

---

## 1️⃣1️⃣ Número de hosts

Calcula:

| CIDR | Bits de host | Direcciones totales | Hosts utilizables |
|---|---:|---:|---:|
| `/24` | | | |
| `/25` | | | |
| `/26` | | | |
| `/27` | | | |

### 🟩 Razona

¿Qué ocurre con el número de hosts disponibles cuando aumenta el prefijo CIDR?

```text
Respuesta:
```

---

## 1️⃣2️⃣ Reto de diagnóstico

Configura:

```text
PC0 → 192.168.10.10/26
PC1 → 192.168.10.60/26
PC2 → 192.168.10.100/26
```

En Packet Tracer tendrás que introducir la máscara decimal correspondiente.

**No hagas ping todavía.**

### 🟩 Calcula

| Equipo | Máscara | Red | Broadcast |
|---|---|---|---|
| PC0 | | | |
| PC1 | | | |
| PC2 | | | |

### 🟧 Predice

```text
PC0 → PC1: __________________
PC0 → PC2: __________________
PC1 → PC2: __________________
```

### 🟥 Comprueba

Realiza los `ping` necesarios.

```text
¿Coinciden tus cálculos y la simulación?

____________________________________
```

---

## 1️⃣3️⃣ Conclusiones

### 🟩 Máscara

La máscara permite distinguir:

```text
____________________ y ____________________
```

### 🟧 CIDR

En `192.168.1.10/26`, el `26` indica:

```text
__________________________________________
```

### 🟥 Dirección de red

Se obtiene poniendo los bits de host a:

```text
________
```

### 🟪 Broadcast

Se obtiene poniendo los bits de host a:

```text
________
```

### 🟦 Hosts utilizables

Completa:

```text
Hosts utilizables = 2^h - ______
```

Se descuentan:

```text
1. __________________________________
2. __________________________________
```

---

## 1️⃣4️⃣ Esquema final

Ante:

```text
192.168.10.140/26
```

el proceso es:

```text
          IPv4 + CIDR
               │
               ▼
        Obtener máscara
               │
               ▼
       Calcular el bloque
               │
               ▼
        Dirección de red
               │
               ▼
           Broadcast
               │
               ▼
        Rango de hosts
               │
               ▼
      Hosts utilizables
```

:::tip[Objetivo conseguido]
No debemos decidir si dos equipos están en la misma red porque sus direcciones «se parecen». Debemos calcularlo utilizando **IPv4 + máscara**.
:::
