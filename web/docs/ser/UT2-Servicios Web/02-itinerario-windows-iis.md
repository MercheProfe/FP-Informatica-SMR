---
sidebar_position: 2
title: "2.2a. Itinerario IIS - Fases y Retos"
---
# Itinerario IIS — Fase 1: investigar y diseñar

## 1️⃣ Contexto

### 🟩 El reto

Vuestra empresa necesita una web pública (`www.empresa.test`) y una intranet (`intranet.empresa.test`). El equipo trabajará con Windows Server e IIS (Internet Information Services).

Antes de instalar o modificar nada, debéis comprender qué ocurre cuando un navegador solicita una página y diseñar cómo comprobaréis después el servicio.

## 2️⃣ Objetivos

### 🟧 Al terminar esta fase

Debéis poder:

- Explicar el recorrido básico de una petición web.
- Interpretar una petición y una respuesta HTTP (Protocolo de transferencia de hipertexto).
- Relacionar HTTP y HTTPS (HTTP seguro mediante TLS).
- Identificar qué función cumple IIS en Windows Server.
- Preparar un esquema del laboratorio sin inventar direcciones IP.
- Proponer pruebas para comprobar el servicio en fases posteriores.

## 3️⃣ Conceptos que debéis investigar

### 🟥 Preguntas de investigación

Investigad y anotad, con vuestras propias palabras:

- ¿Qué diferencia hay entre cliente y servidor?
- ¿Qué información puede aparecer en una URL (localizador uniforme de recursos)?
- ¿Qué función tienen HTTP y HTTPS?
- ¿Qué son una petición y una respuesta HTTP?
- ¿Para qué sirven los métodos `GET` y `POST`?
- ¿Qué indican los códigos `200`, `301`, `403` y `404`?
- ¿Qué relación tienen TCP (Protocolo de control de transmisión) y los puertos 80 y 443 con HTTP y HTTPS?
- ¿Qué función tiene IIS dentro de Windows Server?
- ¿Qué es un binding o enlace de IIS y qué información permite asociar a un sitio?

No copiéis definiciones sin explicarlas: debéis poder utilizar los conceptos para describir una petición real.

## 4️⃣ Software necesario y procedencia

### 🟪 Para esta fase

No instaléis ni cambiéis componentes del servidor. Utilizad:

- Un navegador web.
- El cliente virtual del laboratorio.
- Wireshark, si está disponible en el equipo de trabajo.
- Un editor para redactar la investigación y dibujar el esquema.

IIS es un rol integrado en Windows Server; no se descarga como una aplicación independiente. Su instalación se abordará en una fase posterior.

## 5️⃣ Documentación recomendada

### 🟦 Fuentes para empezar

- [Documentación de IIS — Microsoft Learn](https://learn.microsoft.com/es-es/iis/)
- [Introducción a la arquitectura de IIS — Microsoft Learn](https://learn.microsoft.com/es-es/iis/get-started/introduction-to-iis/introduction-to-iis-architecture)
- [Sitio y enlaces de IIS — Microsoft Learn](https://learn.microsoft.com/es-es/iis/configuration/system.applicationhost/sites/site/)
- [HTTP — MDN en español](https://developer.mozilla.org/es/docs/Web/HTTP)
- [Métodos HTTP — MDN en español](https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Methods)
- [Códigos de estado HTTP — MDN en español](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

Consultad primero la documentación oficial y anotad qué fuente os ha servido para cada apartado.

## 6️⃣ Requisitos técnicos del diseño

### 🟩 Antes de configurar

El diseño debe representar, como mínimo:

- El ordenador físico y las máquinas virtuales que intervienen.
- El Windows Server que alojará IIS.
- El cliente desde el que se probarán las páginas.
- La red o redes virtuales que ya existen en el laboratorio.
- El servicio DNS que se utilizará, si está disponible en el entorno.
- Los nombres previstos para la web pública y la intranet.
- Los puertos que estudiaréis para HTTP y HTTPS.

Usad las direcciones reales solo después de consultarlas en el laboratorio. Si aún no las conocéis, dejad el dato pendiente; no asignéis valores de ejemplo como si fueran los reales.

## 7️⃣ Tareas y pistas

### 🟧 Reto R01: entender una comunicación web

Preparad un ejemplo de petición y respuesta HTTP. Identificad:

- Qué equipo inicia la comunicación.
- Qué nombre o recurso solicita.
- Qué método se utiliza.
- Qué código de estado devuelve el servidor.
- Qué parte de la respuesta contiene el contenido de la página.

Después, explicad qué cambiaría al utilizar HTTPS. No es necesario capturar tráfico cifrado ni configurar certificados en esta fase.

### 🟥 Preparación del R02: instalación

Buscad en la documentación de Microsoft cómo se instala el rol de servidor web en Windows Server. Anotad:

- El nombre del rol o característica.
- La herramienta desde la que se gestiona.
- Qué comprobación permitiría confirmar más adelante que IIS está instalado y funcionando.

No realicéis todavía la instalación.

## 8️⃣ Comprobaciones de esta fase

### 🟪 Revisad antes de entregar

- ¿Podéis explicar el viaje de una petición desde el navegador hasta el servidor?
- ¿Sabéis distinguir petición, respuesta y código de estado?
- ¿Habéis diferenciado HTTP de HTTPS?
- ¿El esquema muestra los equipos y las redes que realmente existen?
- ¿Habéis dejado como pendiente cualquier dato que todavía no habéis comprobado?
- ¿Podéis explicar qué investigaríais si el nombre no resolviera o la página no cargara?

## 9️⃣ Evidencias y documentación

### 🟦 Entrega de la fase 1

Entregad un documento breve con:

1. Vuestras respuestas a las preguntas de investigación.
2. Un ejemplo comentado de petición y respuesta HTTP.
3. Un esquema del laboratorio.
4. Una lista de datos que debéis comprobar antes de configurar.
5. Las fuentes consultadas, con el apartado utilizado y qué información aportó cada una.

Las capturas, si las incluís, deben tener una explicación. No añadáis contraseñas ni datos personales.

## 🔟 Preguntas para la puesta en común

### 🟩 Preparad una respuesta para cada pregunta

- Si el servidor responde `404`, ¿qué sabemos y qué no sabemos todavía?
- ¿Por qué no basta con escribir una dirección IP si queremos distinguir dos sitios web?
- ¿Qué debería comprobarse primero si el cliente no puede abrir una página?
- ¿Qué diferencia hay entre que un servicio esté instalado y que sea accesible desde el cliente?
- ¿Qué información del esquema debe confirmarse en la máquina antes de empezar la configuración?

## 1️⃣ Fase 2: puesta en marcha del servidor IIS

### 🟩 Reto R02: instalar el servicio web

**Contexto.** El servidor necesita IIS para alojar la primera página de prueba.

**Objetivo.** Instalar el rol de servidor web y comprobar que el equipo lo reconoce como instalado.

**Investigad.** Buscad cómo se instala el rol Servidor web (IIS) en la versión de Windows Server del laboratorio. Averiguad qué herramientas permiten administrarlo y qué componentes básicos necesita un sitio estático.

**Software y fuentes.**

- La característica IIS integrada en Windows Server.
- [Instalar el rol de servidor web — Microsoft Learn](https://learn.microsoft.com/es-es/windows-server/networking/core-network-guide/cncg/server-certs/install-the-web-server-web1)
- [Documentación de IIS — Microsoft Learn](https://learn.microsoft.com/es-es/iis/)

**Tarea.** Instalad IIS con la herramienta acordada en clase. Comprobad el resultado de la instalación y localizad el Administrador de IIS. No añadáis características que no se hayan solicitado.

**Comprobación.** Acreditad que el rol aparece instalado y que podéis abrir la herramienta de administración. Anotad cualquier mensaje de error.

**Evidencias.** Captura del resultado de instalación y de la consola de administración, acompañadas de una explicación.

**Preguntas.** ¿Qué diferencia hay entre instalar el rol y comprobar que una página responde? ¿Qué parte de IIS utilizaréis para administrar los sitios?

### 🟧 Reto R03: comprobar y administrar el servicio

**Contexto.** Un servidor web debe poder ponerse en marcha, detenerse y volver a iniciarse de forma controlada.

**Objetivo.** Identificar el servicio relacionado con IIS y conocer cómo comprobar su estado.

**Investigad.** Averiguad qué servicio de Windows interviene en la publicación web, cómo se consulta su estado y qué efecto tendría detenerlo.

**Tarea.** Comprobad el estado del servicio. Con autorización de la profesora, detenedlo y volved a iniciarlo. No realicéis esta prueba mientras otro equipo dependa del servidor.

**Comprobación.** Registrad el estado antes y después. Comprobad si la página de prueba responde en cada situación.

**Evidencias.** Tabla breve con acción, estado observado y resultado de la prueba web.

**Preguntas.** Si el servicio está detenido, ¿qué resultado esperáis en el navegador? ¿Qué otras causas podrían impedir el acceso aunque el servicio esté iniciado?

### 🟥 Reto R04: publicar la primera página

**Contexto.** La empresa necesita una web pública sencilla para confirmar que el servidor entrega contenido.

**Objetivo.** Publicar una página HTML estática que permita reconocer que responde el servidor IIS del equipo.

**Investigad.** Localizad el directorio raíz que utiliza el sitio que vais a emplear. Averiguad cómo selecciona IIS el documento inicial y qué es un enlace o *binding*.

**Tarea.** Publicad una página HTML sencilla con el nombre del equipo y un mensaje identificativo. No se evalúan el diseño ni la programación.

**Comprobación.** Abrid la página desde el propio servidor y desde el cliente virtual. Anotad qué dirección utilizasteis y qué contenido apareció.

**Evidencias.** Captura de la página en el navegador y de la ubicación del archivo publicado. Ocultad cualquier dato personal.

**Preguntas.** ¿Qué relación hay entre la carpeta publicada y el contenido que ve el navegador? ¿Qué mensaje recibiríais si solicitaseis una página que no existe?

### 🟪 Reto R05: planificar el acceso desde el ordenador físico

**Contexto.** El servicio también debe poder probarse desde el ordenador físico, sin exponer la red del laboratorio.

**Objetivo.** Distinguir el acceso desde el cliente virtual del acceso desde el anfitrión y proponer una forma segura de comprobar ambos.

**Investigad.** Revisad los adaptadores de red ya configurados en VirtualBox y el esquema de red de la fase 1. Averiguad qué dirección del servidor puede alcanzar cada equipo.

**Tarea.** Primero, probad el acceso desde el cliente virtual. Para el ordenador físico, preparad un plan de conexión y consultadlo con la profesora antes de cambiar adaptadores o reglas de firewall. Mantened la red interna existente y no conectéis un servidor DHCP del laboratorio a la LAN del centro.

**Comprobación.** Para cada equipo, registrad la dirección usada, si el nombre resolvió y si la página cargó. Si no hay acceso, anotad en qué punto falla.

**Evidencias.** Tabla de pruebas desde servidor, cliente virtual y ordenador físico. Las direcciones deben ser las observadas en el laboratorio, no valores de ejemplo.

**Preguntas.** ¿Por qué una dirección válida desde el cliente virtual puede no ser alcanzable desde el ordenador físico? ¿Qué revisaríais antes de tocar el firewall?

