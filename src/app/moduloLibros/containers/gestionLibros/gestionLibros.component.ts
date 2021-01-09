import { ModuloLibrosRootState } from '../../store/index';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';


import { Libro } from '../../models/libro.model';

import * as FromLibrosSelector from '../../store/libros.selectors';

import { select, Store } from '@ngrx/store';
import { ViewChild,Component, OnInit, ElementRef } from '@angular/core';
import * as LibrosActions from '../../store/libros.actions';

import { ModalManager } from 'ngb-modal';




@Component({
  selector: 'app-gestion-libros',
  templateUrl: './gestionLibros.component.html',
  styleUrls: ['./gestionLibros.component.css']
})
export class gestionLibrosComponent implements OnInit {

  libros: Libro[];
  libroActual: Libro;
  solicitudConfirmacion: boolean = false;

  // Gestionamos el cambio de la subcadena para filtrar a través de un observable que emite un valor cada vez que cambia.
  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;


  constructor(
    private store: Store<ModuloLibrosRootState>,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalManager) { }

  ngOnInit(): void {

    this.store
      .pipe(
        select(FromLibrosSelector.selectTodosLosLibros)
      )
      .subscribe(
       libros => {
          if (libros.length == 0) {

            this.store.dispatch(LibrosActions.cargarLibros({ fol: { contieneSubcadena: this.textoFiltro, SoloLibrosDeAlta: false } }));
          };

          this.libros = libros;


      }
    )

    this._textoFiltro
      .pipe(
        skip(1), // El primer valor del cuadro de texto queremos omitirlo.
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe(
        val => this.store.dispatch(LibrosActions.cargarLibros({ fol: { contieneSubcadena: this.textoFiltro, SoloLibrosDeAlta: false } }))
    )


  }


  filtrarPor(val: string) {

    console.log('filtrando por: ',val);

  }

  onAnyadirLibro() {
    this.router.navigateByUrl('libros/crearLibro');
  }


  onAceptarVentanaModal() {

    this.modalService.close(this.modalRef);
    this.store.dispatch(LibrosActions.eliminarLibro({ uidLibro: this.libroActual.uid }));

  };

  onCancelarVentanaModal() {
    this.modalService.close(this.modalRef);

  }

  onEditarLibro(libro: Libro) {
    console.log('hola');
   this.router.navigate(['libros', 'editarLibro', libro.uid], { queryParams: { returnUrl: 'libros/index'}} )
  }

  onBorrarLibro(libro: Libro) {
    console.log(libro);
    this.libroActual = libro;
    this.solicitudConfirmacion = true;
  }

  onEsAceptadaConfirmacion(esAceptada: boolean) {
    this.solicitudConfirmacion = false;

    if (esAceptada) {
      this.store.dispatch(LibrosActions.eliminarLibro({ uidLibro: this.libroActual.uid }));
    }

  }




}
