import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as LibrosActions from './libros.actions';



@Injectable()
export class LibrosEffects {

  loadLibross$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(LibrosActions.loadLibross),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => LibrosActions.loadLibrossSuccess({ data })),
          catchError(error => of(LibrosActions.loadLibrossFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
