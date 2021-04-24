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

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;


  constructor(
    private store: Store<ModuloLibrosRootState>,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalManager) { }

  ngOnInit(): void {

    this.store
      .pipe(select(FromLibrosSelector.selectTodosLosLibros))
      .subscribe(libros => this.libros = libros);

    this.store.dispatch(LibrosActions.cargarLibros({ fol: { contieneSubcadena: '', SoloLibrosDeAlta: false } }));
  }



  OnChangeCadenaBusqueda(cadena: string) {
    this.store.dispatch(LibrosActions.cargarLibros({ fol: { contieneSubcadena: cadena, SoloLibrosDeAlta: false } }))
  }


  filtrarPor(val: string) {

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
   this.router.navigate(['libros', 'editarLibro', libro.uid], { queryParams: { returnUrl: 'libros/index'}} )
  }

  onBorrarLibro(libro: Libro) {
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
