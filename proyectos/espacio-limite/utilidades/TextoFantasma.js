import Fantasma from './Fantasma';
import Vector from './Vector';
import { aleatorio } from './ayudas';

export default class extends Fantasma {
  constructor(datos, canvas, ctx) {
    super(datos, canvas, ctx);
    this.contenedor = document.getElementById('textosFantasma');
    this.inicio();
  }

  inicio() {
    this.contenedor.innerText = '';
    this.contenedor.classList.remove('apagado');
    this.contenedor.innerHTML = this.datos.mensaje;
    this.cargado = true;
    this.reproduciendo = true;
    this.pos = new Vector(window.innerWidth / 3, aleatorio(window.innerHeight / 4, window.innerHeight / 3));

    this.nuevoDestino();
    this.animar();
  }

  animar() {
    if (this.tick === 8) {
      const distancia = this.pos.distanciaA(this.destino);

      if (distancia > 0) {
        this.contenedor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;

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
    this.destino = new Vector(aleatorio(0, window.innerWidth), aleatorio(0, window.innerHeight));
  }
}
