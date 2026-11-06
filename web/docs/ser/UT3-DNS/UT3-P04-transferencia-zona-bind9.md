---
sidebar_position: 10
---

# P04. Transferencia de zona DNS a Ubuntu/BIND9

**Módulo:** Servicios en Red — 2.º SMR  
**Unidad:** UT3. Servicios de resolución de nombres  
**Modalidad:** Individual

## 1️⃣ Objetivo

Vamos a configurar un servidor DNS secundario en Ubuntu Server utilizando BIND9.

El servidor secundario recibirá una copia de la zona `biblioteca.test` desde Windows Server y comprobaremos que se actualiza cuando modificamos un registro en el servidor primario.

## 2️⃣ Situación inicial

Partimos del laboratorio utilizado en las prácticas anteriores:

- **SER-Servidor:** Windows Server con DNS primario y la zona `biblioteca.test`.
- **SER-Linux:** Ubuntu Server, donde utilizaremos BIND9 como servidor DNS secundario.
- **SER-Cliente:** Windows, para realizar comprobaciones adicionales.
- **Red interna:** todas las máquinas deben poder comunicarse.

Ya hemos realizado una configuración guiada de transferencia de zona con `empresa.test`.

Ahora repetiremos el procedimiento utilizando `biblioteca.test`.

## 3️⃣ Actividades

### 🟩 Actividad 1. Comprobaciones iniciales

1. Arranca Windows Server y Ubuntu Server.
2. Comprueba las direcciones IP de ambas máquinas.
3. Verifica que existe comunicación entre ellas.
4. Comprueba que `biblioteca.test` funciona correctamente en el DNS primario.

**Evidencia:** captura de las comprobaciones realizadas.

### 🟧 Actividad 2. Preparar Windows Server

En el Administrador DNS:

1. Selecciona la zona `biblioteca.test`.
2. Accede a sus propiedades.
3. Habilita la transferencia de zona.
4. Autoriza la transferencia únicamente a la dirección IP del servidor Ubuntu.
5. Comprueba la configuración del registro SOA y anota su número de serie.

**Evidencia:** captura de la configuración de transferencia de zona y del número de serie SOA.

### 🟥 Actividad 3. Configurar BIND9 como secundario

En Ubuntu Server:

1. Comprueba que BIND9 está instalado.
2. Abre el archivo de configuración de zonas correspondiente.
3. Añade la declaración de `biblioteca.test` como zona secundaria.
4. Indica la dirección IP de Windows Server como servidor primario.
5. Comprueba la sintaxis de la configuración.
6. Reinicia o recarga BIND9.

Utiliza el procedimiento trabajado en la práctica guiada con `empresa.test`.

**Evidencia:** captura de la declaración de la zona y de la comprobación de configuración.

### 🟪 Actividad 4. Verificar la transferencia

Desde Ubuntu Server:

1. Consulta directamente su servicio DNS para resolver un registro A de `biblioteca.test`.
2. Consulta otro registro de la zona.
3. Comprueba que los resultados coinciden con los obtenidos desde el DNS primario.
4. Consulta el registro SOA de la zona secundaria y anota su número de serie.

Puedes utilizar `dig`, indicando expresamente el servidor DNS al que diriges la consulta.

**Evidencia:** resultados de las consultas y número de serie SOA.

### 🟦 Actividad 5. Comprobar una actualización

En Windows Server:

1. Añade un registro A nuevo a `biblioteca.test`:
   - **Nombre:** `prestamos`
   - **Dirección IPv4:** una dirección válida de la red interna, indicada por el profesor.
2. Comprueba que el registro se resuelve desde el servidor primario.
3. Comprueba el número de serie SOA del primario y, si no ha aumentado, actualízalo siguiendo el procedimiento explicado en clase.
4. Espera la actualización del secundario o utiliza el procedimiento de actualización trabajado en el laboratorio.
5. Consulta `prestamos.biblioteca.test` directamente desde Ubuntu.
6. Comprueba que el número de serie SOA del secundario coincide con el del primario.

**Evidencia:** capturas de las consultas antes y después de la actualización y de los números de serie SOA.

## 4️⃣ Cuestiones

Responde brevemente:

1. ¿Qué diferencia existe entre un servidor DNS primario y uno secundario?
2. ¿Qué función tiene el número de serie del registro SOA?
3. ¿Cómo puedes demostrar que Ubuntu ha recibido correctamente la actualización de `biblioteca.test`?

## 5️⃣ Entrega

Entrega en Classroom **un único documento PDF** con:

- Identificación del alumno y título de la práctica.
- Configuración esencial de la transferencia de zona en Windows Server.
- Declaración de la zona secundaria en BIND9.
- Capturas de las consultas DNS realizadas.
- Comprobación de la actualización del registro `prestamos.biblioteca.test`.
- Respuestas a las tres cuestiones.
- Conclusión breve sobre el funcionamiento del servidor secundario.

No es necesario documentar de nuevo la instalación de las máquinas ni repetir la teoría de DNS.

:::warning[Importante]
Conserva las zonas y registros de las prácticas anteriores. No elimines ni sustituyas `empresa.test`.
:::
