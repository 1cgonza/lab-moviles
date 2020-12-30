import { aleatorio, elementoAleatorio } from '../utilidades/ayudas';
import urls from '../datos/videosUrls';

const contenedor = document.getElementById('capaVideos');
const btn = document.getElementById('capa2Btn');
let actual = -1;
let anchoPantalla = 0;
let altoPantalla = 0;

btn.onclick = () => {
  actual = elementoAleatorio(urls, actual);

  const vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true;
  vid.setAttribute('playsinline', true);
  vid.className = 'videoFlotante';
  vid.width = aleatorio(anchoPantalla / 8, anchoPantalla / 2.5);
  vid.height = aleatorio(altoPantalla / 8, altoPantalla / 2.5);
  vid.src = urls[actual];

  Object.assign(vid.style, {
    top: aleatorio(-100, altoPantalla / 2) + 'px',
    left: aleatorio(-100, anchoPantalla / 2) + 'px',
    opacity: aleatorio(0.6, 0.9, true),
  });

  contenedor.appendChild(vid);

  vid.onended = () => {
    contenedor.removeChild(vid);
  };
};

function transformar() {
  anchoPantalla = window.innerWidth;
  altoPantalla = window.innerHeight;
}

transformar();

export default {
  transformar: transformar,
};
