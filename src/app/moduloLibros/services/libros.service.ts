import { map, mergeMap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Libro } from '../models/libro.model'
import { Observable,from, Subject, Observer } from 'rxjs'
import { FiltroOrdenLibro } from '../models/filtroOrdenLibro.model';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private fireBaseDB: AngularFirestore) {

  }

  ObtenerLibros(fol: FiltroOrdenLibro): Observable<Libro[]> {

    return this.fireBaseDB.collection('libros')
      .get()
      .pipe(
          map(
          value => {
            const libros: Libro[] = [];

            // Procesamos cada uno de los elementos para convertirlos en la colección de Libros.
            value.docs.forEach(
              libro => {

                const nuevoLibro: Libro = {
                  ...libro.data() as Libro,
                  uid: libro.id
                };


                let cadenaParaFiltro = '';

                cadenaParaFiltro += nuevoLibro.titulo ?? '';
                cadenaParaFiltro += nuevoLibro.isbn ?? '';
                cadenaParaFiltro += nuevoLibro.autores ?? '';
                cadenaParaFiltro += nuevoLibro.editorial ?? '';
                cadenaParaFiltro += nuevoLibro.anyoEdicion ?? '';


                let incluirRegistro = true;

                // Se desestima si hay una subcadena que debe contener y no la contiene.
                if (fol && fol.contieneSubcadena && cadenaParaFiltro.indexOf(fol.contieneSubcadena) === -1) { incluirRegistro = false }

                // Se desestima si se piden libros de alta y el libro no está de alta
                if (fol && fol.SoloLibrosDeAlta) { incluirRegistro = false }

                if (incluirRegistro) { libros.push(nuevoLibro); }

              }
            );  // Fin foreach

            return libros;


          }
        ),  // Fin map

      );

  }

  ObtenerLibroPorUid(uid: string): Observable<Libro> {

    const libro$ = new Subject<Libro>();
    this.fireBaseDB.doc<Libro>(`libros/${uid}`).valueChanges()
      .pipe(
        first(),
        map(value => {
          if (!value) {
            return (libro$ as Observer<any>).error("Error")
          }
           libro$.next(value);
        })
      ).subscribe();

    return libro$;
  }


  AnyadirLibro(libro: Libro): Observable<Libro> {
    return from(this.fireBaseDB.collection('libros').add(libro))
      .pipe(
        mergeMap(
          dato1 => {
            return this.fireBaseDB.collection('libros').doc(dato1.id)
              .get()
              .pipe(
                map(dato2 => {
                  return {
                    ...dato2.data(),
                    uid: dato1.id
                  } as Libro
                })) // Fin pipe
          }),
        first()
      )  // Fin pipe

  }  // Fin AnyadirLibro

  ModificarLibro(libro: Libro): Observable<Libro> {

    const libro$ = new Subject<Libro>();
    from(this.fireBaseDB.doc<Libro>(`libros/${libro.uid}`).update(libro))
      .subscribe(
        value => {
          libro$.next(libro);
        },
        error => {
          (libro$ as Observer<any>).error(error)
        }
      )
    return libro$;

  }

}

