---
sidebar_position: 8
title: "1.7. Opciones DHCP"
---

# 1.7. Opciones DHCP

Hasta ahora hemos hablado principalmente de la **dirección IP** que un servidor DHCP entrega a un cliente.

Sin embargo, para que un equipo pueda comunicarse correctamente en una red no suele ser suficiente con conocer únicamente su dirección IP.

Un cliente también puede necesitar otros parámetros, como:

- la máscara de red;
- la puerta de enlace predeterminada;
- los servidores DNS;
- el nombre de dominio, cuando resulte necesario.

DHCP puede proporcionar automáticamente estos datos mediante las **opciones DHCP**.

## 1️⃣ DHCP proporciona más que una dirección IP

Supongamos que un cliente recibe:

```text
IP: 192.168.10.105
```

La dirección pertenece correctamente a su red, pero todavía necesitamos responder a varias preguntas:

```text
¿Qué máscara debe utilizar?
¿Cómo puede llegar a otras redes?
¿Qué servidor DNS debe consultar?
```

El servidor DHCP puede proporcionar esta información junto con la dirección IP.

Por ejemplo:

```text
IP:       192.168.10.105
Máscara:  255.255.255.0
Gateway:  192.168.10.1
DNS:      192.168.10.10
```

:::info[Idea clave]

DHCP no sirve únicamente para **asignar direcciones IP**.

También puede entregar a los clientes otros parámetros necesarios para utilizar correctamente la red.

:::

## 2️⃣ Máscara de red

La **máscara de red** permite al equipo determinar qué parte de una dirección identifica la red y qué parte identifica al host.

Por ejemplo:

```text
IP:       192.168.10.105
Máscara:  255.255.255.0
```

equivale a:

```text
192.168.10.105/24
```

El cliente puede determinar que pertenece a:

```text
192.168.10.0/24
```

y que puede comunicarse directamente con otros equipos de esa misma subred.

:::tip[Conexión con la UT0]

La máscara sigue teniendo exactamente la misma función que cuando configurábamos manualmente una interfaz.

La diferencia es **cómo obtiene el cliente ese valor**: ahora puede recibirlo automáticamente mediante DHCP.

:::

## 3️⃣ Puerta de enlace predeterminada

La **puerta de enlace predeterminada** o **default gateway** es el dispositivo al que un equipo envía el tráfico destinado a otras redes.

Normalmente será una interfaz de un router.

Ejemplo:

```text
Cliente:
192.168.10.105/24

Gateway:
192.168.10.1
```

Podemos representarlo así:

```text
PC
192.168.10.105
      │
      │ red 192.168.10.0/24
      │
Router
192.168.10.1
      │
      ▼
 Otras redes
```

Si el cliente necesita comunicarse con una dirección que no pertenece a su propia red, utilizará la puerta de enlace.

## 4️⃣ ¿Qué ocurre si el gateway es incorrecto?

Un cliente puede recibir correctamente una dirección IP y, aun así, tener problemas de comunicación.

Por ejemplo:

```text
IP:       192.168.10.105
Máscara:  255.255.255.0
Gateway:  192.168.10.250   ← incorrecto
```

El equipo podría comunicarse con otros dispositivos de:

```text
192.168.10.0/24
```

pero tendría problemas para alcanzar otras redes.

Esto nos lleva a una idea importante para el diagnóstico:

:::warning[Tener IP no significa que toda la red funcione]

Un cliente puede obtener una dirección mediante DHCP correctamente y tener, al mismo tiempo, una **puerta de enlace incorrecta**.

Por tanto, comprobar únicamente la dirección IP no es suficiente.

:::

## 5️⃣ Servidores DNS

El **DNS (Domain Name System)** permite resolver nombres en direcciones IP.

Por ejemplo, cuando utilizamos un nombre como:

```text
www.ejemplo.com
```

el equipo necesita averiguar qué dirección IP corresponde a ese nombre.

Para ello consulta un servidor DNS.

DHCP puede proporcionar al cliente la dirección de uno o varios servidores DNS.

Ejemplo:

```text
DNS: 192.168.10.10
```

o:

```text
DNS preferido:    192.168.10.10
DNS alternativo:  192.168.10.11
```

## 6️⃣ ¿Qué ocurre si el DNS es incorrecto?

Imaginemos:

```text
IP:       192.168.10.105
Máscara:  255.255.255.0
Gateway:  192.168.10.1
DNS:      192.168.10.200   ← servidor DNS inexistente
```

El cliente podría:

- comunicarse con otros equipos por dirección IP;
- llegar a otras redes si el gateway funciona;
- pero tener problemas para acceder a servicios utilizando nombres.

Por ejemplo, podría ocurrir que:

```text
ping 8.8.8.8
```

funcione, mientras una operación que necesite resolver un nombre falle.

:::info[Diagnóstico]

Si existe conectividad por dirección IP pero fallan los nombres, debemos investigar el **DNS**.

No debemos concluir automáticamente que DHCP no funciona.

DHCP puede haber entregado una configuración, pero alguno de sus parámetros puede ser incorrecto.

:::

## 7️⃣ Nombre de dominio

DHCP también puede proporcionar información relacionada con el **nombre de dominio** utilizado por los clientes.

Por ejemplo:

```text
aula.local
```

Este parámetro resulta especialmente útil en determinados entornos administrados.

En nuestro laboratorio lo utilizaremos cuando sea necesario para la configuración que estemos realizando.

## 8️⃣ Opciones DHCP

Los distintos parámetros adicionales que DHCP puede proporcionar se conocen como **opciones DHCP**.

Entre las más habituales encontraremos:

| Parámetro proporcionado | Función |
|---|---|
| Máscara | Determina la subred del cliente |
| Gateway | Permite alcanzar otras redes |
| DNS | Permite resolver nombres |
| Nombre de dominio | Proporciona información del dominio utilizado |

Cuando configuremos el servidor veremos que algunas de estas opciones aparecen identificadas mediante números.

Dos especialmente importantes son:

```text
003 → Router / puerta de enlace
006 → Servidores DNS
```

No es necesario memorizar una larga lista de números, pero sí reconocer las opciones principales que configuraremos en el laboratorio.

## 9️⃣ Ejemplo de configuración completa

Supongamos que administramos:

```text
Red: 192.168.50.0/24
```

Hemos decidido:

```text
Router:        192.168.50.1
Servidor DNS:  192.168.50.10
Rango DHCP:    192.168.50.100 - 192.168.50.200
```

Un cliente podría recibir:

```text
Dirección IP:  192.168.50.105
Máscara:       255.255.255.0
Gateway:       192.168.50.1
DNS:           192.168.50.10
```

Cada parámetro tiene una función diferente:

```text
192.168.50.105
       │
       └── identifica al cliente

255.255.255.0
       │
       └── determina su subred

192.168.50.1
       │
       └── permite alcanzar otras redes

192.168.50.10
       │
       └── permite resolver nombres
```

## 🔟 ¿Puede DHCP funcionar y el cliente no tener Internet?

Sí.

Esta es una pregunta importante.

Un cliente puede haber completado correctamente el proceso DHCP y haber recibido una dirección válida, pero eso **no garantiza por sí solo el acceso a Internet**.

Por ejemplo:

```text
DHCP funciona
     │
     ├── IP correcta
     ├── máscara correcta
     ├── gateway incorrecto ──────> problemas hacia otras redes
     │
     └── DNS incorrecto ──────────> problemas de resolución de nombres
```

También podrían existir otros problemas ajenos al propio DHCP.

:::warning[Idea de diagnóstico]

No debemos preguntar únicamente:

> «¿Ha recibido una IP?»

Debemos comprobar:

> «¿Qué configuración completa ha recibido y es correcta para esta red?»

:::

## 1️⃣1️⃣ ¿Dónde configuraremos estas opciones?

Cuando instalemos el servicio DHCP en **Windows Server**, crearemos un ámbito y configuraremos las opciones necesarias.

Conceptualmente tendremos:

```text
ÁMBITO
192.168.10.0/24
       │
       ├── Rango de direcciones
       ├── Exclusiones
       ├── Duración de concesión
       │
       └── Opciones
              ├── Gateway
              ├── DNS
              └── Nombre de dominio, si procede
```

Después, los clientes podrán obtener automáticamente estos valores.

## 1️⃣2️⃣ ¿Cómo comprobaremos las opciones en Windows?

Desde el cliente utilizaremos:

```cmd
ipconfig /all
```

Este comando nos permitirá observar, entre otros datos:

- si DHCP está habilitado;
- dirección IPv4;
- máscara;
- puerta de enlace;
- servidor DHCP;
- servidores DNS;
- información de la concesión.

No nos limitaremos a comprobar que aparecen valores. Tendremos que verificar que **coinciden con el diseño de nuestra red**.

## 1️⃣3️⃣ Diagnóstico paso a paso

Supongamos que un usuario dice:

> «El ordenador tiene red, pero no puedo navegar».

No debemos cambiar configuraciones al azar.

Podemos razonar de forma progresiva.

### 🟩 Paso 1. Comprobar la configuración

```cmd
ipconfig /all
```

### 🟧 Paso 2. Revisar IP y máscara

¿La dirección pertenece a la subred correcta?

### 🟥 Paso 3. Revisar el gateway

¿La puerta de enlace recibida es la correcta?

### 🟪 Paso 4. Revisar DNS

¿El cliente tiene configurado un servidor DNS adecuado?

### 🟦 Paso 5. Realizar pruebas

Podremos realizar pruebas de conectividad y resolución de nombres para localizar el problema.

:::tip[Metodología]

En esta unidad seguiremos siempre una idea:

**configurar → comprobar → interpretar → diagnosticar**

No basta con conseguir que algo funcione. Debemos entender por qué funciona y saber localizar el problema cuando deja de hacerlo.

:::

## 1️⃣4️⃣ Ejemplo de diagnóstico

Un cliente muestra:

```text
IPv4:     192.168.20.120
Máscara:  255.255.255.0
Gateway:  192.168.20.1
DNS:      192.168.30.10
```

La red del cliente es:

```text
192.168.20.0/24
```

Antes de modificar nada deberíamos preguntarnos:

1. ¿La IP pertenece a la red correcta?
2. ¿La máscara es adecuada?
3. ¿El gateway pertenece a la red del cliente?
4. ¿El DNS indicado es realmente el servidor que debe utilizar?
5. ¿Qué prueba podríamos hacer para saber si el problema está en la conectividad o en la resolución de nombres?

Este tipo de razonamiento será fundamental en las prácticas posteriores.

## 1️⃣5️⃣ Resumen

DHCP puede proporcionar más información que una dirección IP.

| Parámetro | Para qué sirve |
|---|---|
| IP | Identifica al cliente |
| Máscara | Determina su subred |
| Gateway | Permite comunicarse con otras redes |
| DNS | Permite resolver nombres |
| Nombre de dominio | Proporciona información de dominio cuando procede |

Debemos recordar especialmente:

```text
IP correcta ≠ configuración completa correcta
```

Un cliente puede recibir una dirección válida y tener problemas debido a una opción DHCP mal configurada.

Con esto ya conocemos los principales elementos conceptuales necesarios para comenzar a configurar el servicio:

```text
Ámbito
   ├── rango
   ├── concesiones
   ├── exclusiones
   ├── reservas
   └── opciones DHCP
```

En el siguiente apartado comenzaremos a llevar estos conceptos al laboratorio mediante la **instalación y configuración del servicio DHCP en Windows Server**.
