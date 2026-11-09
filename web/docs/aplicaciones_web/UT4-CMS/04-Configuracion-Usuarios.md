---
title: "4.4. Configuración inicial y usuarios"
sidebar_position: 4
---

# 4.4. Configuración inicial y gestión de usuarios

Después de instalar WordPress con LocalWP, debemos adaptar el sitio a sus necesidades y controlar quién puede administrarlo o publicar contenidos.

:::info[Laboratorio de referencia]
Trabajaremos con `ut4-cms-laboratorio.local`, una instalación local de WordPress. Las operaciones de este apartado están **pendientes de validación práctica**; la ruta exacta de alguna opción puede variar según la versión instalada.
:::

## 1️⃣ Ajustes generales del sitio

En **Ajustes → Generales** encontramos las opciones que identifican y configuran la web:

| Ajuste | Función | Precaución |
|---|---|---|
| Título del sitio | Nombre que identifica la web | Usar un nombre reconocible |
| Descripción corta | Explica brevemente la finalidad del sitio | No confundir con el contenido de una página |
| Dirección de WordPress (URL) | Dirección donde se encuentra la instalación | No modificar en este laboratorio |
| Dirección del sitio (URL) | Dirección desde la que se accede al sitio | No modificar sin conocer las consecuencias |
| Correo de administración | Recibe notificaciones del sitio | Un cambio puede requerir confirmación por correo |
| Miembros | Permite el registro público de cuentas | Mantener desactivado inicialmente |
| Perfil predeterminado | Rol para nuevos registros | No utilizar Administrador como rol predeterminado |
| Idioma del sitio | Idioma general de WordPress | Ya se configuró en español |
| Zona horaria | Referencia para fechas y programación | Seleccionar la zona adecuada al sitio |
| Formato de fecha y hora | Presentación de fechas | Elegir formatos legibles |

:::warning[No cambies las direcciones URL]
Modificar las URL de WordPress sin preparar el entorno puede impedir el acceso normal al sitio. En esta práctica se mantienen como están.
:::

### 🟩 Comprobación

Revisa el título, la descripción corta y la zona horaria. Guarda únicamente los cambios indicados por la docente y comprueba su efecto en la web pública.

## 2️⃣ Enlaces permanentes

Los **enlaces permanentes** son las direcciones que WordPress genera para identificar entradas y páginas.

Por ejemplo, una URL basada en identificadores puede ser menos comprensible que una que incluya el nombre de la publicación.

Entra en **Ajustes → Enlaces permanentes** y localiza las estructuras disponibles. Para el laboratorio se propone **Nombre de la entrada**, siempre que la prueba docente confirme que funciona correctamente.

### 🟧 Comprobación

Tras guardar, abre una entrada existente desde la web pública y verifica que su dirección funciona. Si todavía no hay contenido adecuado, esta prueba se completará en el bloque 4.5.

## 3️⃣ Lectura y comentarios

En **Ajustes → Lectura** se controla, entre otras opciones, qué muestra la portada: las últimas entradas o una página estática. La segunda opción requiere disponer de páginas creadas, por lo que la configuraremos definitivamente en el bloque 4.5.

En **Ajustes → Comentarios** se controla si se permiten comentarios y cómo se moderan. Conviene distinguir los comentarios de WordPress de un foro completo, que se trabajará posteriormente en el bloque 4.7.

### 🟥 Comprobación

Localiza ambos apartados, identifica sus opciones principales y deja anotados los valores iniciales. No actives registros públicos ni comentarios sin una necesidad concreta.

## 4️⃣ Usuarios y roles

WordPress permite crear cuentas para repartir responsabilidades sin compartir la contraseña de administración.

| Rol | Capacidades generales |
|---|---|
| Administrador | Gestiona la configuración y los usuarios de un sitio individual |
| Editor | Publica y administra contenidos, incluidos los de otros autores |
| Autor | Publica y administra sus propias entradas |
| Colaborador | Redacta entradas, pero necesita revisión para publicarlas |
| Suscriptor | Gestiona su perfil y accede a funciones habilitadas para usuarios registrados |

:::tip[Principio de mínimo privilegio]
Cada persona debe recibir únicamente los permisos que necesita para su tarea. No todos los usuarios deben ser administradores.
:::

### 🟪 Crear un usuario de prueba

1. Accede a **Usuarios → Añadir nuevo usuario**.
2. Introduce un nombre de usuario diferente al del administrador.
3. Utiliza una dirección de pruebas y una contraseña segura.
4. Selecciona el rol indicado por la docente.
5. Guarda el usuario y comprueba que aparece en **Usuarios → Todos los usuarios**.

### 🟦 Comprobar permisos

Cierra la sesión del administrador o abre una ventana privada e inicia sesión con la cuenta de prueba. Observa qué opciones del menú aparecen y qué acciones están permitidas. No basta con ver el nombre del rol: hay que comprobar sus permisos en la práctica.

## 5️⃣ Pruebas de funcionamiento

Al terminar el bloque, deberías poder demostrar que:

- El título, la descripción y la zona horaria están configurados según las indicaciones.
- Los enlaces permanentes funcionan.
- Comprendes la diferencia entre portada de entradas y portada estática.
- Puedes crear usuarios con distintos roles.
- Has comprobado al menos una diferencia real de permisos entre dos roles.

:::info[Continuidad]
En el bloque 4.5 crearemos páginas y entradas para completar las pruebas de portada, navegación y enlaces permanentes. En el bloque 4.7 trabajaremos plugins y foros; en el 4.8, seguridad y mantenimiento.
:::
