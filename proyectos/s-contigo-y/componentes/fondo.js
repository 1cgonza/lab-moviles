import { elementoAleatorio } from '../utilidades/ayudas';
import { primerFondo, fondosUrls } from '../datos/fondosUrls';

const contenedor = document.getElementById('fondo');
const video = document.getElementById('videoFondo');
const titulo = document.getElementById('titulo');

let mostrarTitulo = true;
let actual = -1;
let anchoPantalla = 0;
let altoPantalla = 0;
let anchoVideo = 0;
let altoVideo = 0;

video.onloadedmetadata = () => {
  anchoVideo = video.videoWidth;
  altoVideo = video.videoHeight;
  transformar();
};

video.src = primerFondo;

contenedor.onclick = () => {
  actual = elementoAleatorio(fondosUrls, actual);
  video.src = fondosUrls[actual];

  if (mostrarTitulo) {
    titulo.classList.add('esconder');
    mostrarTitulo = false;
  }
};

function transformar() {
  anchoPantalla = window.innerWidth;
  altoPantalla = window.innerHeight;

  const esHorizontal = anchoPantalla > altoPantalla;
  const escalaAncho = anchoPantalla / (esHorizontal ? altoVideo : anchoVideo);
  const escalaAlto = altoPantalla / (esHorizontal ? anchoVideo : altoVideo);
  const escala = Math.max(escalaAncho, escalaAlto);
  const nuevoAncho = anchoVideo * escala;
  const nuevoAlto = altoVideo * escala;
  const moverY = (nuevoAlto - Math.max(anchoPantalla, altoPantalla)) / 2;
  const y = esHorizontal ? nuevoAlto - moverY : moverY;
  const grados = esHorizontal ? '90deg' : '0deg';

  video.width = nuevoAncho;
  video.height = nuevoAlto;
  video.style.transform = `rotate(${grados}) translateY(${-y}px)`;
}

export default {
  transformar: transformar,
};
