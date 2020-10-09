import { Usuario } from './models/usuario.model';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Subject } from 'rxjs';
import { switchMap, map, tap} from 'rxjs/operators'



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

  login1(email: string, password: string) {

    console.log(email, password);
    this.firebaseAuth

      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {

    const usuario$ = new Subject<any>();
    console.log(email, password);
    from(this.firebaseAuth.signInWithEmailAndPassword(email, password))
      .subscribe(
        // ok
        (userFirebase: any) => {
          console.log("todo ok");
          return this.firebaseDB.collection('usuarios')
            .doc(userFirebase.user.uid)
            .valueChanges()
            .subscribe(
              doc => usuario$.next(doc)
            )
        },

        // Error
        (error) => {
          console.log('Ha habido un error')
          return null;
        }
      ); // Fin subscribe

    return usuario$;
  }







  logout() {
    this.firebaseAuth
      .signOut();
  }

}
