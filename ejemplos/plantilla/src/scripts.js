import Com from './utilidades/comunicacion';

const com = new Com();
const mano = document.getElementById('mano');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let dibujar = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function cuandoEmpezamosATocar(e) {
  e.preventDefault();
  dibujar = true;
}

function cuandoDejamosDeTocar(e) {
  e.preventDefault();
  dibujar = false;
}

const cuandoMovemos = (e) => {
  e.preventDefault();
  if (!dibujar) return;
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  com.enviarDatos({ x: x, y: y });
};

com.on('conectado', () => {
  const superficie = canvas;
  superficie.addEventListener('touchstart', cuandoEmpezamosATocar, false);
  superficie.addEventListener('mousedown', cuandoEmpezamosATocar, false);
  superficie.addEventListener('touchend', cuandoDejamosDeTocar, false);
  superficie.addEventListener('mouseup', cuandoDejamosDeTocar, false);
  superficie.addEventListener('touchmove', cuandoMovemos, false);
  superficie.addEventListener('mousemove', cuandoMovemos, false);
});

com.on('nuevosDatos', (datos) => {
  mano.style.transform = `translate(${datos.x}px, ${datos.y}px)`;
});
