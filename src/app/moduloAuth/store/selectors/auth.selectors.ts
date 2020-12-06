
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducers } from '../reducers/index';


export const selectAuthState = createFeatureSelector<AuthReducers.AuthState>('auth');

export const selectUsuarioLogueado = createSelector(
  selectAuthState,
  auth => auth.usuarioLogueado
);

export const selectTodosLosUsuarios = createSelector(
  selectAuthState,
  AuthReducers.selectTodosLosUsuarios
);

export const selectUsuarioActivo = createSelector(
  selectAuthState,
  authState => authState.usuarioActivo
);


