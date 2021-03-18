import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { Plantilla } from './../../models/plantilla.model';
import { Component, OnInit } from '@angular/core';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
import * as FromActividadesSelector from '../../store/actividades/actividades.selectors';

@Component({
  selector: 'app-selector-plantillas',
  templateUrl: './selector-plantillas.component.html',
  styleUrls: ['./selector-plantillas.component.css']
})
export class SelectorPlantillasComponent implements OnInit {

  plantillas: Plantilla[];
  plantillaActual: Plantilla;
  constructor(private store: Store<ModuloHorarioRootState>) {
    this.store.dispatch(FromActividadesActions.cargarPlantillas());
  }

  ngOnInit(): void {

    this.store.pipe(select(FromActividadesSelector.selectTodasLasPlantillas))
    .subscribe(plantillas => {
      this.plantillas = plantillas;
      this.plantillas.length > 0 ?
        this.store.dispatch(FromActividadesActions.seleccionarPlantilla({ plantilla: plantillas[0] }))
        : null;
      }
  )

  this.store.pipe(select(FromActividadesSelector.selectPlantillaActiva))
      .subscribe( plantillaActiva => plantillaActiva? this.plantillaActual = plantillaActiva: null)
}
  }


