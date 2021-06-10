import { Plantilla } from './../../models/plantilla.model';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Sesion } from './../../models/sesion';
import { EnumTiposSelectores } from './../../models/enumerados';
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
import * as FromEnumerados from '../../models/enumerados';

@Component({
  selector: 'app-mostrar-actividad',
  templateUrl: './mostrar-actividad.component.html',
  styleUrls: ['./mostrar-actividad.component.css']
})
export class MostrarActividadComponent implements OnInit {

  //Esto es un artificio para poder disponer de tipos de enumerados en la plantilla
  //No es posible sin este truco.
  EnumModosPanelActividad = FromEnumerados.EnumModosPanelActividad;
  EnumTiposSelectores = FromEnumerados.EnumTiposSelectores;

  @Input() actividad: Actividad;

  // Registramos el modo en el que estamos trabajando.
  // Hya comportamientos diferenciados en báse a este parámetro
  modoPanelActividad: FromEnumerados.EnumModosPanelActividad;



  // En el caso de que se invoque al componente desde una URI, no se dispone del dato
  idActividad: string;

    // Los selectores comparten el mismo control. En función de este valor se carga distinto contenido
  tipoSelector: FromEnumerados.EnumTiposSelectores = FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA;
  listaSelectores: ListasSelectores;

  datosSelectorActivo: any[];  // Contiene la colección de elementos que llena el selector.
  elementoPorDefectoEnSelector: any;
  elementoSeleccionado: any;

  @ViewChild("panelSelector") panelModal: ElementRef;
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
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.MOSTRAR;
              this.cargarActividad();
            break;

            case 'editarActividad':
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.EDITAR;
              this.cargarActividad();
              //this.store.dispatch()
            break;

            case 'nuevaActividad':
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.CREAR;
            break;

            default: // Se ha invocado en modo modal desde index
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.MOSTRAR;
            break;
          }
        }
      });

    // if (this.modoPanelActividad === 'modoMostrar' || this.modoPanelActividad === 'modoEdicion') {
    //   this.idActividad = this.route.snapshot.paramMap.get("id");
    //   cargarActividad()

    // }
    this.gestionarSubscripcionesStore()

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

  onAbrirSelector(tipoSelector: FromEnumerados.EnumTiposSelectores) {
    this.actualizarDatosSelectorActivo(tipoSelector)
    this.AbrirVentanaModal();
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

    //this.AbrirVentanaModal();

  }
  // ------------------------------------------
  // Métodos no implementados.
  // ------------------------------------------

  AbrirVentanaModal() {

    this.modalRef = this.modalService.open(this.panelModal, {
     size: "lg",
     hideCloseButton: true,
     centered: true,
     backdrop: true,
     animation: true,
     keyboard: false,
     closeOnOutsideClick: true,
     backdropClass: "modal-backdrop",
   });

 }

  onAbrirVentanaModal() { }

  onCerrarVentanaModal() {
    this.modalService.close(this.modalRef);
  }

  actualizarDatosSelectorActivo( tipoSelector: FromEnumerados.EnumTiposSelectores) {
    this.tipoSelector = tipoSelector;
    switch (tipoSelector) {

      case FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA:

        this.datosSelectorActivo = this.listaSelectores.periodosVigencia
          .map(peridoVigencia => {
            return {
              id: peridoVigencia.idPeriodoVigencia,
              texto: peridoVigencia.denominacion,
              leyenda: peridoVigencia.fechaInicio.toDateString() + '-' + peridoVigencia.fechaInicio.toDateString()
            }
          });




        break;

      case FromEnumerados.EnumTiposSelectores.PLANTILLAS:


        var sesiones: {id: string, texto: string}[] = [];

        this.listaSelectores.plantillas
          .map(
            plantilla => {

              const sesionesAdaptadas = plantilla.sesionesPlantilla
                .map(sesion => {
                  return {
                    id: sesion.idSesion,
                    texto: 'Plantilla ' + plantilla.denominacion + ' - ' + this.obtenerDenominacionDiaSemana(sesion.diaSemana) + ' -Desde ' + sesion.horaInicio + ' hasta ' + sesion.horaFin + ')'

                  }
                });
              sesiones = sesiones.concat(sesionesAdaptadas);
            }
        );


        this.datosSelectorActivo = sesiones;

        this.elementoPorDefectoEnSelector = sesiones.filter( sesion => sesion.id === this.actividad.sesion.idSesion)[0]


        break;

      default:
        console.log('otra cosa',tipoSelector);
        break;
    }




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

  onSeleccionarItem(item: any) {
    this.elementoSeleccionado = item;
  }

  onAceptarVentanaModal() {
    this.actividad.sesion = this.convertirItemSeleccionadoEnEntidad()

  }

  onCancelarVentanaModal() {

  }

  private convertirItemSeleccionadoEnEntidad(): Sesion {

    switch (this.tipoSelector) {

      case FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA:


      break;

      case FromEnumerados.EnumTiposSelectores.PLANTILLAS:

        var sesiones: Sesion[]=[];
        this.listaSelectores.plantillas
        .map( plantilla => {
            sesiones = sesiones.concat(plantilla.sesionesPlantilla);
          }
        );

        return sesiones.filter(sesion => sesion.idSesion === this.elementoSeleccionado.id)[0]

      break;

      default:

      break;
    }
  }






}


