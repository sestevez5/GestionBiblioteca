import { selectHorario } from './../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromModuloHorario from '../index';
import * as actividadesReducers from './actividades.reducer';

export const selectActividades = createSelector(
  FromModuloHorario.selectHorario,
  ({actividades}) => actividades
)

export const selectActividadActiva = createSelector(
  selectActividades,
  actividadesState => actividadesState.actividadActiva
)


export const selectTodasLasActividades = createSelector(
  selectActividades,
  actividadesReducers.selectTodasLasActividades
);


export const selectTotalActividades = createSelector(
  selectActividades,
  actividadesReducers.selectTotalActividades
);

export const selectProcesandoAccion = createSelector(
  FromModuloHorario.selectHorario,
  ({actividades}) => actividades.procesandoAccion
);
