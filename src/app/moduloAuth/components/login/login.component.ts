import { AuthActions } from '../../store/actions/index';
import { AppReducers } from '../../../reducers/index';
import { AuthService } from './../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

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



  }

  onLogin()
  {
    const credenciales = this.form.value;

    this.authService.login(credenciales.email, credenciales.password);
      // .pipe(
      //   tap( usuario => {
      //     console.log(usuario);
      //     // this.store.dispatch( AuthActions.login({ usuarioActivo: }))
      //   })
      // )
  }

  onRegistrarse() {


    this.router.navigate(['/registro',{ replaceUrl: true }],
    ).then(r => console.log(r)).catch(error => console.log(error));
  }

}
