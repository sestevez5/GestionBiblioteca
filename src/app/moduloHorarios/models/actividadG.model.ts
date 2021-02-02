import { Sesion } from './sesion';
import { Actividad } from './actividad.model';
export class ActividadG extends Actividad{

  nivelAncho: number;
  estado: EstadoActividad;

  constructor(actividad: Actividad) {
    super();
    this.idActividad = actividad.idActividad;
    this.contenido = actividad.contenido;
    this.sesion = actividad.sesion;
    this.nivelAncho = 0;
  }



}

export enum EstadoActividad { NUEVA, MODIFICADA, ELIMINADA, SINCAMBIOS}

