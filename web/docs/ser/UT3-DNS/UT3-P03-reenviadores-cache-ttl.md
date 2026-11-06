---
sidebar_position: 9
---

# P03. Reenviadores, caché y TTL en DNS

**Módulo:** Servicios en Red — 2.º SMR  
**Unidad:** UT3. Servicios de resolución de nombres  
**Modalidad:** Individual

## 1️⃣ Objetivo

En esta práctica vamos a comprobar cómo nuestro servidor DNS puede resolver nombres de Internet utilizando reenviadores y cómo almacena temporalmente las respuestas en su caché.

Aplicaremos lo aprendido en la práctica guiada, manteniendo la configuración DNS realizada en la P02.

## 2️⃣ Situación inicial

Disponemos de nuestro laboratorio de VirtualBox:

- **SER-Servidor:** Windows Server, con DNS y la zona `biblioteca.test` configurados.
- **SER-Cliente:** Windows, configurado para utilizar nuestro servidor DNS.
- **Red interna:** permite la comunicación entre las máquinas.
- **Adaptador NAT:** permite la salida controlada a Internet desde el servidor.

La zona `biblioteca.test` debe continuar funcionando durante toda la práctica.

## 3️⃣ Actividades

### 🟩 Actividad 1. Comprobaciones iniciales

1. Arranca las máquinas necesarias.
2. Comprueba que el cliente puede resolver un nombre de `biblioteca.test`.
3. Comprueba que el servidor tiene conectividad exterior.
4. Realiza una consulta DNS externa desde el servidor.

**Evidencia:** captura de las consultas DNS realizadas.

### 🟧 Actividad 2. Configuración del reenviador

1. Accede al Administrador DNS de Windows Server.
2. Comprueba los reenviadores configurados.
3. Configura `1.1.1.1` como reenviador, si todavía no está configurado.
4. Consulta un dominio externo utilizando expresamente el DNS local:

   ```cmd
   nslookup www.microsoft.com 127.0.0.1
   ```
5. Comprueba que el servidor devuelve una respuesta válida.

**Evidencia:** captura de la configuración del reenviador y del resultado de la consulta.

### 🟥 Actividad 3. Caché y TTL

En PowerShell, ejecuta:

```powershell
Resolve-DnsName www.microsoft.com -Server 127.0.0.1 -Type CNAME
```

1. Anota el TTL de uno de los registros devueltos.
2. Espera aproximadamente 20 segundos.
3. Repite la consulta.
4. Compara los resultados.

**Evidencia:** resultados de ambas consultas y explicación breve de la diferencia observada.

### 🟪 Actividad 4. Vaciado de la caché

En PowerShell, ejecuta:

```powershell
Clear-DnsServerCache -Force
```

1. Repite la consulta DNS anterior.
2. Observa el TTL obtenido.
3. Explica si ha cambiado respecto al valor anterior.

Recuerda que el reenviador externo también puede disponer de su propia caché.

**Evidencia:** resultado de la nueva consulta.

### 🟦 Actividad 5. Comprobación final

Desde `SER-Cliente`:

1. Comprueba la resolución de un nombre de `biblioteca.test`.
2. Comprueba la resolución de `www.microsoft.com`.
3. Verifica que el cliente utiliza nuestro servidor DNS.

## 4️⃣ Cuestiones

Responde brevemente y con tus propias palabras:

1. ¿Para qué sirve un reenviador DNS?
2. ¿Por qué disminuye el TTL de un registro almacenado en caché?
3. ¿Qué diferencia existe entre vaciar la caché DNS del cliente y la del servidor?

## 5️⃣ Entrega

Entrega en Classroom **un único documento PDF** que contenga:

- Identificación del alumno y título de la práctica.
- Capturas relevantes de las actividades, acompañadas de una breve explicación.
- Resultados de las comprobaciones.
- Respuestas a las tres cuestiones.
- Una conclusión breve indicando si el DNS local e Internet se resuelven correctamente.

No es necesario incluir capturas de todos los pasos ni copiar la teoría del tema.

:::warning[Importante]
Conserva la configuración de `biblioteca.test` para las siguientes prácticas.
:::
