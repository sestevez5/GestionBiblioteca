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

    // Se ha generado un mensaje al usuario
  on(
      ComunicacionesAction
      .generarMensajeUsuario,
      (state, action) => {
        return { ...state, mensajeUsuario: { tipoMensaje: action.mensajeUsuario.tipoMensaje, mensaje: action.mensajeUsuario.mensaje, observaciones: action.mensajeUsuario.observaciones }};
      }
  ),

  // Se ha eliminado un mensaje al usuario.
  on(
    ComunicacionesAction.descartarMensajeUsuario,
    (state, action) => {
      return { ...state, mensajeUsuario: { tipoMensaje: TipoMensaje.NoMensaje, mensaje: '', observaciones: '' }};
    }
  ),

    // Se está realizando la carga de datos.
  on(
    ComunicacionesAction.anyadirReglasRotas,
    (state, action) => {
      return { ...state, reglasRotas: action.reglasRotas};
    }
  ),

  // Se está realizando la carga de datos.
  on(
    ComunicacionesAction.eliminarReglasRotas,
    (state, action) => {
      return { ...state, reglasRotas: []};
    }
  )


)
