import { ModuloPrincipalRootState } from '../../store';

import { Usuario } from '../../../moduloAuth/models/usuario.model';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../store/login/login.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as FromLoginSelector from '../../../moduloPrincipal/store/login/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private usuario: Usuario | undefined;

  usuarioActivoSubscription: Subscription | undefined;

  returnUrl: string;


  constructor(
    private fb: FormBuilder,
    private store: Store<ModuloPrincipalRootState>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.form = fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      }
    )
   }

  ngOnInit(): void {

    // Necesitamos obtener la url que nos invoca para devolver el flujo al punto de llamada.
    this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
            this.returnUrl = params['returnUrl']
          }
      });

    this.store
      .pipe(
        select(FromLoginSelector.selectUsuarioLogueado),
        filter(usuarioLogueado => !!usuarioLogueado)
      )
      .subscribe(
        usuarioLogueado => {

                if (this.returnUrl) {
                  this.router.navigateByUrl(this.returnUrl);
                }
                else {
                  this.router.navigateByUrl('/index');
                }

        }
      );


  }

  ngOnDestroy() {
    if (this.usuarioActivoSubscription) {
      this.usuarioActivoSubscription.unsubscribe();
     }
   }

  onLogin() {
    const credenciales = this.form.value;
    this.store.dispatch(AuthActions.loging({ email: credenciales.email, password: credenciales.password }));
  }

  onRegistrarse() {

    this.router.navigate(['/crearUsuario',{ replaceUrl: true }],
    )
  }

}
