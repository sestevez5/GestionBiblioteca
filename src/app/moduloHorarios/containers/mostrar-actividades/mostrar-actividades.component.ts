import { Router } from '@angular/router';
import { Actividad } from './../../models/actividad.model';
import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { ParametrosHorario } from './../../models/parametrosHorario.model';
import { ActividadG } from '../../models/actividadG.model';
import { combineLatest, Observable } from 'rxjs';
import { HorarioG } from '../../models/graficoHorario/GraficoHorario';

import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';

import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-mostrar-actividades',
  templateUrl: './mostrar-actividades.component.html',
  styleUrls: ['./mostrar-actividades.component.css']
})
export class MostrarActividadesComponent implements OnInit {


  // @Input() Actividades: Actividad[];
  ParametrosHorario: ParametrosHorario;
  // @Input() idPlantillaActual: number = 0;
  x: Observable<ParametrosHorario>;


  horarioG: HorarioG;
  @Output() actividadSeleccionadaEvent = new EventEmitter<ActividadG>();
  @Output() cambioSesionActividadEvent = new EventEmitter<Actividad>();


  constructor(private store: Store<ModuloHorarioRootState>, private router: Router) { }

  ngOnInit(): void {

    this.horarioG = new HorarioG('div#horario');
    this.horarioG.seleccionActividad$.subscribe(actividad => {
      this.actividadSeleccionadaEvent.emit(actividad);
      this.store.dispatch( FromActividadesActions.cargarActividad({ idActividad: actividad.idActividad }))
    });

    this.horarioG.moverActividad$.subscribe(actividad => {
      this.cambioSesionActividadEvent.emit(actividad);
      this.store.dispatch( FromActividadesActions.modificarActividad({ actividad: actividad }))
    });

    this.horarioG.duplicarActividad$.subscribe(actividad => {
      this.store.dispatch( FromActividadesActions.crearActividad({ actividad: actividad }))
    });

    this.horarioG.eliminarActividad$.subscribe(actividad => {
      this.store.dispatch( FromActividadesActions.eliminarActividad({ idActividad: actividad.idActividad }))
    });

    this.horarioG.anyadirActividadEnSesion.subscribe(sesion => {
      this.router.navigate(['horarios','nuevaActividad'], { queryParams: { returnUrl: 'horarios/index', idSesion: sesion.idSesion} });
    });

    this.gestionarSubscripcionesStore();


  }



  onActualizar() {
  }

  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  private gestionarSubscripcionesStore() {
    var Obs1$ = this.store.pipe(select(FromActividadesSelectors.selectParametrosHorario));
    var Obs2$ = this.store.pipe(select(FromActividadesSelectors.selectPlantillaActiva));
    var Obs3$ = this.store.pipe(select(FromActividadesSelectors.selectTodasLasActividades));
    var combine$ = combineLatest([Obs1$, Obs2$, Obs3$])
      .pipe(
        map(combination => {
          return { paremetrosHorario: combination[0], plantillaActiva: combination[1], actividades: combination[2] }
        })
      )
      .subscribe(

        combination => {

          if (combination.paremetrosHorario && combination.plantillaActiva)
          {
            this.horarioG.renderizarGrafico(combination.paremetrosHorario, combination.plantillaActiva);
            if (combination.actividades) this.horarioG.actualizarActividades(combination.actividades);
          }
        }
      );
  }

}
