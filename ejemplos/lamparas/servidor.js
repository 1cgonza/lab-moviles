const Compilador = require('parcel-bundler');
const WebSocket = require('ws');
const app = require('express')();
const server = require('http').createServer(app);
const entrada = 'src/index.html';
const opciones = {}; // Opciones en https://parceljs.org/api.html
const compilador = new Compilador(entrada, opciones);
const { v4: uuidv4 } = require('uuid');

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

ws.on('connection', (usuario) => {
  // Creamos un id único en cada usuario usando la libreria uuid
  usuario.id = uuidv4();
  // agregamos este nuevo usuario a una lista global que va a contener todos los ususarios conectados actualmente.
  usuariosConectados[usuario.id] = usuario;

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
    }
  });

  // Esperamos a ver si el usuario se desconecta.
  usuario.on('close', () => {
    console.log('Se desconecto', usuario.id);

    // Por último eliminamos al ususario de la lista de usuarios conectados.
    delete usuariosConectados[usuario.id];
  });
});

server.listen(8080, () => {
  console.log(`La página se puede ver en: http://localhost:8080`);
});
