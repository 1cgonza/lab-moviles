import Punto from '../utilidades/Punto';

/**
 * Calcula aproximadamente cuantos metros a la redonda queremos observar.
 * Entre más grande, el punto se mueve menos ya que lo estamos viendo desde más lejos.
 * @param {number} metros - Metros alrdedor
 */
function calcularRango(metros) {
  return metros * 0.0000046;
}

export default class Personaje {
  constructor(inicial) {
    // En metros a la redonda
    const rango = calcularRango(20);

    this.inicial = inicial;
    this.punto = new Punto();
    this.limite = {
      norteLat: inicial.latitude + rango,
      surLat: inicial.latitude - rango,
      oesteLon: inicial.longitude + rango,
      esteLon: inicial.longitude - rango,
    };

    this.actualizarDimensiones();
    this.actualizarPunto(inicial);
  }

  /**
   * Convierte de coordenadas a pixeles y actualiza el punto.
   *
   * @param {Object} coords - Es un objeto con coordenadas en latitud y longitud
   * @param {Number} coords.lat - Latitud
   * @param {Number} coords.lon - Longitud
   */
  actualizarPunto(coords) {
    this.punto.x = (coords.longitude - this.limite.oesteLon) * this.pixelesLon;
    this.punto.y = Math.abs(coords.latitude - this.limite.norteLat) * this.pixelesLat;
  }

  /**
   * Si la pantalla cambia de tamaño, debemos usar esta función para actualizar los valores de los pixeles para
   * que cada calculo de posición corresponda a la pantalla del dispositivo.
   */
  actualizarDimensiones() {
    this.ancho = window.innerWidth;
    this.alto = window.innerHeight;
    this.pixelesLat = this.alto / (this.limite.norteLat - this.limite.surLat);
    this.pixelesLon = this.ancho / (this.limite.esteLon - this.limite.oesteLon);
  }
}
