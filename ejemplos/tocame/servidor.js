const Compilador = require('parcel-bundler');
const WebSocket = require('ws');
const app = require('express')();
const server = require('http').createServer(app);
const entrada = 'src/index.html';
const opciones = {}; // Opciones en https://parceljs.org/api.html
const compilador = new Compilador(entrada, opciones);
const puerto = 8080;

app.use(compilador.middleware());
const ws = new WebSocket.Server({ server });

let usuariosConectados = [];
let contador = 0;

function transmitir(datos, id) {
  ws.clients.forEach((cliente) => {
    if (cliente.id !== id && cliente.readyState === WebSocket.OPEN) {
      cliente.send(datos);
    }
  });
}

ws.on('connection', (usuario) => {
  usuario.id = contador;
  usuariosConectados[contador] = usuario;
  contador++;

  usuario.on('message', (datos) => {
    transmitir(datos, usuario.id);
  });

  usuario.on('close', () => {
    console.log('Se desconecto', usuario.id);
    usuariosConectados = usuariosConectados.filter((u) => u.id !== usuario.id);
  });
});

server.listen(puerto, () => {
  console.log(`La página se puede ver en: http://localhost:${puerto}`);
});
