import { createAction, props } from '@ngrx/store';

export const cargandoDatos = createAction(
  '[PRINCIPAL] Cargando datos',
  props<{ mensaje: string }>()
);

export const cargadoDatos = createAction(
  '[PRINCIPAL] Fin Carga'
);


