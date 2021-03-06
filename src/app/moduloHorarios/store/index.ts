import { RootState } from './../../reducers/app.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';


// Relativas a actividades
import { actividadesReducer } from './actividades/actividades.reducer';
import { actividadesState } from './actividades/actividades.state';


// Relativas a entidadesHorario
import { entidadesHorarioReducer } from './entidadesHorario/entidadesHorario.reducer';
import { entidadesHorarioState } from './entidadesHorario/entidadesHorario.state';

//---------------------------------------------------------------
// Definición de estados.
// Tendremos dos propiedades: actividades y entidades horario.
// Cada una

export interface ModuloHorarioState {
  actividades: actividadesState
  entidadesHorario: entidadesHorarioState
}


export const ModuloHorarioReducers: ActionReducerMap<ModuloHorarioState> = {
  actividades: actividadesReducer,
  entidadesHorario: entidadesHorarioReducer
}

export const ModuloHorarioFeaturekey = "GestionHorario";

export interface ModuloHorarioRootState extends RootState {
  [ModuloHorarioFeaturekey]: ModuloHorarioState,
}

export const selectHorario = createFeatureSelector<ModuloHorarioRootState, ModuloHorarioState>(ModuloHorarioFeaturekey);
