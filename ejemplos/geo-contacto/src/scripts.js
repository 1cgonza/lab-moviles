import Com from './utilidades/comunicacion';
import Personaje from './componentes/Personaje';
import { LinearAccelerationSensor } from 'motion-sensors-polyfill';
import { LowPassFilterData } from './utilidades/ayudas';
import Vector from './utilidades/Vector';
import imagenPlano from './plano.png';

const consola = document.getElementById('consola');
const mensajeContenedor = document.getElementById('mensajes');
const mensajeTexto = mensajeContenedor.querySelector('#texto');
const com = new Com();
const canvas = document.getElementById('canvas');
const canvasPlano = document.getElementById('plano');
const ctx = canvas.getContext('2d');
const ctxPlano = canvasPlano.getContext('2d');
let yo;
let contadorAnima;
let buscador;
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let rotacion = 0;
const ref = new Vector();

const centro = { x: x, y: y };

const plano = new Image();
plano.onload = () => {
  canvasPlano.width = window.innerWidth;
  canvasPlano.height = window.innerHeight;

  ctxPlano.drawImage(
    plano,
    -plano.naturalWidth / 2 + canvasPlano.width / 2,
    -plano.naturalHeight / 2 + canvasPlano.height / 2
  );
  planoListo = true;
};
plano.src = imagenPlano;

function actualizarPos(posicion) {
  if (posicion.coords.accuracy >= 18) return;
  yo.actualizarPunto(posicion.coords);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(yo.punto.x, yo.punto.y, 30, 30);
  com.enviarDatos({ ...yo.punto, precision: posicion.coords.accuracy });
}

function errorBuscador(err) {
  console.log(err);
}

function encontroUbicacion(posicion) {
  mensajeContenedor.classList.remove('mostrar');
  console.log(posicion.coords.accuracy);
  yo = new Personaje(posicion.coords);

  ctx.fillRect(yo.punto.x, yo.punto.y, 30, 30);
  com.enviarDatos(yo.punto);

  buscador = navigator.geolocation.watchPosition(actualizarPos, errorBuscador, {
    enableHighAccuracy: true,
  });
}

com.on('conectado', () => {
  mensajeContenedor.classList.remove('mostrar');
  document.getElementById('intro').classList.add('mostrar');

  document.getElementById('iniciar').onclick = () => {
    dibujar(0);

    // esto es necesario para ios 13+
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
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

    // if (!navigator.geolocation) {
    //   mensajeContenedor.classList.add('mostrar');
    //   mensajeTexto.innerText = 'Su dispositivo no tiene geolocalizador y este es necesario para ver el proyecto :(';
    // } else {
    //   mensajeContenedor.classList.add('mostrar');
    //   mensajeTexto.innerText = '...\nBuscando ubicación\n...';
    //   navigator.geolocation.getCurrentPosition(encontroUbicacion, errorBuscandoUbicacion);
    // }
  };
});

com.on('nuevosDatos', (datos) => {
  console.log(datos);
});

function actualizarDimensiones() {
  for (let id in com.amigos) {
    const amigo = com.amigos[id];
    if (amigo) {
      amigo.personaje.actualizarDimensiones();
    }
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centro = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  ctx.globalAlpha = 0.2;
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centro.x, centro.y);
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(-10, 20);
  ctx.lineTo(10, 20);
  ctx.fill();
  ctx.restore();
}

window.onresize = actualizarDimensiones;

actualizarDimensiones();
