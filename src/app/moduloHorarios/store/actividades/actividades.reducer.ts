import { adapter } from './actividades.state';
import { initialActividadesState } from './actividades.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as actividadesActions from './actividades.actions';
import { ACTIONS_SUBJECT_PROVIDERS } from '@ngrx/store/src/actions_subject';



export const actividadesReducer = createReducer(
  initialActividadesState,

  // -------------------------------------------------------------------------------
  // CREACIÓN DE ACTIVIDAD
  // -------------------------------------------------------------------------------
  // Crear actividad.
  on(
    actividadesActions.crearActividad,
    (state, action) => {
      return { ...state};
    }
  ),

  // actividad creada Ok.
  on(
    actividadesActions.crearActividadOK,
    (state, action) => {
      if (!action.actividad) {
        return state
      }
      return adapter.addOne(action.actividad, { ...state });

    }
  ),

  // error en la carga de actividades
  on(
    actividadesActions.crearActividadError,
    (state, action) => {
      return { ...state };
    }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE ACTIVIDADES
  // -------------------------------------------------------------------------------

  // cargando actividades.
  on(
    actividadesActions.cargarActividades,
    (state, action) => {
      return { ...state};
    }
  ),

  // actividades cargados correctamente.
  on(
    actividadesActions.cargarActividadesOK,
    (state, action) => {

      if (state.ids.length === 0 && action.actividades.length === 0) {
        return state;
      }
      else {
        return adapter.setAll(action.actividades, { ...state});
      }


    }
  ),

  // error en la carga de actividades
  on(
    actividadesActions.cargarActividadesError,
    (state, action) => {
      return { ...state};
    }
  ),



  // -------------------------------------------------------------------------------
  // CARGA DE UNA SOLA ACTIVIDAD
  // -------------------------------------------------------------------------------

  // cargando actividad.
   on(
    actividadesActions.cargarActividad,
    (state, action) => {
      return { ...state, actividadActiva: undefined };
    }
  ),

  // Actividad cargada correctamente.
  on(
    actividadesActions.cargarActividadOK,
    (state, action) => {
      return { ...state, actividadActiva: action.actividad}
    }
  ),

  // error en la carga de la actividad
  on(
    actividadesActions.cargarActividadError,
    (state, action) => {
      return { ...state, actividadActiva: undefined};
    }
  ),

  // -------------------------------------------------------------------------------
  // MODIFICAR ACTIVIDAD
  // -------------------------------------------------------------------------------

  // modificar Actividad.
  on(
  actividadesActions.modificarActividad,
  (state, action) => {
    return {
      ...state, actividadActiva: action.actividad, creandoModificandoActividad: true };
  }
  ),

  // actividad modificada correctamente.
  on(
    actividadesActions.modificarActividadOK,
    (state, action) => {
      return adapter.updateOne(action.actividad, { ...state, creandoModificandoActividad: false });


    }
  ),

  // error en la modificacion de la actividad
  on(
    actividadesActions.modificarActividadError,
    (state, action) => {
      return { ...state, creandoModificandoActividad: false};
    }
  ),



  // -------------------------------------------------------------------------------
  //  ELIMINAR ACTIVIDAD
  // -------------------------------------------------------------------------------

  // eliminar actividad.
  on(
    actividadesActions.eliminarActividad,
    (state, action) => {
      return {
        ...state, procesandoAccion: true, errorAccion: null
      };
    }
    ),

    // Actividad eliminada correctamente.
    on(
      actividadesActions.eliminarActividadOK,
      (state, action) => {
        return adapter.removeOne(action.idActividad, { ...state, actividadActiva: undefined})
      }
    ),

    // error en la eliminacion de la actividad
    on(
      actividadesActions.eliminarActividadError,
      (state, action) => {
        return { ...state, actividadActiva: undefined, procesandoAccion: false, errorAccion: action.error};
      }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE PLANTILLA
  // -------------------------------------------------------------------------------

  // Cargando plantilla.
  on(
    actividadesActions.cargarPlantillas,
    (state, action) => {
      return { ...state};
    }
  ),

  // Plantillas cargadas correctamente.
  on(
    actividadesActions.cargarPlantillasOK,
    (state, action) => {

     return { ...state, plantillas: action.plantillas}

    }
  ),

  // Error en la carga de plantillas
  on(
    actividadesActions.cargarPlantillasError,
    (state, action) => {
      return { ...state};
    }
  ),

  // -------------------------------------------------------------------------------
  // SELECCIÓN DE UNA PLANTILLA
  // -------------------------------------------------------------------------------

    // Selección de una plantilla.
    on(
      actividadesActions.seleccionarPlantilla,
      (state, action) => {
        return { ...state, plantillaActiva: action.plantilla};
      }
  ),

  // -------------------------------------------------------------------------------
  // SELECCIÓN DE UNA SEMANA
  // -------------------------------------------------------------------------------
    // Selección de una plantilla.
    on(
      actividadesActions.seleccionarSemana,
      (state, action) => {
        return { ...state, lunesSemanaSeleccionada: action.lunesSemanaSeleccionada};
      }
  ),

  // -------------------------------------------------------------------------------
  // CARGA DE PARÁMETROS HORARIOS
  // -------------------------------------------------------------------------------
  // Solicitud de carga de parámetros horarios.
  on(
    actividadesActions.cargarParametrosHorarioOK,
    (state, action) => {
      return { ...state};
    }
  ),
  // carga de parámetros horarios satisfactoria.
  on(
    actividadesActions.cargarParametrosHorarioOK,
    (state, action) => {
      return { ...state, parametrosHorario: action.parametrosHorario};
    }
  ),

  // carga de parámetros errónea.
  on(
    actividadesActions.cargarParametrosHorarioOK,
    (state, action) => {
      return { ...state};
    }
  ),

)





// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectActividadesIds = selectIds;

// select the dictionary of user entities
export const selectActividadesEntities = selectEntities;

// select the array of users
export const selectTodasLasActividades = selectAll;

// select the total user count
export const selectTotalActividades = selectTotal;


