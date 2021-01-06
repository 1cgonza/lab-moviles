import diccionario from './diccionario';

class Nodo {
  constructor() {
    this.fin = false;
    this.ramas = {};
  }
}

export default class Palabras {
  constructor() {
    this.raiz = new Nodo();
    // Contruir base de datos tipo Trie: https://en.wikipedia.org/wiki/Trie
    diccionario.forEach((palabra) => this.insertar(palabra));
  }

  insertar(palabra) {
    let raiz = this.raiz;

    for (let i = 0; i < palabra.length; ++i) {
      if (raiz.ramas[palabra[i]]) raiz = raiz.ramas[palabra[i]];
      else {
        raiz.ramas[palabra[i]] = new Nodo();
        raiz = raiz.ramas[palabra[i]];
      }
    }

    raiz.fin = true;
  }

  revisar(palabra) {
    let raiz = this.raiz;

    for (let i = 0; i < palabra.length; ++i) {
      if (!raiz.ramas[palabra[i]]) return false;
      raiz = raiz.ramas[palabra[i]];
    }

    return raiz.fin === true;
  }

  /**
   * Este metodo construye un array con palabras validas en el diccionario,
   * toma una lista de letras y las mezcla hasta producir palabras validas en el idioma español.
   *
   * @param {number} longitudPalabra - El numero de letras que deben tener las palabras que se construyen
   * @param {string[]} letras - Un array con letras
   */
  generarPalabras(longitudPalabra, letras) {
    const resultado = [];

    const generador = (memoria) => {
      for (let i = 0; i < letras.length; i++) {
        memoria += letras[i];
        if (memoria.length === longitudPalabra) {
          if (this.revisar(memoria)) {
            resultado.push(memoria);
          }
        } else {
          generador(memoria);
        }
        memoria = memoria.slice(0, -1);
      }
    };

    generador('');

    return resultado;
  }

  /**
   * Interviene un texto generando una lista de letras únicas y luego generando una lista de palabras en español.
   * Este es el método principal para utilizar esta clase.
   * En el diccionario que estamos usando, la longitud máxima de las palabras es 21 y la mínima es 1.
   * Para hacer el proceso de busqueda más rápìdo, no se generan todas las posibles palabras sino las de cierta longitud.
   * Los parametros `minLongitud` y `maxLongitud` definen estas longitudes de las palabras.
   *
   * @param {string} entrada - El texto que se quiere intervenir.
   * @param {number} [minLongitud=4] - (opcional) La longitud de las palabras más cortas que se quieren generar.
   * @param {number} [maxLongitud=minLongitud] - (opcional) La longitud de las palabras más largas que se quieren generar.
   */
  intervenir(entrada, minLongitud = 4, maxLongitud = minLongitud) {
    const letras = [...new Set(entrada.replace(/\s/g, '').toLowerCase().split(''))];
    let palabras = [];

    for (let i = minLongitud; i <= maxLongitud; ++i) {
      palabras = [...palabras, ...this.generarPalabras(i, letras)];
    }

    // eliminamos de los resultados las palabras que buscaron = Expectation Failed :)
    const palabrasEnEntrada = entrada.toLowerCase().split(' ');
    palabrasEnEntrada.forEach((p) => {
      palabras = palabras.filter((palabra) => palabra !== p);
    });

    return {
      letras: letras,
      palabras: palabras,
    };
  }
}
