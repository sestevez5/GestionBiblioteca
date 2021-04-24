import { ViewChild, ViewEncapsulation } from '@angular/core';
import { ActividadG } from './../../models/actividadG.model';
// Elementos del Framework
import { Component, ElementRef } from '@angular/core';

// Entidades
import { EnumTipoEntidadHorario } from '../../models/tipoEntidadHorario.model';

// Elementos relativos a. STORE
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
import { Store } from '@ngrx/store';
import { ModuloHorarioRootState } from '../../store/index';
import { ModalManager } from 'ngb-modal';





@Component({
  selector: 'app-gestion-horario',
  templateUrl: './gestion-horario.component.html',
  styleUrls: ['./gestion-horario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GestionHorarioComponent {

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;

  actividad: ActividadG;


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

  onActividadSeleccionada(actividad: ActividadG) {

    this.actividad = actividad;
    this.AbrirVentanaModal(this.actividad);
  }

  AbrirVentanaModal(actividad: ActividadG) {

    console.log('actividad al abrir: ', this.actividad);

    this.modalRef = this.modalService.open(this.panelModal, {
      size: "xl",
      hideCloseButton: true,
      centered: false,
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






