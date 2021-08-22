import { ReglaNegocio } from './../../../moduloHelpers/models/reglaNegocio';
import { mensajeUsuario, TipoMensaje } from './../../../shared/models/mensajeUsuario.model';
import { estadoCarga } from './../../../shared/models/estadoCarga.model';

export interface ComunicacionesState {
  estadoCarga: estadoCarga;
  mensajeUsuario: mensajeUsuario;
  reglasRotas: ReglaNegocio[]
}

export const initialComunicacionesState: ComunicacionesState = {
  mensajeUsuario: { tipoMensaje: TipoMensaje.NoMensaje, mensaje: '', observaciones: '' },
  estadoCarga: { cargando: false, mensajeCarga: '' },
  reglasRotas: []

};
