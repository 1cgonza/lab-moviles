import Fantasma from './Fantasma';
import Elemento from './Elemento';
import Cargador from './Cargador';
import Vector from './Vector';
import { aleatorio } from './ayudas';

export default class extends Fantasma {
  constructor(datos, canvas, ctx) {
    super(datos, canvas, ctx);
    // this.mensaje = mensaje;
    this.elemento = new Elemento('imagen', datos.url);
    const cargador = new Cargador();
    cargador.agregar([this.elemento]);
    // cargador.on('progreso', datos => {
    //   mensaje.escribir(`fantasma...${datos.porcentajeCargado}%`);
    // });
    cargador.on('listo', this.inicio.bind(this));
    // mensaje.mostrar();
    cargador.cargar();
  }

  inicio() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.contenedor.classList.remove('apagado');
    // this.mensaje.esconder();
    this.cargado = true;
    this.reproduciendo = true;
    this.img = this.elemento.elemento;
    this.visor = {
      minX: 0,
      maxX: this.img.naturalWidth - window.innerWidth,
      minY: 0,
      maxY: this.img.naturalHeight - window.innerHeight,
    };

    this.pos = new Vector(aleatorio(this.visor.minX, this.visor.maxX), aleatorio(this.visor.minY, this.visor.maxY));

    this.nuevoDestino();

    this.animar();
  }

  animar() {
    if (this.tick === 8) {
      const distancia = this.pos.distanciaA(this.destino);

      if (distancia > 0) {
        this.ctx.drawImage(this.img, -this.pos.x, -this.pos.y);

        const angulo = this.pos.anguloA(this.destino);
        const _x = Math.sin(angulo);
        const _y = Math.cos(angulo);

        if (angulo >= 0) {
          this.pos.x -= _x;
          this.pos.y -= _y;
        } else {
          this.pos.x += _x;
          this.pos.y += _y;
        }

        if (Math.random() > 0.9) {
          this.nuevoDestino();
        }
      } else {
        this.nuevoDestino();
      }

      this.tick = 0;
    }

    this.tick++;
    this.anim = requestAnimationFrame(this.animar.bind(this));
  }

  hastaPronto() {
    this.reproduciendo = false;
    window.cancelAnimationFrame(this.anim);
    this.contenedor.classList.add('apagado');
  }

  nuevoDestino() {
    this.destino = new Vector(aleatorio(this.visor.minX, this.visor.maxX), aleatorio(this.visor.minY, this.visor.maxY));
  }
}
