import { ParametrosHorario } from './../models/parametrosHorario.model';
import { PeriodoVigencia } from './../models/peridoVigencia';
import { cargarPlantillasError } from './../store/actividades/actividades.actions';
import { Sesion } from './../models/sesion';
import { IActividadesSesion } from './../models/actividadesSesion.model';
import { EntidadHorario } from './../models/entidadHorario.model';
import { Docente } from './../models/docente.model';
import { AuthService } from './../../moduloAuth/services/auth.service';
import { EnumTipoEntidadHorario } from './../models/tipoEntidadHorario.model';
import { Observable,from, Subject, Observer, BehaviorSubject } from 'rxjs'
import { Grupo } from '../models/grupo.model';
import { filter, map } from 'rxjs/operators';
import { Plantilla } from '../models/plantilla.model';

import { Asignatura } from '../models/asignatura.model';
import { Dependencia } from '../models/dependencia.model';
import { DiaSemana } from '../models/diaSemana.model';

import { Actividad } from '../models/actividad.model';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/moduloAuth/models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private authService: AuthService) {

  }

  //-----------------------------------------------------------------------------------
  // DATOS MOCK
  //-----------------------------------------------------------------------------------

  diasSemana: DiaSemana[] = [
    { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
    { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
    { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
    { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
    { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
    { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
    { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },

  ];

  parametrosHorario: ParametrosHorario =
    {
      horaMinima: '07:00',
      horaMaxima: '22:00',
      diasSemanaHabiles: ['L','M','X','J','V'],
    };

  PeriodoVigencia: PeriodoVigencia[] = [
    {
      idPeriodoVigencia: '1',
      denominacion: 'curso completo',
      fechaInicio: new Date(2020, 9, 1),
      fechaFin: new Date(2021, 6, 20),
      computo: 1
    },

    {
      idPeriodoVigencia: '2',
      denominacion: 'Primer trimestre',
      fechaInicio: new Date(2020, 9, 1),
      fechaFin: new Date(2020, 12, 31),
      computo: 1 / 3
    },

    {
      idPeriodoVigencia: '3',
      denominacion: 'Segundo trimestre',
      fechaInicio: new Date(2021, 1, 1),
      fechaFin: new Date(2021, 3, 30),
      computo: 1 / 3
    },


  ]

  plantillas: Plantilla[] = [
    {
      idPlantilla: 'P1',
      denominacion: 'ordinaria',
      sesionesPlantilla: [

        { idSesion: 'P1L1', diaSemana: 'L', horaInicio: '08:00', horaFin: '08:55' },
        { idSesion: 'P1L2', diaSemana: 'L', horaInicio: '08:55', horaFin: '09:50' },
        { idSesion: 'P1L3', diaSemana: 'L', horaInicio: '09:50', horaFin: '10:45' },
        { idSesion: 'P1L4', diaSemana: 'L', horaInicio: '11:15', horaFin: '12:10' },
        { idSesion: 'P1L5', diaSemana: 'L', horaInicio: '12:10', horaFin: '13:05' },
        { idSesion: 'P1L6', diaSemana: 'L', horaInicio: '13:05', horaFin: '14:00' },

        { idSesion: 'P1M1', diaSemana: 'M', horaInicio: '08:00', horaFin: '08:55' },
        { idSesion: 'P1M2', diaSemana: 'M', horaInicio: '08:55', horaFin: '09:50' },
        { idSesion: 'P1M3', diaSemana: 'M', horaInicio: '09:50', horaFin: '10:45' },
        { idSesion: 'P1M4', diaSemana: 'M', horaInicio: '11:15', horaFin: '12:10' },
        { idSesion: 'P1M5', diaSemana: 'M', horaInicio: '12:10', horaFin: '13:05' },
        { idSesion: 'P1M6', diaSemana: 'M', horaInicio: '13:05', horaFin: '14:00' },

        { idSesion: 'P1X1', diaSemana: 'X', horaInicio: '08:00', horaFin: '08:55' },
        { idSesion: 'P1X2', diaSemana: 'X', horaInicio: '08:55', horaFin: '09:50' },
        { idSesion: 'P1X3', diaSemana: 'X', horaInicio: '09:50', horaFin: '10:45' },
        { idSesion: 'P1X4', diaSemana: 'X', horaInicio: '11:15', horaFin: '12:10' },
        { idSesion: 'P1X5', diaSemana: 'X', horaInicio: '12:10', horaFin: '13:05' },
        { idSesion: 'P1X6', diaSemana: 'X', horaInicio: '13:05', horaFin: '14:00' },

        { idSesion: 'P1J1', diaSemana: 'J', horaInicio: '08:00', horaFin: '08:55' },
        { idSesion: 'P1J2', diaSemana: 'J', horaInicio: '08:55', horaFin: '09:50' },
        { idSesion: 'P1J3', diaSemana: 'J', horaInicio: '09:50', horaFin: '10:45' },
        { idSesion: 'P1J4', diaSemana: 'J', horaInicio: '11:15', horaFin: '12:10' },
        { idSesion: 'P1J5', diaSemana: 'J', horaInicio: '12:10', horaFin: '13:05' },
        { idSesion: 'P1J6', diaSemana: 'J', horaInicio: '13:05', horaFin: '14:00' },

        { idSesion: 'P1V1', diaSemana: 'V', horaInicio: '08:00', horaFin: '08:55' },
        { idSesion: 'P1V2', diaSemana: 'V', horaInicio: '08:55', horaFin: '09:50' },
        { idSesion: 'P1V3', diaSemana: 'V', horaInicio: '09:50', horaFin: '10:45' },
        { idSesion: 'P1V4', diaSemana: 'V', horaInicio: '11:15', horaFin: '12:10' },
        { idSesion: 'P1V5', diaSemana: 'V', horaInicio: '12:10', horaFin: '13:05' },
        { idSesion: 'P1V6', diaSemana: 'V', horaInicio: '13:05', horaFin: '14:00' },
        { idSesion: 'P1V6', diaSemana: 'V', horaInicio: '18:05', horaFin: '19:00' },

        { idSesion: 'P1S1', diaSemana: 'S', horaInicio: '08:00', horaFin: '08:55' },

      ]
    },
    {
      idPlantilla: 'P2',
      denominacion: 'extraordinaria',
      sesionesPlantilla: [
        { idSesion: 'P2L1', diaSemana: 'L', horaInicio: '08:00', horaFin: '10:55' },



        { idSesion: 'P2M1', diaSemana: 'M', horaInicio: '10:00', horaFin: '14:00' },



        { idSesion: 'P2X1', diaSemana: 'X', horaInicio: '09:00', horaFin: '9:30' },
        { idSesion: 'P2X2', diaSemana: 'X', horaInicio: '10:00', horaFin: '12:00' },
        { idSesion: 'P2X3', diaSemana: 'X', horaInicio: '12:00', horaFin: '14:00' },




        { idSesion: 'P2V1', diaSemana: 'V', horaInicio: '08:00', horaFin: '08:55' },


      ]
    }
  ]

  actividades: IActividad[] = [

    {
      idActividad: '11',
      idSesion: 'P1L3',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['IJyiJjc2LXTZXsdwY27ORvpzIYw1','NTNYueJSicQOvYLjWzQs5ZcyeV63'],
      asignaturas: ['1'],
      dependencia: '1',
      idPeriodoVigencia: '1'
    },
    {
      idActividad: '51',
      idSesion: 'P1L3',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['IJyiJjc2LXTZXsdwY27ORvpzIYw1','NTNYueJSicQOvYLjWzQs5ZcyeV63'],
      asignaturas: ['1'],
      dependencia:'1',
      idPeriodoVigencia: '1'
    },
    {
      idActividad: '3',
      idSesion: 'P1L4',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['IJyiJjc2LXTZXsdwY27ORvpzIYw1','NTNYueJSicQOvYLjWzQs5ZcyeV63'],
      asignaturas: ['1'],
      dependencia:'2',
      idPeriodoVigencia: '1'
    },
    {
      idActividad: '4',
      idSesion: 'P1M1',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['IJyiJjc2LXTZXsdwY27ORvpzIYw1'],
      asignaturas: ['1','3'],
      dependencia:'2',
      idPeriodoVigencia: '1'

    },
    {
      idActividad: '14',
      idSesion: 'P1M1',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['NTNYueJSicQOvYLjWzQs5ZcyeV63'],
      asignaturas: ['1','3'],
      dependencia:'2',
      idPeriodoVigencia: '1'

     },
     {
       idActividad: '23',
       idSesion: 'P1M1',
       detalleActividad: '',
       grupos: ['2'],
       docentes: [],
       asignaturas: ['1','3'],
       dependencia:'2',
       idPeriodoVigencia: '1'

      },
    {
      idActividad: '5',
      idSesion: 'P1M3',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['uQ1KDOcvBxUEIk3c9do0ck4lvTa2'],
      asignaturas: ['1','3','4'],
      dependencia:'3',
      idPeriodoVigencia: '1'
    },

    // {
    //   idActividad: '7',
    //   idSesion: 'P1X1',
    //   detalleActividad: '',
    //   grupos: ['3'],
    //   docentes: [],
    //   asignaturas: ['2','4'],
    //   dependencia:'1',
      // idPeriodoVigencia: '1'
    // },
    // {
    //   idActividad: '8',
    //   idSesion: 'P1J2',
    //   detalleActividad: '',
    //   grupos: ['2'],
    //   docentes: [],
    //   asignaturas: ['2','3','1'],
    //   dependencia:'2',
      // idPeriodoVigencia: '1'
     //}

  ];

  asignaturas: any = [

    {
      id: '1',
      codigo: 'MAT',
      denominacionLarga: 'Matemáticas'
    },
    {
      id: '2',
      codigo: 'CSO',
      denominacionLarga: 'Matemáticas'
    },
    {
      id: '3',
      codigo: 'ING',
      denominacionLarga: 'Inglés'
    },
    {
      id: '4',
      codigo: 'FYQ',
      denominacionLarga: 'Física y Química'
    },
    {
      id: '5',
      codigo: 'REL',
      denominacionLarga: 'Religión'
    },
    {
      id: '6',
      codigo: 'EFI',
      denominacionLarga: 'MEducación Física'
    },
    {
      id: '7',
      codigo: 'TEC',
      denominacionLarga: 'Tecnología'
    },
  ];

  dependencias: Dependencia[] = [

    {
      idDependencia: '1',
      codigo: 'AU1',
      denominacionLarga: 'Aula 1'
    },
    {
      idDependencia: '2',
      codigo: 'AU2',
      denominacionLarga: 'Aula 2'
    },
    {
      idDependencia: '3',
      codigo: 'CAN',
      denominacionLarga: 'Cancha'
    },
    {
      idDependencia: '4',
      codigo: 'LAB',
      denominacionLarga: 'Laboratorio de Biología'
    },
    {
      idDependencia: '5',
      codigo: 'SAA',
      denominacionLarga: 'Salón de actos'
    }

  ];

  grupos: Grupo[] = [
    {
      idGrupo: '1',
      codigo: 'ESO1A',
      denominacionLarga: '1º ESO A'
    },
    {
      idGrupo: '2',
      codigo: 'ESO1B',
      denominacionLarga: '1º ESO B'
    },
    {
      idGrupo: '20',
      codigo: 'ESO1C',
      denominacionLarga: '1º ESO C'
    },
    {
      idGrupo: '21',
      codigo: 'ESO2A',
      denominacionLarga: '2º ESO A'
    },
    {
      idGrupo: '22',
      codigo: 'ESO2B',
      denominacionLarga: '2º ESO B'
    },
    {
      idGrupo: '3',
      codigo: 'BCN1A',
      denominacionLarga: '1ª Bachillerato CCNN A'
    },
    {
      idGrupo: '33',
      codigo: 'BCN1B',
      denominacionLarga: '1ª Bachillerato CCNN B'
    },
    {
      idGrupo: '34',
      codigo: 'BCS1A',
      denominacionLarga: '1ª Bachillerato CCS A'
    },
    {
      idGrupo: '39',
      codigo: 'CFGMMODA',
      denominacionLarga: 'CFGM Moda y Confección A'
    },
    {
      idGrupo: '40',
      codigo: 'CFGMMODB',
      denominacionLarga: 'CFGM Moda y Confección B'
    }
  ];

  //------------------------------------------------
  // DEPENDENCIAS
  //------------------------------------------------
  obtenerTodasLasDependencias(): Dependencia[]{
    return this.dependencias;
  }

  //------------------------------------------------
  // ASIGNATURAS
  //------------------------------------------------
  obtenerTodasLasAsignaturas(): Asignatura[]{
    return this.asignaturas;
  }

  //------------------------------------------------
  // PARÁMETROS HORARIO
  //------------------------------------------------
  obtenerParametrosHorario(): Observable<ParametrosHorario> {
    const parametrosHorario$ = new BehaviorSubject<ParametrosHorario>(null);
    parametrosHorario$.next(this.parametrosHorario);
    return parametrosHorario$;
  }

  //------------------------------------------------------------------------------------------
  // ENTIDADES HORARIO
  //------------------------------------------------------------------------------------------
  obtenerTodasLasEntidadesHorarios(tipoEntidad: EnumTipoEntidadHorario): Observable<EntidadHorario[]> {

    switch (tipoEntidad) {
      case EnumTipoEntidadHorario.DOCENTE:
        return this.ObtenerEntidadesHorarioAPartirdeDocentes();
      break;

      case EnumTipoEntidadHorario.GRUPO:
        return this.ObtenerEntidadesHorarioAPartirdeGrupos();
        break;

      case EnumTipoEntidadHorario.DEPENDENCIA:
        return this.ObtenerEntidadesHorarioAPartirdeDependencias();
      break;

    }

  } // Fin obtenerTodasLasEntidadesHorarios


  //------------------------------------------------------------------------------------------
  // ACTIVIDADES
  //------------------------------------------------------------------------------------------
  obtenerTodasLasActividades(): Observable<Actividad[]> {
    return this.convertirIActividadesEnObservableActividades(this.actividades);
  }

  obtenerActividades(entidadHorario: EntidadHorario): Observable<Actividad[]> {


    switch (entidadHorario.tipoEntidad) {
      case EnumTipoEntidadHorario.DOCENTE:
        const actividadesDocente = this.actividades.filter(
          actividad => actividad.docentes.includes(entidadHorario.id)
        );
        return this.convertirIActividadesEnObservableActividades(actividadesDocente);

      break;

      case EnumTipoEntidadHorario.GRUPO:
        const actividadesGrupo = this.actividades.filter(
          actividad => actividad.grupos.includes(entidadHorario.id)
        );
        return this.convertirIActividadesEnObservableActividades(actividadesGrupo);
        break;

      case EnumTipoEntidadHorario.DEPENDENCIA:
        const actividadesDependencia = this.actividades.filter(
          actividad => actividad.dependencia === entidadHorario.id
        );
        return this.convertirIActividadesEnObservableActividades(actividadesDependencia);
      break;

    }

  }


  //------------------------------------------------------------------------------------------
  // PLANTILLAS
  //------------------------------------------------------------------------------------------
  obtenerTodasLasPlantillas(): Observable<Plantilla[]> {
    const plantillas$ = new BehaviorSubject<Plantilla[]>([]);
    plantillas$.next(this.plantillas);
    return plantillas$;
  }

  obtenerPlantilla(idPlantilla: string): Observable<Plantilla> {
    const plantilla$ = new BehaviorSubject<Plantilla>(null);

    const plantilla = this.plantillas.filter(plantilla => plantilla.idPlantilla === idPlantilla);

    plantilla ? plantilla$.next(plantilla[0]) : plantilla$.thrownError('prueba');

    return plantilla$;
  }


//------------------------------------------------------------------------------------------
// Métodos privados
//------------------------------------------------------------------------------------------
  private convertirIActividadesEnObservableActividades(idActividades: IActividad[]): Observable<Actividad[]> {
    const actividades$ = new BehaviorSubject<Actividad[]>([]);

    // paso 1: Construimos un único array con todas las sesiones de todas las plantillas.
    // Necesitamoas un único array con todas las sesiones para el punto 2.
    var todasLasSesiones: Sesion[] = [];
    this.plantillas.forEach(pl => todasLasSesiones = todasLasSesiones.concat(pl.sesionesPlantilla));

    const actividades: Actividad[] = [];

    idActividades.map(
      act => {


        const nuevaActividad: Actividad = new Actividad();
        nuevaActividad.idActividad = act.idActividad;
        nuevaActividad.detalleActividad = act.detalleActividad;
        nuevaActividad.grupos = act.grupos.map(g => this.grupos.filter(gr => gr.idGrupo === g)[0]);

        // paso 2: Asignamos a cada actividadG su objeto sesión.
        const sesionLocalizada = todasLasSesiones.find(s => s.idSesion === act.idSesion);
          if (sesionLocalizada) nuevaActividad.sesion = sesionLocalizada

        actividades.push(nuevaActividad);
      }
    );


    actividades$.next(actividades)


    return actividades$;

  }

  private ObtenerEntidadesHorarioAPartirdeDocentes(): Observable<EntidadHorario[]> {
    const usuarios$: Observable<Usuario[]> = this.authService.ObtenerUsuarios(null);
        // Convertimos usuarios en entidadesHorario, pasando por Docente.
        const entidadHorario$ = usuarios$
          .pipe(
            map(usuarios => {

              return usuarios.map(
                usuario => {
                  const docente: Docente =
                  {
                    idDocente: usuario.uid,
                    nombre: usuario.nombre,
                    apellido1: usuario.primerApellido,
                    apellido2: usuario.segundoApellido,
                    foto: usuario.foto,
                    alias: usuario.nombre.slice(0, 2) + usuario.primerApellido.slice(0, 2) + usuario.segundoApellido.slice(0, 2)
                  };

                  return new EntidadHorario(docente);
                })
            }) // Fin map
          )  // fin pipe

        return entidadHorario$;

  }

  private ObtenerEntidadesHorarioAPartirdeGrupos(): Observable<EntidadHorario[]> {
    const grupos$: BehaviorSubject<Grupo[]> = new BehaviorSubject(this.grupos);

    const entidadHorario$ = grupos$.pipe(
      map(grupos => {
        return grupos.map(
          grupo => new EntidadHorario(grupo)
        )
      })
    )

    return entidadHorario$;

  }

  private ObtenerEntidadesHorarioAPartirdeDependencias(): Observable<EntidadHorario[]> {
    const dependencias$: BehaviorSubject<Dependencia[]> = new BehaviorSubject(this.dependencias);

    const entidadHorario$ = dependencias$.pipe(
      map(dependencias => {

        console.log('dependencias: ', dependencias);
        return dependencias.map(
          dependencia => new EntidadHorario(dependencia)
        )
      })
    )

    return entidadHorario$;

  }

}


interface IActividad {

  idActividad: string;
  idSesion: string;
  detalleActividad: string;
  grupos: string[];
  docentes: string[];
  asignaturas: string[];
  dependencia: string;
  idPeriodoVigencia: string;
}

