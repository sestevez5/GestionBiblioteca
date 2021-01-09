import { TipoMensaje } from './../../../shared/models/mensajeUsuario.model';
import { initialComunicacionesState, ComunicacionesState } from './comunicaciones.state';
import * as ComunicacionesAction from './comunicaciones.actions'
import { on, createReducer } from '@ngrx/store';

export const comunicacionesReducer = createReducer(
  initialComunicacionesState,

  // Se está realizando la carga de datos.
  on(
    ComunicacionesAction.cargandoDatos,
    (state, action) => {
      return { ...state, estadoCarga: { cargando: true, mensajeCarga: action.mensaje} };
    }
  ),

  // Ha finalizado la carga de datos.
  on(
    ComunicacionesAction.cargadoDatos,
    (state, action) => {
      return { ...state, estadoCarga: { cargando: false, mensajeCarga: ''} };
    }
  ),

    // Se está realizando la carga de datos.
  on(
      ComunicacionesAction
      .generarMensajeUsuario,
      (state, action) => {
        return { ...state, mensajeUsuario: { tipoMensaje: action.mensajeUsuario.tipoMensaje, mensaje: action.mensajeUsuario.mensaje, observaciones: action.mensajeUsuario.observaciones }};
      }
  ),

  // Se está realizando la carga de datos.
  on(
    ComunicacionesAction.descartarMensajeUsuario,
    (state, action) => {
      return { ...state, mensajeUsuario: { tipoMensaje: TipoMensaje.NoMensaje, mensaje: '', observaciones: '' }};
    }
  )


)
