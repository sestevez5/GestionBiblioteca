import { modificarUsuarioOK } from './../actions/auth.actions';
import { AppState } from './../../../reducers/app.reducer';
import { AuthService } from './../../services/auth.service';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { createAction, Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthActions } from '../actions/index';
import { PrincipalActions } from '../../../moduloPrincipal/store/actions/index'



@Injectable()
export class AuthEffects {

  constructor(
    private authService: AuthService,
    private action$: Actions,
    private store: Store<AppState>
  ) { }

  // ---------------------------------------------------------------------
  // Loguear usuario
  // ---------------------------------------------------------------------
  login$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.loging),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));

            return this.authService.login(action.email, action.password)
              .pipe(

                map(

                  usuario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.loginOK({ usuariologueado: usuario })
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(AuthActions.loginError({ error: 'error' }))
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
                    return of(AuthActions.loginError({ error: 'error' }))
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

                map(

                  usuario => {

                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.cargarUsuarioOK({ usuario: usuario });
                  }

                  ), // Fin map

                  catchError(
                    error => {

                      this.store.dispatch(PrincipalActions.cargadoDatos());
                      return of(AuthActions.cargarUsuarioError({ error: 'error' }))
                    }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

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
                    return AuthActions.crearUsuarioOK({ usuario: usuario });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(AuthActions.crearUsuariosError({ error: 'error' }))
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

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.authService.ModificarUsuario(action.usuario)
              .pipe(

                map(

                  usuario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.modificarUsuarioOK({ usuario: usuario });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    console.log(error);
                    return of(AuthActions.modificarUsuarioError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect




 }
