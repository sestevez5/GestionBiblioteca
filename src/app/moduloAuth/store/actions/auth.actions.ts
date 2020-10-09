import { Usuario } from './../../models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[LOGIN] login',
  props<{ usuarioActivo: Usuario }>()
);

export const logout = createAction(
  '[LOGIN] logout'
)
