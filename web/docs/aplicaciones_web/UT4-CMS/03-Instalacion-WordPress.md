---
title: "4.3. Instalación de WordPress con LocalWP"
sidebar_position: 3
---

# 4.3. Instalación de WordPress con LocalWP

En esta guía prepararás un sitio WordPress en tu ordenador con **LocalWP**, comprobarás su funcionamiento y registrarás la instalación. Este será el sitio de trabajo para los siguientes apartados de la UT4.

La guía está orientada a Windows. Los nombres y la posición de algunos controles pueden variar con la versión de Local. Utiliza la versión y la combinación de servicios indicadas por la docente a partir de la prueba de laboratorio.

## 1️⃣ Objetivo y preparación

### 🟩 Qué vamos a instalar

LocalWP prepara el servidor web, PHP, la base de datos y WordPress. No necesitas instalar esos componentes por separado ni descargar manualmente el paquete de WordPress.

```text
Instalar Local → Crear sitio → Preparar WordPress
                                  |
                                  v
                    Abrir web y administración
                                  |
                                  v
                    Comprobar y documentar
```

El resultado será una instalación **local**, no una web publicada en Internet. La instalación manual y la instalación en un alojamiento requieren gestionar otros pasos; en esta unidad seguiremos el procedimiento integrado con Local.

### 🟧 Antes de empezar

- Comprueba los requisitos del apartado 4.2 y las indicaciones del aula sobre permisos y conectividad.
- Confirma dónde se conservarán los archivos después de cerrar sesión o reiniciar el equipo.
- Prepara un nombre para el sitio y un lugar seguro para guardar las credenciales.
- Cierra aplicaciones que no necesites para dejar recursos disponibles.
- Si Local ya está instalado y funciona, pasa directamente a la creación del sitio.

No borres instalaciones anteriores ni cambies servicios de otros proyectos para comenzar esta práctica.

## 2️⃣ Descargar e instalar LocalWP

### 🟥 Descargar desde la web oficial

1. Accede a la [web oficial de Local](https://localwp.com/).
2. Busca la opción de descarga y selecciona la versión para tu sistema operativo, siguiendo la indicación de la docente.
3. Completa los campos que solicite la página y descarga el instalador.
4. Comprueba que la descarga ha finalizado antes de abrirlo.

Usa el instalador oficial o el que facilite la docente. La descarga puede cambiar de aspecto con el tiempo.

### 🟪 Ejecutar el instalador

1. Abre el instalador descargado.
2. Si pregunta para qué usuarios instalar, elige la opción indicada en el aula y compatible con tus permisos.
3. Revisa la carpeta de instalación y continúa con el asistente.
4. Espera a que termine y abre **Local**.
5. Atiende las pantallas iniciales que aparezcan y completa únicamente lo necesario para llegar a la ventana principal.

Si Windows solicita autorización, comprueba que corresponde al instalador de Local. En un equipo gestionado, solicita la intervención de la persona responsable cuando sea necesaria.

La carpeta de la aplicación y la carpeta que contendrá cada sitio son distintas. Instalar Local no significa que ya exista un sitio WordPress.

:::tip[Si Local ya está preparado]
No repitas la instalación de la aplicación en cada sesión. En las siguientes sesiones abrirás Local e iniciarás el sitio que hayas creado.
:::

## 3️⃣ Crear el sitio WordPress

### 🟦 Iniciar la creación

1. En la ventana principal, pulsa el botón **+** o la opción para crear un sitio.
2. Selecciona **Create a new site** si aparece una elección entre crear e importar.
3. Continúa hasta la pantalla del nombre.
4. Escribe el nombre acordado para el proyecto. Si todavía no hay uno, puedes utilizar un nombre de prácticas como `ut4-cms`.
5. Revisa las opciones avanzadas antes de continuar: dominio local y ubicación de los archivos, si se muestran.

El nombre anterior es un ejemplo: registra los datos que realmente asigne tu instalación. Evita guardar el sitio en una carpeta temporal o que se elimine al cerrar sesión.

### 🟩 Elegir el entorno

Local puede ofrecer estas opciones:

| Opción | Qué permite |
|---|---|
| **Preferred** | Utilizar la combinación de servicios propuesta por esa versión de Local |
| **Custom** | Elegir entre las versiones disponibles de PHP, servidor web y base de datos |

1. Selecciona la opción indicada por la docente para reproducir el entorno probado en el laboratorio.
2. Si se ha acordado usar **Preferred**, conserva sus valores.
3. Si se ha acordado usar **Custom**, selecciona exactamente los servicios y versiones indicados.
4. Continúa al siguiente paso.

**Preferred no significa necesariamente «la versión más reciente de cada componente».** Los valores dependen de la versión de Local. No cambies de combinación al azar si aparece una incidencia.

### 🟧 Crear el usuario administrador

Completa los datos de WordPress:

| Campo | Qué debes introducir |
|---|---|
| **WordPress username** | Nombre del usuario administrador del sitio |
| **WordPress password** | Contraseña robusta y exclusiva para la práctica |
| **WordPress email** | Correo indicado para el trabajo del aula |

1. Introduce el nombre de usuario; evita nombres genéricos como `admin`.
2. Establece la contraseña y guárdala de forma segura.
3. Revisa el correo: se utilizará en la configuración de WordPress, pero un entorno local no garantiza el envío real de mensajes.
4. Si aparecen opciones de idioma, selecciona español cuando esté disponible. Si no, se revisará posteriormente.
5. Mantén una instalación de sitio único; no actives multisitio para esta práctica.
6. Pulsa **Add Site** o el botón equivalente para crear el sitio.

Estas son las credenciales de **WordPress**, distintas de la cuenta de Windows y de cualquier cuenta de servicios de Local.

:::warning[Protege las credenciales]
No incluyas la contraseña en documentos de entrega ni nombres de archivo. No reutilices la contraseña de tu correo u otros servicios.
:::

### 🟥 Esperar a que finalice

Local preparará las carpetas, los servicios, la base de datos y la instalación de WordPress. En la primera creación puede necesitar descargar componentes.

1. Espera a que termine sin cerrar la aplicación.
2. Atiende las solicitudes de autorización legítimas que correspondan al entorno, siguiendo las indicaciones del aula.
3. Si aparece un aviso de cortafuegos, consulta qué acceso necesita la aplicación; no desactives el cortafuegos completo.
4. Comprueba que el sitio aparece en la lista y que no queda un error pendiente.

Si falla la creación, anota el mensaje exacto antes de repetirla. Consulta el apartado de incidencias de esta guía.

## 4️⃣ Reconocer el sitio en Local

### 🟪 Información y controles principales

Selecciona tu sitio en la lista y localiza:

- **Estado del sitio:** si está iniciado o detenido.
- **Start Site / Stop Site:** inicia o detiene sus servicios.
- **Open Site:** abre la parte pública en el navegador.
- **WP Admin:** abre el acceso a la administración de WordPress.
- **Datos del entorno:** dominio, ruta de archivos, PHP, servidor web y base de datos, según la pantalla disponible.

Registra las versiones reales que muestra tu instalación. La versión de WordPress también puede consultarse en su escritorio, por ejemplo en la información de actualizaciones; no ejecutes una actualización solo para consultar el número.

### 🟦 Localizar los archivos

Utiliza la opción de Local para abrir la carpeta del sitio, si está disponible, o consulta la ubicación indicada en su información.

En la estructura habitual de Local, los archivos públicos de WordPress se encuentran dentro de `app/public`. Allí podrás reconocer:

```text
app/public/
├── wp-admin/
├── wp-content/
├── wp-includes/
└── wp-config.php
```

Este árbol muestra solo algunos elementos de la instalación; no es una lista completa. Comprueba la estructura real sin modificarla.

`wp-content` contiene temas, plugins y recursos subidos. `wp-config.php` contiene configuración sensible: no lo publiques ni captures su contenido. La base de datos es un componente separado; no se reduce a las carpetas anteriores.

## 5️⃣ Abrir WordPress y comprobar el acceso

### 🟩 Abrir la parte pública

1. Comprueba que el sitio está iniciado. Si está detenido, pulsa **Start Site**.
2. Pulsa **Open Site**.
3. Espera a que el navegador cargue la página.
4. Comprueba que aparece el sitio y que se cargan sus estilos.
5. Anota la URL real que aparece en la barra del navegador.

El contenido y el tema inicial pueden variar con la versión de WordPress. No es necesario que la portada coincida visualmente con la de otra instalación.

### 🟧 Acceder al escritorio

1. Vuelve a Local y pulsa **WP Admin**.
2. Si aparece el formulario de acceso, introduce el usuario y la contraseña creados para WordPress.
3. Comprueba que accedes al escritorio y que puedes reconocer su menú de administración.
4. Abre de nuevo la parte pública y distingue ambas interfaces.

Si Local te permite entrar mediante acceso automático, verifica también las credenciales: cierra la sesión de WordPress y prueba el acceso desde una ventana privada con la URL real de administración. En una instalación estándar se utiliza la ruta `/wp-admin/` del sitio.

No dependas del acceso automático para recordar o comprobar la contraseña.

### 🟥 Revisar HTTP y HTTPS

Observa si la dirección utiliza HTTP o HTTPS. Si la práctica incluye HTTPS, revisa en Local el estado del certificado y utiliza la opción **Trust** cuando esté disponible y así lo indique la docente.

Confiar en un certificado local puede requerir permisos. Comprueba después el acceso con HTTPS en el navegador. Si persiste una advertencia, registra el problema y consúltalo; no des por válida la comprobación ignorando el aviso.

Un certificado local no publica el sitio ni equivale a un certificado público válido para cualquier visitante.

## 6️⃣ Detener y volver a iniciar el sitio

### 🟪 Comprobar el ciclo de trabajo

1. Guarda cualquier cambio pendiente en WordPress.
2. En Local, selecciona el sitio y pulsa **Stop Site**.
3. Comprueba que su estado pasa a detenido.
4. Pulsa **Start Site** y espera a que los servicios arranquen.
5. Vuelve a abrir la web y la administración para comprobar que siguen funcionando.

Detener el sitio no lo elimina. La página que ya estaba abierta puede seguir visible en el navegador; verla no demuestra que el servidor siga activo.

Para las siguientes sesiones: **abrir Local → seleccionar el sitio → iniciar → abrir la web o la administración**. No crees un sitio nuevo cada día.

Antes de cerrar el equipo, guarda los cambios y detén el sitio. Conservar el sitio en el disco tampoco equivale a tener una copia de seguridad; ese procedimiento se estudiará en 4.8.

## 7️⃣ Incidencias habituales

| Síntoma | Qué comprobar primero | Cómo continuar |
|---|---|---|
| Local no se instala | Sistema compatible, descarga completa y permisos | Anota el error y consulta a la docente |
| La creación queda bloqueada o falla | Conexión, espacio libre y mensaje de Local | Conserva el mensaje; evita crear duplicados sin diagnóstico |
| Un servicio no arranca | Estado del sitio y posible conflicto de puertos | Identifica el conflicto antes de detener otros servicios |
| La URL no abre | Sitio iniciado y URL real de Local | Usa **Open Site**; no inventes otra dirección |
| Aparece una advertencia de certificado | Protocolo usado y confianza del certificado local | Revisa HTTPS con la docente |
| No puedes entrar al escritorio | Usuario correcto, contraseña y sitio seleccionado | Comprueba las credenciales sin publicarlas |
| El correo de recuperación no llega | El envío real de correo puede no estar configurado | Solicita ayuda; no supongas que el correo local se envía a Internet |
| El sitio desaparece tras reiniciar | Perfil de usuario, ubicación y política de limpieza del aula | Revisa la persistencia antes de repetir la instalación |

Antes de pedir ayuda, prepara cuatro datos: **qué intentabas hacer, en qué paso, qué mensaje aparece y qué has comprobado**. Muestra el problema en el equipo o anota el mensaje exacto.

No borres el sitio, no reinstales todo ni cambies versiones como primera respuesta a una incidencia.

## 8️⃣ Comprobaciones y entrega de la práctica

### 🟦 Lista de comprobación

- [ ] Local abre correctamente y el sitio aparece en su lista.
- [ ] Identifico la ubicación donde se conserva el sitio.
- [ ] He registrado las versiones reales del entorno y de WordPress.
- [ ] La parte pública carga desde su URL local.
- [ ] Accedo al escritorio con las credenciales de WordPress.
- [ ] Distingo la parte pública de la administración.
- [ ] He revisado el protocolo utilizado y, si corresponde, el certificado local.
- [ ] Puedo detener e iniciar el sitio y volver a acceder a él.
- [ ] He registrado las incidencias y su solución, si las ha habido.

### 🟩 Documentar el resultado

Prepara una guía breve de **tu instalación real**. Incluye:

1. Sistema operativo y versión de Local.
2. Nombre del sitio, URL local y ubicación de sus archivos.
3. Tipo de entorno elegido y versiones de PHP, servidor web, base de datos y WordPress.
4. Resumen de los pasos realizados, con tus propias palabras.
5. Resultado de las comprobaciones de acceso a la parte pública y al escritorio.
6. Resultado de la prueba de parada y arranque.
7. Incidencias y solución aplicada; si no hubo, indícalo.

**No entregues contraseñas ni archivos de configuración sensibles.**

La instalación se considera comprobada cuando el sitio funciona y puedes explicar cómo acceder a él y qué componentes ha preparado Local.

## 9️⃣ Continuación y recursos

En el apartado **4.4. Configuración inicial y gestión de usuarios** ajustaremos la identidad del sitio, el idioma, los enlaces y las cuentas. Conserva esta instalación para continuar trabajando sobre ella.

Referencias oficiales:

- [Local: instalación de la aplicación](https://localwp.com/help-docs/getting-started/installing-local/).
- [Local: versiones y cambios](https://localwp.com/releases/).

