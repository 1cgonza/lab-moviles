(function () {
  'use strict';

  const url = 'https://juancgonzalez.com/labmoviles/suenos';

  // Función para producir un número aleatorio
  function aleatorio(min, max, enDecimales) {
    const valor = Math.random() * (max - min);
    return enDecimales ? valor + min : Math.floor(valor) + min;
  }

  function elementoAleatorio(urls, actual) {
    const i = aleatorio(0, urls.length);

    if (i === actual) {
      // Si esa posición es la que actualmente se esta usando, volvemos a correr la función sin cambiar el video.
      return elementoAleatorio(urls, actual);
    }

    return i;
  }

  const primerFondo = `${url}/capa0/sone_contigo_entrada.mp4`;

  const fondosUrls = [
    `${url}/capa1/nuevos_f/arboles_noche.mp4`,
    `${url}/capa1/nuevos_f/arboles_niebla.mp4`,
    `${url}/capa1/nuevos_f/arbol_fiesta.mp4`,
    `${url}/capa1/nuevos_f/baile_azul.mp4`,
    `${url}/capa1/nuevos_f/escalator.mp4`,
    `${url}/capa1/nuevos_f/filtro_panuelo.mp4`,
    `${url}/capa1/nuevos_f/hierbas_blancas.mp4`,
    `${url}/capa1/nuevos_f/lagarto_brillante.mp4`,
    `${url}/capa1/nuevos_f/luz_avion.mp4`,
    `${url}/capa1/nuevos_f/puntos_danzan_1_nuevo.mp4`,
    `${url}/capa1/nuevos_f/puntos_danzan_3_nuevo.mp4`,
    `${url}/capa1/nuevos_f/puntos_danzan_4_nuevo.mp4`,
    `${url}/capa1/nuevos_f/ti_punch.mp4`,
    `${url}/capa1/nuevos_f/sombra_planta_1.mp4`,
  ];

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

  var fondo = {
    transformar: transformar,
  };

  var urls = [
    `${url}/capa2/distorsion_movimiento_1.mp4`,
    `${url}/capa2/distorsion_movimiento_2.mp4`,
    `${url}/capa2/tipo_gif_cuadrado.mp4`,
    `${url}/capa2/tren.mp4`,
    `${url}/capa2/agua.mp4`,
    `${url}/capa2/angel_niebla.mp4`,
    `${url}/capa2/arbole_niebla.mp4`,
    `${url}/capa2/arbol_fiesta_mudo.mp4`,
    `${url}/capa2/arbol_viento.mp4`,
    `${url}/capa2/borbullas.mp4`,
    `${url}/capa2/flores_color_gif.mp4`,
    `${url}/capa2/flores_pb_gif_2.mp4`,
    `${url}/capa2/foot_luz.mp4`,
    `${url}/capa2/monstro.mp4`,
    `${url}/capa2/open.mp4`,
    `${url}/capa2/cortina_nb.mp4`,
    `${url}/capa2/pixel.mp4`,
    `${url}/capa2/pombos_1.mp4`,
    `${url}/capa2/reflejo_pomba.mp4`,
    `${url}/capa2/sao_paulo.mp4`,
    `${url}/capa2/sone_contigo_film.mp4`,
    `${url}/capa2/ventana_lluvia.mp4`,
    `${url}/capa2/ventana_noche.mp4`,
    `${url}/capa2/ventana_poligono.mp4`,
    `${url}/capa2/ventana_puente.mp4`,
    `${url}/capa2/ventana_roja.mp4`,
    `${url}/capa2/ventana_tajo.mp4`,
    `${url}/capa2/ventana_tren_1.mp4`,
    `${url}/capa2/ventana_tren_2.mp4`,
    `${url}/capa2/avion_navidad.mp4`,
    `${url}/capa2/coche_aeropuerto.mp4`,
    `${url}/capa2/sants_sol.mp4`,
  ];

  const contenedor$1 = document.getElementById('capaVideos');
  const btn = document.getElementById('capa2Btn');
  let actual$1 = -1;
  let anchoPantalla$1 = 0;
  let altoPantalla$1 = 0;

  btn.onclick = () => {
    actual$1 = elementoAleatorio(urls, actual$1);

    const vid = document.createElement('video');
    vid.autoplay = true;
    vid.muted = true;
    vid.setAttribute('playsinline', true);
    vid.className = 'videoFlotante';
    vid.width = aleatorio(anchoPantalla$1 / 8, anchoPantalla$1 / 2.5);
    vid.height = aleatorio(altoPantalla$1 / 8, altoPantalla$1 / 2.5);
    vid.src = urls[actual$1];

    Object.assign(vid.style, {
      top: aleatorio(-100, altoPantalla$1 / 2) + 'px',
      left: aleatorio(-100, anchoPantalla$1 / 2) + 'px',
      opacity: aleatorio(0.6, 0.9, true),
    });

    contenedor$1.appendChild(vid);

    vid.onended = () => {
      contenedor$1.removeChild(vid);
    };
  };

  function transformar$1() {
    anchoPantalla$1 = window.innerWidth;
    altoPantalla$1 = window.innerHeight;
  }

  transformar$1();

  var videos = {
    transformar: transformar$1,
  };

  var urls$1 = [
    //Línea
    `${url}/capa3/linea.gif`,
    //Pesadilla
    `${url}/capa3/pesadilla.gif`,
    //Gotas
    `${url}/capa3/gotas.gif`,
    //Ojo
    `${url}/capa3/ojo.gif`,
    //Ondas
    `${url}/capa3/onda.gif`,
  ];

  const contenedor$2 = document.getElementById('capaGifs');
  const btn$1 = document.getElementById('capa3Btn');
  let actual$2 = -1;
  let anchoPantalla$2 = 0;
  let altoPantalla$2 = 0;

  btn$1.onclick = () => {
    const img = new Image();
    img.className = 'gif';
    img.width = aleatorio(anchoPantalla$2 / 8, anchoPantalla$2);
    img.height = aleatorio(altoPantalla$2 / 8, altoPantalla$2);

    Object.assign(img.style, {
      top: aleatorio(0, altoPantalla$2 / 2.5) + 'px',
      left: aleatorio(0, anchoPantalla$2 / 2.5) + 'px',
      opacity: aleatorio(0.6, 0.8, true),
    });

    img.onload = () => {
      contenedor$2.appendChild(img);

      let intervalo = setInterval(() => {
        clearInterval(intervalo);
        contenedor$2.removeChild(img);
      }, aleatorio(10000, 15000));
    };

    actual$2 = elementoAleatorio(urls$1, actual$2);
    img.src = urls$1[actual$2];
  };

  function transformar$2() {
    anchoPantalla$2 = window.innerWidth;
    altoPantalla$2 = window.innerHeight;
  }

  transformar$2();

  var gifs = {
    transformar: transformar$2,
  };

  var urls$2 = [
    //voz - Fresques
    `${url}/voces/fresques.mp3`,
    //voz - Grand imper
    `${url}/voces/grand_imper_bleu_roi.mp3`,
    //je pense que c'etait maintenant le rêve
    `${url}/voces/j_pense_que_c_etait_maintenant.mp3`,
    //j trouvais
    `${url}/voces/j_trouvais_ca_plus_moche.mp3`,
    //1_1
    `${url}/musica/1_1.mp3`,
    //1_2
    `${url}/musica/1_2.mp3`,
    //2_1
    `${url}/musica/2_1.mp3`,
    //2_2
    `${url}/musica/2_2.mp3`,
    //2_3
    `${url}/musica/2_3.mp3`,
    //oiseaux de nuit
    `${url}/sonidos/oiseaux_de_nuit.mp3`,
    //distorsión 1
    `${url}/sonidos/distorsion_1.mp3`,
    //voces mix
    `${url}/voces/voces_mix.mp3`,
  ];

  const contenedor$3 = document.getElementById('capaAudios');
  const btn$2 = document.getElementById('audioCapa1Btn');
  let actual$3 = -1;

  btn$2.onclick = () => {
    let contador = 0;
    const reproducirXVeces = aleatorio(1, 5);
    const audio = document.createElement('audio');
    audio.autoplay = true;
    audio.volume = 0.5;

    actual$3 = elementoAleatorio(urls$2, actual$3);
    audio.src = urls$2[actual$3];

    audio.onended = () => {
      contador += 1;
      console.log(reproducirXVeces, contador);
      if (reproducirXVeces === contador) {
        console.log('destruyendo audio, ya termino', audio);
        contenedor$3.removeChild(audio);
      } else {
        audio.play();
      }
    };
    console.log('audio: ' + contador + audio.src);
  };

  window.onresize = () => {
    fondo.transformar();
    videos.transformar();
    gifs.transformar();
  };

}());
//# sourceMappingURL=programa.js.map
