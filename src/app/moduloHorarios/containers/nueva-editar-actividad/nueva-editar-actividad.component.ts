import { EntidadHorario } from './../../models/entidadHorario.model';
import { ModalManager } from 'ngb-modal';
import { ModuloHorarioRootState } from './../../store/index';
import { filter } from 'rxjs/operators';
import { IActividad } from './../../models/IActividad.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { HorarioService } from './../../services/horario.service';
import { Subscription } from 'rxjs';
import { Actividad } from './../../models/actividad.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ModuloHorarioState } from '../../store';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
@Component({
  selector: 'app-nueva-editar-actividad',
  templateUrl: './nueva-editar-actividad.component.html',
  styleUrls: ['./nueva-editar-actividad.component.css']
})
export class NuevaEditarActividadComponent implements OnInit, OnDestroy {

  @ViewChild("panelModal") panelModal: ElementRef;
  private modalRef: any;

  closeResult = '';
  form: FormGroup;
  modoFormulario: 'Crear' | 'Modificar';
  idActividad: string | null;
  returnUrl: string;
  actividad: Partial<Actividad> | undefined = {
    idActividad:'',
    sesion:null,
    periodoVigencia: null,
    detalleActividad: '',
    dependencia: null,
    grupos:[],
    docentes:[],
    asignaturas:[]
  };

  actividadActiva: Subscription;

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalManager
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
          this.returnUrl = params['returnUrl']
        }
      });


    this.construirFormulario(this.actividad);

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
            this.construirFormulario(this.actividad)
          }
      );

      this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.idActividad }));
      this.modoFormulario = 'Modificar';
    }
    else {
      // Nueva actividad
      this.construirFormulario(this.actividad);
      this.modoFormulario = 'Crear';
    };


  }

  ngOnDestroy() {

    this.actividadActiva?.unsubscribe();
  }




  // ------------------------------------------
  // Métodos privados
  // ------------------------------------------
  private construirFormulario(actividad: Partial<Actividad> | undefined) {

    this.form = this.fb.group(
      {
        sesion: [this.actividad.sesion, [Validators.required]],
        periodoVigencia: [this.actividad.periodoVigencia, [Validators.required]],
        detalleActividad: [this.actividad.detalleActividad],
        dependencia: [this.actividad.dependencia],
        grupos: [this.actividad.grupos],
        docentes: [this.actividad.docentes],
        asignaturas: [this.actividad.asignaturas]
      }
    );

    console.log(this.form);

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
  // ------------------------------------------
  // Métodos no implementados.
  // ------------------------------------------

  AbrirVentanaModal() {
    console.log('abriendo ventana modal');

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
  onAbrirVentanaModal() {
    this.AbrirVentanaModal();
  }

  onCerrarVentanaModal() {
    this.modalService.close(this.modalRef);
  }

}
