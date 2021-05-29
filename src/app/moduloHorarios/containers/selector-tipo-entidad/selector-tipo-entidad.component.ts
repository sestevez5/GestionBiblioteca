import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { EnumTipoEntidadHorario } from '../../models/tipoEntidadHorario.model';
import * as FromEntidadesHorarioSelectors from '../../store/entidadesHorario/entidadesHorario.selectors';
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-tipo-entidad',
  templateUrl: './selector-tipo-entidad.component.html',
  styleUrls: ['./selector-tipo-entidad.component.css']
})

export class SelectorTipoEntidadComponent implements OnInit {

  TiposEntidadesHorario = EnumTipoEntidadHorario;

  // Tipo de entidad seleccionada: Docente, Grupos, ....
  tipoEntidadSeleccionada: EnumTipoEntidadHorario;

  constructor(private store: Store<ModuloHorarioRootState>) {

  }

  ngOnInit(): void {
    this.gestionarSubscripcionesStore();
  }



  // ----------------------------------------------------------------
  // Métodos que atienden a las acciones del usuario
  // ----------------------------------------------------------------
  onSeleccionarTipoEntidad(item: string) {

    this.tipoEntidadSeleccionada = item as EnumTipoEntidadHorario;

    switch (this.tipoEntidadSeleccionada) {

      case EnumTipoEntidadHorario.DOCENTE:
        this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }));
      break;

      case EnumTipoEntidadHorario.GRUPO:
        this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.GRUPO}));
      break;

      case EnumTipoEntidadHorario.DEPENDENCIA:
        this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DEPENDENCIA}));
      break;

      default:
        this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.GRUPO}));
      break;

    }
  }

  // ----------------------------------------------------------------
  // Métodos privados
  // ----------------------------------------------------------------
  gestionarSubscripcionesStore() {
    this.store.pipe(select(FromEntidadesHorarioSelectors.selectTipoEntidadActiva))
    .subscribe(tipoEntidadActiva1 => this.tipoEntidadSeleccionada = tipoEntidadActiva1?.tipoEntidadHorario );

  }

}
