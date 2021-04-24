import { FiltroOrdenUsuario } from './../models/filtroOrdenUsuarios.model';
import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable, BehaviorSubject, from, Observer} from 'rxjs';
import { take, map, tap, first } from 'rxjs/operators';
import * as Utilidades from '../../moduloHelpers/utils/utilidades';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User | null>;


  constructor(
    private firebaseAuth: AngularFireAuth
    , private firebaseDB: AngularFirestore
  ) {
    this.user = firebaseAuth.authState;
  }

  // --------------------------------------------------------------------------
  // GESTIÓN DE LOGUEO
  // --------------------------------------------------------------------------
  registrarUsuario(nuevoUsuario: Usuario, password: string): Observable<Usuario> {
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

  ObtenerUsuarios(fou: FiltroOrdenUsuario | null): Observable<Usuario[]> {

    const usuarios$: Subject<Usuario[]> = new Subject<Usuario[]>();


    const coleccionUsuarios = this.firebaseDB.collection<Usuario>('usuarios');
    coleccionUsuarios.snapshotChanges()
      .pipe(
        map(
          actions => {
            return actions.map(
              act => {
                const datos = act.payload.doc.data() as Usuario;
                const uid = act.payload.doc.id;
                return { uid, ...datos };
              }
            )
          }
        )
      ).subscribe(
        usuarios => {
          const usuariosFiltrados: Usuario[] = [];
          // Procesamos cada uno de los elementos para convertirlos en la colección de Usuarios.
          usuarios.forEach(
            nuevoUsuario => {


              var cadenaParaFiltro = nuevoUsuario.nombre +
                '~' + nuevoUsuario.primerApellido +
                '~' + nuevoUsuario.segundoApellido +
                '~' + nuevoUsuario.email;

              let incluirRegistro = true;

              var subcadena;

              if (fou && fou.contieneSubcadena) subcadena = Utilidades.Utils.normalizarCadena(fou.contieneSubcadena)


              // Se desestima si hay una subcadena que debe contener y no la contiene.
              if (subcadena && Utilidades.Utils.normalizarCadena(cadenaParaFiltro).indexOf(subcadena) === -1) { incluirRegistro = false }

              // Se desestima si se piden usuarios de alta y el usuario no está de alta
              if (fou && fou.SoloUsuariosDeAlta && nuevoUsuario.FechaBaja) { incluirRegistro = false }

              if (incluirRegistro) { usuariosFiltrados.push(nuevoUsuario); }

            }
          );
          usuarios$.next(usuariosFiltrados);
        }

      )

    return usuarios$
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


