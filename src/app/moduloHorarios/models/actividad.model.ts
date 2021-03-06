import { Grupo } from './grupo.model';
import { Asignatura } from './asignatura.model';
import { Docente } from './docente.model';
import { Sesion } from './sesion';

export class Actividad {
  idActividad: string;
  sesion: Sesion;
  detalleActividad: string;
  docentes: Docente[];
  asignaturas: Asignatura[];
  grupos: Grupo[];
  dependencia: string | undefined;

  public actualizarActividad(actividad: Actividad): void {
    this.detalleActividad = actividad.detalleActividad
    this.sesion = actividad.sesion;
    this.docentes = actividad.docentes;
    this.dependencia = actividad.dependencia;
    this.grupos = actividad.grupos;
    this.asignaturas = actividad.asignaturas;
 }


}



