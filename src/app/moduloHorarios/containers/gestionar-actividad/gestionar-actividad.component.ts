import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from './../../models/actividad.model';
import { ModuloHorarioRootState } from './../../store/index';
import { select, Store } from '@ngrx/store';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';

@Component({
  selector: 'app-gestionar-actividad',
  templateUrl: './gestionar-actividad.component.html',
  styleUrls: ['./gestionar-actividad.component.css']
})
export class GestionarActividadComponent implements OnInit {

  actvidad1: Actividad;


  constructor(
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,) {
    }


  ngOnInit(): void {
    this.gestionarSubscripcionesStore()
  }

  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  private gestionarSubscripcionesStore() {

    this.store.pipe(select(FromActividadesSelectors.selectActividadActiva))
      .subscribe(
        actividadActiva => {
            this.actvidad1 = actividadActiva
        }
    );

    this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.actvidad1?.idActividad }));
  }

}
