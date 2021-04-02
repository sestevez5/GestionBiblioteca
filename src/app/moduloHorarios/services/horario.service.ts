import { Asignatura } from './../models/asignatura.model';
import { IActividad} from './../models/IActividad.model'
import { ParametrosHorario } from './../models/parametrosHorario.model';
import { PeriodoVigencia } from './../models/peridoVigencia';
import { cargarPlantillasError } from './../store/actividades/actividades.actions';
import { Sesion } from './../models/sesion';
import { IActividadesSesion } from './../models/actividadesSesion.model';
import { EntidadHorario } from './../models/entidadHorario.model';
import { Docente } from './../models/docente.model';
import { AuthService } from './../../moduloAuth/services/auth.service';
import { EnumTipoEntidadHorario } from './../models/tipoEntidadHorario.model';
import { Observable,from, Subject, Observer, BehaviorSubject, combineLatest } from 'rxjs'
import { Grupo } from '../models/grupo.model';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Plantilla } from '../models/plantilla.model';
import { Dependencia } from '../models/dependencia.model';
import { DiaSemana } from '../models/diaSemana.model';

import { Actividad } from '../models/actividad.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  docentes$: BehaviorSubject<Docente[]>;
  dependencias$: BehaviorSubject<Dependencia[]>;
  grupos$: BehaviorSubject<Grupo[]>;
  asignaturas$: BehaviorSubject<Asignatura[]>;
  combinacionEntidades$: BehaviorSubject<{ dependencias: Dependencia[], grupos: Grupo[], asignaturas: Asignatura[], docentes: Docente[] }>;



  constructor(private authService: AuthService, private fireBaseDB: AngularFirestore) {

    // En estos tres casos tiramos de los JSON descritos aquí
    this.dependencias$= new BehaviorSubject<Dependencia[]>(this.dependencias);
    this.grupos$      = new BehaviorSubject<Grupo[]>(this.grupos);
    this.asignaturas$ = new BehaviorSubject<Asignatura[]>(this.asignaturas);
    this.docentes$ = new BehaviorSubject<Docente[]>([]);

    this.combinacionEntidades$= new BehaviorSubject<
      {
        dependencias: Dependencia[],
        grupos: Grupo[], asignaturas:
        Asignatura[],
        docentes: Docente[]
      }>({dependencias: [],grupos: [], asignaturas: [],docentes:[]});



    this.ObtenerDocentes()
      .subscribe(
        docentes => this.docentes$.next(docentes)
    );

    this.ObtenerAsignaturas()
      .subscribe(asignaturas =>
        this.asignaturas$.next(asignaturas)
        );

    const x = combineLatest(
      [this.dependencias$,
      this.grupos$,
      this.asignaturas$,
      this.docentes$])
      .pipe(
        map(combinacion => {
          return {
            dependencias: combinacion[0],
            grupos: combinacion[1],
            asignaturas: combinacion[2],
            docentes: combinacion[3]
          }
        })
      ).subscribe(
        combinacion => this.combinacionEntidades$.next(combinacion)
    )






  }


  actualizarAsignaturas(asignaturas: Asignatura[]) {
    this.asignaturas$.next(asignaturas);
  };

  actualizarGrupos(grupos: Grupo[]) {
    this.grupos$.next(grupos);
  };

  actualizarDependencias(dependencias: Dependencia[]) {
    this.dependencias$.next(dependencias);
  };


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
      grupos: ['1', '2','20','21', '3'],
      docentes: ['IJyiJjc2LXTZXsdwY27ORvpzIYw1'],
      asignaturas: ['1'],
      dependencia: '1',
      idPeriodoVigencia: '1'
    },
    {
      idActividad: '51',
      idSesion: 'P1L3',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['NTNYueJSicQOvYLjWzQs5ZcyeV63'],
      asignaturas: ['1'],
      dependencia:'1',
      idPeriodoVigencia: '1'
    },
    {
      idActividad: '3',
      idSesion: 'P1L4',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['NTNYueJSicQOvYLjWzQs5ZcyeV63'],
      asignaturas: ['1'],
      dependencia:'2',
      idPeriodoVigencia: '1'
    },
    {
      idActividad: '4',
      idSesion: 'P1M1',
      detalleActividad: '',
      grupos: ['2'],
      docentes: ['NTNYueJSicQOvYLjWzQs5ZcyeV63'],
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
    }

  ];

  asignaturas: Asignatura[] = [

    {
      idAsignatura: '1',
      codigo: 'MAT',
      denominacionLarga: 'Matemáticas'
    },
    {
      idAsignatura: '2',
      codigo: 'CSO',
      denominacionLarga: 'Matemáticas'
    },
    {
      idAsignatura: '3',
      codigo: 'ING',
      denominacionLarga: 'Inglés'
    },
    {
      idAsignatura: '4',
      codigo: 'FYQ',
      denominacionLarga: 'Física y Química'
    },
    {
      idAsignatura: '5',
      codigo: 'REL',
      denominacionLarga: 'Religión'
    },
    {
      idAsignatura: '6',
      codigo: 'EFI',
      denominacionLarga: 'MEducación Física'
    },
    {
      idAsignatura: '7',
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
    return this.obtenerActividades();
  }

  obtenerActividades(entidadHorario?: EntidadHorario): Observable<Actividad[]>{

    //---------------------------------------------------------------------------------
    // Paso 1:  Construccion de la consulta que devuelve el observable de BBDD
    //          La consulta varía en función del tipo de entidad. Ver switch
    //---------------------------------------------------------------------------------
    let query: AngularFirestoreCollection;

    if (!entidadHorario) query = this.fireBaseDB.collection<IActividad>('actividades');
    else {
      switch (entidadHorario.tipoEntidad) {

        // Caso 1: Tipo Docente: Se filtra por la colección de docentes.
        case EnumTipoEntidadHorario.DOCENTE:
          query= this.fireBaseDB.collection<IActividad>('actividades', ref => ref.where('docentes','array-contains',entidadHorario.id))
        break;
      }

    }



    //---------------------------------------------------------------------------------
    // Paso 2:  Transformamos el contenido en entidades IActividad
    //---------------------------------------------------------------------------------

    const iActividades$ = query.snapshotChanges()
      .pipe(
        map(
          actions => {
            return actions.map(
              act => {
                const datos = act.payload.doc.data() as IActividad;
                const idActividad = act.payload.doc.id;
                return { idActividad, ...datos };
              }
            )
          }
        )
      )


    //---------------------------------------------------------------------------------
    // Paso 3:  Transformos el observable de IActividades en observable de Actividades
    //          Básicamente estamos haciendo los inner join necesarios.
    //---------------------------------------------------------------------------------
    const actividades$ = this.convertirObservableArrayIActividadesEnObservableArrayActividades(iActividades$);


    return actividades$;



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
  private ObtenerEntidadesHorarioAPartirdeDocentes(): Observable<EntidadHorario[]> {

    // const docentes$: Observable<Docente[]> = new BehaviorSubject([]);


    const entidadHorario$ = this.docentes$
      .pipe(map(docentes => {
          return docentes.map(
            docente => new EntidadHorario(docente)
          )
        })
      )


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

  // -------------------------------------------------------------------------
  // Acceso a Entidades.
  // -------------------------------------------------------------------------
  ObtenerDocentes(): Observable<Docente[]>{
    return this.authService.ObtenerUsuarios(null)
    .pipe(
      map(
        usuarios => usuarios.map(
          usuario => {
                return {
              idDocente: usuario.uid,
              nombre: usuario.nombre,
              apellido1: usuario.primerApellido,
              apellido2: usuario.segundoApellido,
              foto: usuario.foto,
              alias: usuario.nombre.slice(0, 2) + usuario.primerApellido.slice(0, 2) + usuario.segundoApellido.slice(0, 2)
            } as Docente
          }
        )
      )
  )

  }

  ObtenerAsignaturas(): Observable<Asignatura[]> {
    return this.fireBaseDB.collection('asignaturas')
      .snapshotChanges()
      .pipe(
        map(
          actions => {

            return actions.map(
              act=> {
                const datos = act.payload.doc.data() as Asignatura;
                const idAsignatura = act.payload.doc.id;
                console.log('asignatura-->: ', idAsignatura, datos)
                return { idAsignatura, ...datos }
             }
            )
            }
      ),  // Fin map
    );
  }

  convertirObservableArrayIActividadesEnObservableArrayActividades(iActividades$: Observable<IActividad[]>): Observable<Actividad[]>{


    var todasLasSesiones: Sesion[] = [];
    this.plantillas.forEach(pl => todasLasSesiones = todasLasSesiones.concat(pl.sesionesPlantilla));

    const actividades$ = combineLatest(
      [this.combinacionEntidades$, iActividades$]
    )
      .pipe(
        map(combinacion => {
          return {
            entidades: combinacion[0],
            iActividades: combinacion[1],
          }
        }),
        map(valor => valor.iActividades.map(
            iActividad => {
              const nuevaActividad: Actividad = new Actividad();
              nuevaActividad.idActividad = iActividad.idActividad;
              nuevaActividad.detalleActividad = iActividad.detalleActividad;

              const docentesEnActividad = valor.entidades.docentes?.filter(docente => iActividad.docentes.includes(docente.idDocente));
              nuevaActividad.docentes = docentesEnActividad ? docentesEnActividad : [];

            console.log(valor.entidades.asignaturas);

              const asignaturasEnActividad = valor.entidades.asignaturas?.filter(asignatura => iActividad.asignaturas.includes(asignatura.idAsignatura));
              nuevaActividad.asignaturas = asignaturasEnActividad ? asignaturasEnActividad : [];


              nuevaActividad.dependencia = '';
              nuevaActividad.grupos = [];

              const sesionLocalizada = todasLasSesiones.find(s => s.idSesion === iActividad.idSesion);
              if (sesionLocalizada) nuevaActividad.sesion = sesionLocalizada;

              return nuevaActividad;

            }) // Fin valor.iActividades.map
        ) // Fin segundo map
  );  // Fin pipe

  return actividades$;

  }


}

// const sesionLocalizada = todasLasSesiones.find(s => s.idSesion === act.idSesion);
// if (sesionLocalizada) nuevaActividad.sesion = sesionLocalizada


// Acceso a Entidades.


    // export interface IActividad {

    //   idActividad: string;
    //   idSesion: string;
    //   detalleActividad: string;
    //   grupos: string[];
    //   docentes: string[];
    //   asignaturas: string[];
    //   dependencia: string;
    //   idPeriodoVigencia: string;
    // }


