import { loginReducer } from './../../moduloPrincipal/store/login/login.reducer';
import { LoginState } from './login/login.state';
import { comunicacionesReducer } from './comunicaciones/comunicaciones.reducer';
import { RootState } from './../../reducers/app.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { ComunicacionesState } from './comunicaciones/comunicaciones.state';

export interface ModuloPrincipalState {
  comunicaciones: ComunicacionesState
  login: LoginState
}

export const ModuloPrincipalReducers: ActionReducerMap<ModuloPrincipalState> = {
  comunicaciones: comunicacionesReducer,
  login: loginReducer
}

export const ModuloPrincipalFeaturekey = "GestionPrincipal";

export interface ModuloPrincipalRootState extends RootState {
  [ModuloPrincipalFeaturekey]: ModuloPrincipalState
}

export const selectPrincipal = createFeatureSelector<ModuloPrincipalRootState, ModuloPrincipalState>(ModuloPrincipalFeaturekey);
