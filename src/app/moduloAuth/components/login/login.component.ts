import { selectUsuarioActivo } from './../../store/selectors/auth.selectors';
import { Usuario } from './../../models/usuario.model';

import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppReducers } from '../../../reducers/index';
import { AuthActions } from '../../store/actions/index';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private usuario: Usuario | undefined;

  usuarioActivoSubscription: Subscription | undefined;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppReducers.AppState>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.form = fb.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    )
   }

  ngOnInit(): void {

    this.store
    .pipe(
      select(selectUsuarioActivo)
    ).subscribe(
      x => {
        console.log("sfjjkasfhjksa");
        if (x) {
          this.router.navigateByUrl('/index');
        }
      }
    )


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


    this.router.navigate(['/registro',{ replaceUrl: true }],
    ).then(r => console.log(r)).catch(error => console.log(error));
  }

}
