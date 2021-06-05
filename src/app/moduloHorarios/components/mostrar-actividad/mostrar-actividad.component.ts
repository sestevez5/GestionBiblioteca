import { filter } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from './../../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { ListasSelectores } from './../../models/listasSelectores.model';
import { ModalManager } from 'ngb-modal';
import { Asignatura } from './../../models/asignatura.model';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { Actividad } from './../../models/actividad.model';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import * as FromEntidadesHorarioSelectors from '../../store/entidadesHorario/entidadesHorario.selectors';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';

@Component({
  selector: 'app-mostrar-actividad',
  templateUrl: './mostrar-actividad.component.html',
  styleUrls: ['./mostrar-actividad.component.css']
})
export class MostrarActividadComponent implements OnInit {

  @Input() actividad: Actividad;
  modoPanelActividad: 'modoCreacion' | 'modoEdicion' | 'modoMostrar' = 'modoMostrar';
  idActividad: string;
  listaSelectores: ListasSelectores;

  @ViewChild("panelAlumnos") panelModal: ElementRef;
  private modalRef: any;




  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalManager) {

    }

  ngOnInit(): void {
    this.route.url.subscribe(
      url => {

        if (url) {
          switch (url[0].path) {
            case 'mostrarActividad':
              this.modoPanelActividad = 'modoMostrar';
              this.cargarActividad();
            break;

            case 'editarActividad':
              this.modoPanelActividad = 'modoEdicion';
              this.cargarActividad()
            break;

            case 'nuevaActividad':
              this.modoPanelActividad = 'modoCreacion';
            break;

            default: // Se ha invocado en modo modal desde index
              this.modoPanelActividad = 'modoMostrar';
            break;
          }
        }
      });

    // if (this.modoPanelActividad === 'modoMostrar' || this.modoPanelActividad === 'modoEdicion') {
    //   this.idActividad = this.route.snapshot.paramMap.get("id");
    //   cargarActividad()

    // }


    console.log('actividad: ', this.actividad)
    //this.gestionarSubscripcionesStore()

  }

  private cargarActividad() {
    this.idActividad = this.route.snapshot.paramMap.get("id");
    if (this.idActividad) {
      this.store
        .pipe(
          select(FromActividadesSelectors.selectActividadActiva),
          filter(actividad => !!actividad)
        )
        .subscribe(
          actividadActiva => {
            console.log(actividadActiva);
            this.actividad = actividadActiva;
            //this.construirFormulario(this.actividad)
          }
        );

      this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.idActividad }));
    }
  }

  entidadesHorarioDocentes(): EntidadHorario[] {
    const entidadesHorario: EntidadHorario[] = [];
    this.actividad.docentes.forEach(
      docente => {
        const entidadHorario = new EntidadHorario(docente);
        entidadesHorario.push(entidadHorario);
      });

    return entidadesHorario;
  }



  entidadesHorarioGrupos(): EntidadHorario[] {
  const entidadesHorario: EntidadHorario[] = [];
  this.actividad.grupos.forEach(
    grupo => {
      const entidadHorario = new EntidadHorario(grupo);
      entidadesHorario.push(entidadHorario);
    });

  return entidadesHorario;
}


  obtenerDenominacionDiaSemana(codigo: string): string {
    switch (codigo) {
      case 'L': return 'Lunes'; break;
      case 'M': return 'Martes'; break;
      case 'X': return 'Miércoles'; break;
      case 'J': return 'Jueves'; break;
      case 'V': return 'Viernes'; break;
      case 'S': return 'Sábado'; break;
      case 'D': return 'Domingo'; break;
      default: return ''; break;
    }
  }

  onMostrarAlumnos() {

    this.AbrirVentanaModal();

  }
  // ------------------------------------------
  // Métodos no implementados.
  // ------------------------------------------

  AbrirVentanaModal() {

    this.modalRef = this.modalService.open(this.panelModal, {
     size: "xs",
     hideCloseButton: true,
     centered: true,
     backdrop: true,
     animation: true,
     keyboard: false,
     closeOnOutsideClick: true,
     backdropClass: "modal-backdrop",
   });

 }
  onAbrirVentanaModal() {}

  onCerrarVentanaModal() {
    this.modalService.close(this.modalRef);
  }

  obtenerCamposConfig(): object {


    return { texto: 'idAlumno', leyenda: 'nombre', imagen:'foto' };

  }

  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  private gestionarSubscripcionesStore() {
    this.store.pipe(select(FromEntidadesHorarioSelectors.selectListaSelectores))
     .subscribe(
      listaSelectores => {
         this.listaSelectores = listaSelectores;
         console.log('lista de selectores: ',this.listaSelectores)
      }
  );
  }




}



