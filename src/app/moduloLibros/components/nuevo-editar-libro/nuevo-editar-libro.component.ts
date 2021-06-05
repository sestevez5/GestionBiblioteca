import { selectProcesandoAccion } from './../../store/libros.selectors';
import { filter } from 'rxjs/operators';
import { ModalManager } from 'ngb-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LibrosService } from './../../services/libros.service';
import { Subscription } from 'rxjs';
import { Libro } from './../../models/libro.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModuloLibrosRootState } from '../../store';

import * as LibrosActions from '../../store/libros.actions';
import * as FromLibrosSelectors from '../../store/libros.selectors';

@Component({
  selector: 'app-nuevo-editar-libro',
  templateUrl: './nuevo-editar-libro.component.html',
  styleUrls: ['./nuevo-editar-libro.component.css']
})
export class NuevoEditarLibroComponent implements OnInit, OnDestroy {

  closeResult = '';
  form: FormGroup;
  fotoVigente = '';
  fotoCapturada = '';
  capturandoImagen = false;
  modoFormulario: 'Crear' | 'Modificar' | 'Visualizar';
  uidLibro: string | null;
  returnUrl: string;

  libro: Libro | undefined = {
    uid:'',
    titulo: '',
    isbn: '',
    categorias: [],
    psinopsis: '',
    foto: '',
    anyoEdicion: '',
    editorial: null,
    fechaAlta: null,
    autores: ''
  }

  libroActivo: Subscription;

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;

  constructor(
    private fb: FormBuilder,
    private LibrosService: LibrosService,
    private store: Store<ModuloLibrosRootState>,

    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalManager,
    public Librossv: LibrosService
  ) { }

  ngOnInit(): void {

    this.route.queryParams
    .subscribe(params => {
      if (params.returnUrl) {
          this.returnUrl = params['returnUrl']
        }
    });

    this.construirFormulario(this.libro);
    this.uidLibro = this.route.snapshot.paramMap.get("id");


    if (this.uidLibro) {

      this.store
        .pipe(
          select(FromLibrosSelectors.selectLibroActivo)
          ,filter(libro => !!libro)
        )
        .subscribe(
          libroActivo => {
            this.libro = libroActivo
            this.construirFormulario(this.libro)
          }
        );

      this.store.dispatch(LibrosActions.cargarLibro({ uidLibro: this.uidLibro }))
      this.modoFormulario = 'Modificar';

    } else {
      // Nuevo libro.
      this.construirFormulario(this.libro);
      this.modoFormulario = 'Crear'
    }


  }

  ngOnDestroy() {

    this.libroActivo?.unsubscribe();
  }

  onAceptar() {
    const datosFormulario = this.form.value;
    const password = datosFormulario.password;
    delete datosFormulario.password;
    let libroActual: Libro = datosFormulario;
    libroActual = {...libroActual, foto:this.fotoVigente};

    switch (this.modoFormulario) {
      case 'Crear': {

        this.libroActivo = this.store
        .pipe(
          select(FromLibrosSelectors.selectProcesandoAccion),
          filter(procesandoAccion => !procesandoAccion)
        )
          .subscribe(
            procesandoAccion => {

                if (this.returnUrl) {
                  this.router.navigateByUrl(this.returnUrl);
                }
                else {
                  this.router.navigateByUrl('libros/index');
                }

            }); // Fin subscribe

        this.store.dispatch(LibrosActions.crearLibro({ libro: libroActual}));

        break;
      }

      case 'Modificar': {

        console.log('libro actual: ', libroActual);

        this.libroActivo = this.store
          .pipe(
            select(FromLibrosSelectors.selectProcesandoAccion),
            filter(procesandoAccion => !procesandoAccion)
          )
          .subscribe(
            procesandoAccion => {

                  if (this.returnUrl) {
                    this.router.navigateByUrl(this.returnUrl);
                  }
                  else {
                    this.router.navigateByUrl('libros/index');
                  }

          }
        );

        if (this.uidLibro) {
          libroActual = { ...libroActual, uid: this.uidLibro }
          this.store.dispatch(LibrosActions.modificarLibro({ libro: libroActual }));
        };


        break;
      }

      default: {
        break
      }



    };


  }

  onCancelar()
  {
    this.router.navigateByUrl('libros/index');
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
  // Métodos privados
  // ------------------------------------------
  private construirFormulario(libro: Libro | undefined) {

    // Verificamos is estamos ante una edición o un registro nuevo.
  this.form = this.fb.group(
    {
      titulo: [this.libro?.titulo, [Validators.required]],
      isbn: [this.libro?.isbn, [Validators.required]],
      psinopsis: [this.libro?.psinopsis],
      autores: [this.libro?.autores, [Validators.required]],
      anyoEdicion: [this.libro?.anyoEdicion],
      foto: [this.libro?.foto],
    }
  );
    if (this.libro?.foto) {
    this.fotoVigente = this.libro.foto;
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
