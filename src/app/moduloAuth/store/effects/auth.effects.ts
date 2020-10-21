import { AppState } from './../../../reducers/app.reducer';
import { AuthService } from './../../services/auth.service';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { createAction, Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthActions } from '../actions/index';



@Injectable()
export class AuthEffects {

  constructor(
    private authService: AuthService,
    private action$: Actions,
    private store: Store<AppState>
  ) {}

  login$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.loging),

        mergeMap(
          action =>
            this.authService.login(action.email, action.password)
              .pipe(
                map(

                  usuario => AuthActions.loginOK({ usuarioActivo: usuario })
                ), // Fin map

                catchError(
                  error => {
                    console.log("error");
                    return of(AuthActions.loginError({ error: 'error' }))
                  }

                )



            ) // fin pipe

      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


 }
