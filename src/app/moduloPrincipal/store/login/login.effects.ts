import { Utils } from './../../../moduloHelpers/utils/mensajes';
import { Router } from '@angular/router';
import { RootState } from './../../../reducers/app.reducer';
import * as FromLoginService from '../../services/login.service';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as LoginActions from './login.actions';
import * as PrincipalActions from '../../../moduloPrincipal/store/comunicaciones/comunicaciones.actions'

@Injectable()
export class LoginEffects {

  constructor(
    private authService: FromLoginService.LoginService ,
    private action$: Actions,
    private store: Store<RootState>,
  ) { }

  // ---------------------------------------------------------------------
  // Loguear usuario
  // ---------------------------------------------------------------------
  login$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(LoginActions.loging),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Logueando usuario" }));

            return this.authService.login(action.email, action.password)
              .pipe(

                tap( value => this.store.dispatch(PrincipalActions.cargadoDatos()) ),

                map( usuario => LoginActions.loginOK({ usuariologueado: usuario })), // Fin map

                catchError(error => {
                  console.log('error',error);
                  this.store.dispatch(PrincipalActions.cargadoDatos());
                  this.store.dispatch(PrincipalActions.generarMensajeUsuario({ mensajeUsuario: Utils.construirMensaje(error['code']) }));
                  return of(LoginActions.loginError({ error: 'error' }))
                }
                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

}

