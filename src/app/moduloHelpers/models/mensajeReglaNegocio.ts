import { ReglaNegocio } from 'src/app/moduloHelpers/models/reglaNegocio';

export class MensajeReglaNegocio {
  idMensaje: string;
  reglaNegocio: ReglaNegocio;
  detalle: string;



  constructor(reglaRota: ReglaNegocio, mensaje: string) {

  this.idMensaje = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }
    );
    this.reglaNegocio = reglaRota;
    this.detalle = mensaje;


  }

}


