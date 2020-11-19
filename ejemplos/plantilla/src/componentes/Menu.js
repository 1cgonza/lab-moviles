import { usuarios } from '../utilidades/constantes';

export default class Menu {
  constructor() {
    this.contenedor = document.getElementById('menu');
  }

  creareMenu() {
    usuarios.forEach((nombre) => {
      const usuario = document.createElement('div');
      usuario.className = 'usuario';
      usuario.innerText = nombre;
      this.contenedor.appendChild(usuario);

      usuario.onclick = async () => {
        // const foto = await tomarFoto();
        // console.log(foto);
        // movimiento();
      };
    });
  }
}
