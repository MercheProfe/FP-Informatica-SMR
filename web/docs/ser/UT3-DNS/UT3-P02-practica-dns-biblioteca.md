---
sidebar_position: 7
title: "P02. Configuración autónoma de una zona DNS"
description: "Práctica autónoma: creación de la zona biblioteca.test, registros DNS y verificación desde Windows."
---

# P02. Configuración autónoma de una zona DNS: biblioteca.test

**Unidad:** UT3 · Servicios de resolución de nombres (DNS)  
**Resultados de aprendizaje:** RA2 · CE d), f) y h)  
**Duración orientativa:**  2 horas  
**Modalidad:** individual

## 1️⃣ Situación de partida

En la práctica guiada hemos instalado y configurado DNS en Windows Server utilizando la zona `empresa.test`.

Ahora una biblioteca municipal quiere disponer de nombres fáciles de recordar para identificar sus servicios internos. Tu trabajo consiste en **crear y comprobar una zona DNS nueva**, aplicando de forma autónoma lo aprendido.

Trabajarás con las máquinas `SER-Servidor` y `SER-Cliente` de VirtualBox. El servidor DNS y DHCP ya están instalados y funcionando.

:::warning[Conserva el laboratorio]
No elimines ni modifiques la zona `empresa.test`. No reinstales el rol DNS, no cambies el ámbito DHCP y no alteres las direcciones IP reales de las máquinas. La nueva zona debe coexistir con la anterior.
:::

## 2️⃣ Objetivos

Al terminar serás capaz de:

- Crear y administrar una nueva zona de búsqueda directa en Windows Server.
- Configurar registros A, CNAME y MX según las necesidades de una organización.
- Identificar y comprobar la resolución inversa mediante registros PTR.
- Consultar un servidor DNS desde un cliente Windows y diagnosticar respuestas incorrectas.
- Documentar una configuración técnica y justificar los resultados.

## 3️⃣ Datos del escenario

La biblioteca utilizará el dominio interno **`biblioteca.test`**. No es necesario instalar una página web ni un servicio de correo: solo configuraremos los nombres DNS.

Antes de empezar, anota el direccionamiento real del laboratorio:

| Dato | Valor real |
|---|---|
| Dirección IPv4 de `SER-Servidor` | __________________ |
| Dirección IPv4 de `SER-Cliente` | __________________ |
| Máscara de red | __________________ |
| Servidor DNS configurado en el cliente | __________________ |

El responsable de la biblioteca solicita estos nombres:

| Nombre completo | Tipo | Requisito |
|---|---|---|
| `dns.biblioteca.test` | A | Debe apuntar a la IP de `SER-Servidor` |
| `catalogo.biblioteca.test` | A | Debe apuntar a la IP de `SER-Cliente` |
| `www.biblioteca.test` | CNAME | Debe ser un alias de `catalogo.biblioteca.test` |
| `correo.biblioteca.test` | A | Debe apuntar a la IP de `SER-Cliente` |
| `biblioteca.test` | MX | Servidor `correo.biblioteca.test`, prioridad 10 |

:::info[Sobre las direcciones]
En este escenario varios nombres pueden apuntar a la misma IP. Esto no significa que los servicios web o de correo estén instalados: solo estamos configurando registros DNS.
:::

## 4️⃣ Tareas que debes realizar

### 🟩 Tarea 1. Comprobación inicial

1. Comprueba que `SER-Servidor` y `SER-Cliente` están conectados a la red interna.
2. Comprueba que el cliente utiliza como servidor DNS la IP de `SER-Servidor`.
3. Verifica que la zona `empresa.test` continúa funcionando.
4. Anota los datos reales de la tabla anterior.

### 🟧 Tarea 2. Nueva zona de búsqueda directa

1. Abre la herramienta de administración DNS en Windows Server.
2. Crea una **zona de búsqueda directa primaria** llamada `biblioteca.test`.
3. Comprueba que aparece en el administrador DNS y que contiene los registros creados automáticamente para la zona.
4. Explica brevemente qué función tienen los registros SOA y NS que encuentres.

### 🟥 Tarea 3. Registros de la biblioteca

1. Crea los registros A solicitados en la tabla del escenario.
2. Crea el alias `www` apuntando al nombre completo `catalogo.biblioteca.test`.
3. Crea el registro MX de la zona con prioridad 10.
4. Revisa los registros creados y comprueba que los nombres y las direcciones coinciden con los requisitos.

### 🟪 Tarea 4. Resolución inversa

1. Localiza la zona inversa correspondiente a la subred del laboratorio.
2. Si ya existe, **reutilízala**: no crees otra zona inversa para la misma subred.
3. Comprueba si existe un registro PTR para la IP del servidor.
4. Explica por qué **una misma IP no puede distinguir entre `servidor.empresa.test` y `dns.biblioteca.test` mediante una consulta inversa**, aunque ambos nombres puedan resolverse hacia la misma IP.

:::tip[Pista]
La consulta inversa parte de una dirección IP, no del nombre de la zona directa. No es necesario crear un segundo PTR para completar esta práctica.
:::

### 🟦 Tarea 5. Consultas y diagnóstico

Desde `SER-Cliente`, utiliza `nslookup` para comprobar:

1. La dirección IPv4 de `dns.biblioteca.test`.
2. La dirección IPv4 de `catalogo.biblioteca.test`.
3. El alias `www.biblioteca.test` y su destino.
4. El registro MX de `biblioteca.test`.
5. La consulta inversa de la IP de `SER-Servidor`.
6. Que `servidor.empresa.test` sigue resolviéndose correctamente.

Incluye los comandos utilizados y sus resultados. Si una consulta falla, revisa el servidor consultado, el nombre solicitado, el tipo de registro y los datos configurados antes de pedir ayuda.

## 5️⃣ Cuestiones de razonamiento

Responde con tus propias palabras:

1. ¿Por qué `empresa.test` y `biblioteca.test` pueden funcionar en el mismo servidor DNS?
2. ¿Qué diferencia existe entre el registro A de `catalogo` y el CNAME de `www`?
3. ¿Por qué el registro MX debe indicar un nombre de servidor y no simplemente una dirección IP?
4. ¿Qué diferencia hay entre comprobar una respuesta DNS y comprobar que una página web funciona?
5. Si `catalogo.biblioteca.test` cambia de dirección IP, ¿qué registro modificarías? ¿Sería necesario modificar también el CNAME `www`? Justifica tu respuesta.

## 6️⃣ Documento que debes entregar

Entrega **un único documento PDF**, redactado y organizado profesionalmente, con esta estructura:

1. **Portada:** módulo, unidad, título de la práctica, nombre y fecha.
2. **Índice:** apartados del documento y sus páginas.
3. **Objetivo y escenario:** breve explicación del trabajo realizado.
4. **Configuración inicial:** tabla con el direccionamiento real del laboratorio.
5. **Desarrollo:** explicación ordenada de las tareas 2, 3 y 4, acompañada de capturas relevantes.
6. **Comprobaciones:** comandos `nslookup`, resultados y breve interpretación de cada uno.
7. **Respuestas razonadas:** las cinco cuestiones del apartado 5.
8. **Conclusión:** qué has conseguido, qué problema has encontrado y cómo lo has resuelto.

**Requisitos de presentación:** utiliza títulos y subtítulos, numeración de páginas, tablas legibles y capturas donde se vea claramente la información relevante. No entregues una sucesión de capturas sin explicación.

:::warning[Antes de entregar]
Comprueba que ambas zonas (`empresa.test` y `biblioteca.test`) siguen disponibles y que no has alterado el funcionamiento de DHCP.
:::
