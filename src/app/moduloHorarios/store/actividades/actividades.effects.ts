import { ModuloHorarioRootState } from './../index';
import { Router } from '@angular/router';
import { RootState } from './../../../reducers/app.reducer';
import { HorarioService } from '../../services/horario.service';
import { Action, Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as PrincipalActions from '../../../moduloPrincipal/store/comunicaciones/comunicaciones.actions';
import * as actividadesActions from './actividades.actions';
import * as FromEntidadesHorarioSelectors from '../entidadesHorario/entidadesHorario.selectors';


@Injectable()
export class actividadesEffects {

  // ---------------------------------------------------------------------
  // Cargar actividades
  // ---------------------------------------------------------------------

  cargarPlantillas$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.cargarPlantillas),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.horarioService.obtenerPlantillas()
              .pipe(
                map(
                  plantillas => {
                    console.log('plantillas', plantillas)
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return actividadesActions.cargarPlantillasOK({ plantillas: plantillas });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(actividadesActions.cargarPlantillasError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  );

  seleccionarSemana$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.seleccionarSemana),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));

            return this.store.pipe(
                select(FromEntidadesHorarioSelectors.selectEntidadHorarioActiva),
                switchMap( eha => this.horarioService.obtenerActividades(eha, action.lunesSemanaSeleccionada)
                .pipe(
                  map(
                    actividades => {
                      this.store.dispatch(PrincipalActions.cargadoDatos());
                      return actividadesActions.cargarActividadesOK({ actividades: actividades });
                    }),
                  catchError(
                    error => {
                      this.store.dispatch(PrincipalActions.cargadoDatos());
                      return of(actividadesActions.cargarPlantillasError({ error: 'error' }))
                    })
                  ) // Fin pipe
                ) // Fin map
            ) // Fin this.store.pipe


      }) // Fin switchMap

    ) // fin this.action$.pipe

  );

  cargarParametrosHorario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.cargarParametrosHorario),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.horarioService.obtenerParametrosHorario()
              .pipe(
                map(
                  parametrosHorario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    console.log(parametrosHorario);
                    return actividadesActions.cargarParametrosHorarioOK({ parametrosHorario: parametrosHorario });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(actividadesActions.cargarParametrosHorarioError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  );

  cargarActividad$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.cargarPlantillas),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.horarioService.obtenerPlantillas()
              .pipe(
                map(
                  plantillas => {
                    console.log('plantillas', plantillas)
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return actividadesActions.cargarPlantillasOK({ plantillas: plantillas });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(actividadesActions.cargarPlantillasError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  );

  constructor(
    private horarioService: HorarioService,
    private action$: Actions,
    private store: Store<ModuloHorarioRootState>,
    private router: Router) {}

}
