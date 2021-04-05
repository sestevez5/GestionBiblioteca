import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from './../../models/actividad.model';
import { ModuloHorarioRootState } from './../../store/index';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';

@Component({
  selector: 'app-gestionar-actividad',
  templateUrl: './gestionar-actividad.component.html',
  styleUrls: ['./gestionar-actividad.component.css']
})
export class GestionarActividadComponent implements OnInit {

  actividad: Actividad;
  idActividad: string;
  constructor(
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.idActividad = this.route.snapshot.paramMap.get("id");

    if (this.idActividad) {

      this.store
        .pipe(
          select(FromActividadesSelectors.selectActividadActiva),
          filter(actividad => !!actividad)
        )
        .subscribe(
          actividadActiva => {
            this.actividad = actividadActiva
          }
      );

      this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.idActividad }))
    }
  }

}
