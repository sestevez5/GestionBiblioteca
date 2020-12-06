import { Observable, of } from 'rxjs';
import { AppState } from './../../../reducers/app.reducer';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

@Injectable()
export class UsuarioResolver implements Resolve<any> {

  constructor(private store: Store<AppState>) {
  }
    resolve() {
      return of('Hello Alligator!')
        .pipe(
          (2000)
        );
    }
  }
}
