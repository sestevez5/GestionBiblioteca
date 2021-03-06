import { EnumTipoEntidadHorario } from './../../models/tipoEntidadHorario.model';
import { TipoMensaje } from '../../../shared/models/mensajeUsuario.model';
import { Actividad } from '../../models/actividad.model';
import { Router } from '@angular/router';
import { RootState } from '../../../reducers/app.reducer';
import { HorarioService } from '../../services/horario.service';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, mergeMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import * as PrincipalActions from '../../../moduloPrincipal/store/comunicaciones/comunicaciones.actions';
import * as entidadesHorarioActions from './entidadesHorario.actions';


@Injectable()
export class entidadesHorarioEffects {

  // ---------------------------------------------------------------------
  // Cargar entidadesHorario
  // ---------------------------------------------------------------------
  cargarEntidadesHorario$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(entidadesHorarioActions.cargarEntidadesHorario),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.horarioService.obtenerTodasLasEntidadesHorarios(EnumTipoEntidadHorario.DOCENTE)
              .pipe(

                map(

                  entidadesHorario => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return entidadesHorarioActions.cargarEntidadesHorarioOK({ entidadesHorario: entidadesHorario });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(entidadesHorarioActions.cargarEntidadesHorarioError({ error: 'error' }))
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
