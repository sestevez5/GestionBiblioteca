import { MensajeReglaNegocio } from './../../../moduloHelpers/models/mensajeReglaNegocio';

import { mensajeUsuario } from './../../../shared/models/mensajeUsuario.model';
import { createAction, props } from '@ngrx/store';

export const cargandoDatos = createAction(
  '[PRINCIPAL] Inicio Carga Datos',
  props<{ mensaje: string }>()
);

export const cargadoDatos = createAction(
  '[PRINCIPAL] Fin Carga Datos'
);

export const generarMensajeUsuario = createAction(
  '[PRINCIPAL] genera mensaje al usuario',
  props<{ mensajeUsuario: mensajeUsuario }>()
);

export const descartarMensajeUsuario = createAction(
  '[PRINCIPAL] descartar mensaje al usuario'
);

export const activarMensajesReglasRotas = createAction(
  '[PRINCIPAL] añadir mensajes reglas rotas',
  props<{ mensajesReglasRotas: MensajeReglaNegocio[] }>()
);

export const desactivarMensajesReglasRotas = createAction(
  '[PRINCIPAL] eliminar mensajes reglas rotas'
);

export const desactivarMensajeReglasRota = createAction(
  '[PRINCIPAL] eliminar mensaje regla rota',
  props<{ idMensajeReglaRota: string }>()
);


