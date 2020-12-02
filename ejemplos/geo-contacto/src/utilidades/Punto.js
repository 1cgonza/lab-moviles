/**
 * El Punto representa una ubicación en 2 dimensiones. La "x" corresponde al plano horizontal y la "y" al plano vertical.
 *
 * Por ejemplo, usando `new Punto(2, 1)`, representa el siguiente punto en coordenadas:
 *
 * ```js
 *   y
 *   ^
 * 3 |
 * 2 |
 * 1 |  o
 * 0  — — — > x
 *   1 2 3
 * ```
 *
 */
export default class Punto {
  /**
   * @param  {number} [x=0] - Posición del punto en el eje X, predeterminado a 0.
   * @param  {number} [y=0] - Posición del punto en el eje Y, predeterminado a 0.
   */
  constructor(x = 0, y = 0) {
    /**
     * @member {number}
     * @default 0
     */
    this.x = x;
    /**
     * @member {number}
     * @default 0
     */
    this.y = y;
  }
  /**
   * Crea una copia del este Punto.
   *
   * @returns {Punto} Una copia de este punto.
   */
  clonar() {
    return new Punto(this.x, this.y);
  }

  /**
   * Copia los valores (x, y) de un punto a este.
   *
   * @param  {Punto} punto - El punto desde donde se copian los valores.
   * @returns {this} Devuelve este mismo luego de ser transformado.
   */
  copiarDe(punto) {
    this.definir(punto.x, punto.y);

    return this;
  }

  /**
   * Copia los valores (x, y) de este punto al punto que entra.
   *
   * @param  {Punto} punto - El punto al que se le quieren actualizar los valores.
   * @returns {Punto} El punto que entra con los valores actualizados.
   */
  copiarA(punto) {
    punto.definir(this.x, this.y);

    return punto;
  }

  /**
   * Permite comparar si dos puntos son iguales, devuelve "true" si lo son.
   *
   * @param  {Punto} punto - El punto que se quiere comparar con este.
   * @returns {Boolean} Responde si el punto que entra es igual a este.
   */
  esIgual(punto) {
    return this.x === punto.x && this.y === punto.y;
  }

  /**
   * Asigna nuevos valores de "x" y "y" al punto.
   *
   * En caso de omitir el parametro "y", se asigna el mismo que "x".
   *
   * @param  {number} [x=0] - Posición X que se quiere asignar al plano horizontal.
   * @param  {number} [y=0] - Posición Y que se quiere asignar al plano vertical.
   * @returns {this} Devuelve este mismo luego de ser transformado.
   */
  definir(x = 0, y = x) {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Calcular la distancia entre este punto y otro.
   *
   * @param {Punto} punto - Una instancia de Punto para calcular la distancia entre este y el que pasamos como parametro.
   */
  distanciaA(punto) {
    return Math.sqrt(this.distanciaAlCuadrado(punto));
  }

  distanciaAlCuadrado(punto) {
    var dx = this.x - punto.x;
    var dy = this.y - punto.y;
    return dx * dx + dy * dy;
  }
}
