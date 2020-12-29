import { Usuario } from './../../moduloAuth/models/usuario.model';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';



import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable, from} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
  login(email: string, password: string): Observable<Usuario> {

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

   // Logout
  logout() {
    this.firebaseAuth.signOut();
  }

}
