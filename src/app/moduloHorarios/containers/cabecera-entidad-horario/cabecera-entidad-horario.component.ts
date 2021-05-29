import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { Component, OnInit } from '@angular/core';
import * as FromEntidadesHorarioSelectors from '../../store/entidadesHorario/entidadesHorario.selectors';
import { TipoEntidadHorario } from '../../models/tipoEntidadHorario.model';


@Component({
  selector: 'app-cabecera-entidad-horario',
  templateUrl: './cabecera-entidad-horario.component.html',
  styleUrls: ['./cabecera-entidad-horario.component.css']
})
export class CabeceraEntidadHorarioComponent implements OnInit {

  entidadHorario: EntidadHorario | undefined;
  tipoEntidadActiva: TipoEntidadHorario | undefined

  constructor(private store: Store<ModuloHorarioRootState>) {

  }

  ngOnInit(): void {
    this.gestionarSubscripcionesStore();
  }

  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  private gestionarSubscripcionesStore() {

    // Obtener entidad activa
    this.store.pipe(select(FromEntidadesHorarioSelectors.selectEntidadHorarioActiva))
    .subscribe(entidadHorarioActiva => this.entidadHorario = entidadHorarioActiva);

    // Obtener tipo de entidad activa
    this.store.pipe(select(FromEntidadesHorarioSelectors.selectTipoEntidadActiva))
    .subscribe(tipoEntidadActiva => this.tipoEntidadActiva = tipoEntidadActiva);
  }

}
