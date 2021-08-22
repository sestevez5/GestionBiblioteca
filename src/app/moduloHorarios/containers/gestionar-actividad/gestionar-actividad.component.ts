import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from './../../models/actividad.model';
import { ModuloHorarioRootState } from './../../store/index';
import { select, Store } from '@ngrx/store';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';

@Component({
  selector: 'app-gestionar-actividad',
  templateUrl: './gestionar-actividad.component.html',
  styleUrls: ['./gestionar-actividad.component.css']
})
export class GestionarActividadComponent implements OnInit {

  actividad: Actividad;
  returnUrl: string;
  @Output() finGestionActividad: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,
    private router: Router) {

      this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
            this.returnUrl = params['returnUrl']
        }
      });
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
            this.actividad = actividadActiva
        }
    );

    this.actividad?this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.actividad?.idActividad })):null;
  }

  onEditarActividad(actividad: Actividad) {
    this.router.navigate(['horarios','editarActividad',actividad.idActividad], { queryParams: { returnUrl: 'horarios/index'}});
  }

  onEliminarActividad(actividad: Actividad) {

    this.store
    .pipe(
      select(FromActividadesSelectors.selectGestionandoActividad),
      filter(gestionandoActividad => !gestionandoActividad)
    )
    .subscribe(
      creandoModificandoActividad => {

        this.finGestionActividad.emit(true);

      }
    );

    this.store.dispatch(FromActividadesActions.eliminarActividad({ idActividad: actividad.idActividad }));

  }

}
