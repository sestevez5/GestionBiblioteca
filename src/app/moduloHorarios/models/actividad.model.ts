import { IGrupo } from './grupo.model';
import { IAsignatura } from './asignatura.model';
import { IDocente } from './docente.model';
import { Sesion } from './sesion';

export class Actividad {
  idActividad: string;
  sesion: Sesion;
  detalleActividad: string;
  docentes: IDocente[];
  asignaturas: IAsignatura[];
  grupos: IGrupo[];
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



