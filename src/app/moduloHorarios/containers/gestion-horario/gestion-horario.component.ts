import { Actividad } from './../../models/actividad.model';
import { ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ActividadG } from './../../models/actividadG.model';
// Elementos del Framework
import { Component, ElementRef } from '@angular/core';

// Entidades
import { EnumTipoEntidadHorario } from '../../models/tipoEntidadHorario.model';

// Elementos relativos a. STORE
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import { Store, select } from '@ngrx/store';
import { ModuloHorarioRootState } from '../../store/index';
import { ModalManager } from 'ngb-modal';





@Component({
  selector: 'app-gestion-horario',
  templateUrl: './gestion-horario.component.html',
  styleUrls: ['./gestion-horario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GestionHorarioComponent implements OnInit {

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;

  actividad: Actividad;

  constructor(private store: Store<ModuloHorarioRootState>, private modalService: ModalManager) {
    this.gestionarAccionesIniciales();
  }

  gestionarAccionesIniciales() {

    // 1.- Solicitud de carga de entidades de tipo docente.
    this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }));

    // 2.- Solicitud de carga de los parámetros del horario.
    this.store.dispatch(FromActividadesActions.cargarParametrosHorario());

    // 3.- Solicitud de carga de las plantillas disponibles.
    this.store.dispatch(FromActividadesActions.cargarPlantillas());

  }

  ngOnInit(): void {
    this.store.pipe(select(FromActividadesSelectors.selectActividadActiva))
      .subscribe( actividadActiva => this.actividad = actividadActiva)
  }

  onActividadSeleccionada(actividad: ActividadG) {
    this.AbrirVentanaModal();
  }

  AbrirVentanaModal() {

     this.modalRef = this.modalService.open(this.panelModal, {
      size: "xl",
      hideCloseButton: true,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop",
    });

  }

    // ------------------------------------------
  // Métodos no implementados.
  // ------------------------------------------
  onAbrirVentanaModal() {}

  onCerrarVentanaModal() {
    this.modalService.close(this.modalRef);
   }

}






