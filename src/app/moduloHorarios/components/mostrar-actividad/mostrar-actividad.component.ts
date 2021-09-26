import { TipoMensaje } from './../../../shared/models/mensajeUsuario.model';
import { TipoActividad } from './../../models/tipoActividad.model';
import { Grupo } from './../../models/grupo.model';
import { Docente } from './../../models/docente.model';
import { Dependencia } from './../../models/dependencia.model';
import { PeriodoVigencia } from './../../models/peridoVigencia';
import { Sesion } from './../../models/sesion';
import { filter, windowWhen } from 'rxjs/operators';
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
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-mostrar-actividad',
  templateUrl: './mostrar-actividad.component.html',
  styleUrls: ['./mostrar-actividad.component.css']
})
export class MostrarActividadComponent implements OnInit {

  //Esto es un artificio para poder disponer de tipos de enumerados en la plantilla
  //No es posible sin este truco.
  EnumModosPanelActividad = FromEnumerados.EnumModosPanelActividad;
  EnumEntidadMantenimiento = EnumEntidadMantenimiento;
  EnumModalidadMantenimiento = EnumModalidadMantenimiento;


  @Input() actividad: Actividad;
  // Se trabaja con la réplica por dos motivos
  // 1) El Framework establece los objetos de entrada como objetos de solo lectura.
  // 2) Se quiere ofrecer la opción de "cancelar", para lo que sería necesario disponer
  // de los valores iniciales.
  replicaActividad: Actividad;
  @Input() modoPanelActividad: FromEnumerados.EnumModosPanelActividad = FromEnumerados.EnumModosPanelActividad.MOSTRAR;

  // Registramos el modo en el que estamos trabajando.
  // Hya comportamientos diferenciados en báse a este parámetro





  // En el caso de que se invoque al componente desde una URI, no se dispone del dato
  idActividad: string;

    // Los selectores comparten el mismo control. En función de este valor se carga distinto contenido
  entidadMantenimiento: EnumEntidadMantenimiento = EnumEntidadMantenimiento.PERIODOSVIGENCIA;
  modalidadMantenimiento: EnumModalidadMantenimiento = null;
  listaSelectores: ListasSelectores;

  datosSelectorActivo: any[];  // Contiene la colección de elementos que llena el selector.
  elementoPorDefectoEnSelectorSimple: any;
  elementosPorDefectoEnSelectorMultiple: any;
  elementosSeleccionados: any = [];
  selectorMultiple: boolean = false;
  textoCabeceraPanelMantenimiento = '';
  returnUrl: string;
  sesionNuevaActividad: string;


  @ViewChild("panelSelector") panelModal: ElementRef;
  private modalRef: any;

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalManager) {

      this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
            this.returnUrl = params['returnUrl']
        }

        if (params.idSesion) {
          this.sesionNuevaActividad = params['idSesion'];

      }


      });


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
            break;

            case 'nuevaActividad':
              this.modoPanelActividad = FromEnumerados.EnumModosPanelActividad.CREAR;


              this.replicaActividad = new Actividad();
              this.replicaActividad.detalleActividad = '';
              this.replicaActividad.dependencia = null;
              this.replicaActividad.tipoActividad = null;
              this.replicaActividad.docentes = [];
              this.replicaActividad.grupos = [];
              this.replicaActividad.asignaturas = [];
              this.replicaActividad.alumnos = [];


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
  private actualizarentidadMantenimiento( entidadMantenimiento: EnumEntidadMantenimiento) {
    this.entidadMantenimiento = entidadMantenimiento;

    switch (entidadMantenimiento) {

      case EnumEntidadMantenimiento.PERIODOSVIGENCIA:

        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONSIMPLE;
        this.selectorMultiple = false;
        this.datosSelectorActivo = this.listaSelectores.periodosVigencia
          .map(peridoVigencia => {
            return {
              id: peridoVigencia.idPeriodoVigencia,
              texto: peridoVigencia.denominacion,
              leyenda: peridoVigencia.fechaInicio.toDateString() + '-' + peridoVigencia.fechaInicio.toDateString()
            }
          });

        this.elementoPorDefectoEnSelectorSimple = this.replicaActividad.periodoVigencia? this.datosSelectorActivo.filter(periodoVigencia => this.replicaActividad.periodoVigencia.idPeriodoVigencia === periodoVigencia.id)[0]: undefined;
        this.textoCabeceraPanelMantenimiento = "Selector de periodos de vigencia";

      break;


      case EnumEntidadMantenimiento.TIPOSACTIVIDADES:

        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONSIMPLE;
        this.selectorMultiple = false;
        this.datosSelectorActivo = this.listaSelectores.tiposActividad
          .map(tipoActividad => {
            return {
              id: tipoActividad.idTipoActividad,
              texto: tipoActividad.denominacionLarga,
              leyenda: tipoActividad.codigo
            }
          });

        this.elementoPorDefectoEnSelectorSimple = this.replicaActividad.tipoActividad? this.datosSelectorActivo.filter(tipoActividad => this.replicaActividad.tipoActividad.idTipoActividad === tipoActividad.id)[0]: undefined;
        this.textoCabeceraPanelMantenimiento = "Selector de tipos de actividad";


        break;

      case EnumEntidadMantenimiento.PLANTILLAS:

        this.selectorMultiple = false;
        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONSIMPLE;

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
        this.elementoPorDefectoEnSelectorSimple = this.replicaActividad.sesion? sesiones.filter(sesion => sesion.id === this.replicaActividad.sesion.idSesion)[0]:undefined;
        this.textoCabeceraPanelMantenimiento = "Selector de sesiones";

       break;

      case EnumEntidadMantenimiento.DEPENDENCIAS:

        this.selectorMultiple = false;
        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONSIMPLE

          this.datosSelectorActivo = this.listaSelectores.dependencias
            .map(dependencia => {
              return {
                id: dependencia.idDependencia,
                texto: dependencia.denominacionLarga,
                leyenda: dependencia.codigo
              }
            });

        this.elementoPorDefectoEnSelectorSimple = this.replicaActividad.dependencia? this.datosSelectorActivo.filter(dependencia => this.replicaActividad.dependencia.idDependencia === dependencia.id)[0]: undefined;
        this.textoCabeceraPanelMantenimiento = "Selector de dependencias";
      break;

      case EnumEntidadMantenimiento.DOCENTES:



        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONMULTIPLE;
        this.selectorMultiple = true;

        this.datosSelectorActivo = this.listaSelectores.docentes
          .map(docente=> {
            return {
              id: docente.idDocente,
              texto: docente.nombre,
              leyenda: docente.alias,
              imagen: docente.foto
            }
          });

        this.elementosPorDefectoEnSelectorMultiple = this.datosSelectorActivo.filter(docente => this.replicaActividad.docentes.some(docenteActividad => docenteActividad.idDocente === docente.id));
        this.textoCabeceraPanelMantenimiento = "Selector de docentes";

        break;

      case EnumEntidadMantenimiento.GRUPOS:

        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONMULTIPLE;
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
          this.textoCabeceraPanelMantenimiento = "Selector de grupos";
        break;

      case EnumEntidadMantenimiento.ASIGNATURAS:
        this.modalidadMantenimiento = EnumModalidadMantenimiento.SELECCIONMULTIPLE;

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
          this.textoCabeceraPanelMantenimiento = "Selector de asignaturas";
        break;

      case EnumEntidadMantenimiento.DETALLE:
        this.modalidadMantenimiento = EnumModalidadMantenimiento.MODIFICARTEXTOLIBRE;

          this.selectorMultiple = false;
          this.textoCabeceraPanelMantenimiento = "Detalle de la actividad";
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
            this.actividad = actividadActiva;
            this.replicaActividad = JSON.parse(JSON.stringify(this.actividad));
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

          if (listaSelectores) {
            this.listaSelectores = listaSelectores;

            if (this.modoPanelActividad === this.EnumModosPanelActividad.CREAR && this.sesionNuevaActividad) {

              // se obtienen todas las sesiones.
              const Sesiones: Sesion[]=[];

              this.listaSelectores.plantillas.forEach(
                plantilla => plantilla.sesionesPlantilla.forEach(
                  sesion => Sesiones.push(sesion)
                )
              );

              this.replicaActividad.sesion = Sesiones.filter(sesion => sesion.idSesion === this.sesionNuevaActividad)[0];

            }
          }


        }


    );
    if (!this.listaSelectores) {
      this.store.dispatch(FromEntidadesHorarioActions.cargarListaSelectores());
    }



  }
  private convertirItemSeleccionadoEnEntidad(): Sesion | PeriodoVigencia | Dependencia | Docente[] | Grupo[] | Asignatura[] | TipoActividad | string | null {

    if (!this.elementosSeleccionados[0]) return null; // La selección de elementos no devuelve ningún valor.

    switch (this.entidadMantenimiento) {

      case EnumEntidadMantenimiento.PERIODOSVIGENCIA:


        return this.listaSelectores.periodosVigencia
          .filter(periodoVigenca => periodoVigenca.idPeriodoVigencia === this.elementosSeleccionados[0].id)[0];
        break;

        case EnumEntidadMantenimiento.TIPOSACTIVIDADES:

          return this.listaSelectores.tiposActividad
            .filter(tiposActividad => tiposActividad.idTipoActividad === this.elementosSeleccionados[0].id)[0];
        break;

      case EnumEntidadMantenimiento.PLANTILLAS:

        var sesiones: Sesion[]=[];
        this.listaSelectores.plantillas
        .map( plantilla => {
            sesiones = sesiones.concat(plantilla.sesionesPlantilla);
          }
        );

        return sesiones
          .filter(sesion => sesion.idSesion === this.elementosSeleccionados[0].id)[0]

      break;

      case EnumEntidadMantenimiento.DEPENDENCIAS:

        return this.listaSelectores.dependencias
          .filter(dependencia => dependencia.idDependencia === this.elementosSeleccionados[0].id)[0];
        break;

      case EnumEntidadMantenimiento.DOCENTES:

        return this.listaSelectores.docentes
          .filter(docente => this.elementosSeleccionados.some((docenteSeleccionado:any) => docenteSeleccionado.id === docente.idDocente));

        break;

      case EnumEntidadMantenimiento.GRUPOS:

        return this.listaSelectores.grupos
          .filter(grupo => this.elementosSeleccionados.some((grupoSeleccionado:any) => grupoSeleccionado.id === grupo.idGrupo));

        break;

      case EnumEntidadMantenimiento.ASIGNATURAS:

        return this.listaSelectores.asignaturas
          .filter(asignatura => this.elementosSeleccionados.some((asignaturaSeleccionada:any) => asignaturaSeleccionada.id === asignatura.idAsignatura));

        break;

        case EnumEntidadMantenimiento.DETALLE:
          return this.elementosSeleccionados[0] as string;

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
  onAbrirSelector(entidadMantenimiento: EnumEntidadMantenimiento) {
    this.actualizarentidadMantenimiento(entidadMantenimiento);
    this.AbrirVentanaModal();

  }

  onMostrarAlumnos() {
    this.entidadMantenimiento = null;
    this.AbrirVentanaModal();
  }
  // Abre la ventana modal de selectores asociados
  AbrirVentanaModal() {

    this.modalRef = this.modalService.open(this.panelModal, {
     size: "lg",
     hideCloseButton: true,
     centered: true,
     backdrop: 'static',
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
    switch (this.entidadMantenimiento) {

      case EnumEntidadMantenimiento.PLANTILLAS:
        this.replicaActividad.sesion =  this.convertirItemSeleccionadoEnEntidad() as Sesion;
        break;

        case EnumEntidadMantenimiento.TIPOSACTIVIDADES:
        this.replicaActividad.tipoActividad = this.convertirItemSeleccionadoEnEntidad() as TipoActividad;

        break;

      case EnumEntidadMantenimiento.PERIODOSVIGENCIA:
        this.replicaActividad.periodoVigencia = this.convertirItemSeleccionadoEnEntidad() as PeriodoVigencia;
      break;

      case EnumEntidadMantenimiento.DEPENDENCIAS:
        this.replicaActividad.dependencia =     this.convertirItemSeleccionadoEnEntidad() as Dependencia;
      break;

      case EnumEntidadMantenimiento.DOCENTES:
        this.replicaActividad.docentes = this.convertirItemSeleccionadoEnEntidad() as Docente[];
      break;

      case EnumEntidadMantenimiento.GRUPOS:
        this.replicaActividad.grupos = this.convertirItemSeleccionadoEnEntidad() as Grupo[];
        break;

      case EnumEntidadMantenimiento.ASIGNATURAS:
        this.replicaActividad.asignaturas = this.convertirItemSeleccionadoEnEntidad() as Asignatura[];
      break;

      case EnumEntidadMantenimiento.DETALLE:
        this.replicaActividad.detalleActividad = this.convertirItemSeleccionadoEnEntidad() as string;
      break;


      default:
      break;
    }

    this.onCerrarVentanaModal();
  }

  onCancelarVentanaModal() {
    this.onCerrarVentanaModal();
  }


  onCancelarEdicionCreacionActividad()
  {
    this.router.navigateByUrl(this.returnUrl);

  }

  onAceptarEdicionCreacionActividad() {

    this.store
    .pipe(
      select(FromActividadesSelectors.selectGestionandoActividad),
      filter(gestionandoActividad => !gestionandoActividad)
    )
    .subscribe(
      gestionandoActividad => {

        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
        else {
          this.router.navigateByUrl('horarios/index');
        }

      }
    );

    switch (this.modoPanelActividad) {


      case this.EnumModosPanelActividad.EDITAR:
        this.store.dispatch(FromActividadesActions.modificarActividad({ actividad: this.replicaActividad }));
        break;

        case this.EnumModosPanelActividad.CREAR:
          this.store.dispatch(FromActividadesActions.crearActividad({ actividad: this.replicaActividad }));
        break;

      default:
        break;
    }
  }



}


enum EnumEntidadMantenimiento {

  PERIODOSVIGENCIA=1,
  PLANTILLAS=2,
  DEPENDENCIAS=3,
  DOCENTES=4,
  GRUPOS=5,
  ASIGNATURAS=6,
  DETALLE=7,
  TIPOSACTIVIDADES=8
}

enum EnumModalidadMantenimiento {
  SELECCIONMULTIPLE,
  SELECCIONSIMPLE,
  MODIFICARTEXTOLIBRE,
}


