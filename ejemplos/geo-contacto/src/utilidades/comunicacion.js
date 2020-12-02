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

  _recibiendoMensaje = (evento) => {
    const datos = JSON.parse(evento.data);

    switch (datos.accion) {
      case 'bienvenida':
        this.miId = datos.miId;
        break;
      case 'recibirLlamada':
        this._hacerLlamada(datos.desde, false);
        this._enviarDatosAlServidor({ accion: 'llamame', quien: datos.desde });
        break;
      case 'iniciarLlamada':
        this._hacerLlamada(datos.quien, true);
        break;
      case 'conectarSeñal':
        this.amigos[datos.idDelUsuario].signal(datos.señal);
        break;
      case 'desconectar':
        this.amigos[datos.desde].destroy();
        delete this.amigos[datos.desde];
        break;
    }
  };

  _hacerLlamada(usuarioID, iniciarLlamada) {
    const amigo = new Peer({
      initiator: iniciarLlamada,
      objectMode: true,
    });

    amigo.on('signal', (data) => {
      this._enviarDatosAlServidor({
        accion: 'ofrecerSeñal',
        signal: data,
        usuarioID: usuarioID,
      });
    });

    amigo.on('connect', () => {
      console.log('Conectado con:', usuarioID);
      console.log(this.amigos);
    });

    amigo.on('data', (datos) => {
      datos = JSON.parse(datos);
      this.emit('nuevosDatos', datos);
    });

    amigo.on('error', (err) => {
      console.log('Nuevo error', err);
    });

    this.amigos[usuarioID] = amigo;
  }

  _enviarDatosAlServidor(datos) {
    this._conexion.send(JSON.stringify(datos));
  }

  enviarDatos(datos) {
    for (let id in this.amigos) {
      if (this.amigos[id]) {
        this.amigos[id].send(JSON.stringify(datos));
      }
    }
  }
}
