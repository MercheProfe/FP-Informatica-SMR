---
title: "4.8. Mantenimiento, seguridad y copias"
sidebar_position: 8
---

# 4.8. Mantenimiento, seguridad y copias de seguridad

Una web WordPress necesita mantenimiento incluso después de publicarse. En este bloque practicaremos actualizaciones, medidas básicas de seguridad y recuperación ante fallos.

:::warning[Laboratorio pendiente]
**No se han realizado todavía actualizaciones, copias ni restauraciones.** Antes de experimentar con cambios potencialmente destructivos, prepararemos una copia recuperable de `ut4-cms-laboratorio`.
:::

## 1️⃣ Actualizaciones de WordPress

WordPress está formado por el núcleo, los temas y los plugins. Cada componente puede recibir actualizaciones para corregir errores, mejorar funciones o solucionar vulnerabilidades.

### 🟩 Procedimiento de actualización controlada

1. Comprueba las versiones instaladas en **Escritorio → Actualizaciones**.
2. Revisa si existen actualizaciones disponibles y su finalidad.
3. Prepara una copia de seguridad antes de cambios importantes.
4. Actualiza los componentes indicados, **solo si hay actualizaciones disponibles**.
5. Verifica que funcionan el sitio público, el acceso administrativo y las funciones esenciales.
6. Registra las versiones anteriores y posteriores.

No debemos afirmar que se ha actualizado un componente si no había una actualización disponible.

## 2️⃣ Seguridad básica

La seguridad se apoya en medidas complementarias, no en un único plugin.

| Medida | Finalidad |
|---|---|
| Contraseñas robustas y únicas | Dificultar accesos no autorizados |
| Roles adecuados | Limitar acciones según responsabilidades |
| Actualizaciones | Corregir problemas conocidos |
| Plugins y temas fiables | Reducir software innecesario o inseguro |
| HTTPS | Proteger los datos durante su transmisión |
| Copias verificadas | Recuperar el sitio ante errores o pérdidas |

### 🟧 Comprobación

Revisa los roles de las cuentas, confirma que HTTPS sigue funcionando y localiza las opciones nativas de administración relevantes para la seguridad. No publiques credenciales ni actives el registro abierto sin necesidad.

## 3️⃣ Qué debe incluir una copia de seguridad

Una copia completa debe permitir recuperar tanto los **archivos** como la **base de datos**. Copiar únicamente `wp-content` no equivale necesariamente a una copia completa de la instalación.

| Componente | Ejemplos de contenido |
|---|---|
| Archivos | Núcleo, temas, plugins, medios y configuración |
| Base de datos | Páginas, entradas, usuarios, opciones y relaciones |

## 4️⃣ Copia del sitio en LocalWP

Local permite gestionar sitios locales y ofrece mecanismos de exportación/importación. La ruta y el formato exactos se confirmarán con la versión instalada en el laboratorio. También podremos inspeccionar los archivos y la base de datos por separado con fines didácticos.

### 🟥 Prueba prevista

1. Detén los cambios en el sitio y registra su estado.
2. Exporta o crea una copia recuperable mediante el procedimiento validado en LocalWP.
3. Guarda la copia fuera de la carpeta de trabajo del sitio.
4. Comprueba que el archivo de copia existe y tiene un tamaño razonable.
5. Documenta qué incluye y qué no incluye.

:::info[Una copia no está validada hasta restaurarla]
La existencia de un archivo no demuestra por sí sola que la recuperación vaya a funcionar.
:::

## 5️⃣ Restauración y comprobación

Para no poner en riesgo el sitio principal, restauraremos preferentemente la copia en una **instancia de prueba independiente**, si el procedimiento de LocalWP lo permite.

### 🟪 Prueba prevista

1. Prepara una instancia separada para la restauración.
2. Importa la copia siguiendo el método ensayado.
3. Comprueba que se conservan páginas, entradas, medios, usuarios y ajustes esperados.
4. Prueba la navegación y el inicio de sesión.
5. Registra incidencias y diferencias entre original y copia.

## 6️⃣ Diagnóstico de incidencias

Ante un fallo, identifica primero el síntoma: error de acceso, página inexistente, plugin que falla o problema de conexión con la base de datos. Registra los cambios recientes y realiza comprobaciones reversibles antes de modificar archivos o datos.

| Síntoma | Primera comprobación |
|---|---|
| No abre la web local | Sitio iniciado en LocalWP y dirección correcta |
| No entra en administración | URL, usuario y credenciales |
| Error tras activar un plugin | Compatibilidad y cambio reciente |
| Enlace que no funciona | Publicación, navegación y enlaces permanentes |
| Problema de HTTPS | Certificado y confianza local |

## 7️⃣ Evidencias del bloque

Registro de versiones, medidas de seguridad revisadas, copia identificable, **restauración funcional** y lista de pruebas posteriores. Relación principal con RA1.e, RA1.g, RA1.i y RA1.j.
