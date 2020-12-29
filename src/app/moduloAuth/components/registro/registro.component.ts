import { ModuloAuthRootState } from './../../store/index';
import { selectUsuarioActivo } from '../../store/usuarios/usuarios.selectors';
import { Observable, pipe } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

import { Usuario } from './../../models/usuario.model';
import { AppReducers } from '../../../reducers/index';

import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalManager } from 'ngb-modal';

import * as AuthActions from '../../store/usuarios/usuarios.actions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  closeResult = '';
  form: FormGroup;
  fotoVigente = '';
  fotoCapturada = '';
  capturandoImagen = false;
  modoFormulario: 'Crear' | 'Modificar' | 'Visualizar';
  uidUsuario: string | null;

  private usuarioEdicion$: Observable<Usuario | undefined>;
  usuario: Usuario | undefined = {
    uid:'',
    email: '',
    movil: '',
    primerApellido: '',
    segundoApellido: '',
    nombre: '',
    esAdministrador: false,
    foto: '',
    FechaAlta: null,
    FechaBaja: null
  }


  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<ModuloAuthRootState>,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalManager
  ) {}

  ngOnInit() {


    this.construirFormulario(this.usuario);
    this.uidUsuario = this.route.snapshot.paramMap.get("id");

    if (this.uidUsuario) {

      this.store
        .pipe(select(selectUsuarioActivo))
        .subscribe(
          usuarioActivo => {
            this.usuario = usuarioActivo
            this.construirFormulario(this.usuario)
          }
        );

      this.store.dispatch(AuthActions.cargarUsuario({ uidUsuario: this.uidUsuario }))
      this.modoFormulario = 'Modificar';

    } else {
      // Nuevo usuario.
      this.construirFormulario(this.usuario);
      this.modoFormulario = 'Crear'
    }


  }

  onAceptar() {
    const datosFormulario = this.form.value;
    const password = datosFormulario.password;
    delete datosFormulario.password;
    let usuarioActual: Usuario = datosFormulario;
    usuarioActual = {...usuarioActual, foto:this.fotoVigente};

    switch (this.modoFormulario) {
      case 'Crear': {
        this.store.dispatch(AuthActions.crearUsuario({ usuario: usuarioActual, password: password}));
        break;
      }

      case 'Modificar': {
        if (this.uidUsuario) {
          usuarioActual = { ...usuarioActual, uid: this.uidUsuario }
          this.store.dispatch(AuthActions.modificarUsuario({ usuario: usuarioActual }));
          this.store.pipe(
            select(selectUsuarioActivo))
            .subscribe(
              usuarioActivo => console.log('hola')

          )
        }

        break;
      }

      default: {
        break
      }



    };


  }

  onCancelar()
  {
    this.router.navigateByUrl('/usuarios');
  }


  // Gestores de botones de la ventana modal para la gestión de la imagen
  onAceptarVentanaModal() {
    this.fotoVigente = this.fotoCapturada;
    this.cerrarVentanaModal();
  }

  onCancelarVentanaModal() {
     this.cerrarVentanaModal();
  }

  // ------------------------------------------
  // Métodos auxiliares
  // ------------------------------------------
  private construirFormulario(usuario: Usuario | undefined) {

      // Verificamos is estamos ante una edición o un registro nuevo.
    this.form = this.fb.group(
      {
        email: [this.usuario?.email, [Validators.required]],
        primerApellido: [this.usuario?.primerApellido, [Validators.required]],
        segundoApellido: [this.usuario?.segundoApellido, [Validators.required]],
        nombre: [this.usuario?.nombre, [Validators.required]],
        esAdministrador: [this.usuario?.esAdministrador, [Validators.required]],
        foto: [this.usuario?.foto],

        password: ['', [Validators.required]], // No forma parte de la entidad Usuario
      }
    );
      if (this.usuario?.foto) {
      this.fotoVigente = this.usuario.foto;
      } else {
        this.fotoVigente = '';

    }
  }

  onObtenerImagen(imagen: string) {
    this.fotoCapturada = imagen;

  }

  cerrarVentanaModal(){
      this.modalService.close(this.modalRef);
      // or this.modalRef.close();
  }

  AbrirVentanaModal() {
    this.fotoCapturada = '';
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
    });
  }


  // ------------------------------------------
  // Métodos no implementados.
  // ------------------------------------------
  onAbrirVentanaModal() {}

  onCerrarVentanaModal() { }

}






