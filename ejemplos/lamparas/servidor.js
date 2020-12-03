const Compilador = require('parcel-bundler');
const WebSocket = require('ws');
const app = require('express')();
const server = require('http').createServer(app);
const entrada = 'src/index.html';
const opciones = {}; // Opciones en https://parceljs.org/api.html
const compilador = new Compilador(entrada, opciones);
const { v4: uuidv4 } = require('uuid');
const puerto = 8080;

let proximoEnIniciarLlamada;

/**
 * Controlamos el arduino con JS usando la librería "johnny-five".
 * Desde el Arduino IDE, debemos cargar en la placa el programa de:
 * Archivo -> Ejemplos -> Firmata -> StandardFirmataPlus
 */
const { Board, Led } = require('johnny-five');
const board = new Board();
const lamparas = {
  lampara1: null,
  lampara2: null,
  lampara3: null,
  lampara4: null,
  lampara5: null,
  lampara6: null,
};

let arduinoListo = false;

board.on('ready', () => {
  arduinoListo = true;
  lamparas.lampara1 = new Led(7);
  lamparas.lampara2 = new Led(10);
});

app.use(compilador.middleware());
const ws = new WebSocket.Server({ server });
let usuariosConectados = {};

function existenOtrosUsuariosConectados() {
  return Object.keys(usuariosConectados).length > 1;
}

ws.on('connection', (usuario) => {
  // Creamos un id único en cada usuario usando la libreria uuid
  usuario.id = uuidv4();

  // agregamos este nuevo usuario a una lista global que va a contener todos los ususarios conectados actualmente.
  usuariosConectados[usuario.id] = usuario;

  usuario.send(
    JSON.stringify({
      accion: 'bienvenida',
      miId: usuario.id,
    })
  );

  // Para probar vamos a hacer que el primero en conectarse sea el que transmite su webcam.
  if (!existenOtrosUsuariosConectados()) {
    usuario.send(JSON.stringify({ accion: 'eresTransmisor' }));
    proximoEnIniciarLlamada = usuario;
  } else {
    proximoEnIniciarLlamada.send(
      JSON.stringify({
        accion: 'llamarA',
        llamarA: usuario.id,
      })
    );

    usuario.send(JSON.stringify({ accion: 'eresReceptor', recibirLlamadaDe: proximoEnIniciarLlamada.id }));
    // proximoEnIniciarLlamada = usuario;
  }

  // Esperamos a que lleguen mensajes de este ususario.
  usuario.on('message', (datos) => {
    datos = JSON.parse(datos);

    switch (datos.accion) {
      case 'prender':
        if (!arduinoListo) return;
        lamparas[`lampara${datos.lampara}`].on();
        break;

      case 'apagar':
        if (!arduinoListo) return;
        lamparas[`lampara${datos.lampara}`].off();
        break;

      case 'ofrecerSeñal':
        console.log(usuariosConectados, datos.enviarA);
        usuariosConectados[datos.enviarA].send(
          JSON.stringify({
            accion: 'conectarSeñal',
            idDelUsuario: usuario.id,
            señal: datos.signal,
          })
        );
        break;
    }
  });

  // Esperamos a ver si el usuario se desconecta.
  usuario.on('close', () => {
    console.log('Se desconecto', usuario.id);

    // Por último eliminamos al ususario de la lista de usuarios conectados.
    delete usuariosConectados[usuario.id];
  });
});

server.listen(puerto, () => {
  console.log(`La página se puede ver en: localhost:${puerto}`);
});
