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

        case 'auth/invalid-email':
          mensaje = {
            tipoMensaje: TipoMensaje.Error,
            mensaje: 'El correo electrónico no tiene un formato correcto',
            observaciones: 'Revise el campo correo electrónico'
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
