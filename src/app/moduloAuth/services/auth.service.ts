import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';



import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable, from } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';




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


  // `Registro de un nuevo usuario`
  signup(nuevoUsuario: Usuario, password: string ) {
    const usuario$ = new Subject<any>();

    from(this.firebaseAuth.createUserWithEmailAndPassword(nuevoUsuario.email, password))
      .subscribe(
        (userFirebase: any) => {
          return from(this.firebaseDB
            .collection('usuarios')
            .doc(userFirebase.user?.uid)
            .set(nuevoUsuario))
            .subscribe(
              value => {
                return this.firebaseDB.collection('usuarios')
                  .doc(userFirebase.user.uid)
                  .valueChanges()
                  .subscribe(
                    doc => usuario$.next(doc)
                  )
              }
            )
        }
    );

    return usuario$;

  }


  // Loguear a un usuario.
  login(email: string, password: string) {

    const usuario$ = new Subject<Usuario>();

    from(this.firebaseAuth.signInWithEmailAndPassword(email, password))
      .subscribe(
        // ok
        (userFirebase: any) => {

          return this.firebaseDB.collection('usuarios')
            .doc(userFirebase.user.uid)
            .valueChanges()
            .subscribe(
              (doc) => {

                const usuario: any = {
                  ...doc as Usuario,
                  uid: userFirebase.user.uid
                };
                delete usuario['password'];
                usuario$.next(usuario as Usuario);
              }
            )
        },

        // Error
        (error) => {
          usuario$.error(error);
        }
      ); // Fin subscribe

    return usuario$;
  }

  // Obtener usuario a partir de su clave primaria.
  obtenerUsuarioporUid(uid: string): Observable<Usuario | undefined> {
    return this.firebaseDB.doc<Usuario>(`usuarios/${uid}`).valueChanges();

  }

  // Logout
  logout() { this.firebaseAuth.signOut(); }

  // Obtener todos los usuarios.
  ObtenerTodosLosUsuarios(): Observable<Usuario[]> {


    return this.firebaseDB.collection('usuarios')
      .get()
      .pipe(
        map(
          value => {
            const usuarios: Usuario[] = [];

            // Procesamos cada uno de los elementos para convertirlos en la colección de Usuarios.
            value.docs.forEach(
              usuario => {
                const nuevoUsuario: any = {
                  ...usuario.data() as Usuario,
                  uid: usuario.id
                };

                usuarios.push(nuevoUsuario);
              }
            );  // Fin foreach

            return usuarios;

          }
        ),  // Fin map.

        tap(console.log)

      );

  }



}
