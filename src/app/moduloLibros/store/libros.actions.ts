import { createAction, props } from '@ngrx/store';

export const loadLibross = createAction(
  '[Libros] Load Libross'
);

export const loadLibrossSuccess = createAction(
  '[Libros] Load Libross Success',
  props<{ data: any }>()
);

export const loadLibrossFailure = createAction(
  '[Libros] Load Libross Failure',
  props<{ error: any }>()
);
