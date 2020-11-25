
import { PrincipalActions } from '../actions/index'


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


export const principalFeatureKey = 'principal';


export interface PrincipalState {

  cargando: boolean;
  mensajeCarga: string;

}

export const initialPrincipalState: PrincipalState = {
  cargando: false,
  mensajeCarga: ''
};

export const principalReducer = createReducer(
  initialPrincipalState,

  // Se está realizando la carga de datos.
  on(
    PrincipalActions.cargandoDatos,
    (state, action) => {
      return { ...state, cargando: true, mensajeCarga: action.mensaje };
    }
  ),

  // Ha finalizado la crga de datos.
  on(
    PrincipalActions.cargadoDatos,
    (state, action) => {
      return { ...state, cargando: false, mensajeCarga: '' };
    }
  ),

)



