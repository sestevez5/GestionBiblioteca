import { Sesion } from './sesion';
export interface Plantilla {
  idPlantilla: string;
  denominacion: string;
  sesionesPlantilla: Sesion[];
}
