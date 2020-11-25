
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducers } from '../reducers/index';


export const selectAuthState = createFeatureSelector<AuthReducers.AuthState>('auth');

export const selectUsuarioActivo = createSelector(
  selectAuthState,
  auth => auth.usuarioActivo
);

export const selectTodosLosUsuarios = createSelector(
  selectAuthState,
  AuthReducers.selectTodosLosUsuarios
);


