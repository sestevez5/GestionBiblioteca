import { initialLoginState } from './login.state';
import * as  loginActions from './login.actions';



import { createReducer, on } from '@ngrx/store';


export const loginReducer = createReducer(
  initialLoginState,

  // Intento de login
  on(
    loginActions.loging,
    (state, action) => {
      return {...state};
    }
  ),

  // Login satisfactorio
  on(
    loginActions.loginOK,
    (state, action) => {
      return { ...state, usuarioLogueado: action.usuariologueado};
    }
  ),

  // Login error
  on(
    loginActions.loginError,
    (state, action) => {
      return { ...state, usuarioLogueado: undefined};
    }
  ),

  // logout
  on(
    loginActions.logout,
    (state, action) => {
      return { ...state, usuarioLogueado: undefined };
    }
  ),

)

