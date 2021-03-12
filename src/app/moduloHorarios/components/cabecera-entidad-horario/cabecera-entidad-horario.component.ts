import { ModuloHorarioRootState } from './../../store/index';
import { Store, select } from '@ngrx/store';
import { EntidadHorario } from './../../models/entidadHorario.model';
import { Component, Input, OnInit } from '@angular/core';
import * as FromEntidadesHorarioSelectors from '../../store/entidadesHorario/entidadesHorario.selectors';

@Component({
  selector: 'app-cabecera-entidad-horario',
  templateUrl: './cabecera-entidad-horario.component.html',
  styleUrls: ['./cabecera-entidad-horario.component.css']
})
export class CabeceraEntidadHorarioComponent implements OnInit {

  entidadHorario: EntidadHorario | undefined;

  constructor(private store: Store<ModuloHorarioRootState>) { }

  ngOnInit(): void {

    this.store.pipe(select(FromEntidadesHorarioSelectors.selectEntidadHorarioActiva))
      .subscribe(entidadHorarioActiva => this.entidadHorario = entidadHorarioActiva);
    
  }

}