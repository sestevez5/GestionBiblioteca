import { map, mergeMap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IActividad } from '../models/IActividad.model'
import { Observable,from, Subject, Observer } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private fireBaseDB: AngularFirestore) {

  }

  ObtenerIActividades(): Observable<IActividad[]> {

    return this.fireBaseDB.collection('IActividades')
      .get()
      .pipe(
          map(
            value => {
              const IActividades: IActividad[] = [];
              value.docs.forEach(
                Iactividad => {
                  const nuevaIActividad: IActividad = {
                    ...Iactividad.data() as IActividad,
                    idActividad: Iactividad.id
                  };
                  IActividades.push(nuevaIActividad);
                }

              );  // Fin foreach

              return IActividades
            }
        ),  // Fin map
      );
  }




  // AnyadirIactividad(Iactividad: Iactividad): Observable<Iactividad> {
  //   return from(this.fireBaseDB.collection('IActividades
  // ').add(Iactividad))
  //     .pipe(
  //       mergeMap(
  //         dato1 => {
  //           return this.fireBaseDB.collection('IActividades
  //         ').doc(dato1.id)
  //             .get()
  //             .pipe(
  //               map(dato2 => {
  //                 return {
  //                   ...dato2.data(),
  //                   uid: dato1.id
  //                 } as Iactividad
  //               })) // Fin pipe
  //         }),
  //       first()
  //     )  // Fin pipe

  }  // Fin AnyadirIactividad

  // ModificarIactividad(Iactividad: Iactividad): Observable<Iactividad> {

  //   const Iactividad$ = new Subject<Iactividad>();
  //   from(this.fireBaseDB.doc<Iactividad>(`IActividades
  // /${Iactividad.uid}`).update(Iactividad))
  //     .subscribe(
  //       value => {
  //         Iactividad$.next(Iactividad);
  //       },
  //       error => {
  //         (Iactividad$ as Observer<any>).error(error)
  //       }
  //     )
  //   return Iactividad$;

  // }

}

