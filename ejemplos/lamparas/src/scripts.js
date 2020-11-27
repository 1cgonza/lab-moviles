import Com from './utilidades/comunicacion';
// El numero de la lampara que se debe prender
let cualEstaPrendida;
const numeroDeLamparas = 10;
const com = new Com();

// este sirve a la hora de probar, muestra la cuadricula en pantalla.
// volver false cuando se quiera quitar para verlo sin cuadricula.
const mostrarCuadricula = true;

function buscarLampara(x) {
  const anchoCuadrante = window.innerWidth / numeroDeLamparas;

  for (let i = 0; i < numeroDeLamparas; i++) {
    const xMin = anchoCuadrante * i;
    const xMax = i < 9 ? anchoCuadrante * (i + 1) : window.innerWidth;

    if (x > xMin && x < xMax) {
      return i + 1;
    }
  }
}

function cuandoEmpezamosATocar(e) {
  e.preventDefault();
  const x = e.clientX || e.touches[0].clientX;
  const lampara = buscarLampara(x);
  cualEstaPrendida = lampara;
  console.log('prender', lampara);

  com.enviarDatosAlServidor({ accion: 'prender', lampara: lampara });
}

function cuandoDejamosDeTocar(e) {
  e.preventDefault();
  console.log('apagar', cualEstaPrendida);
  com.enviarDatosAlServidor({ accion: 'apagar', lampara: cualEstaPrendida });
}

com.on('conectado', () => {
  const superficie = document.body;
  superficie.addEventListener('touchstart', cuandoEmpezamosATocar, false);
  superficie.addEventListener('mousedown', cuandoEmpezamosATocar, false);
  superficie.addEventListener('touchend', cuandoDejamosDeTocar, false);
  superficie.addEventListener('mouseup', cuandoDejamosDeTocar, false);
});

// Esto es lo que dibuja la cuadricula para probar.
if (mostrarCuadricula) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const anchoCuadrante = window.innerWidth / numeroDeLamparas;

  for (let i = 0; i < numeroDeLamparas; i++) {
    const x = anchoCuadrante * i;
    ctx.fillRect(x, 0, 1, window.innerHeight);
  }

  document.body.appendChild(canvas);
}
