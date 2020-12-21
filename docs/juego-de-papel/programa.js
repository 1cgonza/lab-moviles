(function () {
  'use strict';

  const video = document.getElementById('video');
  const resultadosContenedor = document.getElementById('resultados');
  const opcion1 = document.getElementById('opcion1');
  const opcion2 = document.getElementById('opcion2');
  const opciones = document.querySelectorAll('.opcion');
  const url = 'https://juancgonzalez.com/labmoviles/juego-de-papel/resultados';
  const resultados = {
    fucsia: {},
    anaranjado: {},
    verde: {},
    azul: {},
    rosado: {},
    rojo: {},
    amarillo: {},
    morado: {},
  };
  const numeroResultados = Object.keys(resultados).length;
  let reproduciendo = false;
  let elementosCargados = 0;
  console.log(video);

  function cargador(e) {
    resultadosContenedor.appendChild(e.target);
    elementosCargados++;

    if (elementosCargados === numeroResultados) {
      escalarAPantalla();
    }
  }

  for (let color in resultados) {
    const img = new Image();
    img.id = color;
    img.className = 'resultado';
    img.onload = cargador;
    img.src = `${url}/${color}.jpg`;
    img.onclick = () => {
      img.style.display = 'none';
      video.play();
    };

    resultados[color].img = img;
  }

  opciones.forEach((opcion) => {
    opcion.onclick = () => {
      opcion1.style.display = 'none';
      opcion2.style.display = 'none';
      resultados[opcion.dataset.color].img.style.display = 'block';
    };
  });

  video.onclick = (e) => {
    if (reproduciendo) {
      const tiempo = video.currentTime;

      if (tiempo < 0.5) ; else if (tiempo >= 0.5 && tiempo < 1) {
        // Esta abierto con el primer grupo de colores
        video.pause();
        opcion1.style.display = 'block';
      } else if (tiempo >= 1 && tiempo < 1.5) ; else if (tiempo >= 1.5 && tiempo < 2) {
        // Esta abierto en el segundo grupo de colores
        video.pause();
        opcion2.style.display = 'block';
      } else ;
    } else {
      video.play();
      reproduciendo = true;
    }
  };

  function escalarAPantalla() {
    const dimsVideo = [928, 614];
    const zoom = Math.min(window.innerWidth / dimsVideo[0], window.innerHeight / dimsVideo[1]);

    const ancho = dimsVideo[0] * zoom;
    const alto = dimsVideo[1] * zoom;
    const css = {
      width: `${ancho}px`,
      height: `${alto}px`,
    };

    Object.assign(video.style, css);
    Object.assign(opcion1.style, css);
    Object.assign(opcion2.style, css);
    Object.assign(resultadosContenedor.style, css);
  }

  video.ontimeupdate = function pointers() {
    const tiempo = video.currentTime;
    if (reproduciendo) {
      if (tiempo < 0.5) {
        console.log('working');
        video.style.cursor = 'default';
        // Esta al inicio del video y esta cerrado
      } else if (tiempo >= 0.5 && tiempo < 1) {
        // Esta abierto con el primer grupo de colores
        video.style.cursor = 'pointer';
      } else if (tiempo >= 1 && tiempo < 1.6) {
        video.style.cursor = 'default';
        // Esta cerrado de nuevo
      } else if (tiempo >= 1.6 && tiempo < 2) {
        // Esta abierto en el segundo grupo de colores
        video.style.cursor = 'pointer';
      } else {
        video.style.cursor = 'default';
        // Esta cerrado de nuevo
      }
    }
  };

  window.onresize = escalarAPantalla;

}());
//# sourceMappingURL=programa.js.map
