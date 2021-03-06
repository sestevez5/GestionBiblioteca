import { EntidadHorario } from './../models/entidadHorario.model';
import { Docente } from './../models/docente.model';
import { AuthService } from './../../moduloAuth/services/auth.service';
import { EnumTipoEntidadHorario } from './../models/tipoEntidadHorario.model';
import { Observable,from, Subject, Observer, BehaviorSubject } from 'rxjs'
import { Grupo } from '../models/grupo.model';
import { filter, map } from 'rxjs/operators';
import { parametrosHorario } from '../models/parametrosHorario.model';
import { Plantilla } from '../models/plantilla.model';
import { Sesion } from '../../moduloHelpers/models/sesion';
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

  diasSemana: DiaSemana[] = [
    { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
    { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
    { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
    { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
    { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
    { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
    { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },

  ];

  parametrosHorario: parametrosHorario =
    {
      horaMinima: '07:00',
      horaMaxima: '15:00',
      diasSemanaHabiles: ['L','M','X'],
      plantillas: [
        {
          idPlantilla: 'P1',
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
            { idSesion: 'P1V6', diaSemana: 'V', horaInicio: '13:05', horaFin: '14:00' },

            { idSesion: 'P1S1', diaSemana: 'S', horaInicio: '08:00', horaFin: '08:55' },

          ]
        },
        {
          idPlantilla: 'P2',
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

    };

  actividades: IActividad[] = [

    {
      idActividad: '11',
      idSesion: 'P1L3',
      detalleActividad: '',
      grupos: ['2'],
      docentes: [],
      asignaturas: ['1'],
      dependencia:'1'
    },
    {
      idActividad: '3',
      idSesion: 'P1L4',
      detalleActividad: '',
      grupos: ['2'],
      docentes: [],
      asignaturas: ['1'],
      dependencia:'2'
    },
    {
      idActividad: '4',
      idSesion: 'P1M1',
      detalleActividad: '',
      grupos: ['2'],
      docentes: [],
      asignaturas: ['1','3'],
      dependencia:'2'

    },
    {
      idActividad: '14',
      idSesion: 'P1M1',
      detalleActividad: '',
      grupos: ['2'],
      docentes: [],
      asignaturas: ['1','3'],
      dependencia:'2'

     },
     {
       idActividad: '23',
       idSesion: 'P1M1',
       detalleActividad: '',
       grupos: ['2'],
       docentes: [],
       asignaturas: ['1','3'],
       dependencia:'2'

      },
    // {
    //   idActividad: '5',
    //   idSesion: 'P1M3',
    //   detalleActividad: '',
    //   grupos: ['2'],
    //   docentes: [],
    //   asignaturas: ['1','3','4'],
    //   dependencia:'3'
    // },

    // {
    //   idActividad: '7',
    //   idSesion: 'P1X1',
    //   detalleActividad: '',
    //   grupos: ['3'],
    //   docentes: [],
    //   asignaturas: ['2','4'],
    //   dependencia:'1'
    // },
    // {
    //   idActividad: '8',
    //   idSesion: 'P1J2',
    //   detalleActividad: '',
    //   grupos: ['2'],
    //   docentes: [],
    //   asignaturas: ['2','3','1'],
    //   dependencia:'2'
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
      denominacionLarga: 'Aula 1'
    },
    {
      idGrupo: '2',
      codigo: 'ESO1A',
      denominacionLarga: 'Aula 1'
    },
    {
      idGrupo: '3',
      codigo: 'BCN1A',
      denominacionLarga: '1ª Bachillerato CCNN A'
    }
  ];

  obtenerTodasLasActividades(): Observable<Actividad[]> {

    const actividades$ = new BehaviorSubject<Actividad[]>([]);

    // paso 1: Construimos un único array con todas las sesiones de todas las plantillas.
    // Necesitamoas un único array con todas las sesiones para el punto 2.
    var todasLasSesiones: Sesion[] = [];
    this.parametrosHorario.plantillas.forEach(pl => todasLasSesiones = todasLasSesiones.concat(pl.sesionesPlantilla));

    const actividades: Actividad[] = [];

    this.actividades.map(
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

  obtenerTodasLasDependencias(): Dependencia[]{
    return this.dependencias;
  }

  obtenerTodasLasAsignaturas(): Asignatura[]{
    return this.asignaturas;
  }

  obtenerParametrosHorario(): parametrosHorario{
    return this.parametrosHorario;
  }

  obtenerTodasLasEntidadesHorarios(tipoEntidad: EnumTipoEntidadHorario): Observable<EntidadHorario[]> {

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

  } // Fin obtenerTodasLasEntidadesHorarios

}



interface IActividad {

  idActividad: string;
  idSesion: string;
  detalleActividad: string;
  grupos: string[];
  docentes: string[];
  asignaturas: string[];
  dependencia:string;
}

