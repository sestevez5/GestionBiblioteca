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


export const authFeatureKey = 'auth';


export interface AuthState {
  usuarioActivo: Usuario|undefined;
}

export const initialAuthState: AuthState = {
  usuarioActivo: undefined
};

export const authReducer = createReducer(
  initialAuthState,

  on(
    AuthActions.login,
    (state, action) => {
      return { ...state, usuarioActivo: action.usuarioActivo };
    }
  ),

  on(
    AuthActions.logout,
    (state, action) => {
      return { ...state, usuarioActivo: undefined };
    }
  ),




)



