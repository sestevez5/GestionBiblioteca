import { authFeatureKey } from './../reducers/auth.reducers';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducers } from '../reducers/index';


export const selectAuthState = createFeatureSelector<AuthReducers.AuthState>(authFeatureKey);

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

export const selectTotalUsuarios = createSelector(
  selectAuthState,
  AuthReducers.selectTotalUsuarios
);



