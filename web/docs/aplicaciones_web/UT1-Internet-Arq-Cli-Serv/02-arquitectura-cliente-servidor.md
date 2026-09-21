---
sidebar_position: 2
title: Arquitectura cliente-servidor
---

# Arquitectura cliente-servidor

Cuando utilizamos una página web, consultamos el correo electrónico o accedemos a una aplicación online, normalmente estamos utilizando una **arquitectura cliente-servidor**.

En este modelo, dos sistemas se comunican a través de una red: uno **solicita un servicio** y otro **lo proporciona**.

> En esta unidad utilizaremos principalmente ejemplos relacionados con la Web, ya que posteriormente trabajaremos con **HTML, CSS y JavaScript**.

## 1️⃣ ¿Qué es la arquitectura cliente-servidor?

La arquitectura **cliente-servidor** es un modelo de comunicación en el que intervienen principalmente dos elementos:

- **Cliente:** solicita información o servicios.
- **Servidor:** recibe las solicitudes, las procesa y devuelve una respuesta.

Podemos representarlo de forma sencilla:

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut1/cliente-servidor-peticion-respuesta.png"
  alt="Esquema de comunicación cliente-servidor mediante petición y respuesta"
  className="unit-hero"
/>

Por ejemplo, cuando escribimos una dirección web en el navegador:

1. El navegador solicita una página.
2. La petición viaja por la red.
3. El servidor web recibe la petición.
4. El servidor localiza o genera el contenido solicitado.
5. El servidor envía una respuesta.
6. El navegador interpreta el contenido y lo muestra al usuario.

:::info[Idea clave]
El **cliente inicia normalmente la comunicación** solicitando un recurso o servicio. El **servidor permanece preparado para atender peticiones** de uno o varios clientes.
:::

### 🟩 Un ejemplo cotidiano: visitar una web

Supongamos que queremos acceder a:

```text
https://www.ejemplo.com
```

En este caso:

| Elemento | Ejemplo |
|---|---|
| Cliente | Navegador web |
| Servidor | Servidor donde está alojada la web |
| Red | Internet |
| Petición | Solicitud de una página o recurso |
| Respuesta | HTML, CSS, imágenes, datos, etc. |
| Protocolo | HTTP o HTTPS |

El usuario no necesita conocer dónde está físicamente el servidor. Solo necesita utilizar una dirección que permita localizar el servicio.

## 2️⃣ El cliente

El **cliente** es el programa o dispositivo que solicita un servicio a un servidor.

En Aplicaciones Web, nuestro cliente principal será el **navegador web**.

Algunos navegadores son:

- Google Chrome.
- Mozilla Firefox.
- Microsoft Edge.
- Safari.

### 🟧 ¿Qué hace un navegador?

Un navegador puede realizar, entre otras, las siguientes tareas:

- Solicitar páginas y recursos a servidores web.
- Recibir documentos HTML.
- Interpretar el código HTML.
- Aplicar los estilos CSS.
- Ejecutar código JavaScript.
- Mostrar imágenes, vídeos y otros recursos.
- Permitir la interacción del usuario con la aplicación.

Más adelante veremos que estas tres tecnologías tienen funciones diferentes:

| Tecnología | Función principal |
|---|---|
| **HTML** | Define la estructura y el contenido |
| **CSS** | Define la presentación y el diseño |
| **JavaScript** | Añade comportamiento e interactividad |

:::tip[Relación con las próximas unidades]
Cuando creemos nuestras primeras páginas con HTML y CSS, el navegador actuará como **cliente** y será el encargado de interpretar esos archivos y representarlos en pantalla.
:::

### 🟥 El cliente no tiene que ser siempre un navegador

Aunque en este módulo utilizaremos principalmente navegadores, existen muchos otros tipos de clientes.

Por ejemplo:

- Una aplicación de correo electrónico.
- Una aplicación móvil.
- Un programa que consulta una API.
- Un cliente FTP.
- Un equipo que solicita una dirección IP a un servidor DHCP.

Por tanto, **cliente** no significa necesariamente "ordenador del usuario". Se refiere al papel que desempeña un programa o sistema dentro de una comunicación.

## 3️⃣ El servidor

Un **servidor** es un sistema que proporciona servicios o recursos a otros equipos o programas de la red.

Puede tratarse de:

- Un ordenador físico.
- Una máquina virtual.
- Un servidor situado en un centro de datos.
- Una instancia en la nube.
- Un programa que ofrece un determinado servicio.

:::warning[Importante]
En informática, la palabra **servidor** puede referirse tanto al equipo que presta el servicio como al software que está ejecutándose en él. El contexto nos permite distinguir ambos significados.
:::

### 🟪 ¿Qué hace un servidor web?

Un **servidor web** recibe peticiones HTTP o HTTPS y devuelve los recursos correspondientes.

Puede entregar, por ejemplo:

```text
index.html
estilos.css
app.js
logo.png
```

También puede ejecutar aplicaciones que generen contenido dinámicamente antes de enviar la respuesta al cliente.

Algunos servidores web conocidos son:

- Apache HTTP Server.
- Nginx.
- Microsoft Internet Information Services (IIS).

### 🟦 Un servidor puede atender a muchos clientes

Una de las características fundamentales del modelo cliente-servidor es que un mismo servidor puede proporcionar servicios a múltiples clientes.

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut1/servidor-multiples-clientes.png"
  alt="Un servidor atendiendo peticiones de varios clientes"
  className="unit-hero"
/>

Por ejemplo, cientos o miles de personas pueden visitar simultáneamente una misma página web.

El servidor debe gestionar las distintas peticiones y devolver a cada cliente la respuesta correspondiente.

## 4️⃣ Peticiones y respuestas

La comunicación cliente-servidor se basa normalmente en un mecanismo de **petición-respuesta**.

El cliente realiza una petición y el servidor devuelve una respuesta.

### 🟩 Petición

Una petición indica al servidor qué recurso o acción necesita el cliente.

Por ejemplo:

```text
Quiero obtener la página productos.html
```

En una aplicación web real, la petición contiene más información, como:

- El recurso solicitado.
- El método utilizado.
- La versión del protocolo.
- Cabeceras.
- En determinados casos, datos enviados por el usuario.

### 🟧 Respuesta

El servidor procesa la petición y devuelve una respuesta.

La respuesta puede contener:

- Un documento HTML.
- Una imagen.
- Un archivo CSS.
- Un archivo JavaScript.
- Datos en formato JSON.
- Un mensaje de error.

Además, incluye un **código de estado** que informa sobre el resultado de la petición.

Algunos códigos habituales son:

| Código | Significado |
|---:|---|
| `200` | Solicitud procesada correctamente |
| `301` / `302` | Redirección |
| `403` | Acceso prohibido |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |

:::info[Ejemplo]
El conocido error **404 Not Found** aparece cuando el servidor ha recibido la petición, pero no encuentra el recurso solicitado.
:::

## 5️⃣ HTTP y HTTPS

Para que cliente y servidor puedan comunicarse necesitan seguir unas reglas comunes. Estas reglas se definen mediante **protocolos**.

En la Web utilizamos principalmente:

- **HTTP**: HyperText Transfer Protocol.
- **HTTPS**: HyperText Transfer Protocol Secure.

### 🟥 HTTP

**HTTP** es el protocolo utilizado para intercambiar información entre clientes y servidores web.

Su funcionamiento básico sigue el esquema:

```text
Petición HTTP
      ↓
Servidor web
      ↓
Respuesta HTTP
```

HTTP utiliza habitualmente el puerto **80**.

### 🟪 HTTPS

**HTTPS** es la versión segura de HTTP.

La comunicación entre cliente y servidor se protege mediante cifrado utilizando **TLS**.

HTTPS permite:

- Cifrar la información transmitida.
- Reducir el riesgo de que terceros puedan leer los datos durante la transmisión.
- Verificar la identidad del servidor mediante certificados digitales.
- Proteger la integridad de la comunicación.

HTTPS utiliza habitualmente el puerto **443**.

:::warning[No confundir]
Que una web utilice **HTTPS** significa que la comunicación está protegida durante el transporte. No significa automáticamente que la página sea legítima, fiable o esté libre de contenido malicioso.
:::

## 6️⃣ ¿Qué ocurre cuando escribimos una URL?

Una **URL** (*Uniform Resource Locator*) permite indicar la localización de un recurso.

Por ejemplo:

```text
https://www.ejemplo.com/productos/index.html
```

Podemos identificar varias partes:

```text
https:// www.ejemplo.com /productos/index.html
  │             │                  │
protocolo     servidor            recurso
```

### 🟦 Proceso simplificado

Cuando introducimos una URL en el navegador ocurren varios pasos.

#### 1. El usuario introduce la URL

Por ejemplo:

```text
https://www.ejemplo.com
```

#### 2. Se localiza el servidor

Los equipos se comunican utilizando direcciones IP.

El sistema **DNS** permite obtener la dirección IP asociada al nombre de dominio.

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut1/proceso-url-navegador-servidor.png"
  alt="Proceso desde que se escribe una URL hasta que el navegador recibe y muestra la página web"
  className="unit-hero"
/>

#### 3. Se establece la comunicación

El cliente inicia la comunicación con el servidor correspondiente.

Si utilizamos HTTPS, se establece además una comunicación protegida mediante TLS.

#### 4. El navegador envía la petición

El navegador solicita el recurso necesario.

#### 5. El servidor procesa la petición

El servidor web determina qué debe devolver.

#### 6. El servidor envía la respuesta

La respuesta puede incluir inicialmente un documento HTML.

#### 7. El navegador interpreta el HTML

Al analizarlo puede descubrir que necesita otros archivos:

```html
<link rel="stylesheet" href="estilos.css">
<script src="app.js"></script>
<img src="logo.png" alt="Logotipo">
```

El navegador realiza nuevas peticiones para obtener estos recursos.

#### 8. Se muestra la página

Finalmente, el navegador combina el HTML, el CSS, las imágenes y, cuando corresponda, JavaScript para presentar la página al usuario.

:::tip[Recuerda]
Una página web aparentemente sencilla puede provocar **varias peticiones al servidor**: una para el HTML y otras para las hojas de estilo, scripts, imágenes, fuentes u otros recursos.
:::

## 7️⃣ Frontend y backend

En las aplicaciones web modernas es habitual distinguir entre **frontend** y **backend**.

### 🟩 Frontend

El **frontend** es la parte de la aplicación que se ejecuta principalmente en el cliente y con la que interactúa el usuario.

En nuestro módulo trabajaremos especialmente con:

```text
HTML + CSS + JavaScript
```

Ejemplos de tareas del frontend:

- Mostrar textos e imágenes.
- Crear menús.
- Diseñar formularios.
- Aplicar estilos.
- Validar algunos datos introducidos.
- Reaccionar a clics y otras acciones del usuario.

### 🟧 Backend

El **backend** es la parte que se ejecuta en el servidor.

Puede encargarse de:

- Procesar datos.
- Aplicar reglas de negocio.
- Consultar bases de datos.
- Gestionar usuarios.
- Comprobar permisos.
- Generar respuestas.
- Proporcionar datos al frontend mediante una API.

Una arquitectura web podría ser:

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut1/frontend-backend-datos.png"
  alt="Arquitectura web con frontend en el cliente, backend en el servidor y capa de datos"
  className="unit-hero"
/>

:::info[En este módulo]
Nuestro objetivo inicial no será desarrollar un backend complejo. Primero aprenderemos a construir la parte visible de una web mediante **HTML y CSS**, incorporando después una introducción a **JavaScript**.
:::

## 8️⃣ Páginas estáticas y dinámicas

No todas las páginas web se generan de la misma manera.

### 🟥 Página estática

En una página estática, el servidor puede enviar al navegador archivos ya existentes.

Por ejemplo:

```text
Servidor
   │
   ├── index.html
   ├── estilos.css
   └── imagen.png
```

Si varios usuarios solicitan `index.html`, reciben esencialmente el mismo archivo.

Son adecuadas para:

- Webs informativas sencillas.
- Portfolios.
- Documentación.
- Páginas de presentación.
- Primeras prácticas de HTML y CSS.

### 🟪 Página o aplicación dinámica

En una aplicación dinámica, el contenido puede generarse o modificarse en función de:

- El usuario.
- Los datos almacenados.
- La información enviada en un formulario.
- La fecha o la hora.
- Una consulta a una base de datos.
- Los resultados de una operación.

Por ejemplo, en una tienda online dos usuarios pueden ver carritos de compra diferentes aunque estén utilizando la misma aplicación.

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut1/paginas-estaticas-dinamicas.png"
  alt="Comparación entre una página web estática y una aplicación web dinámica"
  className="unit-hero"
/>

## 9️⃣ Arquitecturas de dos y tres capas

El modelo cliente-servidor puede organizarse de diferentes maneras.

### 🟦 Arquitectura de dos capas

En un modelo simplificado de dos capas podemos distinguir:

```text
CLIENTE  <────────>  SERVIDOR
```

El cliente solicita directamente los servicios proporcionados por el servidor.

### 🟩 Arquitectura de tres capas

Muchas aplicaciones separan sus responsabilidades en tres niveles:

<img
  src="/FP-Informatica-SMR/img/aplicaciones-web/ut1/arquitectura-tres-capas.png"
  alt="Arquitectura de tres capas: presentación, lógica de aplicación y datos"
  className="unit-hero"
/>

Podemos relacionarlos de forma simplificada con:

| Capa | Responsabilidad |
|---|---|
| Presentación | Interfaz que utiliza el usuario |
| Lógica | Procesamiento y reglas de la aplicación |
| Datos | Almacenamiento y recuperación de información |

En una aplicación web:

```text
Navegador → Servidor de aplicaciones → Base de datos
```

Esta separación facilita el mantenimiento y permite organizar mejor aplicaciones de mayor tamaño.

## 🔟 Ventajas del modelo cliente-servidor

La arquitectura cliente-servidor se utiliza ampliamente porque permite centralizar servicios y compartir recursos.

### 🟧 Ventajas principales

- **Centralización:** los datos o servicios pueden gestionarse desde servidores.
- **Mantenimiento:** determinadas actualizaciones pueden realizarse en el servidor sin modificar todos los clientes.
- **Compartición de recursos:** muchos clientes pueden utilizar un mismo servicio.
- **Control de acceso:** el servidor puede gestionar usuarios y permisos.
- **Escalabilidad:** la infraestructura puede ampliarse para atender una mayor demanda.
- **Administración:** facilita centralizar copias de seguridad, registros y determinadas políticas de seguridad.

### 🟥 También existen inconvenientes

- Si un servidor crítico falla y no existe redundancia, el servicio puede dejar de estar disponible.
- El servidor puede convertirse en un cuello de botella.
- Requiere administración y mantenimiento.
- Los servicios expuestos deben protegerse adecuadamente.
- La conectividad de red es esencial para acceder a servicios remotos.

## 1️⃣1️⃣ Ejemplo completo

Imaginemos una aplicación web para consultar las reparaciones de un taller informático.

El usuario abre:

```text
https://taller.example/reparaciones
```

El proceso podría ser:

```text
1. Navegador
      │
      │ GET /reparaciones
      ▼
2. Servidor web / aplicación
      │
      │ consulta
      ▼
3. Base de datos
      │
      │ resultados
      ▼
4. Servidor
      │
      │ respuesta
      ▼
5. Navegador
```

El navegador podría recibir una página con información como:

| Equipo | Estado |
|---|---|
| PC-01 | Pendiente |
| PORT-02 | En reparación |
| PC-03 | Finalizado |

En este ejemplo:

- El **navegador** es el cliente.
- El **servidor web** recibe las peticiones.
- La **aplicación del servidor** procesa la solicitud.
- La **base de datos** almacena la información.
- HTTP/HTTPS permite la comunicación entre navegador y servidor.

## 1️⃣2️⃣ Comprueba lo aprendido

### 🟪 Actividad 1. Identifica cliente y servidor

Indica cuál es el cliente y cuál es el servidor en estas situaciones:

1. Accedes desde Firefox a la web del instituto.
2. Un programa de correo consulta los mensajes de una cuenta.
3. Un ordenador solicita automáticamente su configuración de red mediante DHCP.
4. Una aplicación móvil consulta información meteorológica mediante una API.

### 🟦 Actividad 2. Analiza una URL

Observa esta URL:

```text
https://www.ejemplo.com/alumnos/horarios.html
```

Identifica:

1. El protocolo.
2. El nombre del servidor.
3. El recurso solicitado.
4. El puerto que utilizaría normalmente la conexión si no se especifica otro.

### 🟩 Actividad 3. Ordena el proceso

Ordena correctamente estas acciones:

- El servidor devuelve una respuesta.
- El navegador muestra la página.
- El usuario escribe una URL.
- DNS permite obtener la IP correspondiente.
- El navegador solicita el recurso.
- El servidor procesa la petición.

### 🟧 Actividad 4. Razona

Explica con tus propias palabras:

> ¿Por qué decimos que abrir una única página web puede provocar varias peticiones al servidor?

Incluye al menos tres tipos de archivos que el navegador podría solicitar.

### 🟥 Actividad 5. Investiga desde el navegador

Abre una página web y utiliza las **Herramientas para desarrolladores** del navegador.

Busca la pestaña **Red / Network** y observa las peticiones realizadas.

Localiza:

- El documento HTML.
- Una imagen.
- Una hoja CSS, si existe.
- Un archivo JavaScript, si existe.
- El código de estado de alguna petición.

:::tip[No es necesario entender todavía toda la información]
El objetivo de esta actividad es comprobar que el navegador realmente realiza las peticiones que hemos estudiado. Volveremos a utilizar estas herramientas cuando trabajemos con HTML, CSS y JavaScript.
:::

## 1️⃣3️⃣ Resumen

Al finalizar este apartado debes recordar estas ideas:

| Concepto | Idea fundamental |
|---|---|
| Cliente | Solicita servicios o recursos |
| Servidor | Proporciona servicios o recursos |
| Petición | Mensaje enviado por el cliente al servidor |
| Respuesta | Resultado enviado por el servidor |
| HTTP | Protocolo de comunicación utilizado en la Web |
| HTTPS | HTTP protegido mediante TLS |
| DNS | Permite resolver nombres de dominio a direcciones IP |
| Frontend | Parte de la aplicación relacionada principalmente con la interfaz del cliente |
| Backend | Procesamiento realizado en el servidor |
| HTML | Estructura y contenido |
| CSS | Presentación |
| JavaScript | Comportamiento e interactividad |

:::info[Idea final]
Cuando construyamos nuestras primeras páginas web estaremos trabajando principalmente en el **lado cliente**. Comprender la arquitectura cliente-servidor nos permitirá saber qué ocurre realmente cuando el navegador solicita y muestra una página.
:::
