import { selectTipoEntidadActiva } from './../../store/entidadesHorario/entidadesHorario.selectors';
import { EnumTipoEntidadHorario, TipoEntidadHorario } from '../../models/tipoEntidadHorario.model';
import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { EntidadHorario } from './../../models/entidadHorario.model';
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

  // Tipo de entidad seleccionada: Docente, Grupos, ....
  tipoEntidadSeleccionada: TipoEntidadHorario | undefined;

  // Entidades a mostrar
  entidades: EntidadHorario[] = [];

  // Entidad que se ha seleccionado.
  entidadHorarioSeleccionada: any;

  constructor(usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {
  }

  ngOnInit(): void {
    this.gestionarSubscripcionesStore();
  }


  //--------------------------------------------------
  // Métodos controladores de eventos
  //--------------------------------------------------
  onSeleccionarItem(item: any) {
    const entidadHorario = item as EntidadHorario;
    this.store.dispatch(FromEntidadesHorarioActions.seleccionarEntidadHorario({ entidadHorario: entidadHorario, tipoEntidadHorario: entidadHorario.tipoEntidad }))
  }


  //--------------------------------------------------
  // Métodos privados
  //--------------------------------------------------
  private gestionarSubscripcionesStore() {

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectTodasLasEntidadesHorario))
      .subscribe(entidadesHorario => this.entidades = entidadesHorario);

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectEntidadHorarioActiva))
      .subscribe(entidadHorarioActiva => this.entidadHorarioSeleccionada = entidadHorarioActiva)

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectTipoEntidadActiva))
      .subscribe(tipoEntidadActiva => {
        this.tipoEntidadSeleccionada = tipoEntidadActiva ? tipoEntidadActiva : null;
      });


  }

  private obtenerCamposConfig(): object {
    if (this.tipoEntidadSeleccionada.tipoEntidadHorario === EnumTipoEntidadHorario.DOCENTE)
      return { texto: 'descripcion', imagen: 'imagen', leyenda: 'detalle' };
    return { texto: 'descripcion', leyenda: 'detalle' };
  }



}


