---
sidebar_position: 2
title: "P01. Resolución de nombres: hosts y DNS"
description: "Comparación práctica entre la resolución local mediante hosts y las consultas a un servidor DNS."
---

# P01. Resolución de nombres: archivo hosts y DNS

**Unidad:** UT3 — DNS · **CE:** RA2 a), b) · **Duración orientativa:** 50–60 minutos  
**Entorno:** Windows (cliente o equipo de prácticas) con acceso a una consola. No es necesario instalar un servidor DNS.

## 1️⃣ Objetivo

Comprobar la diferencia entre **resolver un nombre mediante el archivo local `hosts`** y **consultar un servidor DNS**.

Al finalizar, debes poder identificar qué mecanismo interviene y justificar cuándo conviene utilizar cada uno.

## 2️⃣ Escenario

Una empresa quiere acceder a un servicio interno mediante un nombre fácil de recordar. Antes de desplegar un servidor DNS, se realizará una prueba con una entrada local.

Usaremos estos datos **solo para la práctica**:

| Dato | Valor |
|---|---|
| Nombre de prueba | `ser-prueba.test` |
| Dirección asociada | `127.0.0.1` (equipo local) |
| Archivo de Windows | `C:\Windows\System32\drivers\etc\hosts` |

:::info[¿Por qué 127.0.0.1?]
Es la dirección de *loopback*: apunta al propio equipo. Permite comprobar la resolución sin depender de otro servidor ni de la conexión a Internet.
:::

## 3️⃣ Tareas

### 🟩 A. Examina la configuración actual

1. Consulta la configuración IP y los servidores DNS asignados al equipo.
2. Realiza una consulta DNS del nombre `www.example.com`.
3. Anota el servidor DNS utilizado y el resultado de la consulta.

**Comandos de referencia:**

```powershell
ipconfig /all
nslookup www.example.com
```

### 🟧 B. Comprueba la resolución local

1. Comprueba si `ser-prueba.test` se resuelve antes de modificar nada.
2. Abre el archivo `hosts` con permisos de administrador y **añade al final** la entrada correspondiente al escenario.
3. Vacía la caché DNS del cliente.
4. Comprueba la resolución de `ser-prueba.test` con `ping -4`.
5. Consulta el mismo nombre con `nslookup`.
6. Compara los resultados.

**Comandos de referencia:**

```powershell
ipconfig /flushdns
ping -4 ser-prueba.test
nslookup ser-prueba.test
```

:::warning[No alteres otras entradas]
No borres ni modifiques las líneas existentes del archivo `hosts`. No cambies la configuración de red ni del servidor DNS. Al terminar, elimina **solo** la línea que hayas añadido.
:::

### 🟥 C. Comprueba y restaura

1. Elimina la entrada de `ser-prueba.test` del archivo `hosts`.
2. Vacía de nuevo la caché DNS.
3. Repite la comprobación con `ping -4` y confirma que la entrada local ya no se utiliza.

## 4️⃣ Cuestiones

1. ¿Qué diferencia hay entre una entrada en `hosts` y un registro almacenado en un servidor DNS?
2. ¿Por qué `ping` puede utilizar la entrada de `hosts` mientras que `nslookup` no muestra esa misma asociación?
3. ¿Qué inconveniente tendría mantener manualmente un archivo `hosts` en 30 ordenadores?
4. Si `nslookup` devuelve una IP, ¿significa necesariamente que el servicio web está funcionando? Justifica tu respuesta.

## 5️⃣ Entrega

Entrega un documento breve con:

- Captura o salida de `ipconfig /all` donde se identifique el DNS configurado (oculta datos personales si aparecen).
- Captura de la línea añadida en `hosts`.
- Resultados de `ping -4 ser-prueba.test` y `nslookup ser-prueba.test` **con la entrada activa**.
- Respuestas a las cuatro cuestiones.
- Confirmación de que has retirado la entrada al finalizar.

:::tip[Qué se valora]
La correcta interpretación de los resultados y la comparación entre los mecanismos de resolución; no basta con adjuntar capturas.
:::
