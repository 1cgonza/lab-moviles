export default class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  definir(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  definirX(x) {
    this.x = x;
    return this;
  }

  definirY(y) {
    this.y = y;
    return this;
  }

  definirZ(z) {
    this.z = z;
    return this;
  }

  sumar(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  sumarEscala(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }

  restar(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  restarEscala(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  }

  restarVectores(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }

  multiplicar(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }

  multiplicarEscala(s) {
    if (isFinite(s)) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
    return this;
  }

  multiplicarVectores(a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  }

  dividir(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }

  dividirEscala(s) {
    return this.multiplicarEscala(1 / s);
  }

  longitudCuadrado() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  longitud() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  asignarLongitud(longitud) {
    return this.multiplicarEscala(longitud / this.longitud());
  }

  /**
   *
   * @param {Vector} v - Una instancia de Vector
   */
  distanciaA(v) {
    return Math.sqrt(this.distanciaAlCuadrado(v));
  }

  normalizar() {
    return this.dividirEscala(this.longitud());
  }

  distanciaAlCuadrado(v) {
    var dx = this.x - v.x;
    var dy = this.y - v.y;
    var dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  esIgual(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  copiarDesde(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  anguloA(v, enGrados) {
    const angulo = Math.atan2(v.y - this.y, v.x - this.x);
    return enGrados ? (angulo * 180) / Math.PI : angulo;
  }
}
