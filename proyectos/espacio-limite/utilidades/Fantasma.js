export default class Fantasma {
  constructor(datos, canvas, ctx) {
    this.datos = datos;
    this.canvas = canvas;
    this.ctx = ctx;
    this.cargado = false;
    this.reproduciendo = false;
    this.anim;
    this.tick = 0;
    this.contenedor = document.getElementById('fantasmas');
  }
}
