import Emitter from 'eventemitter3';
import Peer from 'simple-peer';
const video = document.getElementById('video');
/**
 * TODO:
 * - reproducir video luego de un clic
 */
// const config = {
//   iceServers: [
//     {
//       urls: 'stun:stun.l.google.com:19302',
//     },
//     // public turn server from https://gist.github.com/sagivo/3a4b2f2c7ac6e1b5267c2f1f59ac6c6b
//     // set your own servers here
//     {
//       url: 'turn:192.158.29.39:3478?transport=udp',
//       credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//       username: '28224511:1379330808',
//     },
//   ],
// };

const config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
  ],
};

const restricciones = {
  audio: true,
  video: {
    width: { max: 640 },
    height: { max: 480 },
    facingMode: { ideal: 'user' },
  },
};
export default class Com extends Emitter {
  constructor() {
    super();
    this.amigos = {};
    this.miId;
    const protocolo = window.location.protocol == 'https:' ? 'wss' : 'ws';
    this._conexion = new WebSocket(`${protocolo}://${window.location.hostname}:${window.location.port}`);
    this._conexion.onopen = this._inicio;
    this._conexion.onmessage = this._recibiendoMensaje;
    this.transmision;

    video.onloadedmetadata = () => {
      const { aspectRatio, width, height } = this.transmision.getVideoTracks()[0].getSettings();
      console.log('aspectRatio', aspectRatio);
      console.log('width', width);
      console.log('height', height);

      video.play();
    };
  }

  _inicio = () => {
    this.emit('conectado');
  };

  _recibiendoMensaje = async (evento) => {
    const datos = JSON.parse(evento.data);

    switch (datos.accion) {
      case 'bienvenida':
        this.miId = datos.miId;
        break;
      case 'eresTransmisor':
        console.log('Eres transmisor');
        this.tipo = 'transmisor';

        try {
          this.transmision = await navigator.mediaDevices.getUserMedia(restricciones);
          video.srcObject = this.transmision;
          video.play();

          // Revisar si se han realizado llamadas mientras se define esto.
          if (Object.keys(this.amigos).length > 0) {
            for (let id in this.amigos) {
              this.amigos[id].addStream(this.transmision);
            }
          }
        } catch (error) {
          console.error(error);
        }

        break;
      case 'eresReceptor':
        console.log('Eres receptor');
        this._hacerLlamada(datos.recibirLlamadaDe, false);
        this.tipo = 'receptor';
        break;
      case 'conectarSeñal':
        console.log('negociando señal');
        this.amigos[datos.idDelUsuario].signal(datos.señal);
        break;
      case 'llamarA':
        console.log('Llamar a:', datos.llamarA);
        this._hacerLlamada(datos.llamarA, true);
    }
  };

  _hacerLlamada(amigoId, iniciarLlamada) {
    const amigo = new Peer({
      initiator: iniciarLlamada,
      config: config,
    });

    amigo.on('signal', (data) => {
      this.enviarDatosAlServidor({
        accion: 'ofrecerSeñal',
        signal: data,
        enviarA: amigoId,
      });
    });

    amigo.on('connect', () => {
      console.log('Conectado con:', amigoId);
    });

    amigo.on('stream', (transmision) => {
      console.log('Llego la transmisión', transmision);
      if ('srcObject' in video) {
        this.transmision = transmision;
        video.srcObject = transmision;
      } else {
        video.src = window.URL.createObjectURL(transmision);
      }
    });

    amigo.on('close', () => {
      console.log('Cerro la señal', amigoId);
      amigo.destroy();
      delete this.amigos[amigoId];
    });

    amigo.on('data', (d) => {
      console.log('datos?', d);
    });

    amigo.on('error', (err) => {
      console.error('Nuevo error', err);
    });

    // Si el transmisor ya inicio su cámara, mandarle la transmision al usuario.
    if (this.transmision) {
      amigo.addStream(this.transmision);
    }

    this.amigos[amigoId] = amigo;
  }

  enviarDatosAlServidor(datos) {
    this._conexion.send(JSON.stringify(datos));
  }
}
