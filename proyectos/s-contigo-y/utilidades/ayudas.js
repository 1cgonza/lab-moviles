export const url = 'https://juancgonzalez.com/labmoviles/suenos';

// Función para producir un número aleatorio
export function aleatorio(min, max, enDecimales) {
  const valor = Math.random() * (max - min);
  return enDecimales ? valor + min : Math.floor(valor) + min;
}

export function elementoAleatorio(urls, actual) {
  const i = aleatorio(0, urls.length);

  if (i === actual) {
    // Si esa posición es la que actualmente se esta usando, volvemos a correr la función sin cambiar el video.
    return elementoAleatorio(urls, actual);
  }

  return i;
}

export function siguienteVideo() {
  // Un poquito de matemática para pasar por los videos en orden:
  // 1. videoActual empieza en posición 0.
  // 2. sumamos 1 a videoActual cada que entramos a esta función (videoActual + 1).
  // 3. Si llega al final del array, volvemos al primero (% videos.length).
  // (% videos.length) lo que esta haciendo es basicamente revisando cuantos elementos hay en el array y si llega al final (videos.length) no sume 1 sino que se devuelve a 0.
  // Nota: Puedes sumar todos los videos que quieras al array "videos" y esta función siempre va saltando en orden.
  videoActual = (videoActual + 1) % videosFondo.length;
  // Sabiendo en que posición del array debe estar, ponemos esa URL en el video.
  videoFondo.src = videosFondo[videoActual];
}

export function desaparece(elmnt, clr) {
  elmnt.style.color = clr;
  console.log('hola');
}
