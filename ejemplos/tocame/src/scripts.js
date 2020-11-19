const mano = document.getElementById('mano');

const protocolo = window.location.protocol == 'https:' ? 'wss' : 'ws';
const conexion = new WebSocket(`${protocolo}://${window.location.hostname}:${window.location.port}`);

function enviarDatos(datos) {
  conexion.send(JSON.stringify(datos));
}

function cuandoEmpezamosATocar(e) {
  e.stopPropagation();

  enviarDatos({
    x: e.clientX / window.innerWidth,
    y: e.clientY / window.innerHeight,
  });
}

function cuandoDejamosDeTocar(e) {
  e.stopPropagation();
}

function cuandoMovemos(e) {
  e.stopPropagation();

  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  enviarDatos({
    x: x,
    y: y,
  });
}

async function iniciar() {
  const superficie = document.body;
  superficie.addEventListener('touchstart', cuandoEmpezamosATocar, false);
  superficie.addEventListener('mousedown', cuandoEmpezamosATocar, false);
  superficie.addEventListener('touchend', cuandoDejamosDeTocar, false);
  superficie.addEventListener('mouseup', cuandoDejamosDeTocar, false);
}

conexion.onopen = async () => {
  console.log('conexión exitosa!');
  iniciar();
};

conexion.onmessage = (evento) => {
  const datos = JSON.parse(evento.data);
  const x = window.innerWidth * datos.x - 190;
  const y = window.innerHeight * datos.y - 20;

  mano.style.transform = `translate(${x}px, ${y}px)`;
};
