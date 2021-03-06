import { Actividad } from './../../models/actividad.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface actividadesState extends EntityState<Actividad> {
  actividadActiva: Actividad | undefined;
  procesandoAccion: boolean;
  errorAccion: any;

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
    actividadActiva: undefined,
    procesandoAccion: false,
    errorAccion: null
  }
)
