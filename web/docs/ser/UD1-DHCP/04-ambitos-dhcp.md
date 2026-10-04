---
sidebar_position: 5
title: "1.4. Ámbitos DHCP"
---

# 1.4. Ámbitos DHCP

En el apartado anterior hemos visto que el servidor DHCP administra direcciones y las entrega a los clientes mediante **concesiones**.

Ahora aparece una cuestión fundamental:

> **¿Puede un servidor DHCP entregar cualquier dirección IP?**

No. El administrador debe indicar al servidor **qué red va a gestionar y qué conjunto de direcciones puede asignar**.

Para ello utilizamos los **ámbitos DHCP**.

## 1️⃣ ¿Qué es un ámbito DHCP?

Un **ámbito DHCP**, también denominado **scope**, es la configuración que define el conjunto de direcciones IP y parámetros que un servidor DHCP puede utilizar para atender a los clientes de una determinada subred.

Por ejemplo, tenemos la red:

```text
192.168.10.0/24
```

Sabemos por la UT0 que:

```text
Dirección de red:       192.168.10.0
Máscara:                255.255.255.0
Broadcast:              192.168.10.255
Hosts posibles:         192.168.10.1 - 192.168.10.254
```

Podríamos crear un ámbito DHCP para esa red.

:::info[Idea clave]

Un ámbito DHCP está asociado a una **subred**.

Antes de configurar DHCP debemos conocer correctamente el direccionamiento de esa red.

:::

## 2️⃣ Del direccionamiento al ámbito DHCP

Supongamos que debemos configurar DHCP para:

```text
Red: 192.168.10.0/24
```

No necesariamente queremos que DHCP utilice todas las direcciones de host.

Podemos decidir que el servidor entregue únicamente:

```text
192.168.10.100 - 192.168.10.200
```

Así tendríamos:

```text
Red
192.168.10.0/24

Direcciones de host
192.168.10.1 ─────────────────────────────── 192.168.10.254

                    Rango DHCP
             192.168.10.100 ─── 192.168.10.200
```

El administrador está delimitando qué direcciones podrán asignarse dinámicamente.

## 3️⃣ Pool o conjunto de direcciones

El conjunto de direcciones que DHCP tiene disponibles para entregar a los clientes suele denominarse **pool de direcciones**.

Por ejemplo:

```text
Dirección inicial: 192.168.10.100
Dirección final:   192.168.10.200
```

Ese intervalo constituye el conjunto de direcciones que hemos previsto para la asignación dinámica dentro del ámbito.

Los clientes irán recibiendo direcciones disponibles de este conjunto mediante concesiones.

:::tip[Terminología]

En esta unidad utilizaremos:

- **ámbito o scope**: configuración DHCP asociada a una subred;
- **pool**: conjunto de direcciones disponibles para asignación dinámica;
- **rango**: intervalo definido mediante una dirección inicial y una dirección final.

:::

## 4️⃣ Dirección inicial y dirección final

Al crear un ámbito debemos establecer los límites del rango que podrá utilizar DHCP.

Por ejemplo:

| Parámetro | Valor |
|---|---|
| Red | `192.168.10.0/24` |
| Máscara | `255.255.255.0` |
| Dirección inicial DHCP | `192.168.10.100` |
| Dirección final DHCP | `192.168.10.200` |

Esto significa que DHCP podrá trabajar con direcciones comprendidas entre:

```text
192.168.10.100
        ↓
        ↓
192.168.10.200
```

Las direcciones deben pertenecer a la subred correspondiente.

## 5️⃣ ¿Cómo elegimos el rango?

Para definir correctamente un rango debemos recuperar los cálculos de **IPv4 y subnetting** trabajados en la UT0.

Primero necesitamos conocer:

1. la dirección de red;
2. la máscara o prefijo;
3. la dirección de broadcast;
4. el rango de hosts válidos;
5. qué direcciones queremos dedicar a asignación dinámica.

Por ejemplo:

```text
Red: 192.168.20.0/24
```

Calculamos:

```text
Red:          192.168.20.0
Broadcast:    192.168.20.255
Hosts:        192.168.20.1 - 192.168.20.254
```

Después decidimos:

```text
Rango DHCP:   192.168.20.100 - 192.168.20.220
```

:::warning[DHCP no sustituye al subnetting]

El servidor DHCP no decide por nosotros cómo debe diseñarse la red.

Primero debemos conocer y planificar correctamente la subred. Después configuramos DHCP de acuerdo con ese diseño.

:::

## 6️⃣ Direcciones que no podemos entregar a clientes

Dentro de una subred existen direcciones que tienen funciones especiales y no pueden utilizarse como direcciones normales de host.

En:

```text
192.168.10.0/24
```

tenemos:

| Dirección | Función |
|---|---|
| `192.168.10.0` | Dirección de red |
| `192.168.10.255` | Dirección de broadcast |

Por tanto, ninguna de ellas puede formar parte de las direcciones asignables a clientes.

El rango:

```text
192.168.10.0 - 192.168.10.255
```

**no sería un rango válido de direcciones para clientes**.

:::tip[Conexión con la UT0]

Antes de crear un ámbito DHCP debemos ser capaces de identificar correctamente:

- red;
- broadcast;
- primer host;
- último host;
- máscara o prefijo.

Los cálculos de subnetting tienen ahora una aplicación directa en la administración de un servicio real.

:::

## 7️⃣ ¿Debemos entregar todos los hosts válidos?

Tampoco.

Aunque una dirección sea válida para un host, puede interesarnos reservar parte del espacio de direccionamiento para dispositivos que tendrán una configuración controlada.

Por ejemplo:

```text
192.168.10.0/24

192.168.10.1       Router
192.168.10.10      Servidor
192.168.10.20      Impresora

192.168.10.100
       │
       ├────────── Rango DHCP
       │
192.168.10.200
```

Podemos organizar la red de forma que determinadas zonas del direccionamiento se utilicen para infraestructura y otras para clientes DHCP.

Esto facilita la administración y reduce el riesgo de conflictos.

## 8️⃣ Ejemplo: diseñar un ámbito

Queremos proporcionar DHCP a una red con estos datos:

```text
Red: 192.168.50.0/24
```

### 🟩 Paso 1. Identificamos la subred

```text
Red:          192.168.50.0
Máscara:      255.255.255.0
Broadcast:    192.168.50.255
Hosts:        192.168.50.1 - 192.168.50.254
```

### 🟧 Paso 2. Planificamos algunas direcciones

Decidimos utilizar:

```text
192.168.50.1       Router
192.168.50.10      Servidor
```

### 🟥 Paso 3. Definimos el rango DHCP

Podemos utilizar:

```text
Inicio: 192.168.50.100
Fin:    192.168.50.200
```

Nuestro ámbito quedaría conceptualmente:

| Parámetro | Configuración |
|---|---|
| Subred | `192.168.50.0/24` |
| Máscara | `255.255.255.0` |
| Inicio del rango | `192.168.50.100` |
| Final del rango | `192.168.50.200` |

El servidor podrá utilizar ese conjunto para realizar concesiones a los clientes.

## 9️⃣ Un ámbito para cada subred

Supongamos ahora que tenemos:

```text
192.168.10.0/24
192.168.20.0/24
```

Son **dos subredes diferentes**.

Por tanto, necesitaremos configuraciones DHCP que correspondan a cada una de ellas.

Por ejemplo:

```text
Ámbito RED 10
Subred: 192.168.10.0/24
Pool:   192.168.10.100 - 192.168.10.200
```

```text
Ámbito RED 20
Subred: 192.168.20.0/24
Pool:   192.168.20.100 - 192.168.20.200
```

No debemos mezclar direcciones de diferentes subredes dentro de un mismo rango.

:::info[Más adelante]

Cuando trabajemos con **varias subredes**, tendremos que resolver además cómo llegan las solicitudes DHCP hasta el servidor.

Esto nos llevará posteriormente al concepto de **DHCP Relay**.

:::

## 🔟 ¿Cuántas direcciones necesitamos?

El tamaño del rango debe tener relación con el número de clientes que esperamos atender.

Por ejemplo, si tenemos un aula con 25 equipos, un rango de solo 10 direcciones sería insuficiente si todos necesitan una concesión simultáneamente.

```text
25 clientes
10 direcciones disponibles

→ No todos podrán obtener una dirección.
```

Por el contrario, tampoco es necesario asignar sin planificación prácticamente todo el espacio de la subred.

El rango debe diseñarse teniendo en cuenta:

- número de clientes;
- crecimiento previsto;
- dispositivos con dirección estática;
- organización del direccionamiento;
- duración de las concesiones.

## 1️⃣1️⃣ Relación entre ámbito y concesiones

Podemos relacionar lo estudiado hasta ahora:

```text
SUBRED
  │
  ▼
ÁMBITO DHCP
  │
  ▼
POOL / RANGO DE DIRECCIONES
  │
  ▼
CONCESIONES A LOS CLIENTES
```

Por ejemplo:

```text
Subred: 192.168.10.0/24

Ámbito DHCP
└── Pool: 192.168.10.100 - 192.168.10.200
      │
      ├── 192.168.10.100 → PC01
      ├── 192.168.10.101 → PC02
      ├── 192.168.10.102 → PC03
      └── ...
```

El **ámbito** define dónde puede trabajar el servidor y el **pool** determina las direcciones disponibles para realizar concesiones.

## 1️⃣2️⃣ ¿Y si dentro del rango hay una dirección que no queremos entregar?

Imaginemos:

```text
Rango DHCP:
192.168.10.100 - 192.168.10.200
```

pero dentro de ese intervalo existe una impresora configurada manualmente con:

```text
192.168.10.150
```

No queremos que DHCP entregue `192.168.10.150` a otro cliente.

Una posibilidad es indicarle al servidor que esa dirección **no debe asignarse dinámicamente**.

Esto nos lleva al siguiente concepto de la unidad:

> **las exclusiones DHCP**.

## 1️⃣3️⃣ Resumen

| Concepto | Significado |
|---|---|
| Ámbito / scope | Configuración DHCP correspondiente a una subred |
| Subred | Red IP a la que pertenece el ámbito |
| Pool | Conjunto de direcciones disponibles para asignación |
| Dirección inicial | Primera dirección del rango |
| Dirección final | Última dirección del rango |
| Máscara/prefijo | Define la subred del ámbito |
| Concesión | Asignación temporal de una dirección del pool |

Antes de configurar un ámbito debemos responder:

```text
¿Qué subred voy a configurar?
        ↓
¿Cuáles son sus hosts válidos?
        ↓
¿Qué direcciones utilizaré para infraestructura?
        ↓
¿Qué rango podrá entregar DHCP?
```

En el siguiente apartado veremos las **exclusiones**, que nos permiten impedir que determinadas direcciones sean entregadas automáticamente por el servidor DHCP.
