---
title: "Práctica 4. Analizamos DHCP con Wireshark"
---

# Práctica 4. Analizamos DHCP con Wireshark

## 1️⃣ Objetivos

Vamos a provocar una negociación DHCP y observarla con **Wireshark**.

Al finalizar deberás ser capaz de:

- capturar DORA;
- identificar Discover, Offer, Request y ACK;
- reconocer la MAC del cliente;
- localizar la IP ofrecida;
- identificar el servidor DHCP;
- reconocer broadcast, UDP y los puertos 67/68;
- localizar opciones DHCP;
- relacionar los paquetes con `ipconfig /all`.

## 2️⃣ Preparar el escenario

Partimos de:

```text
SER-Servidor ───── Red del laboratorio ───── SER-Cliente
Servidor DHCP                               Cliente DHCP
```

Antes de capturar:

1. comprueba que DHCP funciona;
2. identifica la interfaz de red utilizada;
3. consulta la configuración actual del cliente:

```cmd
ipconfig /all
```

Anota la MAC del adaptador:

```text
MAC:
____________________________
```

## 3️⃣ Preparar Wireshark

Abre Wireshark y selecciona la interfaz por la que circula el tráfico de nuestro laboratorio.

Inicia la captura **antes** de provocar la nueva solicitud DHCP.

:::warning[Interfaz correcta]
Si capturas en otro adaptador, DHCP puede estar funcionando y aun así no aparecer en tu captura.
:::

## 4️⃣ Provocar la negociación

En `SER-Cliente` libera la concesión:

```cmd
ipconfig /release
```

Después solicita nuevamente configuración:

```cmd
ipconfig /renew
```

Cuando el proceso termine, detén la captura.

## 5️⃣ Filtrar DHCP

Utiliza un filtro de visualización DHCP adecuado en Wireshark.

Localiza los mensajes:

```text
Discover
Offer
Request
ACK
```

## 6️⃣ Analizar DORA

Completa utilizando **los valores reales de tu captura**:

| Mensaje | MAC cliente | IP origen | IP destino | Puerto origen | Puerto destino |
|---|---|---|---|---|---|
| Discover | | | | | |
| Offer | | | | | |
| Request | | | | | |
| ACK | | | | | |

Marca qué mensajes utilizan broadcast y explica por qué.

## 7️⃣ Analizar Discover

Selecciona el `DHCP Discover`.

Localiza:

- MAC del cliente;
- direcciones IP origen y destino;
- protocolo UDP;
- puertos;
- información DHCP disponible.

Responde:

1. ¿Coincide la MAC con la obtenida mediante `ipconfig /all`?
2. ¿Por qué el cliente puede aparecer inicialmente sin una IP válida?
3. ¿Por qué necesita broadcast?

## 8️⃣ Analizar Offer

Selecciona el `DHCP Offer`.

Anota:

```text
Servidor que responde:
____________________________

IP ofrecida:
____________________________
```

Comprueba si la IP pertenece al rango del ámbito.

```text
¿Pertenece al rango?  Sí / No
```

Justifica la respuesta.

## 9️⃣ Analizar Request

Selecciona el `DHCP Request`.

Localiza la dirección solicitada y, cuando aparezca, la identificación del servidor seleccionado.

```text
IP solicitada:
____________________________
```

Relaciona esta dirección con el Offer anterior.

## 🔟 Analizar ACK

Selecciona el `DHCP ACK`.

Comprueba la confirmación de la concesión y localiza las opciones DHCP que aparezcan en tu captura.

| Información | Valor observado |
|---|---|
| IP confirmada | |
| Máscara | |
| Duración de concesión | |
| Gateway, si aparece | |
| DNS, si aparece | |
| Servidor DHCP | |

## 1️⃣1️⃣ Comparar captura y cliente

Después de completar DORA ejecuta:

```cmd
ipconfig /all
```

Compara:

| Dato | Wireshark | `ipconfig /all` | ¿Coincide? |
|---|---|---|---|
| IP | | | |
| Máscara | | | |
| Servidor DHCP | | | |
| Gateway | | | |
| DNS | | | |

:::info[Evidencia]
La finalidad es demostrar que la configuración que vemos en Windows procede del intercambio DHCP que acabamos de capturar.
:::

## 1️⃣2️⃣ Interpretación final

Responde:

1. ¿Qué paquete inicia la negociación?
2. ¿Qué servidor respondió?
3. ¿Qué dirección ofreció?
4. ¿Qué dirección solicitó el cliente?
5. ¿Qué paquete confirma finalmente la concesión?
6. ¿Qué puertos UDP has observado?
7. ¿Dónde aparece broadcast?
8. ¿Qué opciones DHCP has encontrado?
9. ¿Coincide la captura con la configuración final del cliente?

## 1️⃣3️⃣ Evidencias a entregar

Incluye únicamente capturas útiles:

- secuencia DORA visible;
- detalle de Discover;
- detalle de Offer;
- detalle de Request;
- detalle de ACK;
- `ipconfig /all` final.

Cada captura debe ir acompañada de una breve explicación de qué demuestra.
