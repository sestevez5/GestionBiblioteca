import { Usuario } from './../../../moduloAuth/models/usuario.model';

export interface LoginState {
  usuarioLogueado: Usuario | undefined
  prueba: string
}

export const initialLoginState: LoginState = {
  usuarioLogueado: undefined,
  prueba: 'hola'
};
