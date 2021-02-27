import { adapter } from './actividades.state';
import { initialActividadesState } from './actividades.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as actividadesActions from './actividades.actions';



export const actividadesReducer = createReducer(
  initialActividadesState,

  // -------------------------------------------------------------------------------
  // CREACIÓN DE LIBRO
  // -------------------------------------------------------------------------------
  // Crear libro.
  on(
    actividadesActions.crearActividad,
    (state, action) => {
      return { ...state, procesandoAccion: true, errorAccion: null};
    }
  ),

  // Libro creado Ok.
  on(
    actividadesActions.crearActividadOK,
    (state, action) => {
      if (!action.actividad) {
        return state
      }
      return adapter.addOne(action.actividad, { ...state, procesandoAccion: false, errorAccion: null });

    }
  ),

  // error en la carga de actividades
  on(
    actividadesActions.crearActividadError,
    (state, action) => {
      return { ...state, procesandoAccion: false, error: action.error };
    }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE actividades
  // -------------------------------------------------------------------------------
  // cargando actividades.
  on(
    actividadesActions.cargarActividades,
    (state, action) => {
      return { ...state, procesandoAccion: true, errorAccion: false};
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
        return adapter.setAll(action.actividades, { ...state, procesandoAccion: false, errorAccion: null });
      }


    }
  ),

  // error en la carga de actividades
  on(
    actividadesActions.cargarActividadesError,
    (state, action) => {
      return { ...state,  procesandoAccion: false, error: action.error};
    }
  ),



  // -------------------------------------------------------------------------------
  // CARGA DE UN SOLO LIBRO
  // -------------------------------------------------------------------------------
   // cargando libro.
   on(
    actividadesActions.cargarActividad,
    (state, action) => {
      return { ...state, actividadActiva: undefined, procesandoAccion: true, errorAccion: null };
    }
  ),

  // libro cargado correctamente.
  on(
    actividadesActions.cargarActividadOK,
    (state, action) => {
      return { ...state, actividadActiva: action.actividad,  procesandoAccion: false, errorAccion: null }
    }
  ),

  // error en la carga del libro
  on(
    actividadesActions.cargarActividadError,
    (state, action) => {
      return { ...state, actividadActiva: undefined, procesandoAccion: false, errorAccion: action.error};
    }
  ),

  // -------------------------------------------------------------------------------
  // MODIFICAR LIBRO
  // -------------------------------------------------------------------------------
  // modificarActividad.
  on(
  actividadesActions.modificarActividad,
  (state, action) => {
    return {
      ...state, actividadActiva: action.actividad, procesandoAccion: true, errorAccion: null
    };
  }
  ),

  // libro cargado correctamente.
  on(
    actividadesActions.modificarActividadOK,
    (state, action) => {
      return adapter.updateOne(action.actividad, { ...state, actividadActiva: undefined, procesandoAccion: false, errorAccion: null  })

    }
  ),

  // error en la carga del libro
  on(
    actividadesActions.modificarActividadError,
    (state, action) => {
      return { ...state, actividadActiva: undefined, procesandoAccion: false, errorAccion: action.error };
    }
  ),



  // -------------------------------------------------------------------------------
  //  ELIMINAR LIBRO
  // -------------------------------------------------------------------------------
  // modificarActividad.
  on(
    actividadesActions.eliminarActividad,
    (state, action) => {
      return {
        ...state, procesandoAccion: true, errorAccion: null
      };
    }
    ),

    // libro cargado correctamente.
    on(
      actividadesActions.eliminarActividadOK,
      (state, action) => {
        return adapter.removeOne(action.idActividad, { ...state, actividadActiva: undefined, procesandoAccion: false, errorAccion: null})
      }
    ),

    // error en la carga del libro
    on(
      actividadesActions.eliminarActividadError,
      (state, action) => {
        return { ...state, actividadActiva: undefined, procesandoAccion: false, errorAccion: action.error};
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


