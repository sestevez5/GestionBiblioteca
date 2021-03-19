import { ParametrosHorario } from './../../models/parametrosHorario.model';
import { Plantilla } from './../../models/plantilla.model';
import { Update } from '@ngrx/entity/src/models';

import { Actividad } from '../../models/actividad.model';
import { createAction, props } from '@ngrx/store';

export const loadActividades = createAction(
  '[ACTIVIDADES] Load actividades'
);

export const loadActividadesSuccess = createAction(
  '[ACTIVIDADES] Load actividades Success',
  props<{ data: any }>()
);

export const loadActividadesFailure = createAction(
  '[ACTIVIDADES] Load actividades Failure',
  props<{ error: any }>()
);


// ---------------------------------------------
// Acciones de gestión de actividades.
// ---------------------------------------------

// carga de actividades.
export const cargarActividades         = createAction('[ACTIVIDADES] cargar actividades');
export const cargarActividadesOK       = createAction('[ACTIVIDADES] carga de actividades OK', props<{ actividades: Actividad[] }>());
export const cargarActividadesError    = createAction('[ACTIVIDADES] carga de actividades errónea', props<{ error: string }>());

// creación de un nuevo actividad.
export const crearActividad           = createAction('[ACTIVIDADES] crear actividad', props<{ actividad: Actividad }>());
export const crearActividadOK         = createAction('[ACTIVIDADES] creación de actividad OK', props<{ actividad: Actividad | undefined }>());
export const crearActividadError     = createAction('[ACTIVIDADES] creación de actividad errónea', props<{ error: string }>());

// cargar actividad.
export const cargarActividad          = createAction('[ACTIVIDADES] cargar actividad', props<{ idActividad: string }>());
export const cargarActividadOK        = createAction('[ACTIVIDADES] carga actividad OK', props<{ actividad: Actividad | undefined }>());
export const cargarActividadError     = createAction('[ACTIVIDADES] carga actividad errónea', props<{ error: string }>());

// modificación de un actividad.
export const modificarActividad       = createAction('[ACTIVIDADES] modificar actividad', props<{ actividad: Actividad }>());
export const modificarActividadOK     = createAction('[ACTIVIDADES] modificación actividad OK', props<{ actividad: Update<Actividad> }>());
export const modificarActividadError  = createAction('[ACTIVIDADES] modificación actividad errónea', props<{ error: string }>());

// eliminación de un actividad.
export const eliminarActividad        = createAction('[ACTIVIDADES] eliminar actividad', props<{ idActividad: string }>());
export const eliminarActividadOK      = createAction('[ACTIVIDADES] eliminación actividad OK', props<{ idActividad: string }>());
export const eliminarActividadError   = createAction('[ACTIVIDADES] eliminación actividad errónea', props<{ error: string }>());

// ---------------------------------------------
// Acciones de gestión de plantillas.
// ---------------------------------------------
// carga de actividades.
export const cargarPlantillas         = createAction('[PLANTILLAS] cargar plantillas');
export const cargarPlantillasOK       = createAction('[PLANTILLAS] carga de plantillas OK', props<{ plantillas: Plantilla[] }>());
export const cargarPlantillasError    = createAction('[PLANTILLAS] carga de plantillas errónea', props<{ error: string }>());

export const seleccionarPlantilla     = createAction('[PLANTILLAS] seleccionar plantilla', props<{ plantilla: Plantilla }>());

// ---------------------------------------------
// Acciones de gestión de semanas.
// ---------------------------------------------
export const seleccionarSemana     = createAction('[SEMANAS] seleccionar seman', props<{ lunesSemanaSeleccionada: Date }>());


// ---------------------------------------------
// Acciones de gestión de parámetros del horario.
// ---------------------------------------------
export const cargarParametrosHorario         = createAction('[PARAMETROS_HORARIO] cargar parámetros del horario');
export const cargarParametrosHorarioOK       = createAction('[PARAMETROS_HORARIO] carga de parámetros del horario OK', props<{ parametrosHorario: ParametrosHorario }>());
export const cargarParametrosHorarioError    = createAction('[PARAMETROS_HORARIO] carga de parámetros del horario errónea', props<{ error: string }>());
