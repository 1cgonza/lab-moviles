const Compilador = require('parcel-bundler');
const WebSocket = require('ws');
const app = require('express')();
const server = require('http').createServer(app);
const entrada = 'src/index.html';
const opciones = {}; // Opciones en https://parceljs.org/api.html
const compilador = new Compilador(entrada, opciones);
const { v4: uuidv4 } = require('uuid');

app.use(compilador.middleware());
const ws = new WebSocket.Server({ server });
let usuariosConectados = {};

function transmitir(datos, id) {
  ws.clients.forEach((usuario) => {
    if (usuario.id !== id && usuario.readyState === WebSocket.OPEN) {
      const d = typeof datos === 'string' ? JSON.parse(datos) : datos;
      d.desde = id;
      usuario.send(JSON.stringify(d));
    }
  });
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

  console.log(Object.keys(usuariosConectados));

  // Le decimos a todos los usuarios conectados que se preparen para recibir llamada de este nuevo ususario.
  transmitir({ accion: 'recibirLlamada' }, usuario.id);

  // Esperamos a que lleguen mensajes de este ususario.
  usuario.on('message', (datos) => {
    datos = JSON.parse(datos);

    // console.log(datos.accion, datos);
    switch (datos.accion) {
      case 'llamame':
        // Le decimos al usuario que inicie la llamada
        usuariosConectados[datos.quien].send(
          JSON.stringify({
            accion: 'iniciarLlamada',
            quien: usuario.id,
          })
        );
        break;
      case 'ofrecerSeñal':
        usuariosConectados[datos.usuarioID].send(
          JSON.stringify({
            accion: 'conectarSeñal',
            idDelUsuario: usuario.id,
            señal: datos.signal,
          })
        );
        break;
    }
    // transmitir(datos, usuario.id);
  });

  // Esperamos a ver si el usuario se desconecta.
  usuario.on('close', () => {
    console.log('Se desconecto', usuario.id);

    // Le avisamos a todos los usuarios conectados que un usuario se desconectó.
    transmitir({ accion: 'desconectar' }, usuario.id);
    // Por último eliminamos al ususario de la lista de usuarios conectados.
    delete usuariosConectados[usuario.id];
  });
});

server.listen(8080, () => {
  console.log(`La página se puede ver en: http://localhost:8080`);
});
