import './estilos.scss';
import cursores from './componentes/animarCursores';
import fondo from './componentes/fondo';
import Palabras from './componentes/Palabras';
import { wiki } from './componentes/apis';
import { aleatorio } from './utilidades/ayudas';

const licuadora = new Palabras();
const name = document.getElementById('name');
const textGlitch = document.querySelectorAll('.textglitch');
const contenedorLetras = document.getElementById('letras');
const contenedorAnagramas = document.getElementById('anagramas');
const resultado = document.getElementById('resultado');
let busqueda = '';
let letras;
let anagramas;

document.addEventListener('submit', (event) => {
  event.preventDefault();

  // Guardamos en memoria los resultados por si hace clic en enviar varias veces con la mísma busqueda
  if (busqueda !== name.value) {
    const failedExpectation = licuadora.intervenir(name.value, 4, 6);
    busqueda = name.value;
    letras = failedExpectation.letras;
    anagramas = failedExpectation.palabras;

    // Mandamos los anagramas al fondo
    fondo.actualizarMatriz(anagramas);

    // Mostramos la intervención
    contenedorLetras.innerText = letras.join(' | ');
    contenedorAnagramas.innerText = anagramas.join(' | ');
  }

  construirResultado(anagramas[aleatorio(0, anagramas.length)]);
  // construirResultado('Cicial');
});

async function construirResultado(palabra) {
  const artilculo = await wiki(palabra);
  const idArticulo = Object.keys(artilculo.query.pages)[0];

  if (idArticulo > 0) {
    const contenido = artilculo.query.pages[idArticulo];
    resultado.innerHTML = contenido.extract;
    console.log(contenido);
  }

  console.log(idArticulo, artilculo);
}

textGlitch.forEach((texto) => {
  const eLtext = texto.innerText;
  const eLchild = texto.querySelector('.textglitch-link');
  eLchild.dataset.content = eLtext;

  texto.onmouseenter = () => {
    eLchild.classList.add('blur');
    texto.classList.add('active');
    cursores.animar(texto);
  };

  texto.onmouseleave = () => {
    eLchild.classList.remove('blur');
    texto.classList.remove('active');
    cursores.detener();
  };
});

fondo.iniciar();

window.onresize = () => {
  fondo.definir();
};
