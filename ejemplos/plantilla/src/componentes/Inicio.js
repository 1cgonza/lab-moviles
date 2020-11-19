export default function pgInicio() {
  const contenedor = document.getElementById('inicio');
  const app = document.getElementById('app');
  const usuario = document.getElementById('usuario');
  const conectarse = document.getElementById('conectarse');

  return new Promise((resolver) => {
    function ingresar() {
      contenedor.classList.add('esconder');
      app.classList.remove('esconder');
      resolver(usuario.value);
    }

    usuario.onkeyup = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        ingresar();
      }

      conectarse.disabled = !usuario.value.length;
    };

    conectarse.onclick = () => {
      ingresar();
    };
  });
}
