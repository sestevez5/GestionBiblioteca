import { Plantilla } from '../../models/plantilla.model';
import { EnumTipoEntidadHorario } from '../../models/tipoEntidadHorario.model';
import { ModuloHorarioRootState } from '../../store/index';
import { Store, select } from '@ngrx/store';
import { parametrosHorario } from '../../models/parametrosHorario.model';
import { AuthService } from '../../../moduloAuth/services/auth.service';
import { HorarioService } from '../../services/horario.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Actividad } from '../../models/actividad.model';
import { EntidadHorario } from '../../models/entidadHorario.model'
import * as FromActividadesSelector from '../../store/actividades/actividades.selectors';
import * as FromEntidadesHorarioActions from '../../store/entidadesHorario/entidadesHorario.actions';
import * as FromActividadesActions from '../../store/actividades/actividades.actions';


@Component({
  selector: 'app-gestion-horario',
  templateUrl: './gestion-horario.component.html',
  styleUrls: ['./gestion-horario.component.css']
})
export class GestionHorarioComponent implements OnInit {


  actividades: Actividad[];
  parametrosHorario: parametrosHorario;
  entidadHorarioActiva: EntidadHorario | undefined;


  constructor(horarioService: HorarioService, usuarios: AuthService, private store: Store<ModuloHorarioRootState>) {

    // Solicitud de carga de entidades de tipo docente.
    this.store.dispatch(FromEntidadesHorarioActions.cargarEntidadesHorario({ tipoEntidad: EnumTipoEntidadHorario.DOCENTE }));

    this.parametrosHorario = horarioService.obtenerParametrosHorario();
   }

  ngOnInit(): void {

    this.store.pipe(select(FromActividadesSelector.selectTodasLasActividades))
      .subscribe(actividades => this.actividades = actividades);


  }

}






