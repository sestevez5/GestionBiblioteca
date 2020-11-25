import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
export class RegistroComponent implements OnInit {

  closeResult = '';
  form: FormGroup;
  fotoActual = '';
  fotoPrevia = ''
  capturandoImagen = false;
  modoCreacion = true;

  private usuarioEdicion$: Observable<Usuario | undefined>;
  usuario: Usuario | undefined = {
    uid:'',
    email: '',
    movil: '',
    primerApellido: '',
    segundoApellido: '',
    nombre: '',
    foto: '',
    FechaAlta: null,
    FechaBaja: null
  }


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
    private route: ActivatedRoute,
    private modalService: ModalManager
  ) {


  }

  ngOnInit() {

    this.construirFormulario(this.usuario);
    const uidUsuario = this.route.snapshot.paramMap.get("id");

    if (uidUsuario) {

      // edición de un usuario existente.
      this.modoCreacion = false;
      this.usuarioEdicion$ = this.authService.obtenerUsuarioporUid(uidUsuario);
      this.usuarioEdicion$
        .subscribe(
          usuario => {
            this.usuario = usuario
            this.construirFormulario(this.usuario)
          }
        )
    } else {
      // Nuevo usuario.
      this.construirFormulario(this.usuario);

    }

  }


  private construirFormulario(usuario: Usuario | undefined) {

    // Verificamos is estamos ante una edición o un registro nuevo.
    this.form = this.fb.group(
      {
        email: [this.usuario?.email, [Validators.required]],
        primerApellido: [this.usuario?.primerApellido, [Validators.required]],
        segundoApellido: [this.usuario?.segundoApellido, [Validators.required]],
        nombre: [this.usuario?.nombre, [Validators.required]],
        foto: [this.usuario?.foto],

        password: ['', [Validators.required]], // No forma parte de la entidad Usuario
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





