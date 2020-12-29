
import { RootState } from './../../reducers/app.reducer';
import { librosReducer } from './libros.reducer';
import { LibrosState } from './libros.state';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ModuloLibrosState {
  libros: LibrosState
}

export const ModuloLibrosReducers: ActionReducerMap<ModuloLibrosState> = {
  libros: librosReducer
}

export const ModuloLibrosFeaturekey = "GestionLibros";

export interface ModuloLibrosRootState extends RootState {
  [ModuloLibrosFeaturekey]: ModuloLibrosState
}

export const selectFeature = createFeatureSelector<ModuloLibrosRootState, ModuloLibrosState>(ModuloLibrosFeaturekey);
