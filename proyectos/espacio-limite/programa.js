import './scss/estilos.scss';

/* Dudas sobre el código
Qué asigna a una function la posibilidad de: dibujar(0) o dibujar()
*/

//importa clases y funciones de la carpeta de utilidades
//así como acá dice import, en la carpeta de utilidades, todo se exporta para que se pueda vincular un archivo con el otro. Así scripts.js está más limpio y llama al código específico identificado en otros archivos
import Swiper, { Navigation, Pagination } from 'swiper';
import { LinearAccelerationSensor } from 'motion-sensors-polyfill';
import { LowPassFilterData, activarOrientacion, aleatorio } from './utilidades/ayudas';
import Vector from './utilidades/Vector';
import Elemento from './utilidades/Elemento';
import Cargador from './utilidades/Cargador';
import mensaje from './utilidades/mensaje';
import ImagenFantasma from './utilidades/ImagenFantasma';
import TextoFantasma from './utilidades/TextoFantasma';
import datosColisiones from './datos';

//acá se crean diferentes variables que traen en su totalidad elementos del html
const iniciarBtn = document.getElementById('iniciar');
const consola = document.getElementById('consola');
const canvasPlano = document.getElementById('plano');
const ctxPlano = canvasPlano.getContext('2d');
const fantasmasCanvas = document.getElementById('fantasmas');
const fantasmasCtx = fantasmasCanvas.getContext('2d');
fantasmasCanvas.width = window.innerWidth;
fantasmasCanvas.height = window.innerHeight;

import mapaUrl from './imgs/mapa.jpg';
import piedraUrl from './imgs/piedra.png';
import miniMapaUrl from './imgs/mini-mapa.png';
import radarUrl from './imgs/radar.png';

Swiper.use([Navigation, Pagination]);

new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
});

//mouse es equivalente a un nuevo utilidades/Vector pero aun no entiendo el código de vector
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let rotacion = 0;

//Ref es la posición del mapa
const ref = new Vector();
const centro = new Vector(x, y);
const nuevo = new Vector();

//aca el cargador me permite cargar imagenes y sonidos como variables
const cargador = new Cargador();
// De momento el cargador reconoce 'imagen' y 'sonido'.
const plano = new Elemento('imagen', mapaUrl);
const piedra = new Elemento('imagen', piedraUrl);
const miniMap = new Elemento('imagen', miniMapaUrl);
const posMapa = new Elemento('imagen', radarUrl);

cargador.agregar([plano, piedra, miniMap, posMapa]);
cargador.on('progreso', (datos) => {
  mensaje.escribir(`${datos.porcentajeCargado}%`);
});
//y cuando el cargador termina, da la opcion de iniciar. Investigar sobre la estructura de la info aca
cargador.once('listo', iniciar);
cargador.cargar();
//Ahora creamos una funcion a partir de lo que sucede al dar clic a iniciar

function iniciar() {
  // le quitamos la clase de esconder al botón de explorar y escondemos la primera pantalla (mensaje)
  iniciarBtn.classList.remove('esconder');
  mensaje.esconder();
  //aca creamos una variable a partir del elemento que cargamos. El tamaño de la imagen
  // depende del tamaño interno de la ventana
  const planoImg = plano.elemento;
  //  const otroPlanoImg = otroPlano.elemento;
  canvasPlano.width = window.innerWidth;
  canvasPlano.height = window.innerHeight;

  // Recorta un recuadro

  ref.x = aleatorio(canvasPlano.width, planoImg.naturalWidth - canvasPlano.width);
  ref.y = aleatorio(canvasPlano.height, planoImg.naturalHeight - canvasPlano.height);

  nuevo.x = aleatorio(canvasPlano.width, planoImg.naturalWidth - canvasPlano.width);
  nuevo.y = aleatorio(canvasPlano.height, planoImg.naturalHeight - canvasPlano.height);
  //esto hace que la imagen esté al fon en al momento de la introducción
  pintarFondo();
  /* Acciones que suceden al dar clic:
  - Cambia el estilo de la intro a none (desaparece)
  - cambia el fondoblanco a none (desaparece)
  - ejecuta la función de dibujar (piedra, minimapa, posición y mapa sin límites)
  */
  iniciarBtn.onclick = () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('fondoblur').style.display = 'none';
    dibujar();

    activarOrientacion((evento) => {
      rotacion = evento.alpha * (Math.PI / 180);
      dibujar();
    });

    let minMov = 0.65;
    let moviendoseAdelante = false;
    let pasos = 0;

    const accl = new LinearAccelerationSensor({ frequency: 50 });
    const filter = new LowPassFilterData(accl, 0.8);

    accl.onreading = () => {
      filter.update(accl);
      // Podómetro SUUUUUPPPERRRRR sencillo y a veces impreciso, pero funciona para el experimento.
      if (filter.y > minMov) {
        moviendoseAdelante = true;
        return;
      } else if (moviendoseAdelante) {
        pasos++;
        consola.innerText = `${pasos}`;
        if (ref.x >= 2450 || ref.x <= 50 || ref.y >= 2450 || ref.y <= 50) {
          console.log('no');
          ref.x = nuevo.x;
          ref.y = nuevo.y;
          //ref.x = -ref.x;
        } else {
          console.log(ref.x, ref.y);
          y += 5;
        }

        moviendoseAdelante = false;

        const _x = Math.sin(rotacion) * 30;
        const _y = Math.cos(rotacion) * 30;

        if (rotacion >= 0) {
          ref.x -= _x;
          ref.y -= _y;
        } else {
          ref.x += _x;
          ref.y += _y;
        }
      }
    };
    accl.start();
  };
}

function pintarFondo() {
  const planoImg = plano.elemento;

  ctxPlano.clearRect(0, 0, canvasPlano.width, canvasPlano.height);
  ctxPlano.save();
  ctxPlano.translate(canvasPlano.width / 2, canvasPlano.height / 2);
  ctxPlano.rotate(rotacion);
  ctxPlano.drawImage(planoImg, -ref.x, -ref.y);
  ctxPlano.restore();
}

function mapear(valor, x1, y1, x2, y2) {
  return ((valor - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

function dibujar() {
  const piedraImg = piedra.elemento;
  const miniMapF = miniMap.elemento;
  const posImg = posMapa.elemento;

  const mapearX = mapear(ref.x, 0, 2500, 0, 76);
  const mapearY = mapear(ref.y, 0, 2500, 0, 76);

  pintarFondo();

  /**
   * Pintar piedra (por ahora siempre en el centro, pero podria ser distinto).
   * Acá tambien se puede cambiar la piedra por otra imagen.
   */

  ctxPlano.drawImage(piedraImg, centro.x - piedraImg.naturalWidth / 2, centro.y - piedraImg.naturalHeight / 2);

  ctxPlano.drawImage(
    miniMapF,
    window.innerWidth - miniMapF.naturalWidth - 10,
    window.innerHeight - miniMapF.naturalHeight - 10,
    miniMapF.naturalWidth,
    miniMapF.naturalHeight
  );

  rotarPosicion(
    ctxPlano,
    posImg,
    -rotacion,
    window.innerWidth - miniMapF.naturalWidth - 10 + mapearX - 10,
    window.innerHeight - miniMapF.naturalHeight - 10 + mapearY - 10,
    posImg.naturalWidth / 2,
    posImg.naturalHeight / 2
  );

  /*
  ctxPlano.drawImage(
    posImg,
    window.innerWidth - miniMapF.naturalWidth - 10 + mapearPersonajex - 10,
    window.innerHeight - miniMapF.naturalHeight - 10 + mapearPersonajey - 10,
    20,
    20
  );
*/
  datosColisiones.forEach((d) => {
    const _x = canvasPlano.width / 2 - ref.x;
    const _y = canvasPlano.height / 2 - ref.y;
    const pos = new Vector(d.vector.x + _x, d.vector.y + _y);
    const distancia = centro.distanciaA(pos);

    if (!d.hasOwnProperty('pos')) {
      d.pos = pos;
    }

    if (distancia <= 100) {
      if (!d.hasOwnProperty('fantasma')) {
        d.fantasma =
          d.tipo === 'imagen'
            ? new ImagenFantasma(d, fantasmasCanvas, fantasmasCtx)
            : new TextoFantasma(d, fantasmasCanvas, fantasmasCtx);
      }

      if (!d.fantasma.reproduciendo && d.fantasma.cargado) {
        d.fantasma.inicio();
      }
    } else {
      if (d.hasOwnProperty('fantasma') && d.fantasma.reproduciendo) {
        d.fantasma.hastaPronto();
      }
    }
  });
}

function rotarPosicion(mapa, flecha, angulo, posicionX, posicionY, axisX, axisY) {
  mapa.translate(posicionX, posicionY);
  mapa.rotate(angulo);
  mapa.drawImage(flecha, -axisX, -axisY);
  mapa.rotate(-angulo);
  mapa.translate(-posicionX, -posicionY);
}

function actualizarDimensiones() {
  canvasPlano.width = window.innerWidth;
  canvasPlano.height = window.innerHeight;

  centro = {
    x: canvasPlano.width / 2,
    y: canvasPlano.height / 2,
  };
}
