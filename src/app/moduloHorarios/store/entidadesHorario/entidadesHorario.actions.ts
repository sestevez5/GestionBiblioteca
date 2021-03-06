import { EnumTipoEntidadHorario } from './../../models/tipoEntidadHorario.model';
import { Update } from '@ngrx/entity/src/models';

import { EntidadHorario } from '../../models/EntidadHorario.model';
import { createAction, props } from '@ngrx/store';

export const loadEntidadesHorario = createAction(
  '[ENTIDADESHORARIO] Load entidadesHorario'
);

export const loadEntidadesHorarioSuccess = createAction(
  '[ENTIDADESHORARIO] Load entidadesHorario Success',
  props<{ data: any }>()
);

export const loadEntidadesHorarioFailure = createAction(
  '[ENTIDADESHORARIO] Load entidadesHorario Failure',
  props<{ error: any }>()
);


// ---------------------------------------------
// Acciones de gestión de EntidadHorarios.
// ---------------------------------------------

// carga de EntidadHorarios.
export const cargarEntidadesHorario         = createAction('[ENTIDADESHORARIO] cargar entidadesHorario', props<{ tipoEntidad: EnumTipoEntidadHorario }>());
export const cargarEntidadesHorarioOK       = createAction('[ENTIDADESHORARIO] carga de entidadesHorario OK', props<{ entidadesHorario: EntidadHorario[] }>());
export const cargarEntidadesHorarioError    = createAction('[ENTIDADESHORARIO] carga de entidadesHorario errónea', props<{ error: string }>());

// creación de un nuevo EntidadHorario.
export const crearEntidadHorario           = createAction('[ENTIDADESHORARIO] crear EntidadHorario', props<{ entidadHorario: EntidadHorario }>());
export const crearEntidadHorarioOK         = createAction('[ENTIDADESHORARIO] creación de EntidadHorario OK', props<{ entidadHorario: EntidadHorario | undefined }>());
export const crearEntidadHorarioError     = createAction('[ENTIDADESHORARIO] creación de EntidadHorario errónea', props<{ error: string }>());

// cargar EntidadHorario.
export const cargarEntidadHorario          = createAction('[ENTIDADESHORARIO] cargar EntidadHorario', props<{ id: string }>());
export const cargarEntidadHorarioOK        = createAction('[ENTIDADESHORARIO] carga EntidadHorario OK', props<{ EntidadHorario: EntidadHorario | undefined }>());
export const cargarEntidadHorarioError     = createAction('[ENTIDADESHORARIO] carga EntidadHorario errónea', props<{ error: string }>());

// modificación de un EntidadHorario.
export const modificarEntidadHorario       = createAction('[ENTIDADESHORARIO] modificar EntidadHorario', props<{ entidadHorario: EntidadHorario }>());
export const modificarEntidadHorarioOK     = createAction('[ENTIDADESHORARIO] modificación EntidadHorario OK', props<{ entidadHorario: Update<EntidadHorario> }>());
export const modificarEntidadHorarioError  = createAction('[ENTIDADESHORARIO] modificación EntidadHorario errónea', props<{ error: string }>());

// eliminación de un EntidadHorario.
export const eliminarEntidadHorario        = createAction('[ENTIDADESHORARIO] eliminar EntidadHorario', props<{ id: string }>());
export const eliminarEntidadHorarioOK      = createAction('[ENTIDADESHORARIO] eliminación EntidadHorario OK', props<{ id: string }>());
export const eliminarEntidadHorarioError   = createAction('[ENTIDADESHORARIO] eliminación EntidadHorario errónea', props<{ error: string }>());


