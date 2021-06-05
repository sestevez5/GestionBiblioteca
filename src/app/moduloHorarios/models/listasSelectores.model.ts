import { Plantilla } from './plantilla.model';
import { PeriodoVigencia } from './peridoVigencia';
import { Asignatura } from './asignatura.model';
import { Grupo } from './grupo.model';
import { Dependencia } from './dependencia.model';
import { Docente } from './docente.model';
export interface ListasSelectores {
  docentes: Docente[];
  grupos: Grupo[];
  dependencias: Dependencia[];
  asignaturas: Asignatura[];
  periodoVigencia: PeriodoVigencia[];
  plantillas: Plantilla[];

}
