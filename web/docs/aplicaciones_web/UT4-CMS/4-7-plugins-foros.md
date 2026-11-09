---
title: "4.7. Plugins y foros"
sidebar_position: 7
---

# 4.7. Plugins, funcionalidades y foros

Los **plugins** amplían las funciones de WordPress sin modificar su núcleo. Pueden añadir formularios, herramientas de administración o sistemas de foros. Deben instalarse solo cuando respondan a una necesidad concreta.

:::info[Compatibilidad]
Antes de instalar un plugin, comprueba que sea compatible con la versión de WordPress y con los demás componentes del sitio.
:::

## 1️⃣ Qué es un plugin

Un plugin es un componente de software que se integra con WordPress. Instalarlo no significa necesariamente que esté activo, y activarlo no garantiza que esté correctamente configurado.

| Estado | Significado |
|---|---|
| Instalado | Sus archivos están disponibles en WordPress |
| Activo | WordPress ejecuta su funcionalidad |
| Desactivado | Permanece instalado, pero no ejecuta sus funciones habituales |
| Eliminado | Se retiran los archivos del plugin; pueden quedar datos según el plugin |

## 2️⃣ Seleccionar e instalar plugins

Antes de instalar, revisa la finalidad, el desarrollador, la compatibilidad con tu WordPress, el mantenimiento y los permisos o datos que requiere.

### 🟩 Instalación guiada

1. Entra en **Plugins → Añadir nuevo plugin**.
2. Busca el plugin indicado para la práctica.
3. Comprueba su ficha y pulsa **Instalar ahora**.
4. Pulsa **Activar** y localiza sus opciones de configuración.
5. Comprueba la funcionalidad en la web pública o en el escritorio.
6. Localiza la carpeta creada en `wp-content/plugins`.

:::warning[Instala solo lo necesario]
Evita plugins de origen desconocido, duplicados o sin mantenimiento. Un plugin puede introducir errores, vulnerabilidades o incompatibilidades.
:::

## 3️⃣ Configuración, desactivación y eliminación

Desactivar sirve para comprobar si una función o incidencia está relacionada con un plugin. Eliminar es una operación diferente: puede dejar de estar disponible y, dependiendo del plugin, conservar o borrar datos asociados.

### 🟧 Prueba de funcionamiento

Activa una función, comprueba su efecto, desactiva el plugin y observa qué cambia. Antes de eliminar un plugin que almacene contenidos, comprueba cómo conservarlos o exportarlos.

## 4️⃣ Qué es un foro y para qué sirve

Un **foro** organiza conversaciones en temas y respuestas. Se diferencia de los comentarios de una entrada porque dispone de espacios de discusión, temas propios y reglas de participación.

| Elemento | Ejemplo |
|---|---|
| Foro | Soporte técnico |
| Tema | No puedo iniciar sesión |
| Respuesta | Pasos de comprobación |
| Regla | No publicar contraseñas ni datos personales |

## 5️⃣ Crear un foro con bbPress

**bbPress** es un plugin que permite añadir foros a WordPress. Su interfaz puede variar según la versión instalada. En esta actividad se creará un foro y se comprobarán las reglas de acceso.

### 🟥 Procedimiento

1. Instala y activa bbPress desde el repositorio de plugins.
2. Localiza las nuevas opciones del escritorio.
3. Crea un foro llamado **Ayuda del sitio**.
4. Publica un tema de prueba y una respuesta.
5. Establece normas de participación visibles.
6. Comprueba el acceso con una cuenta administradora y otra con permisos limitados.
7. Registra qué acciones puede realizar cada cuenta.

:::tip[Reglas mínimas del foro]
Utiliza lenguaje respetuoso, no publiques información personal ni credenciales, escribe títulos descriptivos y mantén cada conversación dentro del tema correspondiente.
:::

## 6️⃣ Comprobaciones y evidencias

- El plugin está instalado, activo y configurado.
- Se identifica su carpeta en `wp-content/plugins`.
- El foro se puede abrir y contiene un tema con respuestas.
- Se han definido y comprobado reglas de acceso.
- Se han probado las diferencias de permisos entre usuarios.

**Aprendizajes relacionados:** instalación de extensiones, creación de foros y comprobación de permisos y funcionamiento.
