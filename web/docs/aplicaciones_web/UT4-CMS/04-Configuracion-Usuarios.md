---
title: "4.4. Configuración inicial y gestión de usuarios"
sidebar_position: 4
---

# 4.4. Configuración inicial y gestión de usuarios

Tras instalar WordPress, debemos adaptar el sitio a su finalidad y decidir quién puede administrarlo y publicar contenido. En este apartado configuraremos los ajustes básicos y trabajaremos con usuarios y roles.

Utiliza el sitio creado en el apartado anterior. Inícialo en Local y accede al escritorio de WordPress con tu cuenta de administración. Los nombres de algunas opciones pueden variar ligeramente según la versión o el idioma.

## 1️⃣ El escritorio de administración

El **escritorio** es la zona desde la que se gestiona el sitio. Su menú lateral da acceso, entre otras opciones, a **Entradas**, **Páginas**, **Medios**, **Usuarios** y **Ajustes**.

```text
Local → Iniciar sitio → WP Admin → Escritorio
                                      ├─ Ajustes
                                      └─ Usuarios
```

La parte pública muestra el resultado a los visitantes. El escritorio permite modificarlo y sus opciones dependen de los permisos de cada usuario.

## 2️⃣ Ajustes generales

### 🟩 Identidad del sitio

Entra en **Ajustes → Generales** y revisa:

| Ajuste | Función |
|---|---|
| Título del sitio | Identifica el sitio; algunos temas lo muestran en la cabecera o en el título del navegador |
| Descripción corta | Resume su propósito; su visualización depende del tema |
| Idioma del sitio | Establece el idioma general de la interfaz y del sitio cuando están disponibles las traducciones |
| Zona horaria | Determina la referencia para fechas y horas del sitio |
| Formatos de fecha y hora | Definen cómo se muestran las fechas y horas |

1. Escribe un título relacionado con tu proyecto.
2. Añade una descripción breve y significativa.
3. Selecciona el idioma acordado y la zona horaria correspondiente; para la España peninsular puedes elegir **Madrid**.
4. Revisa los formatos de fecha y hora y pulsa **Guardar cambios**.
5. Abre la parte pública para observar el resultado. Que un elemento no se vea no significa necesariamente que el ajuste no se haya guardado: depende del tema.

### 🟧 Dirección y correo de administración

Las opciones **Dirección de WordPress (URL)** y **Dirección del sitio (URL)** identifican la instalación y la dirección pública del sitio. En Local están preparadas para el entorno local: no las cambies durante esta práctica, ya que una dirección incorrecta puede impedir el acceso.

El **correo electrónico de administración** se utiliza para avisos del sitio. Al cambiarlo, WordPress puede solicitar una confirmación enviada a la nueva dirección. En local el envío de correo puede no estar configurado, por lo que no debemos dar por confirmado el cambio hasta comprobarlo.

## 3️⃣ Lectura y enlaces permanentes

### 🟥 Qué aparece en la portada

En **Ajustes → Lectura**, WordPress permite elegir qué muestra la página de inicio:

- **Tus últimas entradas:** presenta las publicaciones recientes.
- **Una página estática:** utiliza una página como portada y, opcionalmente, otra distinta para las entradas.

Para seleccionar páginas como portada o página de entradas, primero deben existir. Si todavía no las has creado, mantén la opción actual y vuelve a este ajuste en el apartado 4.5. Cuando elijas una página, guarda los cambios y comprueba el resultado en la parte pública.

La opción que solicita a los motores de búsqueda que no indexen el sitio es solo una **petición**: no impide el acceso ni garantiza que los buscadores la respeten. La privacidad se controla mediante los mecanismos de acceso adecuados.

### 🟪 Enlaces permanentes

Un **enlace permanente** es la dirección que identifica una página, una entrada u otro contenido. En **Ajustes → Enlaces permanentes** puedes seleccionar la estructura general de estas direcciones.

Por ejemplo, la opción **Nombre de la entrada** puede producir una dirección terminada en `/noticias-del-centro/`. Es un ejemplo de estructura; la dirección real depende del sitio y del contenido.

1. Abre **Ajustes → Enlaces permanentes**.
2. Selecciona la estructura indicada para la práctica; **Nombre de la entrada** ofrece direcciones fáciles de leer.
3. Guarda los cambios.
4. Abre una entrada o página existente desde la parte pública y comprueba que carga.

En un sitio ya publicado, cambiar la estructura puede dejar enlaces anteriores sin funcionar. Antes de hacerlo habría que planificar redirecciones y comprobar los enlaces.

## 4️⃣ Usuarios, roles y permisos

### 🟦 Qué es un rol

Cada persona que accede a la administración dispone de una **cuenta de usuario**. El **rol** asignado reúne capacidades que determinan las acciones permitidas.

WordPress incluye estos roles en una instalación de sitio único:

| Rol | Acciones principales |
|---|---|
| **Administrador** | Gestiona el sitio, sus ajustes, usuarios, temas y plugins |
| **Editor** | Publica y gestiona entradas y páginas, incluidas las de otras personas |
| **Autor** | Escribe, publica y gestiona sus propias entradas y puede subir archivos |
| **Colaborador** | Escribe y gestiona sus propias entradas, pero no puede publicarlas por sí mismo |
| **Suscriptor** | Gestiona su perfil y dispone de acceso básico; no publica entradas |

Los plugins pueden añadir roles o modificar capacidades. La tabla describe los roles habituales de WordPress sin esas modificaciones.

### 🟩 Asignar el permiso necesario

No todas las personas necesitan administrar el sitio. Asigna a cada cuenta el rol suficiente para realizar su trabajo:

- Una persona que revisa y publica contenido de todo el equipo puede necesitar el rol de **editor**.
- Una persona que publica sus propias noticias puede trabajar como **autor**.
- Una persona que redacta borradores para revisión puede ser **colaborador**.

Esta decisión reduce cambios accidentales y limita el efecto de una cuenta comprometida. Evita compartir una misma cuenta: cada persona debe tener la suya.

## 5️⃣ Crear y administrar usuarios

### 🟧 Añadir un usuario

1. Accede con una cuenta administradora a **Usuarios → Añadir nuevo usuario**. La opción puede aparecer como **Añadir nuevo**.
2. Introduce un nombre de usuario y una dirección de correo para la nueva cuenta. WordPress exige que sean distintos de los ya utilizados en el sitio.
3. Completa los demás datos que necesites y establece una contraseña segura.
4. Selecciona el **perfil** o rol indicado para la práctica, por ejemplo, **Colaborador**.
5. Revisa la opción de notificación por correo y pulsa **Añadir nuevo usuario**.
6. Comprueba que la cuenta aparece en **Usuarios → Todos los usuarios** con el rol elegido.

El nombre de usuario identifica la cuenta y no se cambia desde su perfil de la forma habitual. El nombre visible puede configurarse por separado. En Local, la notificación de alta puede no enviarse realmente si no está configurado el correo.

:::warning[Credenciales]
Guarda las contraseñas de forma segura y no las incluyas en la documentación de la práctica. Cada usuario debe recibir sus datos por un medio adecuado.
:::

### 🟥 Editar y eliminar cuentas

Desde **Usuarios → Todos los usuarios**, una cuenta administradora puede editar el perfil y cambiar el rol de otra persona. Para comprobar un cambio, edita el usuario, selecciona el nuevo perfil y guarda.

Antes de eliminar una cuenta, revisa si tiene contenido asociado. WordPress ofrece opciones para eliminar ese contenido o atribuirlo a otro usuario; la elección afecta a las entradas y páginas de la cuenta. En la práctica, conserva la cuenta administradora original y no elimines usuarios necesarios para el proyecto.

## 6️⃣ Registro de nuevos usuarios

En **Ajustes → Generales**, la opción de membresía permite habilitar que otras personas se registren. El **perfil por defecto para nuevos usuarios** determina el rol de las cuentas creadas mediante ese registro.

Para esta práctica, mantén el registro abierto al público desactivado y crea manualmente las cuentas necesarias. Si en otro proyecto se habilita, revisa el rol por defecto: asignar automáticamente privilegios de administración permitiría a cualquier persona registrada controlar el sitio.

El registro público y la creación manual son cosas distintas: desactivar el primero no impide que una persona administradora añada cuentas desde el escritorio.

## 7️⃣ Comprobar los roles

### 🟪 Preparar las cuentas de prueba

1. Conserva la cuenta administradora creada durante la instalación.
2. Crea una cuenta con rol **Autor** y otra con rol **Colaborador**, con nombres y contraseñas diferentes.
3. Anota los nombres y roles, sin registrar las contraseñas en la entrega.
4. Mantén la sesión de administración en tu navegador y abre una ventana privada para probar las otras cuentas. Comprueba que estás usando la URL local correcta.

La ventana privada permite iniciar otra sesión sin cerrar la de administración. Al terminar la prueba, cierra la sesión y la ventana privada.

### 🟦 Comparar los permisos

1. Accede como **colaborador**. Comprueba que puedes crear una entrada y guardarla como borrador o enviarla a revisión, pero no publicarla directamente.
2. Cierra esa sesión y accede como **autor**. Comprueba que puedes crear y publicar una entrada propia.
3. Observa qué opciones de administración aparecen para cada cuenta. Comprueba que ninguna puede acceder a los ajustes generales o gestionar usuarios.
4. Vuelve a la cuenta administradora y revisa los contenidos creados. Utiliza únicamente contenido de prueba identificado como tal.

No pruebes permisos modificando contenido de otras personas sin autorización. La creación y edición de entradas se desarrollará con detalle en 4.5.

## 8️⃣ Actividad de comprobación

Configura el sitio de prácticas y comprueba los siguientes resultados:

- [ ] El título, la descripción, el idioma y la zona horaria corresponden al proyecto.
- [ ] La portada muestra la opción de lectura elegida.
- [ ] La estructura de enlaces está guardada y un contenido existente abre correctamente.
- [ ] El registro público está desactivado para la práctica.
- [ ] Existen las cuentas de prueba con los roles solicitados.
- [ ] Has comprobado la diferencia entre autor y colaborador y conservas el acceso administrador.

Responde brevemente:

1. ¿Qué diferencia hay entre una cuenta y un rol?
2. ¿Por qué un colaborador no puede publicar directamente?
3. ¿Qué efecto puede tener cambiar los enlaces permanentes de una web ya publicada?
4. ¿Por qué una opción que desaconseja la indexación no protege una página privada?
5. ¿Por qué debemos comprobar si el correo funciona antes de depender de una notificación?

En el siguiente apartado crearemos y organizaremos páginas, entradas, medios y elementos de navegación.
