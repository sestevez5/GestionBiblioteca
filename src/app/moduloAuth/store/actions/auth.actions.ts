import { Usuario } from './../../models/usuario.model';
import { createAction, props } from '@ngrx/store';


// Acciones de logueo.
export const loging     = createAction('[LOGIN] loging', props<{ email: string, password: string }>());
export const loginOK    = createAction('[LOGIN] login OK', props<{ usuarioActivo: Usuario }>());
export const loginError = createAction('[LOGIN] login Error',props<{ error: string }>());
export const logout     = createAction('[LOGIN] logout');

// Acciones de gestión de usuarios.
export const cargandoUsuarios = createAction('[USUARIOS] obteniendo usuarios');
export const UsuariosOK = createAction('[USUARIOS] usuarios cargados', props<{ usuarios: Usuario[]}>());
