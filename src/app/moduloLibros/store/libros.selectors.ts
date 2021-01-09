import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromModuloLibros from './index';
import * as LibrosReducers from './libros.reducer';

export const selectLibros = createSelector(
  FromModuloLibros.selectFeature,
  ({libros}) => libros
)

export const selectLibroActivo = createSelector(
  selectLibros,
  libros => libros.libroActivo
)


export const selectTodosLosLibros = createSelector(
  selectLibros,
  LibrosReducers.selectTodosLosLibros
);


export const selectTotalLibros = createSelector(
  selectLibros,
  LibrosReducers.selectTotalLibros
);

export const selectProcesandoAccion = createSelector(
  FromModuloLibros.selectFeature,
  ({libros}) => libros.procesandoAccion
);
