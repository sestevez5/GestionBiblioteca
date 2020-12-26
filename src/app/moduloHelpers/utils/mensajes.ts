import { mensajeUsuario, TipoMensaje } from './../../shared/models/mensajeUsuario.model';
export class Utils {

  static construirMensaje(codigo: string): mensajeUsuario {

    let mensaje: mensajeUsuario;

    switch (codigo) {
      case 'auth/user-not-found':
        mensaje = {
          tipoMensaje: TipoMensaje.Error,
          mensaje: 'No existe ningún usuario con las credenciales suministradas',
          observaciones: 'codigo: auth/user-not-found'
        }
        break;

      default:
        mensaje = {
          tipoMensaje: TipoMensaje.NoMensaje,
          mensaje: '',
          observaciones: ''
        }
        break;
    }
    return mensaje;
  }

}
