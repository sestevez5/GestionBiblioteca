import { IActividad } from './../../models/IActividad.model';
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

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Cargando plantillas" }));
            return this.horarioService.obtenerPlantillas()
              .pipe(
                map(
                  plantillas => {
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

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Cargando actividades semanales" }));

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

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Cargando parámetros de horarios" }));
            return this.horarioService.obtenerParametrosHorario()
              .pipe(
                map(
                  parametrosHorario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
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

  // ---------------------------------------------------------------------
  // Cargar Actividad
  // ---------------------------------------------------------------------
  cargarActividad$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.cargarActividad),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Cargando actividad" }));
            return this.horarioService.obtenerActividad(action.idActividad)
              .pipe(
                tap(value => {

                  this.store.dispatch(PrincipalActions.cargadoDatos())
                }),

                map(
                  actividad => {

                     return actividadesActions.cargarActividadOK({ actividad: actividad});
                  }

                  ), // Fin map

                  catchError(
                    error => {

                      return of(actividadesActions.cargarActividadError({ error: 'error' }))
                    }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


  modificarActividad$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.modificarActividad),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Editando actividad" }));
            return this.horarioService.modificarActividad(action.actividad.idActividad, action.actividad)
              .pipe(
                tap(value => {

                  this.store.dispatch(PrincipalActions.cargadoDatos())
                }),

                map(
                  actividad => {

                    console.log(actividad);
                    return actividadesActions.modificarActividadOK({ actividad: { id: actividad.idActividad, changes: { ...actividad } } });
                  }

                  ), // Fin map

                  catchError(
                    error => {

                      return of(actividadesActions.modificarActividadError({ error: 'error' }))
                    }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  crearActividad$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.crearActividad),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Creando actividad" }));
            return this.horarioService.crearActividad(action.actividad)
              .pipe(
                tap(value => {

                  this.store.dispatch(PrincipalActions.cargadoDatos())
                }),

                map(
                  actividad => {
                    return actividadesActions.crearActividadOK({ actividad: actividad });

                  }

                  ), // Fin map

                  catchError(
                    error => {

                      console.log(error);
                      return of(actividadesActions.crearActividadError({ error: 'error' }))
                    }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect

  eliminarActividad$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(actividadesActions.eliminarActividad),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "Creando actividad" }));
            return this.horarioService.eliminarActividad(action.idActividad)
              .pipe(
                tap(value => {

                  this.store.dispatch(PrincipalActions.cargadoDatos())
                }),

                map(
                  idActividad => {
                    return actividadesActions.eliminarActividadOK({ idActividad: idActividad });

                  }

                  ), // Fin map

                  catchError(
                    error => {

                      return of(actividadesActions.eliminarActividadError({ error: 'error' }))
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
    private store: Store<ModuloHorarioRootState>,
    private router: Router) {}

}
