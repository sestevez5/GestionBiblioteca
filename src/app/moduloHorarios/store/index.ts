import { RootState } from './../../reducers/app.reducer';
import { actividadesReducer } from './actividades.reducer';
import { actividadesState } from './actividades.state';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ModuloActividadesState {
  actividades: actividadesState
}

export const ModuloActividadesReducers: ActionReducerMap<ModuloActividadesState> = {
  actividades: actividadesReducer
}

export const ModuloActividadesFeaturekey = "Gestionactividades";

export interface ModuloActividadesRootState extends RootState {
  [ModuloActividadesFeaturekey]: ModuloActividadesState
}

export const selectFeature = createFeatureSelector<ModuloActividadesRootState, ModuloActividadesState>(ModuloActividadesFeaturekey);
