import { FiltroOrdenUsuario } from './../models/filtroOrdenUsuarios.model';
import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';



import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable, BehaviorSubject, from, Observer} from 'rxjs';
import { take, map, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User| null>;


  constructor(
    private firebaseAuth: AngularFireAuth
    ,private firebaseDB: AngularFirestore
  )
  {
    this.user = firebaseAuth.authState;
  }

  // --------------------------------------------------------------------------
  // GESTIÓN DE LOGUEO
  // --------------------------------------------------------------------------
  registrarUsuario(nuevoUsuario: Usuario, password: string ): Observable<Usuario> {
    const usuario$ = new Subject<Usuario>();

    from(this.firebaseAuth.createUserWithEmailAndPassword(nuevoUsuario.email, password))
      .subscribe(
        // Generación de usuario OK
        (userFirebase: any) => {

            return from(this.firebaseDB
            .collection('usuarios')
            .doc(userFirebase.user.uid)
            .set(nuevoUsuario))
            .subscribe(
              value => {
                return this.firebaseDB.collection('usuarios')
                  .doc(userFirebase.user.uid)
                  .get()
                  .subscribe(
                    value => {
                      if (!value.data()) {
                        return (usuario$ as Observer<any>).error("Usuario no encontrado");
                      } else {

                        const nuevoUsuario = {
                          ...value.data(),
                          uid: userFirebase.user.uid
                        }
                        usuario$.next(nuevoUsuario as Usuario);
                      }
                    }

                )
              }
            )
        },

        // Generación incorrecta: Nuestro observer emitirá el error con la misma información.
        error => {
          console.log("error.", error);
          (usuario$ as Observer<any>).error(error)
        }
    );


    return usuario$;

  }

  // --------------------------------------------------------------------------
  // GESTIÓN DE USUARIO
  // --------------------------------------------------------------------------
  // Obtener usuario a partir de su clave primaria.
  ObtenerUsuarioPorUid(uid: string): Observable<Usuario> {

    const usuario$ = new Subject<Usuario>();


    this.firebaseDB.doc<Usuario>(`usuarios/${uid}`).valueChanges()
      .pipe(
        first(),
        map(value => {
          if (!value) {
            return (usuario$ as Observer<any>).error("Error")
          }
           usuario$.next(value);
        })
      ).subscribe(

    );



    return usuario$;
  }

  // Obtener todos los usuarios.
  ObtenerUsuarios(fou: FiltroOrdenUsuario | null): Observable<Usuario[]> {

    return this.firebaseDB.collection('usuarios')
      .get()
      .pipe(
             map(
          value => {
            const usuarios: Usuario[] = [];

            // Procesamos cada uno de los elementos para convertirlos en la colección de Usuarios.
            value.docs.forEach(


              usuario => {

                const nuevoUsuario: Usuario = {
                  ...usuario.data() as Usuario,
                  uid: usuario.id
                };


                const cadenaParaFiltro = nuevoUsuario.nombre +
                  '~' + nuevoUsuario.primerApellido +
                  '~' + nuevoUsuario.segundoApellido +
                  '~' + nuevoUsuario.email;

                let incluirRegistro = true;

                // Se desestima si hay una subcadena que debe contener y no la contiene.
                if (fou && fou.contieneSubcadena && cadenaParaFiltro.indexOf(fou.contieneSubcadena) === -1) { incluirRegistro = false }

                // Se desestima si se piden usuarios de alta y el usuario no está de alta
                if (fou && fou.SoloUsuariosDeAlta && nuevoUsuario.FechaBaja) { incluirRegistro = false }

                if (incluirRegistro) { usuarios.push(nuevoUsuario); }

              }
            );  // Fin foreach

            return usuarios;


          }
        ),  // Fin map

      );

  }

  ModificarUsuario(usuario: Usuario): Observable<Usuario> {

    const usuario$ = new Subject<Usuario>();
    from(this.firebaseDB.doc<Usuario>(`usuarios/${usuario.uid}`).update(usuario))
      .subscribe(
        value => {
          usuario$.next(usuario);
        },
        error => {
          (usuario$ as Observer<any>).error(error)
        }
      )
    return usuario$;

  }

  EliminarUsuario(uidUsuario: string): Observable<string> {

    const usuario$ = new Subject<string>();
    from(this.firebaseDB.doc<Usuario>(`usuarios/${uidUsuario}`).delete())
      .subscribe(
        value => {
          usuario$.next(uidUsuario);
        },
        error => {
          (usuario$ as Observer<any>).error(error)
        }
      )
    return usuario$;

  }


}
