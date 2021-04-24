import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { ParametrosHorario } from './../../models/parametrosHorario.model';
import { ActividadG } from '../../models/actividadG.model';
import { combineLatest, Observable } from 'rxjs';
import { HorarioG } from '../../models/graficoHorario/GraficoHorario';

import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
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
  @Output() actividadSeleccionadaEvent= new EventEmitter<ActividadG>();


  constructor(private store: Store<ModuloHorarioRootState>) { }

  ngOnInit(): void {

    this.horarioG = new HorarioG('div#horario');
    this.horarioG.eventos$.subscribe(actividad => this.actividadSeleccionadaEvent.emit(actividad));
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



  onActualizar() {
    // const a = new Actividad();
    // a.idActividad = '3'
    // a.idSesion = 'P1M2'
    // a.contenido = { contenido: 'prueba'}

    // const ar = [];
    // ar.push(a);
    // this.horarioG.anyadirActualizarActividades(ar);


  }

}
