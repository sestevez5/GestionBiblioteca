import { initialLibrosState } from './libros.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as LibrosActions from './libros.actions';



export const librosReducer = createReducer(
  initialLibrosState,

  on(LibrosActions.loadLibross, state => state),
  on(LibrosActions.loadLibrossSuccess, (state, action) => state),
  on(LibrosActions.loadLibrossFailure, (state, action) => state),

);

