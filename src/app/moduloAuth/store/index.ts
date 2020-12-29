import { usuariosReducer } from './usuarios/usuarios.reducer';
import { UsuariosState } from './usuarios/usuarios.state';
import { RootState } from './../../reducers/app.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ModuloAuthState {
  //login: LoginState
  usuarios: UsuariosState
}

export const ModuloAuthReducers: ActionReducerMap<ModuloAuthState> = {
  //login: loginReducer,
  usuarios: usuariosReducer
}

export const ModuloAuthFeaturekey = "GestionAuth";

export interface ModuloAuthRootState extends RootState {
  [ModuloAuthFeaturekey]: ModuloAuthState
}

export const selectAuth = createFeatureSelector<ModuloAuthRootState, ModuloAuthState>(ModuloAuthFeaturekey);
