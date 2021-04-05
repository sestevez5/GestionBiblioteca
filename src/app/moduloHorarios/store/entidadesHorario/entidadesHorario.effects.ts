import { Router } from '@angular/router';
import { RootState } from '../../../reducers/app.reducer';
import { HorarioService } from '../../services/horario.service';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, mergeMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import * as PrincipalActions from '../../../moduloPrincipal/store/comunicaciones/comunicaciones.actions';
import * as FromEntidadesHorarioActions from './entidadesHorario.actions';
import * as FromActividadesActions from './../actividades/actividades.actions';



@Injectable()
export class entidadesHorarioEffects {

  // ---------------------------------------------------------------------
  // Cargar entidadesHorario
  // ---------------------------------------------------------------------
  cargarEntidadesHorario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(FromEntidadesHorarioActions.cargarEntidadesHorario),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));

            return this.horarioService.obtenerEntidadesHorarios(action.tipoEntidad)
              .pipe(

                map(
                  entidadesHorario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return FromEntidadesHorarioActions.cargarEntidadesHorarioOK({ entidadesHorario: entidadesHorario, tipoEntidadHorario: action.tipoEntidad });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(FromEntidadesHorarioActions.cargarEntidadesHorarioError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  seleccionarEntidadHorario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(FromEntidadesHorarioActions.seleccionarEntidadHorario),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.horarioService.obtenerActividades(action.entidadHorario)
              .pipe(

                map(

                  actividades => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return FromActividadesActions.cargarActividadesOK({ actividades: actividades });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(FromActividadesActions.cargarActividadesError({ error: 'error' }))
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
