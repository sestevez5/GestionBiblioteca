// import { selectTipoEntidadActiva } from './entidadesHorario.selectors';
import { entidadesHorarioState } from './entidadesHorario.state';
import { selectHorario } from './../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromModuloHorario from '../index';
import * as entidadesHorarioReducers from './entidadesHorario.reducer';

export const selectEntidadesHorario = createSelector(
  FromModuloHorario.selectHorario,
  ({entidadesHorario}) => entidadesHorario
)

export const selectActividadActiva = createSelector(
  selectEntidadesHorario,
  entidadesHorarioState => entidadesHorarioState.entidadHorarioActiva
)


export const selectTodasLasEntidadesHorario = createSelector(
  selectEntidadesHorario,
  entidadesHorarioReducers.selectTodasLasEntidadesHorario
);


export const selectTotalEntidadesHorario = createSelector(
  selectEntidadesHorario,
  entidadesHorarioReducers.selectTotalEntidadesHorario
);

export const selectEntidadHorarioActiva = createSelector(
  FromModuloHorario.selectHorario,
  ({ entidadesHorario }) =>  entidadesHorario.entidadHorarioActiva
);

export const selectTipoEntidadActiva = createSelector(
  FromModuloHorario.selectHorario,
  ({ entidadesHorario }) =>  entidadesHorario.tipoEntidadActiva
);

export const selectListaSelectores = createSelector(
  FromModuloHorario.selectHorario,
  ({ entidadesHorario }) =>  entidadesHorario.listaSelectores
);



