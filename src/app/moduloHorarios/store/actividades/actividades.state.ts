import { ParametrosHorario } from './../../models/parametrosHorario.model';
import { Plantilla } from './../../models/plantilla.model';
import { Actividad } from './../../models/actividad.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface actividadesState extends EntityState<Actividad> {
  actividadActiva: Actividad;
  plantillas: Plantilla[];
  plantillaActiva: Plantilla;
  lunesSemanaSeleccionada: Date; // null => Se considera que se quiere todo el horario.
  parametrosHorario: ParametrosHorario;
  gestionandoActividad: boolean;
}

// Función que devuelve el identificador de la primary key
export function seleccionarActividadPorId(actividad: Actividad): string {
  return actividad.idActividad;
}



// Función que devuelve la estrategia de ordenación.
export function ordenaractividadesPorDiaSemana(a: Actividad, b: Actividad): number {
  return a.sesion.diaSemana.localeCompare(b.sesion.diaSemana);
}

export const adapter: EntityAdapter<Actividad> = createEntityAdapter<Actividad>(
  {
    selectId: seleccionarActividadPorId,
    sortComparer: ordenaractividadesPorDiaSemana
  }
)

export const initialActividadesState: actividadesState = adapter.getInitialState(
  {
    actividadActiva: null,
    plantillas: [],
    plantillaActiva: null,
    lunesSemanaSeleccionada: null,
    parametrosHorario: null,
    gestionandoActividad: false
  }
)
