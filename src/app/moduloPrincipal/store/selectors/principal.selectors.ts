import { PrincipalState } from './../reducers/principal.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { principalReducer } from '../reducers/principal.reducers';


export const selectPrincipalState = createFeatureSelector<PrincipalState>('principal');

export const selectEstadoCarga = createSelector(
  selectPrincipalState,

  principal => {
    return {
      "cargando": principal.cargando,
      "mensajeCarga": principal.mensajeCarga
    }

  }
);

