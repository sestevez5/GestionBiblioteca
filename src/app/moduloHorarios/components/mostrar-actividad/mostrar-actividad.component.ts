import { Grupo } from './../../models/grupo.model';
import { Docente } from './../../models/docente.model';
import { Dependencia } from './../../models/dependencia.model';
import { PeriodoVigencia } from './../../models/peridoVigencia';
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
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';

import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
import * as FromEnumerados from '../../models/enumerados';
import { ThrowStmt } from '@angular/compiler';

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
  // Se trabaja con la réplica por dos motivos
  // 1) El Framework establece los objetos de entrada como objetos de solo lectura.
  // 2) Se quiere ofrecer la opción de "cancelar", para lo que sería necesario disponer
  // de los valores iniciales.
  replicaActividad: Actividad;

  // Registramos el modo en el que estamos trabajando.
  // Hya comportamientos diferenciados en báse a este parámetro
  @Input() modoPanelActividad: FromEnumerados.EnumModosPanelActividad = FromEnumerados.EnumModosPanelActividad.MOSTRAR;



  // En el caso de que se invoque al componente desde una URI, no se dispone del dato
  idActividad: string;

    // Los selectores comparten el mismo control. En función de este valor se carga distinto contenido
  tipoSelector: FromEnumerados.EnumTiposSelectores = FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA;
  listaSelectores: ListasSelectores;

  datosSelectorActivo: any[];  // Contiene la colección de elementos que llena el selector.
  elementoPorDefectoEnSelectorSimple: any;
  elementosPorDefectoEnSelectorMultiple: any;
  elementosSeleccionados: any = [];
  selectorMultiple: boolean = false;

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
              this.cargarActividadPorURI();
            break;

            case 'editarActividad':
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.EDITAR;
              this.cargarActividadPorURI();

              //this.store.dispatch()
            break;

            case 'nuevaActividad':
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.CREAR;
               break;

            default: // Se ha invocado en modo modal desde index
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.MOSTRAR;
              this.replicaActividad = JSON.parse(JSON.stringify(this.actividad));

            break;
          }
        }
      });


    this.gestionarSubscripcionesStore()

  }


  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  private actualizarDatosSelectorActivo( tipoSelector: FromEnumerados.EnumTiposSelectores) {
    this.tipoSelector = tipoSelector;
    switch (tipoSelector) {

      case FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA:

        this.selectorMultiple = false;

        this.datosSelectorActivo = this.listaSelectores.periodosVigencia
          .map(peridoVigencia => {
            return {
              id: peridoVigencia.idPeriodoVigencia,
              texto: peridoVigencia.denominacion,
              leyenda: peridoVigencia.fechaInicio.toDateString() + '-' + peridoVigencia.fechaInicio.toDateString()
            }
          });

          this.elementoPorDefectoEnSelectorSimple = this.datosSelectorActivo.filter(periodoVigencia => this.replicaActividad.periodoVigencia.idPeriodoVigencia === periodoVigencia.id)[0];


      break;

      case FromEnumerados.EnumTiposSelectores.PLANTILLAS:

        this.selectorMultiple = false;

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
        this.elementoPorDefectoEnSelectorSimple = sesiones.filter( sesion => sesion.id === this.replicaActividad.sesion.idSesion)[0]

       break;

      case FromEnumerados.EnumTiposSelectores.DEPENDENCIAS:

        this.selectorMultiple = false;

          this.datosSelectorActivo = this.listaSelectores.dependencias
            .map(dependencia => {
              return {
                id: dependencia.idDependencia,
                texto: dependencia.denominacionLarga,
                leyenda: dependencia.codigo
              }
            });

        this.elementoPorDefectoEnSelectorSimple = this.datosSelectorActivo.filter(dependencia => this.replicaActividad.dependencia.idDependencia === dependencia.id)[0];
      break;

      case FromEnumerados.EnumTiposSelectores.DOCENTES:

        this.selectorMultiple = true;

        this.datosSelectorActivo = this.listaSelectores.docentes
          .map(docente=> {
            return {
              id: docente.idDocente,
              texto: docente.nombre,
              leyenda: docente.alias
            }
          });

        this.elementosPorDefectoEnSelectorMultiple = this.datosSelectorActivo.filter(docente => this.replicaActividad.docentes.some(docenteActividad => docenteActividad.idDocente === docente.id));


        break;

        case FromEnumerados.EnumTiposSelectores.GRUPOS:

          this.selectorMultiple = true;

          this.datosSelectorActivo = this.listaSelectores.grupos
            .map(grupo=> {
              return {
                id: grupo.idGrupo,
                texto: grupo.denominacionLarga,
                leyenda: grupo.codigo
              }
            });

          this.elementosPorDefectoEnSelectorMultiple = this.datosSelectorActivo.filter(grupo => this.replicaActividad.grupos.some(grupoActividad => grupoActividad.idGrupo === grupo.id));

        break;

        case FromEnumerados.EnumTiposSelectores.ASIGNATURAS:

          this.selectorMultiple = true;

          this.datosSelectorActivo = this.listaSelectores.asignaturas
            .map(asignatura=> {
              return {
                id: asignatura.idAsignatura,
                texto: asignatura.denominacionLarga,
                leyenda: asignatura.codigo
              }
            });

          this.elementosPorDefectoEnSelectorMultiple = this.datosSelectorActivo.filter(asignatura => this.replicaActividad.asignaturas.some(asignaturaActividad => asignaturaActividad.idAsignatura === asignatura.id));

        break;







      default:
      break;
    }




  }
  private cargarActividadPorURI() {
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
            this.replicaActividad = JSON.parse(JSON.stringify(this.actividad));;
          }
        );

      this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.idActividad }));
    }
  }
  private gestionarSubscripcionesStore() {
    this.store.pipe(select(FromEntidadesHorarioSelectors.selectListaSelectores))
      .subscribe(
        listaSelectores =>
        {
          if (listaSelectores)   this.listaSelectores = listaSelectores;

        }


    );
    if (!this.listaSelectores) {
      this.store.dispatch(FromEntidadesHorarioActions.cargarListaSelectores());
    }

  }
  private convertirItemSeleccionadoEnEntidad(): Sesion | PeriodoVigencia | Dependencia | Docente[] | Grupo[] | Asignatura[] {
    switch (this.tipoSelector) {

      case FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA:

        return this.listaSelectores.periodosVigencia
          .filter(periodoVigenca => periodoVigenca.idPeriodoVigencia === this.elementosSeleccionados[0].id)[0];
      break;

      case FromEnumerados.EnumTiposSelectores.PLANTILLAS:

        var sesiones: Sesion[]=[];
        this.listaSelectores.plantillas
        .map( plantilla => {
            sesiones = sesiones.concat(plantilla.sesionesPlantilla);
          }
        );

        return sesiones
          .filter(sesion => sesion.idSesion === this.elementosSeleccionados[0].id)[0]

      break;

      case FromEnumerados.EnumTiposSelectores.DEPENDENCIAS:

        return this.listaSelectores.dependencias
          .filter(dependencia => dependencia.idDependencia === this.elementosSeleccionados[0].id)[0];
        break;

      case FromEnumerados.EnumTiposSelectores.DOCENTES:

        return this.listaSelectores.docentes
          .filter(docente => this.elementosSeleccionados.some((docenteSeleccionado:any) => docenteSeleccionado.id === docente.idDocente));

        break;

      case FromEnumerados.EnumTiposSelectores.GRUPOS:

        return this.listaSelectores.grupos
          .filter(grupo => this.elementosSeleccionados.some((grupoSeleccionado:any) => grupoSeleccionado.id === grupo.idGrupo));

        break;

      case FromEnumerados.EnumTiposSelectores.ASIGNATURAS:

        return this.listaSelectores.asignaturas
          .filter(asignatura => this.elementosSeleccionados.some((asignaturaSeleccionada:any) => asignaturaSeleccionada.id === asignatura.idAsignatura));

      break;

      default:

      break;
    }
  }

  private obtenerDenominacionDiaSemana(codigo: string): string {
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

  private entidadesHorarioDocentes(): EntidadHorario[] {
    const entidadesHorario: EntidadHorario[] = [];

    this.replicaActividad.docentes.forEach(
      docente => {
        const entidadHorario = new EntidadHorario(docente);
        entidadesHorario.push(entidadHorario);
      });

    return entidadesHorario;
  }

  private idsEntidadesHorario(entidadesHorario: EntidadHorario[]) {
    return entidadesHorario.map(entidadesHorario => entidadesHorario.id);
  }

  private entidadesHorarioGrupos(): EntidadHorario[] {
    const entidadesHorario: EntidadHorario[] = [];
     this.replicaActividad.grupos.forEach(
    grupo => {
      const entidadHorario = new EntidadHorario(grupo);
      entidadesHorario.push(entidadHorario);
    });

  return entidadesHorario;
  }


  // ------------------------------------------
  // Métodos de respuesta a acciones de la plantilla.
  // ------------------------------------------

  // Responde a la acción de solicitur de apertura de cualquier selector
  onAbrirSelector(tipoSelector: FromEnumerados.EnumTiposSelectores) {
    this.actualizarDatosSelectorActivo(tipoSelector);
    this.AbrirVentanaModal();
  }

  onMostrarAlumnos() {
    this.tipoSelector = null;
    console.log(this.actividad.alumnos.map(
      alumno => {
        return { nombre: alumno.nombre, apellido1: alumno.primerApellido , apellido2: alumno.segundoApellido
      }
        }

    ))
    this.AbrirVentanaModal();


  }
  // Abre la ventana modal de selectores asociados
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

  // Cierra la ventana modal de selectores asociados.
  onCerrarVentanaModal() {
    this.modalService.close(this.modalRef);
  }

  // Registra en el componente el elemento seleccionado por el usuarios
  onSeleccionarItem(item: any) {
    Array.isArray(item)?this.elementosSeleccionados = item:this.elementosSeleccionados = [item];
  }

  // Responde al botón aceptar de los selectores
  onAceptarVentanaModal() {
    switch (this.tipoSelector) {

      case FromEnumerados.EnumTiposSelectores.PLANTILLAS:
        this.replicaActividad.sesion = this.convertirItemSeleccionadoEnEntidad() as Sesion;
      break;

      case FromEnumerados.EnumTiposSelectores.PERIODOSVIGENCIA:
        this.replicaActividad.periodoVigencia = this.convertirItemSeleccionadoEnEntidad() as PeriodoVigencia;
      break;

      case FromEnumerados.EnumTiposSelectores.DEPENDENCIAS:
        this.replicaActividad.dependencia = this.convertirItemSeleccionadoEnEntidad() as Dependencia;
      break;

      case FromEnumerados.EnumTiposSelectores.DOCENTES:
        this.replicaActividad.docentes = this.convertirItemSeleccionadoEnEntidad() as Docente[];
      break;

      case FromEnumerados.EnumTiposSelectores.GRUPOS:
        this.replicaActividad.grupos = this.convertirItemSeleccionadoEnEntidad() as Grupo[];
        break;

      case FromEnumerados.EnumTiposSelectores.ASIGNATURAS:
        this.replicaActividad.asignaturas = this.convertirItemSeleccionadoEnEntidad() as Asignatura[];
        console.log(this.replicaActividad.asignaturas);
      break;


      default:
      break;
    }

    this.onCerrarVentanaModal();
  }

  onCancelarVentanaModal() {
    this.onCerrarVentanaModal();
  }

}


