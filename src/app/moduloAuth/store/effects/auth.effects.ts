import { AppState } from './../../../reducers/app.reducer';
import { AuthService } from './../../services/auth.service';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
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
                    return AuthActions.loginOK({ usuarioActivo: usuario })
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




  usuarios$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.cargandoUsuarios),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));

            return this.authService.ObtenerTodosLosUsuarios()
              .pipe(

                map(

                  usuarios => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return AuthActions.UsuariosOK({ usuarios: usuarios });
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


 }
