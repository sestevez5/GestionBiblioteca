import { TipoMensaje } from './../../shared/models/mensajeUsuario.model';
import { Actividad } from './../models/actividad.model';
import { Router } from '@angular/router';
import { RootState } from './../../reducers/app.reducer';
import { HorarioService } from '../services/horario.service';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, mergeMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import * as PrincipalActions from '../../moduloPrincipal/store/comunicaciones/comunicaciones.actions';
import * as actividadesActions from './actividades.actions';





@Injectable()
export class actividadesEffects {

  // ---------------------------------------------------------------------
  // Cargar actividades
  // ---------------------------------------------------------------------
  cargarActividades$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.cargarActividades),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.horarioService.obtenerTodasLasActividades()
              .pipe(

                map(

                  actividades => {

                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return actividadesActions.cargarActividadesOK({ actividades: actividades });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(actividadesActions.cargarActividadesError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  constructor(
    private horarioService: HorarioService,
    private action$: Actions,
    private store: Store<RootState>,
    private router: Router) {}

}
