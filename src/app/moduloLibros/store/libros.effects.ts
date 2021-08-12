import { TipoMensaje } from './../../shared/models/mensajeUsuario.model';
import { Libro } from './../models/libro.model';
import { Router } from '@angular/router';
import { RootState } from './../../reducers/app.reducer';
import { LibrosService } from './../services/libros.service';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap, mergeMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import * as PrincipalActions from '../../moduloPrincipal/store/comunicaciones/comunicaciones.actions';
import * as LibrosActions from './libros.actions';





@Injectable()
export class LibrosEffects {

  // ---------------------------------------------------------------------
  // Crear Libro
  // ---------------------------------------------------------------------
  crearLibro$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(LibrosActions.crearLibro),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.librosService.AnyadirLibro(action.libro)
              .pipe(

                map(

                  libro => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return LibrosActions.crearLibroOK({ libro: libro });

                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    if (error.code === 'auth/email-already-in-use') {
                      this.store.dispatch(
                      PrincipalActions.generarMensajeUsuario(
                      {
                        mensajeUsuario:
                          { mensaje: 'Ya existe un libro con el dni indicado', tipoMensaje: TipoMensaje.Error, observaciones: 'esto es un error' }
                      })
                      )
                    }

                    else {
                      this.store.dispatch(
                        PrincipalActions.generarMensajeUsuario(
                        {
                          mensajeUsuario:
                            { mensaje: 'JKGHAJKGHKSJAGHAJKSHGJAK', tipoMensaje: TipoMensaje.Error, observaciones: 'esto es un error' }
                        })
                        )

                    }


                    return of(LibrosActions.crearLibrosError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


  // ---------------------------------------------------------------------
  // Cargar Libros
  // ---------------------------------------------------------------------
  cargarLibros$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(LibrosActions.cargarLibros),

        switchMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.librosService.ObtenerLibros(action.fol)
              .pipe(

                map(

                  libros => {

                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return LibrosActions.cargarLibrosOK({ libros: libros });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(LibrosActions.cargarLibrosError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


  // eliminarLibro$: Observable<Action> = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(LibrosActions.eliminarLibro),

  //       switchMap(
  //         action => {

  //           this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "eliminando libro" }));
  //           return this.librosService.EliminarLibro(action.uidLibro)
  //             .pipe(

  //               map(

  //                 uidLibro => {
  //                   this.store.dispatch(PrincipalActions.cargadoDatos());
  //                   return LibrosActions.eliminarLibroOK({uidLibro: uidLibro});
  //                 }

  //               ), // Fin map

  //               catchError(
  //                 error => {
  //                   this.store.dispatch(PrincipalActions.cargadoDatos());

  //                   return of(LibrosActions.eliminarLibroError({ error: 'error' }))
  //                 }

  //               )
  //             ) // fin pipe

  //               }
  //     ) // Fin mergeMap

  //   ) // fin this.action$.pipe

  // ); // fin createeffect




  // // ---------------------------------------------------------------------
  // // Cargar Libros
  // // ---------------------------------------------------------------------
  // cargarLibros$: Observable<Action> = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(LibrosActions.cargarLibros),

  //       switchMap(
  //         action => {
  //           this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
  //           return this.librosService.ObtenerLibros(action.fou)
  //             .pipe(

  //               map(

  //                 libros => {

  //                   this.store.dispatch(PrincipalActions.cargadoDatos());
  //                   return LibrosActions.cargarLibrosOK({ libros: libros });
  //                 }

  //               ), // Fin map

  //               catchError(
  //                 error => {
  //                   this.store.dispatch(PrincipalActions.cargadoDatos());
  //                   return of(LibrosActions.cargarLibrosError({ error: 'error' }))
  //                 }

  //               )
  //             ) // fin pipe

  //               }
  //     ) // Fin mergeMap

  //   ) // fin this.action$.pipe

  // ); // fin createeffect

  // ---------------------------------------------------------------------
  // Cargar Libro
  // ---------------------------------------------------------------------
  cargarLibro$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(LibrosActions.cargarLibro),

        mergeMap(
          action => {

            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando libro" }));

            return this.librosService.ObtenerLibroPorUid(action.uidLibro)
              .pipe(
                tap(value => this.store.dispatch(PrincipalActions.cargadoDatos())),

                map(
                  libro => {
                    return LibrosActions.cargarLibroOK({ libro: libro });
                  }

                  ), // Fin map

                  catchError(
                    error => {
                      return of(LibrosActions.cargarLibroError({ error: 'error' }))
                    }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect


  modificarLibro$: Observable<Action> = createEffect(
    () =>
      this.action$.pipe(
        ofType(LibrosActions.modificarLibro),

        switchMap(
          action => {
            this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "cargando" }));
            return this.librosService.ModificarLibro(action.libro)
              .pipe(

                map(

                  libro => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return LibrosActions.modificarLibroOK({ libro: { id: libro.uid, changes: { ...libro } } });
                  }

                ), // Fin map

                catchError(
                  error => {
                    this.store.dispatch(PrincipalActions.cargadoDatos());
                    return of(LibrosActions.modificarLibroError({ error: 'error' }))
                  }

                )
              ) // fin pipe

                }
      ) // Fin mergeMap

    ) // fin this.action$.pipe

  ); // fin createeffect



  // eliminarLibro$: Observable<Action> = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(LibrosActions.eliminarLibro),

  //       switchMap(
  //         action => {

  //           this.store.dispatch(PrincipalActions.cargandoDatos({ mensaje: "eliminando libro" }));
  //           return this.librosService.EliminarLibro(action.uidLibro)
  //             .pipe(

  //               map(

  //                 uidLibro => {
  //                   this.store.dispatch(PrincipalActions.cargadoDatos());
  //                   return LibrosActions.eliminarLibroOK({uidLibro: uidLibro});
  //                 }

  //               ), // Fin map

  //               catchError(
  //                 error => {
  //                   this.store.dispatch(PrincipalActions.cargadoDatos());

  //                   return of(LibrosActions.eliminarLibroError({ error: 'error' }))
  //                 }

  //               )
  //             ) // fin pipe

  //               }
  //     ) // Fin mergeMap

  //   ) // fin this.action$.pipe

  // ); // fin createeffect



  constructor(
    private librosService: LibrosService,
    private action$: Actions,
    private store: Store<RootState>,
    private router: Router) {}

}
