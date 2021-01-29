import { ContenidoActividad } from './contenidoActividad.model';
import { Sesion } from './sesion';

export class Actividad {
  idActividad: string;
  sesion: Sesion;
  contenido: ContenidoActividad;


  // constructor() {

  // }
  // constructor(param: { idActividad: string, diaSemana: string, horaInicio: string, horafin: string }) {
  //   this.idActividad = param.idActividad;
  //   this.sesion.diaSemana = param.diaSemana;
  //   this.sesion.horaInicio = param.horaInicio;
  //   this.sesion.horaFin = param.horafin;

  // }


  actualizarActividad(act: Actividad): void {
    this.sesion = act.sesion;
    this.contenido = act.contenido;
  }
}



