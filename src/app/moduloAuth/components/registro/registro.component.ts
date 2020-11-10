import { ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './../../models/usuario.model';
import { AppReducers } from '../../../reducers/index';


import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalManager } from 'ngb-modal';

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


  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;


  onImagen(imagen: string)
  {
    this.fotoPrevia = imagen;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppReducers.AppState>,
    private modalService: ModalManager
  ) {
      this.form = fb.group(
        {
          email: ['', [Validators.required]],
          password: ['', [Validators.required]],
          primerApellido: ['', [Validators.required]],
          segundoApellido: ['', [Validators.required]],
          nombre: ['', [Validators.required]],
          foto: ['']
        }
      )

   }

  onAceptar() {

    const usuario: Usuario = this.form.value;
    if (this.fotoActual) {
      usuario.foto = this.fotoActual;
    }

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

  openModal(){
    this.modalRef = this.modalService.open(this.panelModal, {
        size: "lg",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
  }

closeModal(){
    this.modalService.close(this.modalRef);
    // or this.modalRef.close();
}


  onOpen() {

  }

  onClose() {

  }

  onAceptarModal() {

    this.fotoActual = this.fotoPrevia;
    this.fotoPrevia = '';
    this.closeModal();
  }

  onCancelarModal() {

    this.closeModal();

  }


}





