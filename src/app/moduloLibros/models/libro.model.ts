import { Editorial } from './editorial.model';
import { Categoria } from './categoria.model';
export interface Libro {

  uid: string;
  titulo: string;
  isbn: string;
  categorias: Categoria[];
  psinopsis: string;
  foto: string;
  anyoEdicion: string;
  fechaAlta: Date | null
  editorial: Editorial | null,
  autores: string


 }
