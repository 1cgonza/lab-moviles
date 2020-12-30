import { aleatorio } from '../utilidades/ayudas';

const cursores = [
  'default',
  'none',
  'context-menu',
  'help',
  'pointer',
  'progress',
  'wait',
  'cell',
  'crosshair',
  'text',
  'vertical-text',
  'alias',
  'copy',
  'move',
  'no-drop',
  ', not-allowed',
  'grab',
  'grabbing',
  'all-scroll',
  'col-resize',
  'row-resize',
  'n-resize',
  'e-resize',
  's-resize',
  'w-resize',
  'ne-resize',
  'nw-resize',
  'se-resize',
  'sw-resize',
  'ew-resize',
  'ns-resize',
  'nesw-resize',
  'nwse-resize',
  'zoom-in',
  'zoom-out',
];

let anim;

export default {
  animar: (elemento) => {
    function loop() {
      const i = aleatorio(0, cursores.length);
      elemento.style.cursor = cursores[i];
      anim = requestAnimationFrame(loop);
    }

    loop();
  },

  detener: () => {
    window.cancelAnimationFrame(anim);
  },
};
