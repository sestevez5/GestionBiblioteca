import { ListasSelectores } from './../../models/listasSelectores.model';
import { EnumTipoEntidadHorario, TipoEntidadHorario } from '../../models/tipoEntidadHorario.model';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface entidadesHorarioState extends EntityState<EntidadHorario> {
  entidadHorarioActiva: EntidadHorario;
  tipoEntidadActiva: TipoEntidadHorario;
  listaSelectores: ListasSelectores;
}

// Función que devuelve el identificador de la primary key
export function seleccionarEntidadHorarioPorId(entidadHorario: EntidadHorario): string {
  return entidadHorario.id;
}

// Función que devuelve la estrategia de ordenación.
export function ordenarEntidadesHorarioPorDescripcion(a: EntidadHorario, b: EntidadHorario): number {
  return a.descripcion.localeCompare(b.descripcion)
}

export const adapter: EntityAdapter<EntidadHorario> = createEntityAdapter<EntidadHorario>(
  {
    selectId: seleccionarEntidadHorarioPorId,
    sortComparer: ordenarEntidadesHorarioPorDescripcion
  }
)

export const initialEntidadesHorarioState: entidadesHorarioState = adapter.getInitialState(
  {
    entidadHorarioActiva: null,
    tipoEntidadActiva: null,
    listaSelectores: null,

  }
)
