import { ContenidoActividad } from './contenidoActividad.model';
import { Sesion } from './sesion';

export class Actividad {
  idActividad: string;
  sesion: Sesion;
  contenido: ContenidoActividad;


  actualizarActividad(act: Actividad): void {
    this.sesion = act.sesion;
    this.contenido = act.contenido;
  }
}



