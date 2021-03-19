// Elementos del Framework
import { Component } from '@angular/core';

// Entidades
import { EnumTipoEntidadHorario } from '../../models/tipoEntidadHorario.model';

// Elementos relativos a. STORE
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';
import { Store } from '@ngrx/store';
import { ModuloHorarioRootState } from '../../store/index';


@Component({
  selector: 'app-gestion-horario',
  templateUrl: './gestion-horario.component.html',
  styleUrls: ['./gestion-horario.component.css']
})
export class GestionHorarioComponent {


  constructor(private store: Store<ModuloHorarioRootState>) {

    // Solicitud de carga de entidades de tipo docente.
    this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }));

    // Solicitud de carga de los parámetros del horario.
    this.store.dispatch(FromActividadesActions.cargarParametrosHorario());

   }


}






