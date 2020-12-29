import { Usuario } from '../../models/usuario.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


import { createReducer, on } from '@ngrx/store';

// Definición del estado del módulo de Usuarios.
export interface UsuariosState extends EntityState<Usuario> {
  usuarioActivo: Usuario | undefined;
}


// Función que devuelve el identificador de la primary key
export function seleccionarUsuarioPorId(usuario: Usuario): string {
  return usuario.uid;
}

// Función que devuelve la estrategia de ordenación.
export function ordenarUsuariosPorNombre(a: Usuario, b: Usuario): number {
  return a.nombre.localeCompare(b.nombre);
}

export const adapter: EntityAdapter<Usuario> = createEntityAdapter<Usuario>(
  {
    selectId: seleccionarUsuarioPorId,
    sortComparer: ordenarUsuariosPorNombre
  }
)

// Definición del estado incial.
export const initialUsuariosState: UsuariosState = adapter.getInitialState(
  {
    usuarioActivo:      undefined,
    //errorCargaUsuario:  undefined
  }

)
