export interface Usuario {

  uid: string;
  email: string;
  primerApellido: string;
  segundoApellido: string;
  nombre: string;
  movil: string;
  foto: string;
  esAdministrador: boolean;
  FechaAlta: Date | null;
  FechaBaja: Date | null;

 }
