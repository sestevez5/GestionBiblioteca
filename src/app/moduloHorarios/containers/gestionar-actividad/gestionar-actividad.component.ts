import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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

  actividad: Actividad;


  constructor(
    private store: Store<ModuloHorarioRootState>,
    private route: ActivatedRoute,
    private router: Router) {
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

    this.store.dispatch(FromActividadesActions.cargarActividad({ idActividad: this.actividad?.idActividad }));
  }

  onEditarActividad(actividad: Actividad) {
    this.router.navigate(['horarios','editarActividad',actividad.idActividad], { queryParams: { returnUrl: 'horarios/index'}});
  }

}
