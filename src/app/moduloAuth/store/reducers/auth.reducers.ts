import { Usuario } from '../../models/usuario.model';
import { AuthActions } from '../actions/index';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


import { createReducer, on } from '@ngrx/store';

export const authFeatureKey = 'auth';


// Definición del estado del módulo de Usuarios.
export interface AuthState extends EntityState<Usuario> {
  usuarioActivo: Usuario | undefined;
  cargando: boolean;
  mensajeDeCarga: string;
  errorCargaUsuario: string | undefined;
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
export const initialAuthState: AuthState = adapter.getInitialState(
  {
    usuarioActivo: undefined,
    cargando: false,
    mensajeDeCarga: '',
    errorCargaUsuario: undefined
  }

)


export const authReducer = createReducer(
  initialAuthState,

  // Intento de login
  on(
    AuthActions.loging,
    (state, action) => {
      return { ...state, cargando: true, mensajeDeCarga: 'Autenticando' };
    }
  ),

  // Login satisfactorio
  on(
    AuthActions.loginOK,
    (state, action) => {
      return { ...state, usuarioActivo: action.usuarioActivo, cargando: false, mensajeDeCarga: ''};
    }
  ),

  // Login error
  on(
    AuthActions.loginError,
    (state, action) => {
      return { ...state, usuarioActivo: undefined, cargando: false, mensajeDeCarga:'', error: action.error};
    }
  ),

  // logout
  on(
    AuthActions.logout,
    (state, action) => {
      return { ...state, usuarioActivo: undefined };
    }
  ),

    // cargando usuarios.
    on(
      AuthActions.cargandoUsuarios,
      (state, action) => {
        return { ...state, cargando:true, mensajeDeCarga: 'cargando usuarios'};
      }
  ),

    // usuarios cargados correctamente.
    on(
      AuthActions.UsuariosOK,
      (state, action) => {
        return adapter.setAll(action.usuarios, { ...state, cargando:false, mensajeDeCarga: '' })
      }
    ),




)

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectUsuariosIds = selectIds;

// select the dictionary of user entities
export const selectUsuariosEntities = selectEntities;

// select the array of users
export const selectTodosLosUsuarios = selectAll;

// select the total user count
export const selectTotalUsuarios = selectTotal;

