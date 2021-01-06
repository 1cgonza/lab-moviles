import './estilos.scss';

import fondo from './componentes/fondo';
import videos from './componentes/videos';
import gifs from './componentes/gifs';
import audios from './componentes/audios';

window.onresize = () => {
  fondo.transformar();
  videos.transformar();
  gifs.transformar();
};
