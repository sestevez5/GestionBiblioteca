import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { parametrosHorario } from './../../models/parametrosHorario.model';
import { Plantilla } from './../../models/plantilla.model';
import { ActividadG } from '../../models/actividadG.model';
import { Observable } from 'rxjs';
import { HorarioG } from '../../models/horarioG.model';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Actividad } from '../../models/actividad.model';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';

@Component({
  selector: 'app-panel-horario',
  templateUrl: './panel-horario.component.html',
  styleUrls: ['./panel-horario.component.css']
})
export class PanelHorarioComponent implements OnInit {


  @Input() Actividades: Actividad[];
  @Input() ParametrosHorario: parametrosHorario;
  @Input() idPlantillaActual: number = 0;


  horarioG: HorarioG;
  evento$: Observable<ActividadG>;

  constructor(private store: Store<ModuloHorarioRootState>) { }

  ngOnInit(): void {


    this.horarioG = new HorarioG('div#horario', this.ParametrosHorario, this.Actividades, this.idPlantillaActual);
    this.evento$ = this.horarioG.eventos$;

    this.store.pipe(
      select(FromActividadesSelectors.selectTodasLasActividades)
    )
      .subscribe(
      actividades => this.horarioG.anyadirActualizarActividades(actividades)
    )


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
