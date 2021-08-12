import { ListasSelectores } from '../models/listasSelectores.model';
import { Alumno } from './../models/alumno.model';
import { Actividad } from './../models/actividad.model';
import { filter, first, mergeMap } from 'rxjs/operators';

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

  combinacionEntidades$: BehaviorSubject<{
    dependencias: Dependencia[],
    grupos: Grupo[],
    asignaturas: Asignatura[],
    docentes: Docente[],
    plantillas: Plantilla[],
    periodosVigencia: PeriodoVigencia[]
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
      diasSemanaHabiles: ['L','M','J','V'],
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

  constructor(private authService: AuthService, private fireBaseDB: AngularFirestore) {

    // En estos tres casos tiramos de los JSON descritos aquí
    this.dependencias$= new BehaviorSubject<Dependencia[]>([]);
    this.grupos$      = new BehaviorSubject<Grupo[]>([]);
    this.asignaturas$ = new BehaviorSubject<Asignatura[]>([]);
    this.docentes$ = new BehaviorSubject<Docente[]>([]);
    this.plantillas$ = new BehaviorSubject<Plantilla[]>([]);
    this.periodosVigencia$ = new BehaviorSubject<PeriodoVigencia[]>([]);

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

    this.combinacionEntidades$= new BehaviorSubject<
    {
      dependencias: Dependencia[],
      grupos: Grupo[],
      asignaturas: Asignatura[],
      docentes: Docente[],
      plantillas: Plantilla[],
      periodosVigencia: PeriodoVigencia[]
    }>({
      dependencias: [],
      grupos: [],
      asignaturas: [],
      docentes: [],
      plantillas: [],
      periodosVigencia: []
    });

    combineLatest(
      [this.dependencias$,
      this.grupos$,
      this.asignaturas$,
      this.docentes$,
      this.plantillas$,
      this.periodosVigencia$])
      .pipe(
        map(combinacion => {
          return {
            dependencias: combinacion[0],
            grupos: combinacion[1],
            asignaturas: combinacion[2],
            docentes: combinacion[3],
            plantillas: combinacion[4],
            periodosVigencia: combinacion[5]
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
          plantillas: combinacion.plantillas
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
    return from(this.fireBaseDB.collection('actividades').doc(idActividad).update(this.convertirActividadEnIActividad(actividad)));
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
      idPeriodoVigencia: actividad.periodoVigencia?.idPeriodoVigencia

    }

  }



}


