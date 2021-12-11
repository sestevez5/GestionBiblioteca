import { MensajeReglaNegocio } from './../../moduloHelpers/models/mensajeReglaNegocio';
import { ReglaNegocio } from './../../moduloHelpers/models/reglaNegocio';
import { ListasSelectores } from '../models/listasSelectores.model';
import { Alumno } from './../models/alumno.model';
import { Actividad } from './../models/actividad.model';
import { filter, first, mergeMap, catchError } from 'rxjs/operators';

// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, BehaviorSubject, combineLatest, Observer, Subject, from  } from 'rxjs'

// firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

// modelo
import { Asignatura } from './../models/asignatura.model';
import { IActividad} from './../models/IActividad.model'
import { ParametrosHorario } from './../models/parametrosHorario.model';
import { PeriodoVigencia } from './../models/peridoVigencia';
import { Sesion } from './../models/sesion';
import { EntidadHorario } from './../models/entidadHorario.model';
import { Docente } from './../models/docente.model';
import { AuthService } from './../../moduloAuth/services/auth.service';
import { EnumTipoEntidadHorario } from '../models/tipoEntidadHorario.model';
import { Grupo } from '../models/grupo.model';
import { Plantilla } from '../models/plantilla.model';
import { Dependencia } from '../models/dependencia.model';
import { DiaSemana } from '../models/diaSemana.model';
import { TipoActividad } from '../models/tipoActividad.model'
import { EnumTiposReglaNegocio } from 'src/app/moduloHelpers/models/enumerados';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  docentes$: BehaviorSubject<Docente[]>;
  dependencias$: BehaviorSubject<Dependencia[]>;
  grupos$: BehaviorSubject<Grupo[]>;
  asignaturas$: BehaviorSubject<Asignatura[]>;
  plantillas$: BehaviorSubject<Plantilla[]>;
  periodosVigencia$: BehaviorSubject<PeriodoVigencia[]>;
  tiposActividad$: BehaviorSubject<TipoActividad[]>;

  combinacionEntidades$: BehaviorSubject<{
    dependencias: Dependencia[],
    grupos: Grupo[],
    asignaturas: Asignatura[],
    docentes: Docente[],
    plantillas: Plantilla[],
    periodosVigencia: PeriodoVigencia[],
    tiposActividad: TipoActividad[]
  }>;

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
      horaMinima: '08:00',
      horaMaxima: '16:00',
      diasSemanaHabiles: ['L','M','X','J','V'],
    };

  tiposActividad: TipoActividad[] =
  [
    {
      idTipoActividad: '1',
      codigo: 'CCM',
      denominacionLarga: 'Clase colectiva de una materia',
      obligaDocentes: true,
      permiteDocentes: true,
      obligaAsignaturas: true,
      permiteAsignaturas: true,
      obligaGrupos: true,
      permiteGrupos: true,
      obligaDetalle: false,
      permiteDetalle: true,
      esLectiva: true,
      tipoPredeterminado: true
      },
      {
        idTipoActividad: '2',
        codigo: 'GUA',
        denominacionLarga: 'Guardia',
        obligaDocentes: true,
        permiteDocentes: true,
        obligaAsignaturas: false,
        permiteAsignaturas: false,
        obligaGrupos: false,
        permiteGrupos: false,
        obligaDetalle: false,
        permiteDetalle: true,
        esLectiva: false,
        tipoPredeterminado: false

      },
      {
        idTipoActividad: '3',
        codigo: 'RD',
        denominacionLarga: 'Reunión de departamento',
        obligaDocentes: true,
        permiteDocentes: true,
        obligaAsignaturas: false,
        permiteAsignaturas: false,
        obligaGrupos: false,
        permiteGrupos: false,
        obligaDetalle: true,
        permiteDetalle: true,
        esLectiva: false,
        tipoPredeterminado: false
      }
    ]

  catalogoReglasNegocio: ReglaNegocio[] = [

    {
      idReglaNegocio: '1246',
      codigo: 'TASD',
      denominacionLarga: 'No de ha definido el tipo de la actividad que se está creando/modificando',
      tipoReglaNegocio: EnumTiposReglaNegocio.ERROR
    },

    {
      idReglaNegocio: '1712',
      codigo: 'SESD',
      denominacionLarga: 'No de ha asignado una sesión a la actividad que se está creando/editando',
      tipoReglaNegocio: EnumTiposReglaNegocio.ERROR
    },

    {
      idReglaNegocio: '2182',
      codigo: 'PVSD',
      denominacionLarga: 'No de ha asignado un periodo de vigencia a la actividad que se está creando/editando',
      tipoReglaNegocio: EnumTiposReglaNegocio.ERROR
    },

    {
      idReglaNegocio: '4111',
      codigo: 'DESD',
      denominacionLarga: 'No de ha definido el detalle de la actividad que se está creando/modificando',
      tipoReglaNegocio: EnumTiposReglaNegocio.ERROR
    },

    {
      idReglaNegocio: '1112',
      codigo: 'ASDO',
      denominacionLarga: 'No se han añadido docentes a la actividad',
      tipoReglaNegocio: EnumTiposReglaNegocio.WARNING
    },

    {
      idReglaNegocio: '1113',
      codigo: 'ASDE',
      denominacionLarga: 'No se ha asignado una dependencia a la actividad',
      tipoReglaNegocio: EnumTiposReglaNegocio.WARNING
    },


  ]

  constructor(private authService: AuthService, private fireBaseDB: AngularFirestore) {

    // En estos tres casos tiramos de los JSON descritos aquí
    this.dependencias$= new BehaviorSubject<Dependencia[]>([]);
    this.grupos$      = new BehaviorSubject<Grupo[]>([]);
    this.asignaturas$ = new BehaviorSubject<Asignatura[]>([]);
    this.docentes$ = new BehaviorSubject<Docente[]>([]);
    this.plantillas$ = new BehaviorSubject<Plantilla[]>([]);
    this.periodosVigencia$ = new BehaviorSubject<PeriodoVigencia[]>([]);
    this.tiposActividad$ = new BehaviorSubject<TipoActividad[]>([]);

    this.obtenerDocentes()
      .subscribe(docentes => this.docentes$.next(docentes));

    this.obtenerAsignaturas()
      .subscribe(asignaturas => this.asignaturas$.next(asignaturas));

    this.obtenerGrupos()
      .subscribe(grupos => this.grupos$.next(grupos));

    this.obtenerDependencias()
      .subscribe(dependencias => this.dependencias$.next(dependencias));

    this.obtenerPlantillas()
      .subscribe(plantillas => this.plantillas$.next(plantillas));

    this.obtenerPeriodosVigencia()
      .subscribe(periodosVigencia => this.periodosVigencia$.next(periodosVigencia));

    this.obtenerTiposActividad()
      .subscribe(tipoActividad => this.tiposActividad$.next(tipoActividad));

    this.combinacionEntidades$= new BehaviorSubject<
    {
      dependencias: Dependencia[],
      grupos: Grupo[],
      asignaturas: Asignatura[],
      docentes: Docente[],
      plantillas: Plantilla[],
      periodosVigencia: PeriodoVigencia[],
      tiposActividad: TipoActividad[]
    }>({
      dependencias: [],
      grupos: [],
      asignaturas: [],
      docentes: [],
      plantillas: [],
      periodosVigencia: [],
      tiposActividad: []
    });

    combineLatest(
      [this.dependencias$,
      this.grupos$,
      this.asignaturas$,
      this.docentes$,
      this.plantillas$,
      this.periodosVigencia$,
      this.tiposActividad$
      ])
      .pipe(
        map(combinacion => {
          return {
            dependencias: combinacion[0] as Dependencia[],
            grupos: combinacion[1] as Grupo[],
            asignaturas: combinacion[2] as Asignatura[],
            docentes: combinacion[3] as Docente[],
            plantillas: combinacion[4] as Plantilla[],
            periodosVigencia: combinacion[5] as PeriodoVigencia[],
            tiposActividad: combinacion[6] as TipoActividad[]
          }
        })
      ).subscribe(combinacion => this.combinacionEntidades$.next(combinacion));

  }

  //-------------------------------------------------------------------------------------
  // MÉTODOS "OBTENER ENTIDADES"
  //-------------------------------------------------------------------------------------
  obtenerParametrosHorario(): Observable<ParametrosHorario> {
    const parametrosHorario$ = new BehaviorSubject<ParametrosHorario>(null);
    parametrosHorario$.next(this.parametrosHorario);
    return parametrosHorario$;
  }

  obtenerTiposActividad(): Observable<TipoActividad[]> {
    const tiposActividad$ = new BehaviorSubject<TipoActividad[]>(null);
    tiposActividad$.next(this.tiposActividad);
    return tiposActividad$;
  }
  obtenerPeriodosVigencia(): Observable<PeriodoVigencia[]>{
    return this.fireBaseDB.collection('periodosVigencia')
    .snapshotChanges()
    .pipe(
      map(
        actions => {
          return actions.map(
            act => {

             var datos = act.payload.doc.data() as {computo:number, denominacion:string, fechaFin: any, fechaInicio: any, idPeriodoVigencia: string };

             const idPeriodoVigencia = act.payload.doc.id;
              datos = {
                ...datos, idPeriodoVigencia,
                fechaInicio: this.convertirCadena8aracteres(datos.fechaInicio as string),
                fechaFin: this.convertirCadena8aracteres(datos.fechaFin as string)
              } as PeriodoVigencia;

              return datos;
           }
          )
          }
    ),  // Fin map
  );

  }

  obtenerPlantillas(): Observable<Plantilla[]> {
    return this.fireBaseDB.collection('plantillas')
    .snapshotChanges()
    .pipe(
      map(
        actions => {
          return actions.map(
            act => {
              const datos = act.payload.doc.data() as Plantilla;
              const idPlantilla = act.payload.doc.id;
              return { ...datos, idPlantilla }
           }
          )
          }
    ),  // Fin map
  );
  }
  obtenerPlantilla(idPlantilla: string): Observable<Plantilla> {
    const plantilla$ = this.plantillas$
      .pipe(
        map(plantillas => plantillas.filter(plantilla => plantilla.idPlantilla === idPlantilla)),
        map(plantillas => plantillas[0] ? plantillas[0] : null)
      );

    return plantilla$;
  }
  obtenerActividad(idActividad: string): Observable<Actividad> {

    const IActividad$ = new Subject<IActividad>();
    this.fireBaseDB.doc<IActividad>(`actividades/${idActividad}`).valueChanges()
      .pipe(
        first(),
        map(value => {
          if (!value) {
            return (IActividad$ as Observer<any>).error("Error")
          };
          value.idActividad = idActividad;
          IActividad$.next(value);
        })
      ).subscribe();

    var aux$: Observable<Actividad[]> = this.convertirObservableArrayIActividadesEnObservableArrayActividades(IActividad$.pipe(map(iActividad => [iActividad])));

    const aux2$: Observable<Actividad> = aux$.pipe(map((actividades: Actividad[]) => actividades[0]));

    const aux3$: Observable<Actividad> = aux2$.pipe(
      mergeMap(
        (actividad: Actividad) => this.obtenerAlumnosActividad(actividad)
            .pipe(
              map(alumnos => {
                actividad.alumnos = alumnos;
                return actividad;
              }) // Fin map
            ) // Fin pipe
      )  // Fin mergemap
    ) // Fin pipe

    return aux3$;

  }
  obtenerActividades(entidadHorario?: EntidadHorario,  lunesSemanaSeleccionada?:Date): Observable<Actividad[]>{

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

          // Caso 2: Tipo Grupo: Se filtra por la colección de docentes.
          case EnumTipoEntidadHorario.GRUPO:
            query= this.fireBaseDB.collection<IActividad>('actividades', ref => ref.where('grupos','array-contains',entidadHorario.id))
          break;

         // Caso 3: Tipo Dependencia: Se filtra por el campo dependencia.
          case EnumTipoEntidadHorario.DEPENDENCIA:
          query= this.fireBaseDB.collection<IActividad>('actividades', ref => ref.where('dependencia','==',entidadHorario.id))
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
                    return { ...datos, idActividad: idActividad };

              }
            )
          }
        )
    )

    //---------------------------------------------------------------------------------
    // Paso 3:  Transformos el observable de IActividades en observable de Actividades
    //          Básicamente estamos haciendo los inner join necesarios.
    //---------------------------------------------------------------------------------
    var actividades$ = this.convertirObservableArrayIActividadesEnObservableArrayActividades(iActividades$);


    if (lunesSemanaSeleccionada) {
      actividades$ = actividades$.pipe(
        map(
          actividades => actividades.filter(
           actividad => actividad.periodoVigencia.fechaInicio <= lunesSemanaSeleccionada && actividad.periodoVigencia.fechaFin >= lunesSemanaSeleccionada
         )
       )
      );
    }

    return actividades$;

  }
  obtenerDocentes(): Observable<Docente[]>{
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
  obtenerAsignaturas(): Observable<Asignatura[]> {
    return this.fireBaseDB.collection('asignaturas')
      .snapshotChanges()
      .pipe(
        map(
          actions => {
            return actions.map(
              act => {
                const datos = act.payload.doc.data() as Asignatura;
                const idAsignatura = act.payload.doc.id;
                return { ...datos, idAsignatura }
             }
            )
            }
      ),  // Fin map
    );
  }
  obtenerGrupos(): Observable<Grupo[]> {
    return this.fireBaseDB.collection('grupos')
      .snapshotChanges()
      .pipe(
        map(
          actions => {

            return actions.map(
              act => {
                const datos = act.payload.doc.data() as Grupo;
                const idGrupo = act.payload.doc.id;
                return { ...datos, idGrupo}
             }
            )
            }
      ),  // Fin map
    );
  }
  obtenerDependencias(): Observable<Dependencia[]> {
    return this.fireBaseDB.collection('dependencias')
      .snapshotChanges()
      .pipe(
        map(
          actions => {

            return actions.map(
              act => {
                const datos = act.payload.doc.data() as Dependencia;
                const idDependencia = act.payload.doc.id;
                return { ...datos, idDependencia}
             }
            )
            }
      ),  // Fin map
    );
  }
  obtenerEntidadesHorarios(tipoEntidad: EnumTipoEntidadHorario): Observable<EntidadHorario[]> {

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

  }
  obtenerAlumnosActividad(actividad: Actividad): Observable<Alumno[]>{

   return this.fireBaseDB.collection<Alumno>('alumnos', ref => ref.where('idGrupo', 'in', actividad.grupos.length>0?actividad.grupos.map(grupo => grupo.idGrupo):['xxx']))
    .snapshotChanges()
      .pipe(
        // Reconvertimos los datos a colecciones de Alumnos
        map(
          actions => actions.map(
            act => {
              let alumno: Alumno;
              const datos = act.payload.doc.data() as Alumno;
              const idAlumno = act.payload.doc.id;
              alumno = { ...datos, idAlumno }
              return alumno;
            }) // Fin actions.map
        )
    );
  };
  obtenerListasSelectores(): Observable<ListasSelectores> {

    const listasSelectores$ = new BehaviorSubject<ListasSelectores>(null);

    this.combinacionEntidades$.subscribe(
      combinacion => {
        const listasSelectores: ListasSelectores = {
          docentes: combinacion.docentes,
          asignaturas: combinacion.asignaturas,
          dependencias: combinacion.dependencias,
          periodosVigencia: combinacion.periodosVigencia,
          grupos: combinacion.grupos,
          plantillas: combinacion.plantillas,
          tiposActividad: combinacion.tiposActividad
        }
        listasSelectores$.next(listasSelectores)
      }
    );

    return listasSelectores$;
  }
  obtenerDiaSemana(codigo: string): DiaSemana | undefined
  {
    const diaSemana = this.diasSemana.filter(ds => ds.codigo === codigo);
    return diaSemana[0] ? diaSemana[0] : undefined;
  }
  modificarActividad(idActividad: string, actividad: Actividad): Observable<any> {

    const iActividad: IActividad = this.convertirActividadEnIActividad(actividad);

    delete iActividad['idActividad'];

    iActividad.detalleActividad = iActividad.detalleActividad ? actividad.detalleActividad : '';
    iActividad.dependencia = iActividad.dependencia ? iActividad.dependencia : '';
    iActividad.idPeriodoVigencia = iActividad.idPeriodoVigencia ? iActividad.idPeriodoVigencia : '';
    return from(this.fireBaseDB.collection('actividades').doc(idActividad).update(iActividad))
      .pipe(map(value => actividad));
  }

  crearActividad(actividad: Actividad): Observable<Actividad | MensajeReglaNegocio[]>  {

    var rn: MensajeReglaNegocio[] = [];
    const resultado$ = new BehaviorSubject<Actividad | MensajeReglaNegocio[]>(null);

    if (!actividad.tipoActividad) {
      rn.push(this.crearMensajeReglaRota('1246', 'El tipo de actividad es obligatorio'));
    };
    if (!actividad.tipoActividad) {
      rn.push(this.crearMensajeReglaRota('2182', 'Es necesario establecer un periodo de vigencia'));
    }
    if (actividad.docentes && actividad.docentes.length === 0) {
      rn.push(this.crearMensajeReglaRota('1112', 'la actividad no se reflejará en el horario de ningún docente'))
    }
    if (!actividad.dependencia) {
      rn.push(this.crearMensajeReglaRota('1113', 'la actividad no se reflejará en el horario de ninguna dependencia'))
    }



    if (rn.length > 0) {
      resultado$.next(rn);
    }


      console.log(rn.filter(rn => rn.reglaNegocio.tipoReglaNegocio === EnumTiposReglaNegocio.ERROR).length);
      if (rn.filter(rn => rn.reglaNegocio.tipoReglaNegocio === EnumTiposReglaNegocio.ERROR).length === 0)
        {
        const iActividad: IActividad = this.convertirActividadEnIActividad(actividad);
        delete iActividad['idActividad'];

        iActividad.detalleActividad = iActividad.detalleActividad ? actividad.detalleActividad : '';
        iActividad.dependencia = iActividad.dependencia ? iActividad.dependencia : '';
        iActividad.idPeriodoVigencia = iActividad.idPeriodoVigencia ? iActividad.idPeriodoVigencia : '';

        from(this.fireBaseDB.collection('actividades').add(iActividad))
          .pipe(
            map(reference => {
              return { ...actividad, idActividad: reference.id } as Actividad;
            }

            )// fin map

          ) // Fin pipe
          .subscribe(
            actividad => resultado$.next(actividad as Actividad | MensajeReglaNegocio[])
          );
        }


    return resultado$;




  }

  eliminarActividad(idActividad:string): Observable<any> {
    return from(this.fireBaseDB.collection('actividades').doc(idActividad).delete());
  }


//------------------------------------------------------------------------------------------
// MÉTODOS PRIVADOS
//------------------------------------------------------------------------------------------
  private convertirObservableArrayIActividadesEnObservableArrayActividades(iActividades$: Observable<IActividad[]>): Observable<Actividad[]>{
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

              // Campos de la actividad.
              nuevaActividad.idActividad = iActividad.idActividad;
              nuevaActividad.detalleActividad = iActividad.detalleActividad;

              // JOIN Periodos de vigencia
              const periodoVigenciaEnActividad = valor.entidades.periodosVigencia?.filter(periodoVigencia => iActividad.idPeriodoVigencia === periodoVigencia.idPeriodoVigencia);
              nuevaActividad.periodoVigencia = (periodoVigenciaEnActividad && periodoVigenciaEnActividad[0]) ? periodoVigenciaEnActividad[0] : undefined;

             // JOIN Periodos de vigencia
             const tipoActividadEnActividad = valor.entidades.tiposActividad?.filter(tipoActividad => iActividad.idTipoActividad === tipoActividad.idTipoActividad);
             nuevaActividad.tipoActividad = (tipoActividadEnActividad && tipoActividadEnActividad[0]) ? tipoActividadEnActividad[0] : undefined;


              // JOIN Colección de docentes
              const docentesEnActividad = valor.entidades.docentes?.filter(docente => iActividad.docentes.includes(docente.idDocente));
              nuevaActividad.docentes = docentesEnActividad ? docentesEnActividad : [];

              // JOIN Colección de asignaturas
              const asignaturasEnActividad = valor.entidades.asignaturas?.filter(asignatura => iActividad.asignaturas.includes(asignatura.idAsignatura));
              nuevaActividad.asignaturas = asignaturasEnActividad ? asignaturasEnActividad : [];

              // JOIN Colección de grupos
              const gruposEnActividad = valor.entidades.grupos?.filter(grupo => iActividad.grupos.includes(grupo.idGrupo));
              nuevaActividad.grupos = gruposEnActividad ? gruposEnActividad : [];

              // JOIN con dependencia.
              const dependenciaEnActividad = valor.entidades.dependencias?.filter(dependencia => iActividad.dependencia === dependencia.idDependencia);
              nuevaActividad.dependencia = (dependenciaEnActividad && dependenciaEnActividad[0]) ? dependenciaEnActividad[0] : undefined;

              // JOIN con sesiones.
              var todasLasSesiones: Sesion[] = [];
              valor.entidades.plantillas.forEach(pl => todasLasSesiones = todasLasSesiones.concat(pl.sesionesPlantilla));

              const sesionLocalizada = todasLasSesiones.find(s => s.idSesion === iActividad.idSesion);
              if (sesionLocalizada) nuevaActividad.sesion = sesionLocalizada;


              return nuevaActividad;

            }) // Fin valor.iActividades.map
        ) // Fin segundo map
  );  // Fin pipe

  return actividades$;

  }
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
    const grupos$ = this.grupos$;

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
    const dependencias$ = this.dependencias$;

    const entidadHorario$ = dependencias$.pipe(
      map(dependencias => {
        return dependencias.map(
          dependencia => new EntidadHorario(dependencia)
        )
      })
    )

    return entidadHorario$;

  }
  private convertirCadena8aracteres(cadena: string): Date {

    const anyo: string = cadena.substring(0, 4);
    const mes: string = cadena.substring(4, 6);
    const dia: string = cadena.substring(6, 8);

    return new Date(parseInt(anyo), parseInt(mes), parseInt(dia));
  }
  private convertirActividadEnIActividad(actividad: Actividad): IActividad {

    return {

      idActividad: actividad.idActividad,
      idSesion: actividad.sesion?.idSesion,
      detalleActividad: actividad.detalleActividad,
      grupos: actividad.grupos?.map( grupo => grupo.idGrupo),
      docentes: actividad.docentes?.map( docente => docente.idDocente),
      asignaturas: actividad.asignaturas?.map( asignatura => asignatura.idAsignatura),
      dependencia: actividad.dependencia?.idDependencia,
      idPeriodoVigencia: actividad.periodoVigencia?.idPeriodoVigencia,
      idTipoActividad: actividad.tipoActividad.idTipoActividad


    }

  }

  private crearMensajeReglaRota(idRegla: string, mensaje: string): MensajeReglaNegocio {



    const regla: ReglaNegocio = this.catalogoReglasNegocio.filter(reglaNegocio => reglaNegocio.idReglaNegocio === idRegla)[0];

    return new MensajeReglaNegocio(regla, mensaje)

  }








}



