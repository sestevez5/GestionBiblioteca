import { EnumTipoEntidadHorario } from './../../models/tipoEntidadHorario.model';
import { ModuloHorarioRootState } from './../../store/index';
import { Usuario } from './../../../moduloAuth/models/usuario.model';
import { cargarActividades } from './../../store/actividades/actividades.actions';
import { Store, select } from '@ngrx/store';
import { parametrosHorario } from './../../models/parametrosHorario.model';
import { parametrosGrafico } from './../../models/parametrosGrafico.model';
import { Plantilla } from './../../models/plantilla.model';
import { AuthService } from './../../../moduloAuth/services/auth.service';
import { HorarioService } from '../../services/horario.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Actividad } from '../../models/actividad.model';
import { EntidadHorario } from '../../models/entidadHorario.model'
import * as ActividadesActions from '../../store/actividades/actividades.actions';
import * as FromActividadesSelector from '../../store/actividades/actividades.selectors';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';


@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.css']
})
export class GestionActividadesComponent implements OnInit {


  actividades: Actividad[];
  parametrosHorario: parametrosHorario;

  entidadHorarioActiva: EntidadHorario | undefined;


  constructor(horarioService: HorarioService, usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {

    // Solicitud de carga de actividades.
    this.store.dispatch(ActividadesActions.cargarActividades());

    // Solicitud de carga de entidades de tipo docente.
    this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }));

    
    this.parametrosHorario = horarioService.obtenerParametrosHorario();
   }

  ngOnInit(): void {

    this.store.pipe(select(FromActividadesSelector.selectTodasLasActividades))
    .subscribe(actividades => this.actividades = actividades);



  }



}






