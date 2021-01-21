import { Sesion } from './sesion';
import { Actividad } from './actividad.model';
export class ActividadG extends Actividad{

  posX: number;
  poyY: number;
  nivelAncho: number;

  constructor(actividad: Actividad) {
    super();
    this.idActividad = actividad.idActividad;
    this.contenido = actividad.contenido;
    this.sesion = actividad.sesion;
  }

}
