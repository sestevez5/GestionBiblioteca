import { parametrosHorario } from './../../models/parametrosHorario.model';
import { parametrosGrafico } from './../../models/parametrosGrafico.model';
import { Plantilla } from './../../models/plantilla.model';
import { AuthService } from './../../../moduloAuth/services/auth.service';
import { HorarioService } from '../../services/horario.service';
import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model';

@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.css']
})
export class GestionActividadesComponent implements OnInit {


  actividades: Actividad[];
  parametrosHorario: parametrosHorario;

  constructor(horarioService: HorarioService, usuarios: AuthService) {

    this.actividades = horarioService.obtenerTodasLasActividades();

    this.parametrosHorario = horarioService.obtenerParametrosHorario();


    usuarios.ObtenerUsuarios(null)
      .subscribe(usuario => console.log('usuarios',usuario));
   }



  ngOnInit(): void {



  }
}
