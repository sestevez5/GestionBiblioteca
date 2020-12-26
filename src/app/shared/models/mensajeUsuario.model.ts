export enum TipoMensaje {
  Error,
  Warning,
  Informativo,
  NoMensaje
}
export interface mensajeUsuario {

  tipoMensaje: TipoMensaje
  mensaje: string;
  observaciones: string;

 }
