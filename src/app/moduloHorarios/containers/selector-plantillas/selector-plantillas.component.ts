import { Observable } from 'rxjs';
import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { Plantilla } from './../../models/plantilla.model';
import { Component, OnInit } from '@angular/core';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
import * as FromActividadesSelectors from '../../store/actividades/actividades.selectors';

@Component({
  selector: 'app-selector-plantillas',
  templateUrl: './selector-plantillas.component.html',
  styleUrls: ['./selector-plantillas.component.css']
})
export class SelectorPlantillasComponent implements OnInit {

  plantillas: Plantilla[];
  plantillaActual: Plantilla;

  constructor(private store: Store<ModuloHorarioRootState>) {
  }

  ngOnInit(): void {
    this.gestionarSubscripcionesStore();
  }

  // ----------------------------------------------------------------
  // Métodos que atienden a las acciones del usuario
  // ----------------------------------------------------------------
  onPlantillaSeleccionada(plantillaSeleccionada: Plantilla) {
    this.store.dispatch(FromActividadesActions.seleccionarPlantilla({ plantilla: plantillaSeleccionada }));
  }

  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  gestionarSubscripcionesStore() {

    // 1.- Subscripcion a la colección de plantillas disponibles
    this.store.pipe(select(FromActividadesSelectors.selectTodasLasPlantillas))
      .subscribe(plantillas => {
        this.plantillas = plantillas;
        const plantillasPorDefecto: Plantilla[] = this.plantillas.filter(pl => pl.plantillaPorDefecto);

        plantillasPorDefecto.length? // En el caso de que encontremos alguna plantilla seleccionamos por defecto la primera de ellas.
          this.store.dispatch(FromActividadesActions.seleccionarPlantilla({ plantilla: plantillasPorDefecto[0] }))
          : null;
      });

    // 2.- Subscripción a la plantilla activa.
    this.store.pipe(select(FromActividadesSelectors.selectPlantillaActiva))
      .subscribe( plantillaActiva => plantillaActiva? this.plantillaActual = plantillaActiva: null)

  }

}




