---
sidebar_position: 6
title: "1.5. Exclusiones DHCP"
---

# 1.5. Exclusiones DHCP

En el apartado anterior hemos visto que un **ámbito DHCP** define la subred y el conjunto de direcciones que el servidor puede utilizar para realizar concesiones.

Por ejemplo:

```text
Red:          192.168.10.0/24
Rango DHCP:   192.168.10.100 - 192.168.10.200
```

Pero puede ocurrir que dentro de ese rango existan direcciones que **no queremos que el servidor entregue automáticamente**.

Para resolver este problema utilizamos las **exclusiones DHCP**.

## 1️⃣ ¿Qué es una exclusión DHCP?

Una **exclusión** es una dirección IP, o un conjunto de direcciones, que pertenece al rango definido en el ámbito pero que el servidor DHCP **no debe asignar a los clientes**.

Por ejemplo:

```text
Rango DHCP:
192.168.10.100 - 192.168.10.200

Exclusión:
192.168.10.150
```

Aunque `192.168.10.150` se encuentra dentro del rango, el servidor no la utilizará para realizar una concesión.

:::info[Idea clave]

Una exclusión permite decirle al servidor:

> «Esta dirección pertenece al rango, pero no debes entregarla automáticamente».

:::

## 2️⃣ ¿Por qué necesitamos exclusiones?

En una red no todos los dispositivos tienen que obtener su dirección mediante DHCP.

Algunos equipos pueden necesitar una dirección conocida y configurada manualmente.

Por ejemplo:

- routers;
- servidores;
- impresoras de red;
- puntos de acceso;
- otros dispositivos de infraestructura.

Supongamos que una impresora tiene configurada manualmente:

```text
192.168.10.150
```

y nuestro servidor DHCP utiliza:

```text
192.168.10.100 - 192.168.10.200
```

La dirección de la impresora se encuentra dentro del rango DHCP.

Si no hacemos nada, podríamos tener un problema.

## 3️⃣ ¿Qué problema queremos evitar?

Imaginemos esta situación:

```text
IMPRESORA
IP configurada manualmente:
192.168.10.150
```

El servidor DHCP no sabe necesariamente que esa dirección está siendo utilizada de forma estática.

Si considera `192.168.10.150` disponible, podría intentar concedérsela a un cliente.

Tendríamos:

```text
Impresora  ──────> 192.168.10.150
PC cliente ──────> 192.168.10.150
```

Dos dispositivos estarían intentando utilizar la misma dirección IP.

Esto produce un **conflicto de direcciones IP**.

:::warning[Conflicto de IP]

En una misma red, dos dispositivos no deben utilizar simultáneamente la misma dirección IPv4.

Las exclusiones ayudan a evitar que DHCP entregue direcciones que hemos destinado a dispositivos configurados manualmente.

:::

## 4️⃣ Excluir una dirección

Podemos excluir una única dirección.

Ejemplo:

```text
Ámbito:
192.168.10.100 - 192.168.10.200

Dirección excluida:
192.168.10.150
```

El servidor podrá entregar:

```text
192.168.10.100
192.168.10.101
...
192.168.10.149

192.168.10.150  ← EXCLUIDA

192.168.10.151
...
192.168.10.200
```

La dirección continúa perteneciendo a la subred, pero queda fuera de las asignaciones automáticas del servidor.

## 5️⃣ Excluir un intervalo de direcciones

También podemos excluir varias direcciones consecutivas.

Por ejemplo:

```text
Rango DHCP:
192.168.10.100 - 192.168.10.200

Exclusión:
192.168.10.140 - 192.168.10.159
```

Podríamos haber reservado ese bloque para impresoras u otros dispositivos administrados manualmente.

El resultado sería:

```text
192.168.10.100 ───────── 192.168.10.139
        DHCP puede asignarlas

192.168.10.140 ───────── 192.168.10.159
             EXCLUIDAS

192.168.10.160 ───────── 192.168.10.200
        DHCP puede asignarlas
```

:::tip[Planificar facilita la administración]

Podemos organizar el direccionamiento por zonas.

Por ejemplo:

```text
192.168.10.1 - 192.168.10.20       Infraestructura
192.168.10.21 - 192.168.10.50      Servidores e impresoras
192.168.10.100 - 192.168.10.200    Clientes DHCP
```

Una planificación clara facilita posteriormente la configuración y el diagnóstico de la red.

:::

## 6️⃣ Rango y exclusión no son lo mismo

Es importante diferenciar ambos conceptos.

### 🟩 Rango DHCP

Indica el intervalo de direcciones definido para la asignación dinámica.

Por ejemplo:

```text
192.168.10.100 - 192.168.10.200
```

### 🟧 Exclusión

Indica una parte de ese rango que DHCP no debe entregar.

Por ejemplo:

```text
192.168.10.140 - 192.168.10.159
```

Podemos representarlo así:

```text
RANGO DHCP
100 ─────────────────────────────────────────────── 200
                     │
                     │
              140 ─────── 159
                 EXCLUSIÓN
```

Por tanto:

```text
Rango
  └── direcciones que forman parte del pool configurado
       └── exclusiones
            └── direcciones que DHCP no debe conceder
```

## 7️⃣ ¿Es necesario excluir direcciones que están fuera del rango?

No.

Supongamos:

```text
Rango DHCP:
192.168.10.100 - 192.168.10.200
```

y el router utiliza:

```text
192.168.10.1
```

`192.168.10.1` ya está **fuera del rango DHCP**, por lo que el servidor no la va a entregar como parte de ese rango.

No necesitamos excluirla de un intervalo en el que nunca estuvo incluida.

:::info[Piensa antes de configurar]

Antes de crear exclusiones debemos preguntarnos:

> **¿Esta dirección está realmente dentro del rango que DHCP puede entregar?**

Si está fuera, no necesita una exclusión dentro de ese rango.

:::

## 8️⃣ Ejemplo completo

Tenemos la red:

```text
192.168.50.0/24
```

Y configuramos:

```text
Rango DHCP:
192.168.50.50 - 192.168.50.200
```

En la red existen estos dispositivos:

| Dispositivo | Dirección |
|---|---|
| Router | `192.168.50.1` |
| Servidor | `192.168.50.10` |
| Impresora 1 | `192.168.50.60` |
| Impresora 2 | `192.168.50.61` |

Analicemos cada caso.

### 🟩 Router

```text
192.168.50.1
```

Está fuera del rango DHCP.

No es necesario excluirlo.

### 🟧 Servidor

```text
192.168.50.10
```

También está fuera del rango DHCP.

No es necesario excluirlo.

### 🟥 Impresoras

```text
192.168.50.60
192.168.50.61
```

Estas direcciones sí están dentro del rango:

```text
192.168.50.50 - 192.168.50.200
```

Si están configuradas manualmente, debemos impedir que DHCP las entregue.

Podemos crear la exclusión:

```text
192.168.50.60 - 192.168.50.61
```

## 9️⃣ Una alternativa: diseñar mejor el rango

En muchos casos podemos evitar exclusiones innecesarias diseñando el rango DHCP desde el principio.

Por ejemplo, si sabemos que queremos reservar las primeras direcciones para infraestructura:

```text
Red: 192.168.50.0/24

Infraestructura:
192.168.50.1 - 192.168.50.49

Clientes DHCP:
192.168.50.100 - 192.168.50.200
```

Así los dispositivos estáticos quedan fuera del rango DHCP.

Sin embargo, las exclusiones siguen siendo útiles cuando necesitamos dejar fuera una o varias direcciones que se encuentran dentro del rango configurado.

:::tip[Buena práctica]

Siempre que sea posible, conviene **planificar el direccionamiento antes de configurar DHCP**.

Las exclusiones son una herramienta de administración, pero no sustituyen a un buen diseño de la red.

:::

## 🔟 Exclusión y concesión

Una dirección excluida no debe formar parte de las direcciones que el servidor ofrece normalmente a los clientes.

Por tanto:

```text
Ámbito
   │
   ├── Rango configurado
   │      │
   │      ├── Direcciones disponibles ──> pueden generar concesiones
   │      │
   │      └── Direcciones excluidas ────> no se entregan
   │
   └── Parámetros del ámbito
```

Esto conecta directamente con los conceptos anteriores:

```text
SUBRED
   ↓
ÁMBITO
   ↓
RANGO
   ↓
EXCLUSIONES
   ↓
DIRECCIONES DISPONIBLES
   ↓
CONCESIONES
```

## 1️⃣1️⃣ ¿Dónde lo veremos en Windows Server?

Cuando configuremos nuestro ámbito en **SER-Servidor**, Windows Server nos permitirá definir un **rango de exclusión**.

Podremos comprobar después que los clientes reciben direcciones del ámbito, pero no las que hemos excluido.

Por ejemplo:

```text
Ámbito:
192.168.10.100 - 192.168.10.150

Exclusión:
192.168.10.110 - 192.168.10.119
```

Esperaremos que ningún cliente reciba automáticamente una dirección comprendida entre:

```text
192.168.10.110
        y
192.168.10.119
```

La práctica no consistirá solo en configurarlo: tendremos que **comprobar que el servidor respeta la exclusión**.

## 1️⃣2️⃣ Exclusión y reserva: no son lo mismo

Hay otro concepto que puede parecer similar, pero tiene una finalidad diferente: la **reserva DHCP**.

De momento podemos distinguirlos así:

| Exclusión | Reserva |
|---|---|
| DHCP no entrega esa dirección como concesión dinámica normal | DHCP asigna una dirección concreta a un cliente determinado |
| Puede proteger direcciones configuradas manualmente | El dispositivo sigue utilizando DHCP |
| Impide utilizar una dirección dentro del pool dinámico | Relaciona un cliente con una dirección concreta |

:::warning[No confundas exclusión y reserva]

**Excluir** significa:

> «No entregues esta dirección dentro de las asignaciones dinámicas normales».

**Reservar** significa:

> «Cuando se conecte este cliente concreto, asígnale esta dirección».

En el siguiente apartado estudiaremos las reservas con detalle.

:::

## 1️⃣3️⃣ Comprueba que lo has entendido

Tenemos:

```text
Red:        192.168.20.0/24
Rango DHCP: 192.168.20.50 - 192.168.20.150
```

Y estos dispositivos:

```text
Router:       192.168.20.1
Servidor:     192.168.20.10
Impresora A:  192.168.20.60
Impresora B:  192.168.20.61
```

Piensa:

1. ¿Qué dispositivos tienen direcciones dentro del rango DHCP?
2. ¿Qué direcciones podrían necesitar una exclusión?
3. ¿Es necesario excluir `192.168.20.1`?
4. ¿Qué problema podríamos tener si `192.168.20.60` está configurada manualmente y DHCP también puede entregarla?

## 1️⃣4️⃣ Resumen

| Concepto | Significado |
|---|---|
| Rango DHCP | Intervalo de direcciones configurado para asignación dinámica |
| Exclusión | Dirección o intervalo del rango que DHCP no debe entregar |
| Dirección estática | Dirección configurada manualmente en un dispositivo |
| Conflicto IP | Dos dispositivos utilizan la misma dirección |
| Planificación | Organización previa del espacio de direccionamiento |

La pregunta fundamental antes de crear una exclusión es:

> **¿Existe alguna dirección dentro del rango DHCP que no deba ser entregada automáticamente?**

En el siguiente apartado estudiaremos las **reservas DHCP**, que nos permitirán conseguir algo diferente: que un cliente utilice DHCP pero reciba siempre una dirección determinada.
