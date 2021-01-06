import urls from '../datos/audiosUrls';
import { aleatorio, elementoAleatorio } from '../utilidades/ayudas';

const contenedor = document.getElementById('capaAudios');
const btn = document.getElementById('audioCapa1Btn');
let actual = -1;

btn.onclick = () => {
  let contador = 0;
  const reproducirXVeces = aleatorio(1, 5);
  const audio = document.createElement('audio');
  audio.autoplay = true;
  audio.volume = 0.5;

  actual = elementoAleatorio(urls, actual);
  audio.src = urls[actual];

  audio.onended = () => {
    contador += 1;
    console.log(reproducirXVeces, contador);
    if (reproducirXVeces === contador) {
      console.log('destruyendo audio, ya termino', audio);
      contenedor.removeChild(audio);
    } else {
      audio.play();
    }
  };
  console.log('audio: ' + contador + audio.src);
};

function silenciar() {}

export default {
  silenciar: silenciar,
};
