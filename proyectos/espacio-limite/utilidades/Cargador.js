import Eventos from 'eventemitter3';

export default class Cargador extends Eventos {
  constructor() {
    super();
    this._pesoTotal = 0;
    this._pesosDefinidos = 0;
    this._pesoCargado = 0;
    this._totalCargados = 0;
    this.fila = [];
  }

  agregar(elementos) {
    this.fila = [...this.fila, ...elementos];
  }

  cargar() {
    this.emit('iniciandoPrecarga');

    this.fila.forEach((elemento) => {
      const solicitud = elemento.solicitud;
      const respuesta = { tipo: elemento.tipo, url: elemento.url };

      switch (elemento.tipo) {
        case 'imagen':
          solicitud.responseType = 'blob';
          break;
        case 'sonido':
          solicitud.responseType = 'arraybuffer';
          break;
      }

      solicitud.open('GET', elemento.url, true);
      solicitud.onloadstart = () => this.emit('cargandoElemento', respuesta);
      solicitud.onloadend = () => this.emit('elementoCargado', respuesta);
      solicitud.onprogress = (e) => this._actualizarProgreso(e, elemento);
      solicitud.onerror = (err) => this.emit('errorCargandoElemento', { ...respuesta, error: err });
      solicitud.onload = () => {
        if (solicitud.status === 200) {
          if (elemento.tipo === 'imagen') {
            const img = new Image();
            img.onload = () => {
              this._totalCargados++;
              elemento.cargado = true;
              elemento.elemento = img;

              this._revisar();
            };
            img.src = URL.createObjectURL(solicitud.response);
          } else {
            elemento.elemento = solicitud.response;
            elemento.cargado = true;

            this._revisar();
          }
        } else {
          throw new Error(`Problema cargando elemento ${elemento.url} del servidor`);
        }
      };

      solicitud.send(null);
    });
  }

  _reiniciarCargador() {
    this._pesoTotal = 0;
    this._pesosDefinidos = 0;
    this._pesoCargado = 0;
    this._totalCargados = 0;
    this.fila = [];
  }

  _actualizarProgreso(e, elemento) {
    if (e.lengthComputable) {
      if (elemento.peso === 0) {
        elemento.peso = e.total;
        this._pesoTotal += e.total;
        this._pesosDefinidos++;
      }

      if (this._pesosDefinidos === this.fila.length) {
        elemento.totalCargado = e.loaded;
        this._pesoCargado = this.fila.map((ele) => ele.totalCargado).reduce((suma, cargado) => suma + cargado);

        this.emit('progreso', {
          porcentajeCargado: Math.floor((this._pesoCargado / this._pesoTotal) * 100),
          totalElementosCargando: this.fila.length,
        });
      }
    } else {
      elemento.solicitud.onprogress = null;
    }
  }

  _revisar() {
    if (this._totalCargados === this.fila.length) {
      this._reiniciarCargador();
      this.emit('listo');
    }
  }
}
