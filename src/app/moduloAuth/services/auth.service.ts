import { Usuario } from '../models/usuario.model';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Subject } from 'rxjs';
import { switchMap, map, tap} from 'rxjs/operators'
import { getJSON } from 'jquery';



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







  logout() {
    this.firebaseAuth
      .signOut();
  }

}
