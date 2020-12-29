import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromModuloLibros from './index';

export const selectLibros = createSelector(
  FromModuloLibros.selectFeature,
  ({libros}) => libros
)

export const selectPrueba = createSelector(
  selectLibros,
  libros => libros.prueba
)
