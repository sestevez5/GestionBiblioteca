import { mensajeUsuario } from './../../../shared/models/mensajeUsuario.model';
import { PrincipalState } from './../reducers/principal.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { principalReducer } from '../reducers/principal.reducers';


export const selectPrincipalState = createFeatureSelector<PrincipalState>('principal');

export const selectEstadoCarga = createSelector(
  selectPrincipalState,
  principal => principal.estadoCarga
);

export const selectMensajeUsuario = createSelector(
  selectPrincipalState,
  principal => principal.mensajeUsuario
);

