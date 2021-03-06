import { Utils } from './../../../moduloHelpers/utils/mensajes';
import { Router } from '@angular/router';
import { Code } from 'angular-feather/icons';
import { mensajeUsuario, TipoMensaje } from './../../../shared/models/mensajeUsuario.model';
import { RootState } from './../../../reducers/app.reducer';
import { AuthService } from './../../services/auth.service';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { createAction, Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as AuthActions from './usuarios.actions';
import * as PrincipalActions from '../../../moduloPrincipal/store/comunicaciones/comunicaciones.actions'




@Injectable()
export class UsuariosEffects {

  constructor(
    private authService: AuthService,
    private action$: Actions,
    private store: Store<RootState>,
    private router: Router
  ) { }

    // ---------------------------------------------------------------------
  // Crear Usuario
  // ---------------------------------------------------------------------
  crearUsuario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.crearUsuario),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.authService.registrarUsuario(action.usuario, action.password)
              .pipe(

                map(

                  usuario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    this.router.navigateByUrl('/usuarios');
                    console.log('usuariocreado:', usuario);
                    return AuthActions.crearUsuarioOK({ usuario: usuario });

                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    if (error.code === 'auth/email-already-in-use') {
                      this.store.dispatch(
                      PrincipalActions.generarMensajeUsuario(
                      {
                        mensajeUsuario:
                          { mensaje: 'Ya existe un usuario con el dni indicado', tipoMensaje: TipoMensaje.Error, observaciones: 'esto es un error' }
                      })
                      )
                    }

                    else {
                      this.store.dispatch(
                        PrincipalActions.generarMensajeUsuario(
                        {
                          mensajeUsuario:
                            { mensaje: 'JKGHAJKGHKSJAGHAJKSHGJAK', tipoMensaje: TipoMensaje.Error, observaciones: 'esto es un error' }
                        })
                        )

                    }


                    return of(AuthActions.crearUsuariosError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  // ---------------------------------------------------------------------
  // Cargar Usuarios
  // ---------------------------------------------------------------------
  cargarUsuarios$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.cargarUsuarios),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.authService.ObtenerUsuarios(action.fou)
              .pipe(

                map(

                  usuarios => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.cargarUsuariosOK({ usuarios: usuarios });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(AuthActions.cargarUsuariosError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  // ---------------------------------------------------------------------
  // Cargar Usuario
  // ---------------------------------------------------------------------
  cargarUsuario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.cargarUsuario),

        mergeMap(
          action => {


            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando usuario" }));

            return this.authService.ObtenerUsuarioPorUid(action.uidUsuario)
              .pipe(
                tap(value => this.store.dispatch(PrincipalActions.cargadoDatos())),

                map(
                  usuario => {
                    return AuthActions.cargarUsuarioOK({ usuario: usuario });
                  }

                  ), // Fin map

                  catchError(
                    error => {
                      return of(AuthActions.cargarUsuarioError({ error: 'error' }))
                    }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


  modificarUsuario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.modificarUsuario),

        switchMap(
          action => {
            console.log('effect modificarusuario');

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.authService.ModificarUsuario(action.usuario)
              .pipe(

                map(

                  usuario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.modificarUsuarioOK({ usuario: { id: usuario.uid, changes: { ...usuario } } });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(AuthActions.modificarUsuarioError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  eliminarUsuario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.eliminarUsuario),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "eliminando usuario" }));
            return this.authService.EliminarUsuario(action.uidUsuario)
              .pipe(

                map(

                  uidUsuario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.eliminarUsuarioOK({uidUsuario: uidUsuario});
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());

                    return of(AuthActions.eliminarUsuarioError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


}

