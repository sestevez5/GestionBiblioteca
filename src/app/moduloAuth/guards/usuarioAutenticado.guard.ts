import { Router } from '@angular/router';
import { switchMap, catchError, filter, take, tap, map } from 'rxjs/operators';
import { selectUsuarioLogueado } from './../store/selectors/auth.selectors';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AppState } from '../../reducers/app.reducer';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AuthActions } from '../store/actions';

@Injectable({
  providedIn: 'root'
}

)
export class UsuarioAutenticadoGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    this.store.dispatch(AuthActions.loging({ email: 'sestevez5@gmail.com', password:'bartolo1234'}));
    return this.store
      .pipe(
        take(1),
        select(selectUsuarioLogueado),
        map(usuarioLogueado => {
          if (usuarioLogueado) {
            return true
          }
          else {
            const c = '/login?returnUrl=' + state.url;
            console.log(c);

            this.router.navigateByUrl('/login?returnUrl='+state.url+'&x=2');

            return false
          }
        })

      );


    // return logueado as Observable<boolean>;
  }


}
