import { ReglaNegocio } from './../../../moduloHelpers/models/reglaNegocio';
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

export const anyadirReglasRotas = createAction(
  '[PRINCIPAL] añadir reglas rotas',
  props<{ reglasRotas: ReglaNegocio[] }>()
);

export const eliminarReglasRotas = createAction(
  '[PRINCIPAL] eliminar reglas rotas'
);

