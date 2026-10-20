---
sidebar_position: 1
title: Introducción y funcionamiento de DNS
description: Resolución de nombres, jerarquía DNS, consultas y caché.
---

# Introducción y funcionamiento de DNS

El **DNS (Domain Name System)** permite localizar equipos y servicios mediante nombres en lugar de memorizar direcciones IP. Por ejemplo, convierte `www.ejemplo.com` en una dirección IP que el equipo puede utilizar para comunicarse.

## 1️⃣ ¿Por qué necesitamos DNS?

Los equipos se comunican utilizando direcciones IP, pero para las personas es más sencillo recordar nombres. DNS permite relacionar ambos datos y facilita que un servicio cambie de dirección sin que sus usuarios tengan que aprender una nueva.

| Sin DNS | Con DNS |
|---|---|
| Acceder a un servidor mediante su IP | Acceder mediante `intranet.empresa.test` |
| Recordar direcciones de varios servicios | Recordar nombres descriptivos |
| Actualizar manualmente las referencias a una IP | Modificar el registro DNS correspondiente |

:::info[DNS no sustituye a la conectividad]
Resolver un nombre no garantiza que el servidor esté disponible. Primero se obtiene su dirección IP; después se establece la comunicación con el servicio correspondiente.
:::

## 2️⃣ Mecanismos de resolución de nombres

| Mecanismo | Características | Uso habitual |
|---|---|---|
| Archivo `hosts` | Relación local y manual entre nombres e IP | Pruebas y entradas específicas |
| DNS | Servicio distribuido y jerárquico | Redes empresariales e Internet |
| mDNS | Resolución local mediante multidifusión, sin servidor DNS central | Descubrimiento en redes locales |

En Windows, el archivo `hosts` se encuentra habitualmente en `C:\Windows\System32\drivers\etc\hosts`.

Ejemplo de entrada:

```text
192.168.10.20   intranet.empresa.test
```

El archivo `hosts` no se actualiza automáticamente en los demás equipos. Por eso, para redes con varios clientes y servicios, se utiliza un servidor DNS.

## 3️⃣ Estructura jerárquica de DNS

DNS organiza los nombres en una estructura de árbol, desde la **raíz** hasta los equipos o servicios concretos.

```text
.                         Raíz
└── com                   Dominio de nivel superior (TLD)
    └── ejemplo           Dominio
        └── www           Nombre de host o servicio
```

**`www.ejemplo.com`** es un **FQDN (Fully Qualified Domain Name)**: identifica un nombre dentro de la jerarquía DNS. Su representación absoluta termina en un punto (`www.ejemplo.com.`), aunque normalmente se omite al escribirlo.

| Concepto | Significado |
|---|---|
| Dominio | Parte del espacio de nombres DNS, como `empresa.test` |
| Subdominio | Nombre situado bajo otro dominio, como `ventas.empresa.test` |
| Zona DNS | Parte del espacio de nombres administrada mediante un conjunto de datos DNS |
| Servidor autoritativo | Servidor que responde con autoridad sobre los datos de una zona |

Un **dominio** y una **zona** no son necesariamente lo mismo: un dominio puede dividirse en varias zonas delegadas.

## 4️⃣ ¿Cómo se resuelve un nombre?

Cuando un usuario escribe una dirección web, su equipo necesita obtener la IP asociada al nombre.

```text
Cliente → Servidor DNS configurado → Respuesta con IP → Conexión al servidor web
```

Si el servidor DNS no conoce la respuesta, puede consultar otros servidores o reenviar la petición, según su configuración.

| Tipo de consulta | Funcionamiento |
|---|---|
| Recursiva | El cliente solicita una respuesta final o un error al servidor DNS |
| Iterativa | Un servidor puede responder con la información disponible o indicar otros servidores a los que consultar |

En Internet intervienen servidores **raíz**, de **dominios de nivel superior (TLD)** y **autoritativos**. El cliente normalmente consulta a un resolvedor DNS, que realiza las consultas necesarias.

## 5️⃣ Caché DNS y TTL

Los servidores DNS y los equipos pueden almacenar temporalmente respuestas para evitar repetir consultas.

- **Caché:** almacenamiento temporal de respuestas DNS.
- **TTL (Time To Live):** tiempo, expresado en segundos, durante el que una respuesta puede conservarse en caché.
- **Ventaja:** disminuye el número de consultas y acelera las resoluciones repetidas.
- **Consecuencia:** tras cambiar un registro, algunos clientes pueden seguir recibiendo el valor anterior hasta que expire su caché.

:::tip[Ejemplo]
Si un registro tiene un TTL de `300`, una respuesta almacenada puede reutilizarse durante un máximo inicial de **5 minutos**. El tiempo restante disminuye mientras permanece en caché.
:::

## 6️⃣ Primera comprobación

En Windows, abre una terminal y ejecuta:

```powershell
nslookup www.example.com
```

La salida permite identificar el servidor DNS consultado y la respuesta obtenida. Las direcciones devueltas pueden variar.

También puedes comprobar la configuración DNS del equipo:

```powershell
ipconfig /all
```

Fíjate en la línea **Servidores DNS**: indica a qué servidor o servidores enviará el equipo sus consultas.

:::info[En el laboratorio]
En las siguientes prácticas configuraremos un servidor DNS propio en Windows Server y comprobaremos su funcionamiento desde `SER-Cliente`.
:::
