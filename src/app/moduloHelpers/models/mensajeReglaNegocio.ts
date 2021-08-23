import { ReglaNegocio } from 'src/app/moduloHelpers/models/reglaNegocio';

export class MensajeReglaNegocio {
  reglaNegocio: ReglaNegocio;
  detalle: string;



  constructor(reglaRota: ReglaNegocio, mensaje: string) {

    this.reglaNegocio = reglaRota;
    this.detalle = mensaje;


  }

}


