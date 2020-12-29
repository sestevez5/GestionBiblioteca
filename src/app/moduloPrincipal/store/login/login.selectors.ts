
import { createSelector } from '@ngrx/store';
import * as FromModuloPrincipal from '..';

export const selectLogin = createSelector(
  FromModuloPrincipal
.selectPrincipal,
  ({login}) => login
)

export const selectUsuarioLogueado = createSelector(
  selectLogin,
  login => login.usuarioLogueado
)
