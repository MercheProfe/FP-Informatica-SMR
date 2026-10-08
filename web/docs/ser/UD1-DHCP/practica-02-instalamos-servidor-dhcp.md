---
title: "Práctica 2. Instalamos nuestro servidor DHCP"
---

# Práctica 2. Instalamos nuestro servidor DHCP

## 1️⃣ Objetivos

Vamos a convertir `SER-Servidor` en nuestro primer servidor DHCP y comprobaremos el resultado desde `SER-Cliente`.

Al finalizar deberás haber:

- comprobado la configuración de red del servidor;
- instalado el rol DHCP;
- creado un ámbito;
- definido un rango de direcciones;
- activado el ámbito;
- configurado el cliente para obtener la dirección automáticamente;
- obtenido una primera concesión;
- comprobado la concesión desde servidor y cliente.

## 2️⃣ Escenario

Trabajaremos con nuestras dos máquinas virtuales:

```text
SER-Servidor ───── Red del laboratorio ───── SER-Cliente
Windows Server                              Windows
Servidor DHCP                               Cliente DHCP
```

:::warning[Antes de instalar]
El servidor debe disponer de una **dirección IP estática**. Anota la configuración real de tu laboratorio antes de continuar.
:::

## 3️⃣ Comprobación inicial del servidor

En `SER-Servidor`, ejecuta:

```cmd
ipconfig /all
```

Anota:

| Parámetro | Valor |
|---|---|
| Dirección IPv4 | |
| Máscara | |
| Gateway, si existe | |
| DNS, si existe | |
| Adaptador utilizado | |

Comprueba que la dirección del servidor pertenece a la red del laboratorio y que no depende de DHCP.

## 4️⃣ Instalación del rol DHCP

Desde **Administrador del servidor**:

1. abre **Agregar roles y características**;
2. selecciona el servidor local;
3. selecciona el rol **Servidor DHCP**;
4. acepta las características necesarias;
5. completa la instalación.

Al finalizar, comprueba que el rol aparece instalado.

## 5️⃣ Crear el primer ámbito

Abre la consola de administración DHCP y crea un nuevo ámbito IPv4.

Antes de introducir los datos, completa tu planificación:

| Parámetro | Valor |
|---|---|
| Nombre del ámbito | |
| Red | |
| Máscara/prefijo | |
| Primera IP del rango | |
| Última IP del rango | |
| Duración de concesión | |

:::warning[Comprueba el subnetting]
La dirección de red y el broadcast no pueden formar parte de las direcciones entregadas a hosts.
:::

## 6️⃣ Configurar y activar el ámbito

Introduce el rango planificado.

En esta primera práctica configura únicamente las opciones que correspondan realmente al diseño actual del laboratorio. No inventes un gateway o un DNS que no exista.

Activa el ámbito.

## 7️⃣ Configurar `SER-Cliente`

En `SER-Cliente`, configura IPv4 para obtener la dirección automáticamente mediante DHCP.

Después fuerza una solicitud si es necesario:

```cmd
ipconfig /renew
```

Consulta el resultado:

```cmd
ipconfig /all
```

## 8️⃣ Comprobar la primera concesión

Anota desde el cliente:

| Parámetro | Valor recibido |
|---|---|
| DHCP habilitado | |
| Dirección IPv4 | |
| Máscara | |
| Servidor DHCP | |
| Concesión obtenida | |
| Concesión expira | |

Ahora abre las **concesiones de direcciones** del ámbito en `SER-Servidor`.

Comprueba que aparece el cliente.

## 9️⃣ Demostración

Debes poder demostrar:

```text
Configuración del ámbito
        ↓
Concesión registrada en servidor
        ↓
Configuración recibida por cliente
```

Responde:

1. ¿La IP del cliente pertenece al rango definido?
2. ¿Qué servidor se la ha proporcionado?
3. ¿Coinciden los datos del cliente con la concesión registrada?
4. ¿Qué ocurriría si el ámbito estuviera desactivado?

## 🔟 Evidencias

Guarda evidencias de:

- configuración del ámbito;
- concesión mostrada por el servidor;
- salida relevante de `ipconfig /all` en el cliente.

No es necesario capturar pantallas que no aporten información.
