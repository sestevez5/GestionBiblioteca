import { HorarioService } from './../../../moduloHelpers/services/horario.service';

import { Actividad } from '../../../moduloHelpers/models/actividad.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-horario',
  templateUrl: './demo-horario.component.html',
  styleUrls: ['./demo-horario.component.css']
})
export class DemoHorarioComponent implements OnInit {



  constructor(horarioService: HorarioService) {

    var actividades: Actividad[];

    actividades = horarioService.obtenerTodasLasActividades();

    var diasSemana = horarioService.obtenerDiasSemana(actividades);

    console.log(diasSemana);


   }



  ngOnInit(): void {



  }

}
