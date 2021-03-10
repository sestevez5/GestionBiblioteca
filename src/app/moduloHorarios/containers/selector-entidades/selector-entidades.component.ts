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

@Component({
  selector: 'app-selector-entidades',
  templateUrl: './selector-entidades.component.html',
  styleUrls: ['./selector-entidades.component.css']
})
export class SelectorEntidadesComponent implements OnInit {

  TiposEntidadesHorario = EnumTipoEntidadHorario;

  tipoEntidadSeleccionada: EnumTipoEntidadHorario = EnumTipoEntidadHorario.DOCENTE;


  entidades: EntidadHorario[] = [];

  constructor(usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {
    this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }))
  }

  ngOnInit(): void {

    this.store.pipe(
      select(FromEntidadesHorarioSelectors.selectTodasLasEntidadesHorario)
    )
    .subscribe( entidadesHorario =>  this.entidades = entidadesHorario )

  }


  onItemsSeleccionados(item: string) {

    console.log(item);

  }

  onSeleccionarEntidad(item: string) {


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


