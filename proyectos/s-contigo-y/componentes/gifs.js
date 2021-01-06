import urls from '../datos/gifsUrls';
import { aleatorio, elementoAleatorio } from '../utilidades/ayudas';

const contenedor = document.getElementById('capaGifs');
const btn = document.getElementById('capa3Btn');
let actual = -1;
let anchoPantalla = 0;
let altoPantalla = 0;

btn.onclick = () => {
  const img = new Image();
  img.className = 'gif';
  img.width = aleatorio(anchoPantalla / 8, anchoPantalla);
  img.height = aleatorio(altoPantalla / 8, altoPantalla);

  Object.assign(img.style, {
    top: aleatorio(0, altoPantalla / 2.5) + 'px',
    left: aleatorio(0, anchoPantalla / 2.5) + 'px',
    opacity: aleatorio(0.6, 0.8, true),
  });

  img.onload = () => {
    contenedor.appendChild(img);

    let intervalo = setInterval(() => {
      clearInterval(intervalo);
      contenedor.removeChild(img);
    }, aleatorio(10000, 15000));
  };

  actual = elementoAleatorio(urls, actual);
  img.src = urls[actual];
};

function transformar() {
  anchoPantalla = window.innerWidth;
  altoPantalla = window.innerHeight;
}

transformar();

export default {
  transformar: transformar,
};
