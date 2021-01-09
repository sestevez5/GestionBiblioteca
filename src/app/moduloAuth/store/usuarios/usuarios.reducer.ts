import { initialUsuariosState, adapter } from './usuarios.state';
import { Usuario } from '../../models/usuario.model';
import * as AuthActions from './usuarios.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Update } from '@ngrx/entity/src/models'
import { createReducer, on } from '@ngrx/store';



export const usuariosReducer = createReducer(
  initialUsuariosState,

  // -------------------------------------------------------------------------------
  // CREACIÓN DE USUARIO
  // -------------------------------------------------------------------------------
  // Crear usuario.
  on(
    AuthActions.crearUsuario,
    (state, action) => {
      return { ...state};
    }
  ),

  // Usuario creado Ok.
  on(
    AuthActions.crearUsuarioOK,
    (state, action) => {
      if (!action.usuario) {
        return state
      }
      return adapter.addOne(action.usuario, { ...state });

    }
  ),

  // error en la carga de usuarios
  on(
    AuthActions.crearUsuariosError,
    (state, action) => {
      return { ...state, error: action.error };
    }
  ),


  // -------------------------------------------------------------------------------
  // CARGA DE USUARIOS
  // -------------------------------------------------------------------------------
  // cargando usuarios.
  on(
    AuthActions.cargarUsuarios,
    (state, action) => {
      return { ...state};
    }
  ),

  // usuarios cargados correctamente.
  on(
    AuthActions.cargarUsuariosOK,
    (state, action) => {

      if (state.ids.length === 0 && action.usuarios.length === 0) {
        return state;
      }
      else {
        return adapter.setAll(action.usuarios, { ...state });
      }


    }
  ),

  // error en la carga de usuarios
  on(
    AuthActions.cargarUsuariosError,
    (state, action) => {
      return { ...state,  error: action.error};
    }
  ),



  // -------------------------------------------------------------------------------
  // CARGA DE UN SOLO USUARIO
  // -------------------------------------------------------------------------------
   // cargando usuario.
   on(
    AuthActions.cargarUsuario,
    (state, action) => {
      return { ...state, usuarioActivo: undefined };
    }
  ),

  // usuario cargado correctamente.
  on(
    AuthActions.cargarUsuarioOK,
    (state, action) => {
      return { ...state, usuarioActivo: action.usuario  }
    }
  ),

  // error en la carga del usuario
  on(
    AuthActions.cargarUsuarioError,
    (state, action) => {
      return { ...state, usuarioActivo: undefined};
    }
  ),

  // -------------------------------------------------------------------------------
  // MODIFICAR USUARIO
  // -------------------------------------------------------------------------------
  // modificarUsuario.
  on(
  AuthActions.modificarUsuario,
  (state, action) => {
    return {
      ...state, usuarioActivo: action.usuario
    };
  }
  ),

  // usuario cargado correctamente.
  on(
    AuthActions.modificarUsuarioOK,
    (state, action) => {
      return adapter.updateOne(action.usuario, { ...state, usuarioActivo: undefined })

    }
  ),

  // error en la carga del usuario
  on(
    AuthActions.modificarUsuarioError,
    (state, action) => {
      return { ...state};
    }
  ),



  // -------------------------------------------------------------------------------
  //  ELIMINAR USUARIO
  // -------------------------------------------------------------------------------
  // modificarUsuario.
  on(
    AuthActions.eliminarUsuario,
    (state, action) => {
      return {
        ...state
      };
    }
    ),

    // usuario cargado correctamente.
    on(
      AuthActions.eliminarUsuarioOK,
      (state, action) => {
        return adapter.removeOne(action.uidUsuario, { ...state })
      }
    ),

    // error en la carga del usuario
    on(
      AuthActions.eliminarUsuarioError,
      (state, action) => {
        return { ...state, usuarioActivo: undefined};
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

