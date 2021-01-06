import { aleatorio } from '../utilidades/ayudas';

let matriz = ['ERROR', '404'];
const canvas = document.getElementById('fondo');
const ctx = canvas.getContext('2d');
const fontSize = 20;
let drops = [];
let intervalo;
let ancho;
let alto;
let columns; //an array of drops - one per column

//drawing the characters
function draw() {
  //Black BG for the canvas
  //translucent BG to show trail
  ctx.save();
  ctx.fillStyle = 'rgba(0, 34, 79, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  //looping over drops
  drops.forEach((dropY, i) => {
    //a random chinese character to print
    const n = aleatorio(0, matriz.length);
    const text = matriz[n];
    //x = i*fontSize, y = value of drops[i]*fontSize
    ctx.fillText(text, i * fontSize, dropY * fontSize);

    //sending the drop back to the top randomly after it has crossed the screen
    //adding a randomness to the reset to make the drops scattered on the Y axis
    if (dropY * fontSize > alto && Math.random() > 0.975) drops[i] = 0;

    //incrementing Y coordinate
    drops[i]++;
  });
}

const metodos = {
  iniciar: () => {
    metodos.definir();
    intervalo = setInterval(draw, 75);
  },

  detener: () => {
    clearInterval(intervalo);
  },

  definir: () => {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;

    ctx.fillStyle = '#587dad';
    ctx.font = fontSize + 'px arial';

    columns = ancho / fontSize; //number of columns for the rain
    drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x++) drops[x] = aleatorio(1, alto);
  },

  actualizarMatriz(m) {
    matriz = m;
  },
};

export default metodos;
