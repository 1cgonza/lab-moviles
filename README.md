# Laboratorio de Arte y Dispositivos Móviles

En este laboratorio vamos a pensar los dispositivos móviles como espacio y herramienta de creación artística. La idea es apropiarnos de los dispositivos de manera irreverente, explorar sus potencias y limitaciones para crear aplicaciones poco convencionales que nos sirvan para investigar las posibilidades artísticas con este medio.

Durante los talleres vamos a usar diferentes herramientas que nos ayuden a crear aplicaciones usando el lenguaje de programación JavaScript. A la hora de crear sus propios proyectos, es posible que nos toque acudir a otras tecnologías y las exploraremos juntos dependiendo de cada caso.

En este repositorio vamos a tener tutoriales y plantillas de trabajo que les sirva como insumo para crear sus proyectos.

# Herramientas

Vamos a usar aplicaciones open-source o gratuitas.
Primero instalamos unas dependencias generales:

### Editor de código

Recomiendo [VSCode](https://code.visualstudio.com/)

### Mac

- [Homebrew](https://brew.sh/)
- Node y Yarn

```bash
brew install node yarn
```

### Windows

- [Cmder](https://cmder.net/) El terminal de windows funciona disitnto al de Linux y Mac (UNIX). Para trabajar con el mismo lenguaje, recomiendo este simulador de UNIX para Windows. Este va a ser su terminal y pueden usar comandos de UNIX sin problema.
- [Chocolatey](https://chocolatey.org/install)
- Node y Yarn

```bash
choco install nodejs yarn
```

---

**Hasta este punto ya tenemos las herramientas necesarias para crear apps sencillos**

---

### Capacitor

Capacitor es una aplicación que nos permite desarrollar en lenguaje web (HTML, CSS y Javascript) y luego compilar este código como aplicaciones nativas de iOs, Android o PWA.

[Capacitor](https://capacitorjs.com/)

Los Plugins de Capacitor nos dan unas buenas pistas de lo que se puede hacer con la aplicación. (Tomar fotos, usar sensores, etc.)

- https://capacitorjs.com/docs/plugins
- https://ionicframework.com/docs/native/community

---

**Las aplicaciones que siguen son opcionales**

---

Para compilar apps nativos, necesitamos Xcode y/o Android Studio. Ambas aplicaciones son bastante pesadas así que revisen si tienen suficiente espacio antes de instalar.

Xcode: Sólo para Mac, se instala desde Apple Store.

[Android Studio](https://developer.android.com/studio) Funciona en Windows y Mac.

# Conceptos

### App Nativo

Aplicaciones que se montan en las tiendas de Apps, conllevan procesos de revisión y en el caso de iOS necesitamos una cuenta paga.

### PWA

**P**rogressive **W**eb **A**pp es básicamente una página web que se piensa para móviles. Algunos PWA usan sensores de los celulares y están pensadas sobre todo para verlas desde un dispositivo móvil.

### SSL

Una de las dificultades al desarrollar PWA es que los exploradores han ido eliminando la posibilidad de acceder a los sensores. Sólo podemos acceder a ellos si la conexión es segura, es decir, cuando la URL empieza con **https://**...

Debemos tener en cuenta esto tanto en la fase de desarrollo y al momento de subir el proyecto final a un servidor.

# Utilidades

### Consola

Cuando estemos escribiendo código, vamos a revisar mucho la consola para ver si hay errores o probar partes de éste.

Esta consola por lo general la encontramos haciendo clic derecho en el explorador y seleccionar la opción "inspeccionar".

#### Móvil conectado por USB

Si tenemos un Android, lo podemos conectar por USB al computador y abrir la consola en Google Chrome desde: `chrome://inspect#devices`

En el caso de iPhone, hay dos pasos:

1. Activar modo desarrollo: Safari -> Preferencias -> Avanzado -> Mostrar el menú Desarrollo en la barra de menús
2. Desarrollo -> [BUSCAR EL NOMBRE DE SU IPHONE] -> #IP
