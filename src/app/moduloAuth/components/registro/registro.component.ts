import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './../../models/usuario.model';
import { AppReducers } from '../../../reducers/index';


import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent  {

  closeResult = '';
  form: FormGroup;
  fotoActual = '';
  fotoPrevia = ''
  capturandoImagen = false;


  onImagen(imagen: string)
  {
    this.fotoPrevia = imagen;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppReducers.AppState>,
    private modalService: NgbModal
  ) {
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


  onAceptarNuevaImagen()
  {
    this.capturandoImagen = false;
    this.fotoActual = this.fotoPrevia;
  }

  openModal(content2: any) {
    this.capturandoImagen = true;
    this.modalService.open(content2, { scrollable: true, windowClass: 'dark-modal', size: 'lg'  }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});


  }

  private getDismissReason(reason: ModalDismissReasons): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
  }



}


