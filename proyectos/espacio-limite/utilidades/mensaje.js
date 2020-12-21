const contenedor = document.getElementById('mensajes');
const mensaje = contenedor.querySelector('#texto');

export default {
  mostrar: () => {
    contenedor.classList.remove('esconder');
  },

  esconder: () => {
    contenedor.classList.add('esconder');
  },

  escribir: (texto) => {
    mensaje.innerText = `...\n\n${texto}\n...`;
  },
};
