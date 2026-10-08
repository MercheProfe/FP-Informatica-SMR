---
title: "Práctica 3. Administramos DHCP"
---

# Práctica 3. Administramos DHCP

## 1️⃣ Objetivos

Partiremos del servidor DHCP ya operativo para administrar sus principales elementos.

Trabajaremos con:

- exclusiones;
- reservas;
- duración de concesión;
- gateway y DNS cuando correspondan al escenario;
- liberación y renovación de concesiones;
- comprobación de los cambios.

## 2️⃣ Estado inicial

Antes de modificar nada, ejecuta en `SER-Cliente`:

```cmd
ipconfig /all
```

Anota:

| Parámetro | Antes de los cambios |
|---|---|
| IPv4 | |
| Máscara | |
| Servidor DHCP | |
| Gateway | |
| DNS | |
| Concesión obtenida | |
| Concesión expira | |

## 3️⃣ Crear una exclusión

Selecciona una dirección o pequeño intervalo **dentro del rango del ámbito** y configúralo como exclusión.

Anota:

```text
Exclusión creada:
____________________________
```

Explica:

1. ¿Estaba esa dirección dentro del rango DHCP?
2. ¿Por qué deja de estar disponible para asignación dinámica?
3. ¿Sería necesario excluir una dirección que ya estuviera fuera del rango?

## 4️⃣ Comprobar la duración de concesión

Consulta la duración configurada en el ámbito.

Anótala:

```text
Duración:
____________________________
```

Relaciona este valor con:

```cmd
ipconfig /all
```

Compara **Concesión obtenida** y **Concesión expira**.

## 5️⃣ Liberar la concesión

En `SER-Cliente`:

```cmd
ipconfig /release
```

A continuación consulta:

```cmd
ipconfig /all
```

Describe qué ha cambiado.

:::warning[Observa antes de renovar]
No ejecutes inmediatamente el siguiente comando. Primero comprueba qué efecto ha producido `release`.
:::

## 6️⃣ Renovar la concesión

Ejecuta:

```cmd
ipconfig /renew
```

y después:

```cmd
ipconfig /all
```

Anota:

| Parámetro | Después de renovar |
|---|---|
| IPv4 | |
| Servidor DHCP | |
| Concesión obtenida | |
| Concesión expira | |

¿Ha cambiado necesariamente la dirección IP? Explica el resultado observado.

## 7️⃣ Crear una reserva

Obtén la dirección física del adaptador utilizado por `SER-Cliente`.

Puedes localizarla con:

```cmd
ipconfig /all
```

o:

```cmd
getmac
```

Anota:

```text
MAC del adaptador:
____________________________
```

Crea una reserva para ese cliente utilizando una dirección adecuada de tu diseño.

```text
IP reservada:
____________________________
```

Después libera y renueva la configuración:

```cmd
ipconfig /release
ipconfig /renew
```

Comprueba qué dirección recibe.

:::warning[Adaptador correcto]
Un equipo puede tener varias direcciones MAC. Utiliza la correspondiente a la interfaz conectada a la red del laboratorio.
:::

## 8️⃣ Gateway y DNS

Consulta las opciones configuradas en el ámbito.

Si el laboratorio dispone realmente de gateway y/o DNS, comprueba que los valores entregados al cliente son los previstos.

Si todavía no existen esos servicios en el escenario, **no inventes valores**: deja constancia de que no se configuran en esta fase.

| Opción | Configurada en servidor | Recibida por cliente |
|---|---|---|
| Gateway | | |
| DNS | | |

## 9️⃣ Comparación final

Completa:

| Elemento | Qué hace |
|---|---|
| Rango | |
| Exclusión | |
| Reserva | |
| Concesión | |
| Gateway | |
| DNS | |

## 🔟 Conclusiones

Responde:

1. ¿Qué diferencia existe entre una exclusión y una reserva?
2. ¿Qué relación existe entre una reserva y la MAC?
3. ¿Qué hace `ipconfig /release`?
4. ¿Qué hace `ipconfig /renew`?
5. ¿Por qué una renovación puede devolver la misma IP?
6. ¿Puede DHCP funcionar y entregar un DNS incorrecto?
