---
sidebar_position: 1
sidebar_label: "1. Conceptos básicos"
title: "Conceptos básicos de redes"
description: "LAN, WAN, protocolos y topologías de red"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# 1. Conceptos básicos de redes

En este apartado repasaremos los **conceptos fundamentales de redes** que necesitaremos antes de comenzar a trabajar con los distintos servicios del módulo **Servicios en Red**.

:::info[🎯 ¿Qué vamos a aprender?]

Al terminar este apartado deberías ser capaz de:

- Explicar qué es una **red de ordenadores**.
- Diferenciar una **LAN** de una **WAN**.
- Comprender qué es un **protocolo de red**.
- Reconocer las principales **topologías de red**.
- Identificar el papel básico del **switch** y del **router**.
- Diferenciar una comunicación dentro de la LAN de una comunicación hacia Internet.
- Relacionar estos conceptos con nuestro **laboratorio virtual**.

:::

---

## 🌐 1.1. ¿Qué es una red de ordenadores?
Una ****red de ordenadores**** es un conjunto de dispositivos conectados entre sí que pueden ****comunicarse e intercambiar información****.

Los dispositivos que forman una red no tienen por qué ser únicamente ordenadores. En una red podemos encontrar:

- Ordenadores y portátiles.

- Servidores.

- Smartphones y tablets.

- Impresoras de red.

- Switches y routers.

- Puntos de acceso Wi-Fi.

- Cámaras IP.

- Dispositivos IoT.

Para que dos dispositivos puedan comunicarse necesitamos, como mínimo:

****Un medio de comunicación + unas direcciones + unas reglas de comunicación.****

Por ejemplo:

```

PC-A  ─────────────── PC-B

        Ethernet

```

Si `PC-A` quiere enviar información a `PC-B`, ambos necesitan algún mecanismo para identificarse y unas reglas que determinen cómo se transmite esa información.

Estas reglas son los ****protocolos de red****.

---
## 🔗 1.2. ¿Para qué utilizamos una red?
El objetivo fundamental de una red es permitir la ****comunicación entre dispositivos y el uso compartido de recursos y servicios****.

Por ejemplo, una red permite:

```

Compartir archivos

Compartir impresoras

Acceder a Internet

Acceder a páginas web

Utilizar bases de datos

Enviar correo electrónico

Acceder a servidores

Realizar copias de seguridad

```

En este módulo nos interesará especialmente el concepto de ****servicio de red****.

Un servicio de red es una funcionalidad proporcionada por un equipo a otros equipos de la red.

Por ejemplo:

```

                  RED

                   │

          ┌────────┴─────────┐

          │                  │

       CLIENTE            SERVIDOR

     192.168.1.20        192.168.1.10

                              │

                    ┌─────────┼──────────┐

                    │         │          │

                   DNS       DHCP       WEB

```

El servidor puede ofrecer distintos servicios y los clientes pueden utilizarlos.

Esta idea será fundamental durante todo el módulo de ****Servicios en Red****.

---
## 🗺️ 1.3. Clasificación de las redes según su extensión
Una de las formas más habituales de clasificar las redes es según el ****área geográfica que abarcan****.

Nos centraremos principalmente en dos conceptos: ****LAN**** y ****WAN****.

### 🏠 LAN — Local Area Network
Una ****LAN (Local Area Network)**** es una red que conecta dispositivos dentro de un área geográfica relativamente pequeña.

Por ejemplo:

- Una vivienda.

- Un aula.

- Una oficina.

- Un instituto.

- Un edificio.

Una red como esta sería una LAN:

```

             SWITCH

          ┌─────┼─────┐

          │     │     │

         PC1   PC2   PC3

```

Normalmente una LAN está administrada por una misma persona u organización.

### Ejemplo
La red informática de un instituto puede contener cientos de equipos y seguir siendo una LAN.

Podríamos tener:

```

                   ROUTER

                      │

                   SWITCH

             ┌────────┼────────┐

             │        │        │

        Aula DAM   Aula SMR  Secretaría

```

Todos estos dispositivos pertenecen a la red local del centro.

---
### 🌍 WAN — Wide Area Network
Una ****WAN (Wide Area Network)**** conecta redes situadas a grandes distancias geográficas.

Por ejemplo:

```

LAN Cáceres                    LAN Madrid

 PC ─┐                         PC ─┐

 PC ─┼─ SWITCH ─ ROUTER ───── ROUTER ─ SWITCH ─┼─ PC

 PC ─┘              WAN                         └─ PC

```

Los routers permiten comunicar ambas redes.

El ejemplo más importante de WAN es ****Internet****.

Internet puede entenderse como una enorme ****red de redes****.

### LAN frente a WAN
\| Característica | LAN | WAN |

\| --- | --- | --- |

\| Significado | Local Area Network | Wide Area Network |

\| Extensión | Reducida | Muy amplia |

\| Ejemplo | Red de un instituto | Internet |

\| Administración | Normalmente una organización | Varias organizaciones |

\| Dispositivos importantes | Switches | Routers |

\| Uso habitual | Comunicación local | Comunicación entre redes |

Una idea importante que debemos conservar es:

\> ****Una LAN permite comunicar dispositivos dentro de una red local. Un router permite comunicar nuestra LAN con otras redes.****

\> 

Más adelante veremos con detalle cómo sabe un ordenador si el destino está en ****su propia red**** o si debe enviar la información al ****router****.

---
## 📡 1.4. Protocolos de red
Imaginemos dos personas que quieren comunicarse.

Para conseguirlo necesitan acordar unas reglas:

- Qué idioma utilizan.

- Quién habla primero.

- Cómo comienza la conversación.

- Cómo termina.

- Qué ocurre si no se entiende un mensaje.

En una red ocurre algo parecido.

Un ****protocolo de red**** es un conjunto de reglas que determina cómo deben comunicarse los dispositivos.

Los protocolos especifican aspectos como:

- Cómo se identifica el origen.

- Cómo se identifica el destino.

- Cómo se estructura la información.

- Cómo se envía.

- Cómo se detectan errores.

- Cómo se responde.

Existen muchos protocolos porque cada uno resuelve un problema diferente.

Algunos que utilizaremos durante el curso son:

\| Protocolo | Función |

\| --- | --- |

\| 🌐 **IP** | Direccionamiento y envío de paquetes entre redes |

\| 📦 **TCP** | Comunicación fiable entre aplicaciones |

\| ⚡ **UDP** | Comunicación rápida sin garantizar entrega |

\| 🔎 **ARP** | Relacionar direcciones IPv4 con direcciones MAC |

\| 🩺 **ICMP** | Diagnóstico y mensajes de control |

\| ⚙️ **DHCP** | Configuración automática de red |

\| 📖 **DNS** | Resolución de nombres |

\| 🌍 **HTTP/HTTPS** | Acceso a servicios web |

No necesitamos aprenderlos todos ahora. Los iremos estudiando progresivamente.

Lo importante inicialmente es comprender que:

```

Una comunicación de red no utiliza un único protocolo.

Normalmente intervienen varios protocolos simultáneamente.

```

Por ejemplo, cuando escribimos:

```

www.google.es

```

en un navegador, pueden intervenir DNS, IP, TCP y HTTPS, entre otros.

---
## 🕸️ 1.5. Topología de una red
La ****topología de red**** describe cómo están conectados u organizados los dispositivos de una red.

Podemos distinguir entre:

****Topología física:**** cómo están conectados físicamente los dispositivos.

****Topología lógica:**** cómo circula la información por la red.

En este repaso nos centraremos principalmente en las topologías físicas.

---
### 🚌 Topología en bus
Todos los equipos comparten un único medio de transmisión.

```

PC1 ───── PC2 ───── PC3 ───── PC4

```

Fue utilizada en antiguas redes Ethernet mediante cable coaxial.

Presentaba varios problemas:

- Todos los dispositivos compartían el medio.

- Una avería podía afectar a toda la red.

- Era difícil localizar problemas.

- Su ampliación era poco flexible.

Actualmente está prácticamente en desuso en redes Ethernet.

---
### 🔄 Topología en anillo
Cada dispositivo está conectado con el siguiente formando un circuito cerrado.

```

        PC1

      /     \\

    PC4     PC2

      \     /

        PC3

```

La información circula siguiendo el anillo.

Fue utilizada por tecnologías como ****Token Ring****, aunque actualmente tampoco es habitual en las LAN Ethernet convencionales.

---
### ⭐ Topología en estrella
Todos los dispositivos están conectados a un dispositivo central.

```

              PC1

               │

               │

PC2 ──────── SWITCH ──────── PC3

               │

               │

              PC4

```

Es la topología habitual de las redes Ethernet actuales.

El dispositivo central suele ser un ****switch****.

Presenta varias ventajas:

- Es fácil añadir nuevos equipos.

- Es fácil localizar averías.

- Si falla el cable de un ordenador, los demás pueden seguir funcionando.

- Permite administrar mejor la red.

Existe, sin embargo, un punto crítico:

\> Si falla el switch central, los dispositivos conectados a él dejan de poder comunicarse a través de ese switch.

\> 

---
### 🌳 Topología en árbol o estrella extendida
En redes de mayor tamaño podemos conectar varios switches.

```

                       SWITCH PRINCIPAL

                     /                  \\

                    /                    \\

              SWITCH A                 SWITCH B

              /     \                  /      \\

            PC1     PC2              PC3      PC4

```

Esta estructura es muy habitual en edificios, empresas y centros educativos.

Podemos considerarla una extensión jerárquica de la topología en estrella.

---
## 💻 1.6. ¿Qué topología utilizamos actualmente?
En una LAN Ethernet moderna, lo habitual es utilizar una ****topología en estrella**** basada en switches.

Por ejemplo:

```

                     ROUTER

                        │

                     SWITCH

                  ┌─────┼─────┐

                  │     │     │

                 PC1   PC2  SERVIDOR

```

Si además tenemos Wi-Fi:

```

                     ROUTER

                        │

                     SWITCH

                  ┌─────┼──────────┐

                  │     │          │

                 PC   SERVIDOR   PUNTO

                               DE ACCESO

                                  )))

                               portátil

```

Aunque los dispositivos inalámbricos no estén conectados mediante cable, siguen formando parte de la infraestructura de la LAN.

---
## 🌍 1.7. Una primera visión de Internet
Supongamos que nuestro ordenador quiere acceder a una página web situada en Internet.

La comunicación podría representarse de forma simplificada así:

```

MI ORDENADOR

192.168.1.20

     │

     │

   SWITCH

     │

     │

   ROUTER

192.168.1.1

     │

     │

  INTERNET

     │

     │

SERVIDOR WEB

```

Aquí aparecen dos situaciones diferentes.

### 🏠 Comunicación dentro de la LAN
```

PC1 ─── SWITCH ─── PC2

```

Los dispositivos pueden comunicarse dentro de la red local.

### 🌐 Comunicación fuera de la LAN
```

PC ─── SWITCH ─── ROUTER ─── INTERNET

```

Cuando el destino se encuentra fuera de nuestra red local necesitamos un dispositivo capaz de enviar el tráfico hacia otras redes: ****el router****.

Esta distinción será fundamental cuando estudiemos direccionamiento IPv4 y enrutamiento.

## 📝 Actividad 1 · Identifica el tipo de red
Indica si las siguientes situaciones corresponden principalmente a una ****LAN**** o implican una ****WAN****, justificando brevemente la respuesta.

\| Situación | LAN/WAN | Justificación |

\| --- | --- | --- |

\| 20 ordenadores conectados al switch de un aula |  |  |

\| La red de ordenadores de una vivienda |  |  |

\| Dos oficinas de una empresa, una en Cáceres y otra en Sevilla, comunicadas entre sí |  |  |

\| Un ordenador del aula accediendo a un servidor del mismo instituto |  |  |

\| Un ordenador del aula accediendo a una página alojada en Internet |  |  |

---
## 📝 Actividad 2 · Diseña una pequeña LAN
Una pequeña empresa dispone de:

- 5 ordenadores.

- 1 servidor.

- 1 impresora de red.

- 1 switch.

- 1 router con conexión a Internet.

Dibuja un esquema de la red utilizando una ****topología en estrella****.

Después responde:

1. ¿Cuál es el dispositivo central de la LAN?

2. ¿Qué dispositivo permite acceder a otras redes?

3. Si se estropea el cable de uno de los ordenadores, ¿pueden seguir funcionando los demás?

4. ¿Qué ocurriría si se estropease el switch?

5. ¿Considerarías Internet parte de la LAN de la empresa? Justifica la respuesta.

---
## 🧪 Aplicación en nuestro laboratorio
Durante esta unidad vamos a construir una pequeña red virtual que simulará una situación real.

Inicialmente tendremos dos máquinas:

```

             RED VIRTUAL

                 │

        ┌────────┴────────┐

        │                 │

 SER-SERVIDOR        SER-CLIENTE

 Windows Server       Windows

        │                 │

        └────────┬────────┘

                 │

             VirtualBox

                 │

            PC ANFITRIÓN

```

Desde el punto de vista de las máquinas virtuales, la infraestructura de virtualización hace posible que exista una ****red virtual****, aunque no tengamos un switch físico dedicado para conectar `SER-Servidor` y `SER-Cliente`.

Conceptualmente podemos imaginarlo así:

```

        SER-SERVIDOR

             │

             │

       SWITCH VIRTUAL

             │

             │

        SER-CLIENTE

```

Por tanto, estamos construyendo una ****LAN virtual****.

### 🔎 Comprobación inicial
En VirtualBox podemos entrar en:

```

SER-Servidor

    ↓

Configuración

    ↓

Red

```

y hacer lo mismo con:

```

SER-Cliente

    ↓

Configuración

    ↓

Red

```

En este momento nos interesa únicamente observar ****cómo está conectado cada adaptador de red****, sin modificar todavía direcciones IP.

Podemos encontrarnos configuraciones como:

```

NAT

Red NAT

Adaptador puente

Red interna

Adaptador solo-anfitrión

```

Todavía no necesitamos conocer las diferencias entre todas ellas. Las estudiaremos cuando configuremos la red.

### 🧪 Actividad de laboratorio 1
Con `SER-Servidor` y `SER-Cliente` apagados:

1. Abre VirtualBox.

2. Selecciona `SER-Servidor` → ****Configuración → Red****.

3. Anota cuántos adaptadores tiene habilitados y a qué están conectados.

4. Repite el proceso con `SER-Cliente`.

5. Dibuja cómo crees que están conectadas actualmente ambas máquinas.

6. Responde: ****¿tenemos ya una LAN virtual? ¿Qué elemento de una red física está siendo sustituido por el software de virtualización?****

No modificaremos todavía la configuración. En los siguientes apartados iremos identificando cada componente hasta poder explicar exactamente ****cómo viaja un paquete desde `SER-Cliente` hasta `SER-Servidor` y, posteriormente, desde nuestra LAN virtual hasta Internet****.

---

## ✅ Qué debes saber al terminar

Antes de continuar, comprueba que puedes explicar con tus propias palabras:

- Qué es una **red de ordenadores**.
- Qué diferencia existe entre una **LAN** y una **WAN**.
- Qué es un **protocolo de red**.
- Para qué sirven básicamente un **switch** y un **router**.
- Qué caracteriza a una **topología en estrella**.
- Qué diferencia existe entre comunicarse dentro y fuera de la LAN.
- Por qué `SER-Servidor` y `SER-Cliente` pueden formar una **LAN virtual**.

:::tip[➡️ Siguiente apartado]

En el siguiente punto estudiaremos con más detalle los **dispositivos de red: NIC, switch, router y punto de acceso**.

:::
