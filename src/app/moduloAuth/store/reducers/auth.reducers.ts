import { Usuario } from '../../models/usuario.model';
import { AuthActions } from '../actions/index'


import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { empty } from 'rxjs';


export const authFeatureKey = 'auth';


export interface AuthState {
  usuarioActivo: Usuario | undefined;
  cargandoUsuario: boolean;
  errorCargaUsuario: string | undefined;
}

export const initialAuthState: AuthState = {
  usuarioActivo: undefined,
  cargandoUsuario: false,
  errorCargaUsuario: undefined
};

export const authReducer = createReducer(
  initialAuthState,

  // Intento de login
  on(
    AuthActions.loging,
    (state, action) => {
      return { ...state, cargandoUsuario: true };
    }
  ),

  // Login satisfactorio
  on(
    AuthActions.loginOK,
    (state, action) => {
      return { ...state, usuarioActivo: action.usuarioActivo, cargandoUsuario: false };
    }
  ),

  // Login error
  on(
    AuthActions.loginError,
    (state, action) => {
      return { ...state, usuarioActivo: undefined, cargandoUsuario: false, error: action.error};
    }
  ),

  // logout
  on(
    AuthActions.logout,
    (state, action) => {
      return { ...state, usuarioActivo: undefined };
    }
  ),




)



