import { LinearAccelerationSensor } from 'motion-sensors-polyfill';
import { LowPassFilterData } from './utilidades/ayudas';
import Vector from './utilidades/Vector';
import imagenPlano from './black-map.jpg';
import barco from './posicion.png';

const consola = document.getElementById('consola');
const mensajeContenedor = document.getElementById('mensajes');
const canvas = document.getElementById('canvas');
const canvasPlano = document.getElementById('plano');
const ctx = canvas.getContext('2d');
const ctxPlano = canvasPlano.getContext('2d');
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let rotacion = 0;
const ref = new Vector();
let barcoCargado = false;

let centro = { x: x, y: y };

const plano = new Image();
const barcoImg = new Image();
barcoImg.onload = () => {
  barcoCargado = true;
};
barcoImg.src = barco;
plano.onload = () => {
  canvasPlano.width = window.innerWidth;
  canvasPlano.height = window.innerHeight;

  ctxPlano.drawImage(
    plano,
    -plano.naturalWidth / 2 + canvasPlano.width / 2,
    -plano.naturalHeight / 2 + canvasPlano.height / 2
  );
};
plano.src = imagenPlano;

document.getElementById('iniciar').onclick = () => {
  document.getElementById('intro').style.display = 'none';
  dibujar(0);

  // esto es necesario para ios 13+
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', eventoOrientacion, false);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', eventoOrientacion, false);
  }

  function eventoOrientacion(evento) {
    rotacion = evento.alpha * (Math.PI / 180);
    dibujar();
  }

  let minMov = 0.65;
  let moviendoseAdelante = false;
  let pasos = 0;

  const accl = new LinearAccelerationSensor({ frequency: 50 });
  const filter = new LowPassFilterData(accl, 0.8);

  accl.onreading = () => {
    filter.update(accl);
    // Pedómetro SUUUUUPPPERRRRR sencillo y a veces impreciso, pero funciona para el experimento.
    if (filter.y > minMov) {
      moviendoseAdelante = true;
      return;
    } else if (moviendoseAdelante) {
      pasos++;
      consola.innerText = `pasos: ${pasos}`;
      moviendoseAdelante = false;
      y += 5;
      ref.x += Math.sin(rotacion) * 30;
      ref.y += Math.cos(rotacion) * 30;
    }
  };
  accl.start();
};

function actualizarDimensiones() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centro = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  // ctx.globalAlpha = 0.2;
}

function dibujar() {
  ctxPlano.clearRect(0, 0, canvasPlano.width, canvasPlano.height);
  ctxPlano.save();
  ctxPlano.translate(canvasPlano.width / 2, canvasPlano.height / 2);
  ctxPlano.rotate(rotacion);

  if (rotacion > 0) {
    ctxPlano.drawImage(plano, -plano.naturalWidth / 2 + ref.x, -plano.naturalHeight / 2 + ref.y);
  } else {
    ctxPlano.drawImage(plano, -plano.naturalWidth / 2 - ref.x, -plano.naturalHeight / 2 - ref.y);
  }

  ctxPlano.restore();

  if (barcoCargado) {
    console.log(barcoImg);
    ctx.clearRect(-barcoImg.naturalWidth / 2, -barcoImg.naturalHeight / 2, canvas.width, canvas.height);
    ctx.drawImage(barcoImg, centro.x, centro.y);
  }
}

window.onresize = actualizarDimensiones;

actualizarDimensiones();
