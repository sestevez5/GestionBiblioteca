import { adapter } from './libros.state';
import { initialLibrosState } from './libros.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as LibrosActions from './libros.actions';



export const librosReducer = createReducer(
  initialLibrosState,

  // -------------------------------------------------------------------------------
  // CREACIÓN DE LIBRO
  // -------------------------------------------------------------------------------
  // Crear libro.
  on(
    LibrosActions.crearLibro,
    (state, action) => {
      return { ...state, procesandoAccion: true, errorAccion: null};
    }
  ),

  // Libro creado Ok.
  on(
    LibrosActions.crearLibroOK,
    (state, action) => {
      if (!action.libro) {
        return state
      }
      return adapter.addOne(action.libro, { ...state, procesandoAccion: false, errorAccion: null });

    }
  ),

  // error en la carga de libros
  on(
    LibrosActions.crearLibrosError,
    (state, action) => {
      return { ...state, procesandoAccion: false, error: action.error };
    }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE LIBROS
  // -------------------------------------------------------------------------------
  // cargando libros.
  on(
    LibrosActions.cargarLibros,
    (state, action) => {
      return { ...state, procesandoAccion: true, errorAccion: false};
    }
  ),

  // libros cargados correctamente.
  on(
    LibrosActions.cargarLibrosOK,
    (state, action) => {

      if (state.ids.length === 0 && action.libros.length === 0) {
        return state;
      }
      else {
        return adapter.setAll(action.libros, { ...state, procesandoAccion: false, errorAccion: null });
      }


    }
  ),

  // error en la carga de libros
  on(
    LibrosActions.cargarLibrosError,
    (state, action) => {
      return { ...state,  procesandoAccion: false, error: action.error};
    }
  ),



  // -------------------------------------------------------------------------------
  // CARGA DE UN SOLO LIBRO
  // -------------------------------------------------------------------------------
   // cargando libro.
   on(
    LibrosActions.cargarLibro,
    (state, action) => {
      return { ...state, libroActivo: undefined, procesandoAccion: true, errorAccion: null };
    }
  ),

  // libro cargado correctamente.
  on(
    LibrosActions.cargarLibroOK,
    (state, action) => {
      return { ...state, libroActivo: action.libro,  procesandoAccion: false, errorAccion: null }
    }
  ),

  // error en la carga del libro
  on(
    LibrosActions.cargarLibroError,
    (state, action) => {
      return { ...state, libroActivo: undefined, procesandoAccion: false, errorAccion: action.error};
    }
  ),

  // -------------------------------------------------------------------------------
  // MODIFICAR LIBRO
  // -------------------------------------------------------------------------------
  // modificarLibro.
  on(
  LibrosActions.modificarLibro,
  (state, action) => {
    return {
      ...state, libroActivo: action.libro, procesandoAccion: true, errorAccion: null
    };
  }
  ),

  // libro cargado correctamente.
  on(
    LibrosActions.modificarLibroOK,
    (state, action) => {
      return adapter.updateOne(action.libro, { ...state, libroActivo: undefined, procesandoAccion: false, errorAccion: null  })

    }
  ),

  // error en la carga del libro
  on(
    LibrosActions.modificarLibroError,
    (state, action) => {
      return { ...state, libroActivo: undefined, procesandoAccion: false, errorAccion: action.error };
    }
  ),



  // -------------------------------------------------------------------------------
  //  ELIMINAR LIBRO
  // -------------------------------------------------------------------------------
  // modificarLibro.
  on(
    LibrosActions.eliminarLibro,
    (state, action) => {
      return {
        ...state, procesandoAccion: true, errorAccion: null
      };
    }
    ),

    // libro cargado correctamente.
    on(
      LibrosActions.eliminarLibroOK,
      (state, action) => {
        return adapter.removeOne(action.uidLibro, { ...state, libroActivo: undefined, procesandoAccion: false, errorAccion: null})
      }
    ),

    // error en la carga del libro
    on(
      LibrosActions.eliminarLibroError,
      (state, action) => {
        return { ...state, libroActivo: undefined, procesandoAccion: false, errorAccion: action.error};
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
export const selectLibrosIds = selectIds;

// select the dictionary of user entities
export const selectLibrosEntities = selectEntities;

// select the array of users
export const selectTodosLosLibros = selectAll;

// select the total user count
export const selectTotalLibros = selectTotal;


