import { cargadoDatos } from './../actions/principal.actions';
import { estadoCarga } from './../../../shared/models/estadoCarga.model';
import { mensajeUsuario, TipoMensaje } from './../../../shared/models/mensajeUsuario.model';

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

  estadoCarga: estadoCarga;
  mensajeUsuario: mensajeUsuario;

}

export const initialPrincipalState: PrincipalState = {
  mensajeUsuario: { tipoMensaje: TipoMensaje.NoMensaje, mensaje: '', observaciones: '' },
  estadoCarga: { cargando: false, mensajeCarga:''}

};

export const principalReducer = createReducer(
  initialPrincipalState,

  // Se está realizando la carga de datos.
  on(
    PrincipalActions.cargandoDatos,
    (state, action) => {
      return { ...state, estadoCarga: { cargando: true, mensajeCarga: action.mensaje} };
    }
  ),

  // Ha finalizado la carga de datos.
  on(
    PrincipalActions.cargadoDatos,
    (state, action) => {
      return { ...state, estadoCarga: { cargando: false, mensajeCarga: ''} };
    }
  ),

    // Se está realizando la carga de datos.
  on(
      PrincipalActions.generarMensajeUsuario,
      (state, action) => {
        return { ...state, mensajeUsuario: action.mensajeUsuario};
      }
  ),

  // Se está realizando la carga de datos.
  on(
    PrincipalActions.descartarMensajeUsuario,
    (state, action) => {
      return { ...state, mensajeUsuario: { tipoMensaje: TipoMensaje.NoMensaje, mensaje: '', observaciones: '' }};
    }
  )


)



