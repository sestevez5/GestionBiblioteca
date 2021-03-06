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

import * as ActividadesActions from '../../store/actividades/actividades.actions';
import * as FromActividadesSelector from '../../store/actividades/actividades.selectors';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.css']
})
export class GestionActividadesComponent implements OnInit {


  actividades: Actividad[];
  parametrosHorario: parametrosHorario;


  constructor(horarioService: HorarioService, usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {

    this.store.dispatch(ActividadesActions.cargarActividades())
    

    this.parametrosHorario = horarioService.obtenerParametrosHorario();

   }

  ngOnInit(): void {

    this.store.pipe(
      select(FromActividadesSelector.selectTodasLasActividades)
    )
      .subscribe(
        actividades => {


          this.actividades = actividades;

          console.log('las actividades son:', actividades);
      }
    )



  }



}






