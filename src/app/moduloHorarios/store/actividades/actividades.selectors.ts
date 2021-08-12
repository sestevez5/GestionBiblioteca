import { actividadesState } from './actividades.state';
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

export const selectTodasLasPlantillas = createSelector(
  selectActividades,
  actividadesState => actividadesState.plantillas
);

export const selectPlantillaActiva = createSelector(
  selectActividades,
  actividadesState => actividadesState.plantillaActiva
);

export const selectParametrosHorario = createSelector(
  selectActividades,
  actividadesState => actividadesState.parametrosHorario
);

export const selectLunesSemanaSeleccionada = createSelector(
  selectActividades,
  actividadesState => actividadesState.lunesSemanaSeleccionada
);

export const selectCreandoModificandoActividad = createSelector(
  selectActividades,
  actividadesState => actividadesState.creandoModificandoActividad
)





