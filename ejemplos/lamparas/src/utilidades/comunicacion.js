import Emitter from 'eventemitter3';
import Peer from 'simple-peer';

export default class Com extends Emitter {
  constructor() {
    super();
    this.amigos = {};
    this.miId;
    const protocolo = window.location.protocol == 'https:' ? 'wss' : 'ws';
    this._conexion = new WebSocket(`${protocolo}://${window.location.hostname}:${window.location.port}`);
    this._conexion.onopen = this._inicio;
    this._conexion.onmessage = this._recibiendoMensaje;
  }

  _inicio = () => {
    this.emit('conectado');
  };

  enviarDatosAlServidor(datos) {
    this._conexion.send(JSON.stringify(datos));
  }
}
