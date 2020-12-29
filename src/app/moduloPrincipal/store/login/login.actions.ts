import { Usuario } from './../../../moduloAuth/models/usuario.model';
import { createAction, props } from '@ngrx/store';

// ---------------------------------------------
// Acciones de logueo.
// ---------------------------------------------
export const loging     = createAction('[LOGIN] loging', props<{ email: string, password: string }>());
export const loginOK    = createAction('[LOGIN] login OK', props<{ usuariologueado: Usuario }>());
export const loginError = createAction('[LOGIN] login Erróneo',props<{ error: string }>());
export const logout     = createAction('[LOGIN] logout');
