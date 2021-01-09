import { Update } from '@ngrx/entity/src/models';
import { FiltroOrdenLibro } from '../models/filtroOrdenLibro.model'
import { Libro } from '../models/libro.model';
import { createAction, props } from '@ngrx/store';

export const loadLibross = createAction(
  '[Libros] Load Libross'
);

export const loadLibrossSuccess = createAction(
  '[Libros] Load Libross Success',
  props<{ data: any }>()
);

export const loadLibrossFailure = createAction(
  '[Libros] Load Libross Failure',
  props<{ error: any }>()
);


// ---------------------------------------------
// Acciones de gestión de libros.
// ---------------------------------------------

// carga de libros.
export const cargarLibros         = createAction('[LIBROS] cargar libros', props<{ fol: FiltroOrdenLibro }>());
export const cargarLibrosOK       = createAction('[LIBROS] carga de libros OK', props<{ libros: Libro[] }>());
export const cargarLibrosError    = createAction('[LIBROS] carga de libros errónea', props<{ error: string }>());

// creación de un nuevo libro.
export const crearLibro           = createAction('[LIBROS] crear libro', props<{ libro: Libro }>());
export const crearLibroOK         = createAction('[LIBROS] creación de libro OK', props<{ libro: Libro | undefined }>());
export const crearLibrosError     = createAction('[LIBROS] creación de libro errónea', props<{ error: string }>());

// cargar libro.
export const cargarLibro          = createAction('[LIBROS] cargar libro', props<{ uidLibro: string }>());
export const cargarLibroOK        = createAction('[LIBROS] carga libro OK', props<{ libro: Libro | undefined }>());
export const cargarLibroError     = createAction('[LIBROS] carga libro errónea', props<{ error: string }>());

// modificación de un libro.
export const modificarLibro       = createAction('[LIBROS] modificar libro', props<{ libro: Libro }>());
export const modificarLibroOK     = createAction('[LIBROS] modificación libro OK', props<{ libro: Update<Libro> }>());
export const modificarLibroError  = createAction('[LIBROS] modificación libro errónea', props<{ error: string }>());

// eliminación de un libro.
export const eliminarLibro        = createAction('[LIBROS] eliminar libro', props<{ uidLibro: string }>());
export const eliminarLibroOK      = createAction('[LIBROS] eliminación libro OK', props<{ uidLibro: string }>());
export const eliminarLibroError   = createAction('[LIBROS] eliminación libro errónea', props<{ error: string }>());


