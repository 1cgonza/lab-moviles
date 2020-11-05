import { ubicacion, infoDispositivo } from './utilidades/ayudas';

ubicacion().then((geo) => {
  console.log(geo);
});

console.log(infoDispositivo());
