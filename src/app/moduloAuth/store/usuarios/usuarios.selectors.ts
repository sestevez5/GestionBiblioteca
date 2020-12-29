import { createSelector } from '@ngrx/store';
import * as FromModuloAuth from '..';
import * as AuthReducers from './usuarios.reducer';

export const selectUsuarios = createSelector(
  FromModuloAuth.selectAuth,
  value => value.usuarios
)

export const selectUsuarioActivo = createSelector(
  selectUsuarios,
  login => login.usuarioActivo
)


export const selectTodosLosUsuarios = createSelector(
  selectUsuarios,
  AuthReducers.selectTodosLosUsuarios
);


export const selectTotalUsuarios = createSelector(
  selectUsuarios,
  AuthReducers.selectTotalUsuarios
);



