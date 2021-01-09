import { Libro } from './../models/libro.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
export interface LibrosState extends EntityState<Libro> {
  libroActivo: Libro | undefined;
  procesandoAccion: boolean;
  errorAccion: any;

}

// Función que devuelve el identificador de la primary key
export function seleccionarUsuarioPorId(libro: Libro): string {
  return libro.uid;
}



// Función que devuelve la estrategia de ordenación.
export function ordenarLibrosPorTitulo(a: Libro, b: Libro): number {
  return a.titulo.localeCompare(b.titulo);
}

export const adapter: EntityAdapter<Libro> = createEntityAdapter<Libro>(
  {
    selectId: seleccionarUsuarioPorId,
    sortComparer: ordenarLibrosPorTitulo
  }
)

export const initialLibrosState: LibrosState = adapter.getInitialState(
  {
    libroActivo: undefined,
    procesandoAccion: false,
    errorAccion: null
  }
)
