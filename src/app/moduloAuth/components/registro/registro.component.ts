import { Usuario } from './../../models/usuario.model';
import { AppReducers } from '../../../reducers/index';


import { AuthService } from './../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppReducers.AppState>) {
    this.form = fb.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        primerApellido: ['', [Validators.required]],
        segundoApellido: ['', [Validators.required]],
        nombre: ['', [Validators.required]]
      }
    )
   }

  ngOnInit(): void {



  }

  onAceptar() {

    const usuario: Usuario = this.form.value;

    this.authService.signup(usuario, this.form.value.password)
      .subscribe(
        user => console.log("nuevo usuario: ", user)
      );

  }
  onCancelar()
  {

  }



}
