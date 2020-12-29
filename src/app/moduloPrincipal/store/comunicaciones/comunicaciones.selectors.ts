import { createSelector } from '@ngrx/store';
import * as FromModuloPrincipal from '..';

export const selectComunicaciones = createSelector(
  FromModuloPrincipal.selectPrincipal,
  ({comunicaciones}) => comunicaciones
)

export const selectEstadoCarga = createSelector(
  selectComunicaciones,
  comunicaciones => comunicaciones.estadoCarga
)

export const selectMensajeUsuario = createSelector(
  selectComunicaciones,
  comunicaciones => comunicaciones.mensajeUsuario
)

