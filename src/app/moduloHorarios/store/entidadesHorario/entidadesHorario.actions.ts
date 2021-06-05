import { ListasSelectores } from './../../models/listasSelectores.model';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { EnumTipoEntidadHorario } from '../../models/tipoEntidadHorario.model';
import { Update } from '@ngrx/entity/src/models';


import { createAction, props } from '@ngrx/store';

// ---------------------------------------------
// Acciones de gestión de EntidadHorarios.
// ---------------------------------------------

// carga de EntidadHorarios.
export const cargarEntidadesHorario         = createAction('[ENTIDADESHORARIO] cargar entidadesHorario', props<{ tipoEntidad: EnumTipoEntidadHorario }>());
export const cargarEntidadesHorarioOK       = createAction('[ENTIDADESHORARIO] carga de entidadesHorario OK', props<{ entidadesHorario: EntidadHorario[], tipoEntidadHorario: EnumTipoEntidadHorario }>());
export const cargarEntidadesHorarioError    = createAction('[ENTIDADESHORARIO] carga de entidadesHorario errónea', props<{ error: string }>());

// creación de un nuevo EntidadHorario.
export const crearEntidadHorario           = createAction('[ENTIDADESHORARIO] crear entidadHorario', props<{ entidadHorario: EntidadHorario }>());
export const crearEntidadHorarioOK         = createAction('[ENTIDADESHORARIO] creación de entidadHorario OK', props<{ entidadHorario: EntidadHorario | undefined }>());
export const crearEntidadHorarioError      = createAction('[ENTIDADESHORARIO] creación de entidadHorario errónea', props<{ error: string }>());

// seleccionar EntidadHorario.
export const seleccionarEntidadHorario     = createAction('[ENTIDADESHORARIO] seleccionar EntidadHorario', props<{ entidadHorario: EntidadHorario, tipoEntidadHorario: EnumTipoEntidadHorario }>());

// modificación de un EntidadHorario.
export const modificarEntidadHorario       = createAction('[ENTIDADESHORARIO] modificar EntidadHorario', props<{ entidadHorario: EntidadHorario }>());
export const modificarEntidadHorarioOK     = createAction('[ENTIDADESHORARIO] modificación EntidadHorario OK', props<{ entidadHorario: Update<EntidadHorario> }>());
export const modificarEntidadHorarioError  = createAction('[ENTIDADESHORARIO] modificación EntidadHorario errónea', props<{ error: string }>());

// eliminación de un EntidadHorario.
export const eliminarEntidadHorario        = createAction('[ENTIDADESHORARIO] eliminar EntidadHorario', props<{ id: string }>());
export const eliminarEntidadHorarioOK      = createAction('[ENTIDADESHORARIO] eliminación EntidadHorario OK', props<{ id: string }>());
export const eliminarEntidadHorarioError   = createAction('[ENTIDADESHORARIO] eliminación EntidadHorario errónea', props<{ error: string }>());

// carga de lista de selectores.
export const cargarListaSelectores        = createAction('[ENTIDADESHORARIO] cargar lista de selectores');
export const cargarListaSelectoresOK       = createAction('[ENTIDADESHORARIO] carga de lista de selectores OK', props<{ listaSelectores: ListasSelectores }>());
export const cargarListaSelectoresError    = createAction('[ENTIDADESHORARIO] carga delista de selectores errónea', props<{ error: string }>());

