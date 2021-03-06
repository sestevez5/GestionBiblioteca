import { RootState } from './../../../reducers/app.reducer';
import { entidadesHorarioReducer } from './entidadesHorario.reducer';
import { entidadesHorarioState } from './entidadesHorario.state';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ModuloEntidadesHorarioState {
  entidadesHorario: entidadesHorarioState
}

export const ModuloEntidadesHorarioReducers: ActionReducerMap<ModuloEntidadesHorarioState> = {
  entidadesHorario: entidadesHorarioReducer
}

export const ModuloEntidadesHorarioFeaturekey = "GestionEntidadesHorario";


