import { entidadesHorarioEffects } from './../../store/entidadesHorario/entidadesHorario.effects';
import { entidadesHorarioState } from './../../store/entidadesHorario/entidadesHorario.state';
import { EnumTipoEntidadHorario } from './../../models/tipoEntidadHorario.model';
import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { Observable } from 'rxjs';
import { Docente } from './../../models/docente.model';
import { AuthService } from './../../../moduloAuth/services/auth.service';
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import * as FromEntidadesHorarioSelectors from '../../store/entidadesHorario/entidadesHorario.selectors';
import { Component, OnInit} from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-selector-entidades',
  templateUrl: './selector-entidades.component.html',
  styleUrls: ['./selector-entidades.component.css']
})
export class SelectorEntidadesComponent implements OnInit {

  TiposEntidadesHorario = EnumTipoEntidadHorario;

  // Tipo de entidad seleccionada: Docente, Grupos, ....
  tipoEntidadSeleccionada: EnumTipoEntidadHorario | undefined;

  // Entidades a mostrar
  entidades: EntidadHorario[] = [];

  // Entidad que se ha seleccionado.
  entidadHorarioSeleccionada: any;


  constructor(usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {

  }

  ngOnInit(): void {

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectTodasLasEntidadesHorario))
      .subscribe(entidadesHorario => this.entidades = entidadesHorario);

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectEntidadHorarioActiva))
      .subscribe(entidadHorarioActiva => this.entidadHorarioSeleccionada = entidadHorarioActiva)

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectTipoEntidadActiva))
      .subscribe(tipoEntidadActiva => this.tipoEntidadSeleccionada = tipoEntidadActiva)

  }


  onSeleccionarItem(item: any) {
    const entidadHorario = item as EntidadHorario;
    this.store.dispatch(FromEntidadesHorarioActions.seleccionarEntidadHorario({ entidadHorario: entidadHorario, tipoEntidadHorario: entidadHorario.tipoEntidad }))
  }

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


}


