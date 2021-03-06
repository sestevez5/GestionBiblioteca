import { adapter } from './entidadesHorario.state';
import { initialEntidadesHorarioState } from './entidadesHorario.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as entidadesHorarioActions from './entidadesHorario.actions';



export const entidadesHorarioReducer = createReducer(
  initialEntidadesHorarioState,

  // -------------------------------------------------------------------------------
  // CREACIÓN DE LIBRO
  // -------------------------------------------------------------------------------
  // Crear libro.
  on(
    entidadesHorarioActions.crearEntidadHorario,
    (state, action) => {
      return { ...state, procesandoAccion: true, errorAccion: null};
    }
  ),

  // Libro creado Ok.
  on(
    entidadesHorarioActions.crearEntidadHorarioOK,
    (state, action) => {
      if (!action.entidadHorario) {
        return state
      }
      return adapter.addOne(action.entidadHorario, { ...state, procesandoAccion: false, errorAccion: null });

    }
  ),

  // error en la carga de entidadesHorario
  on(
    entidadesHorarioActions.crearEntidadHorarioError,
    (state, action) => {
      return { ...state, procesandoAccion: false, error: action.error };
    }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE entidadesHorario
  // -------------------------------------------------------------------------------
  // cargando entidadesHorario.
  on(
    entidadesHorarioActions.cargarEntidadesHorario,
    (state, action) => {
      return { ...state, procesandoAccion: true, errorAccion: false};
    }
  ),

  // entidadesHorario cargados correctamente.
  on(
    entidadesHorarioActions.cargarEntidadesHorarioOK,
    (state, action) => {

      console.log('action.entidadesHorario: ', action.entidadesHorario);

      if (state.ids.length === 0 && action.entidadesHorario.length === 0) {
        return state;
      }
      else {
        return adapter.setAll(action.entidadesHorario, { ...state, procesandoAccion: false, errorAccion: null });
      }


    }
  ),

  // error en la carga de entidadesHorario
  on(
    entidadesHorarioActions.cargarEntidadesHorarioError,
    (state, action) => {
      return { ...state,  procesandoAccion: false, error: action.error};
    }
  ),



  // -------------------------------------------------------------------------------
  // CARGA DE UN SOLO LIBRO
  // -------------------------------------------------------------------------------
   // cargando libro.
   on(
    entidadesHorarioActions.cargarEntidadHorario,
    (state, action) => {
      return { ...state, entidadHorarioActiva: undefined, procesandoAccion: true, errorAccion: null };
    }
  ),

  // libro cargado correctamente.
  on(
    entidadesHorarioActions.cargarEntidadHorarioOK,
    (state, action) => {
      return { ...state, entidadHorarioActiva: action.EntidadHorario,  procesandoAccion: false, errorAccion: null }
    }
  ),

  // error en la carga del libro
  on(
    entidadesHorarioActions.cargarEntidadHorarioError,
    (state, action) => {
      return { ...state, entidadHorarioActiva: undefined, procesandoAccion: false, errorAccion: action.error};
    }
  ),

  // -------------------------------------------------------------------------------
  // MODIFICAR LIBRO
  // -------------------------------------------------------------------------------
  // modificarActividad.
  on(
  entidadesHorarioActions.modificarEntidadHorario,
  (state, action) => {
    return {
      ...state, entidadHorarioActiva: action.entidadHorario, procesandoAccion: true, errorAccion: null
    };
  }
  ),

  // libro cargado correctamente.
  on(
    entidadesHorarioActions.modificarEntidadHorarioOK,
    (state, action) => {
      return adapter.updateOne(action.entidadHorario, { ...state, entidadHorarioActiva: undefined, procesandoAccion: false, errorAccion: null  })

    }
  ),

  // error en la carga del libro
  on(
    entidadesHorarioActions.modificarEntidadHorarioError,
    (state, action) => {
      return { ...state, entidadHorarioActiva: undefined, procesandoAccion: false, errorAccion: action.error };
    }
  ),



  // -------------------------------------------------------------------------------
  //  ELIMINAR LIBRO
  // -------------------------------------------------------------------------------
  // modificarActividad.
  on(
    entidadesHorarioActions.eliminarEntidadHorario,
    (state, action) => {
      return {
        ...state, procesandoAccion: true, errorAccion: null
      };
    }
    ),

    // libro cargado correctamente.
    on(
      entidadesHorarioActions.eliminarEntidadHorarioOK,
      (state, action) => {
        return adapter.removeOne(action.id, { ...state, entidadHorarioActiva: undefined, procesandoAccion: false, errorAccion: null})
      }
    ),

    // error en la carga del libro
    on(
      entidadesHorarioActions.eliminarEntidadHorarioError,
      (state, action) => {
        return { ...state, entidadHorarioActiva: undefined, procesandoAccion: false, errorAccion: action.error};
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
export const selectEntidadesHorarioIds = selectIds;

// select the dictionary of user entities
export const selectEntidadesHorarioEntities = selectEntities;

// select the array of users
export const selectTodasLasEntidadesHorario = selectAll;

// select the total user count
export const selectTotalEntidadesHorario = selectTotal;


