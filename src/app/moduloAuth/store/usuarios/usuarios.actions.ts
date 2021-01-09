import { Update } from '@ngrx/entity/src/models';
import { FiltroOrdenUsuario } from './../../models/filtroOrdenUsuarios.model';
import { Usuario } from './../../models/usuario.model';
import { createAction, props } from '@ngrx/store';


// ---------------------------------------------
// Acciones de gestión de usuarios.
// ---------------------------------------------

// carga de usuarios.
export const cargarUsuarios         = createAction('[USUARIOS] cargar usuarios', props<{ fou: FiltroOrdenUsuario }>());
export const cargarUsuariosOK       = createAction('[USUARIOS] carga de usuarios OK', props<{ usuarios: Usuario[] }>());
export const cargarUsuariosError    = createAction('[USUARIOS] carga de usuarios errónea', props<{ error: string }>());

// creación de un nuevo usuario.
export const crearUsuario           = createAction('[USUARIOS] crear usuario', props<{ usuario: Usuario, password: string }>());
export const crearUsuarioOK         = createAction('[USUARIOS] creación de usuario OK', props<{ usuario: Usuario | undefined }>());
export const crearUsuariosError     = createAction('[USUARIOS] creación de usuario errónea', props<{ error: string }>());

// cargar usuario.
export const cargarUsuario          = createAction('[USUARIOS] cargar usuario', props<{ uidUsuario: string }>());
export const cargarUsuarioOK        = createAction('[USUARIOS] carga usuario OK', props<{ usuario: Usuario | undefined }>());
export const cargarUsuarioError     = createAction('[USUARIOS] carga usuario errónea', props<{ error: string }>());

// modificación de un usuario.
export const modificarUsuario       = createAction('[USUARIOS] modificar usuario', props<{ usuario: Usuario }>());
export const modificarUsuarioOK     = createAction('[USUARIOS] modificación usuario OK', props<{ usuario: Update<Usuario> }>());
export const modificarUsuarioError  = createAction('[USUARIOS] modificación usuario errónea', props<{ error: string }>());

// eliminación de un usuario.
export const eliminarUsuario        = createAction('[USUARIOS] eliminar usuario', props<{ uidUsuario: string }>());
export const eliminarUsuarioOK      = createAction('[USUARIOS] eliminación usuario OK', props<{ uidUsuario: string }>());
export const eliminarUsuarioError   = createAction('[USUARIOS] eliminación usuario errónea', props<{ error: string }>());




