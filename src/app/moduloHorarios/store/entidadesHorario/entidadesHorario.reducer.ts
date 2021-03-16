import { adapter } from './entidadesHorario.state';
import { initialEntidadesHorarioState } from './entidadesHorario.state';
import {createReducer, on } from '@ngrx/store';
import * as entidadesHorarioActions from './entidadesHorario.actions';



export const entidadesHorarioReducer = createReducer(
  initialEntidadesHorarioState,

  // -------------------------------------------------------------------------------
  // CREACIÓN DE UNA ENTIDADhORARIO
  // -------------------------------------------------------------------------------
  // Crear Actividad.
  on(
    entidadesHorarioActions.crearEntidadHorario,
    (state, action) => {
      return { ...state};
    }
  ),

  // Actividad creado Ok.
  on(
    entidadesHorarioActions.crearEntidadHorarioOK,
    (state, action) => {
      if (!action.entidadHorario) {
        return state
      }
      return adapter.addOne(action.entidadHorario, { ...state });

    }
  ),

  // error en la carga de entidadesHorario
  on(
    entidadesHorarioActions.crearEntidadHorarioError,
    (state, action) => {
      return { ...state};
    }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE entidadesHorario
  // -------------------------------------------------------------------------------
  // cargando entidadesHorario.
  on(
    entidadesHorarioActions.cargarEntidadesHorario,
    (state, action) => {
      return { ...state};
    }
  ),

  // entidadesHorario cargados correctamente.
  on(
    entidadesHorarioActions.cargarEntidadesHorarioOK,
    (state, action) => {

      if (state.ids.length === 0 && action.entidadesHorario.length === 0) {
        return state;
      }
      else {
        return adapter.setAll(action.entidadesHorario, { ...state, tipoEntidadActiva: action.tipoEntidadHorario});
      }


    }
  ),

  // error en la carga de entidadesHorario
  on(
    entidadesHorarioActions.cargarEntidadesHorarioError,
    (state, action) => {
      return { ...state};
    }
  ),



  // -------------------------------------------------------------------------------
  // SELECCIONAR ENTIDAD HORARIO
  // -------------------------------------------------------------------------------
   // cargando entidad Horario.
   on(
    entidadesHorarioActions.seleccionarEntidadHorario,
    (state, action) => {
      return { ...state, entidadHorarioActiva: action.entidadHorario, tipoEntidadActiva: action.tipoEntidadHorario};
    }
  ),


  // -------------------------------------------------------------------------------
  // MODIFICAR Actividad
  // -------------------------------------------------------------------------------
  // modificarActividad.
  // on(
  // entidadesHorarioActions.modificarEntidadHorario,
  // (state, action) => {
  //   return {
  //     ...state, entidadHorarioActiva: action.entidadHorario   };
  // }
  // ),

  // Actividad cargado correctamente.
  on(
    entidadesHorarioActions.modificarEntidadHorarioOK,
    (state, action) => {
      return adapter.updateOne(action.entidadHorario, { ...state, entidadHorarioActiva: null})

    }
  ),

  // error en la carga del Actividad
  on(
    entidadesHorarioActions.modificarEntidadHorarioError,
    (state, action) => {
      return { ...state, entidadHorarioActiva: undefined };
    }
  ),



  // -------------------------------------------------------------------------------
  //  ELIMINAR Actividad
  // -------------------------------------------------------------------------------
  // modificarActividad.
  on(
    entidadesHorarioActions.eliminarEntidadHorario,
    (state, action) => {
      return {...state};
    }
    ),

    // Actividad cargado correctamente.
    on(
      entidadesHorarioActions.eliminarEntidadHorarioOK,
      (state, action) => {
        return adapter.removeOne(action.id, { ...state, entidadHorarioActiva: undefined})
      }
    ),

    // error en la carga del Actividad
    on(
      entidadesHorarioActions.eliminarEntidadHorarioError,
      (state, action) => {
        return { ...state, entidadHorarioActiva: undefined};
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


