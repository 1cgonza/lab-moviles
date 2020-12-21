export default class Elemento {
  constructor(tipo, url) {
    this.url = url;
    this.solicitud = new XMLHttpRequest();
    this.peso = 0;
    this.cargado = false;
    this.tipo = tipo;
    this.totalCargado = 0;
    this.elemento;
  }
}
