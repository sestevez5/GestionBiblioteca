import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromModuloActividades from './index';
import * as actividadesReducers from './actividades.reducer';

export const selectActividades = createSelector(
  FromModuloActividades.selectFeature,
  ({actividades}) => actividades
)

export const selectActividadActiva = createSelector(
  selectActividades,
  actividades => actividades.actividadActiva
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
  FromModuloActividades.selectFeature,
  ({actividades}) => actividades.procesandoAccion
);
