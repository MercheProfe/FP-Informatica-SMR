---
sidebar_position: 1
title: "2.1. Guía de Proyecto Servicios Web"
---
# Guía del proyecto: Servicios web

## 1️⃣ El proyecto

### 🟩 Situación de partida

Una pequeña empresa necesita dos servicios web en su red:

- Una web corporativa de acceso libre: `www.empresa.test`.
- Una intranet para personal autorizado: `intranet.empresa.test`.

Cada equipo preparará el servidor asignado y demostrará que ambos sitios funcionan. La web será de laboratorio: **no se publicará en Internet**.

### 🟧 Qué vais a aprender

Al terminar el proyecto, deberéis poder:

- Explicar cómo se comunican un navegador y un servidor web.
- Instalar y administrar un servidor web.
- Publicar sitios y acceder a ellos por nombre.
- Configurar autenticación y permisos para proteger una intranet.
- Habilitar HTTPS con un certificado de laboratorio.
- Consultar registros y resolver incidencias.
- Documentar el trabajo para que otra persona pueda reproducirlo.

No se evalúa el diseño gráfico ni la programación de la web. Usaremos páginas HTML sencillas para comprobar el servicio.

## 2️⃣ Equipos y tecnologías

### 🟥 Equipo IIS

Trabajará con Windows Server e IIS (Internet Information Services). Se utilizarán herramientas gráficas, servicios, bindings, permisos NTFS y certificados.

### 🟪 Equipo Apache

Trabajará con Ubuntu Server y Apache2. Se utilizarán la terminal, archivos de configuración, virtual hosts, módulos y permisos de Linux.

### 🟦 Reglas de trabajo

- Los dos equipos resolverán requisitos equivalentes con tecnologías distintas.
- En cada bloque se intercambiarán los papeles de configuración y verificación/documentación.
- Cada integrante debe configurar y comprobar personalmente partes del servicio.
- Al final, cada equipo explicará su plataforma y ayudará al otro a reproducir algunas tareas.

## 3️⃣ Cómo trabajaremos

### 🟩 El proceso

En cada reto seguiremos este ciclo:

1. Investigar qué necesitamos y por qué.
2. Diseñar los cambios antes de aplicarlos.
3. Configurar el servidor.
4. Comprobar que funciona.
5. Registrar evidencias y documentar el procedimiento.
6. Explicar lo aprendido y revisar el trabajo de otro equipo.

La profesora proporcionará requisitos, preguntas, pistas y fuentes. Tendréis que buscar y contrastar la información; los retos no incluyen una receta completa de cada solución.

### 🟧 Uso de fuentes e inteligencia artificial

Podéis usar la inteligencia artificial como ayuda, pero debéis:

- Contrastar sus respuestas con documentación técnica fiable.
- Comprobar que las instrucciones sirven para la versión instalada.
- Entender los comandos y cambios antes de aplicarlos.
- Verificar en el laboratorio que el resultado es correcto.
- Indicar las fuentes realmente consultadas.

Una respuesta de una herramienta no demuestra por sí sola que una configuración funcione.

## 4️⃣ Requisitos del servicio

### 🟥 Requisitos comunes

El servidor del equipo debe cumplir estos requisitos:

- Tener el servicio web instalado y operativo.
- Publicar dos sitios diferenciados en una misma dirección IP.
- Permitir el acceso desde el cliente virtual y desde el ordenador físico.
- Resolver los nombres de los sitios mediante el DNS del laboratorio.
- Proteger la intranet mediante autenticación y permisos.
- Habilitar una funcionalidad adicional mediante un módulo o característica.
- Ofrecer acceso HTTPS con un certificado de laboratorio.
- Permitir consultar registros de acceso y errores.
- Incluir pruebas que demuestren el funcionamiento y la seguridad básica.

No cambiéis las direcciones IP del laboratorio por otras inventadas. Tampoco desactivéis globalmente el firewall ni utilicéis contraseñas reales.

## 5️⃣ Fases y entregas

### 🟪 Fase 1: investigar y diseñar

Antes de configurar, investigaréis los conceptos básicos de la web y prepararéis un esquema de red. Explicaréis cómo viaja una petición desde el navegador hasta el servidor y qué información permite identificar la respuesta.

**Entrega:** esquema de red e investigación inicial.

### 🟦 Fase 2: poner en marcha el servidor

Instalaréis y comprobaréis el servidor web. Publicaréis una primera página y probaréis el acceso desde el cliente virtual y desde el ordenador físico.

**Entrega:** primera web accesible desde ambos equipos.

### 🟩 Fase 3: administrar y publicar

Configuraréis dos sitios diferenciados, prepararéis su acceso por nombre DNS y habilitaréis una funcionalidad adicional.

**Entrega:** dos sitios accesibles por sus nombres y módulo o característica comprobada.

### 🟧 Fase 4: proteger y diagnosticar

Restringiréis el acceso a la intranet, configuraréis HTTPS, consultaréis los registros y resolveréis incidencias preparadas durante el proyecto.

**Entrega:** intranet protegida, acceso HTTPS comprobado y registro de incidencias.

### 🟥 Fase 5: explicar y validar

Presentaréis el servicio y la documentación. Después, el otro equipo utilizará vuestra guía para reproducir algunas tareas básicas. Cada integrante realizará también una comprobación individual.

**Entrega:** demostración, documentación definitiva y validación cruzada.

## 6️⃣ Documentación técnica

### 🟪 Índice obligatorio

La documentación se elaborará durante el proyecto y tendrá estos apartados:

1. Introducción y objetivos.
2. Fundamentos de los servicios web.
3. Características del servidor asignado.
4. Arquitectura y esquema de red.
5. Requisitos e instalación.
6. Administración del servicio.
7. Publicación de los sitios.
8. Acceso desde el ordenador físico.
9. Alojamiento virtual y DNS.
10. Módulos y funcionalidades.
11. Autenticación y permisos.
12. HTTPS y certificados.
13. Monitorización y registros.
14. Incidencias y soluciones.
15. Pruebas finales.
16. Conclusiones y fuentes consultadas.

### 🟦 Qué incluir en cada configuración

Para cada cambio importante, explicad:

- **Finalidad:** qué requisito resuelve.
- **Procedimiento:** qué hicisteis, con los datos o comandos necesarios.
- **Decisiones:** qué opciones elegisteis y por qué.
- **Evidencia:** qué captura, salida o prueba lo demuestra.
- **Resultado:** qué ocurrió y cómo lo verificasteis.

Las capturas deben llevar un pie o una explicación. No incluyáis contraseñas, claves privadas ni datos personales.

## 7️⃣ Pruebas y presentación

### 🟩 Comprobaciones que debéis demostrar

En la presentación, tendréis que demostrar, como mínimo:

- Que la página pública carga correctamente.
- Que la intranet solicita autenticación y limita el acceso.
- Que los nombres DNS llevan a los sitios previstos.
- Que HTTPS está disponible y el certificado se puede comprobar.
- Que podéis localizar registros de acceso y errores.
- Que podéis explicar y resolver una incidencia del proyecto.

La profesora podrá pedir a cualquier integrante que realice una tarea o explique una decisión.

### 🟧 Validación cruzada

El equipo IIS utilizará la guía del equipo Apache, y el equipo Apache utilizará la guía del equipo IIS, para realizar algunas tareas básicas:

- Publicar una página.
- Modificar la configuración de un sitio.
- Reiniciar o comprobar el servicio.
- Consultar los registros.
- Investigar una incidencia.

No será necesario repetir todo el proyecto. Se trabajará sobre una instantánea o copia para proteger la configuración original.

## 8️⃣ Fuentes de consulta

### 🟥 Documentación recomendada

Empezad por documentación oficial y referencias técnicas:

- [Documentación de IIS — Microsoft Learn](https://learn.microsoft.com/es-es/iis/)
- [Documentación de Ubuntu Server](https://ubuntu.com/server/docs/)
- [Instalación de Apache2 en Ubuntu](https://ubuntu.com/server/docs/how-to/web-services/install-apache2/)
- [HTTP — MDN en español](https://developer.mozilla.org/es/docs/Web/HTTP)
- [Manual de VirtualBox](https://www.virtualbox.org/manual/)
- [Documentación de Wireshark](https://www.wireshark.org/docs/)

Algunos recursos técnicos están en inglés. Podéis apoyaros en un traductor, pero mantened los nombres de comandos, parámetros y opciones tal como aparecen en la documentación.

## 9️⃣ Criterio de éxito

### 🟪 Antes de dar el proyecto por terminado

Comprobad que:

- Los requisitos funcionan y tenéis pruebas de ello.
- La documentación coincide con la configuración real.
- Otra persona puede seguir la guía para reproducir las tareas indicadas.
- Cada integrante puede explicar y realizar su parte.
- Las fuentes consultadas están identificadas.

