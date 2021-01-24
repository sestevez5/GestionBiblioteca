import { HorarioG } from './../../../moduloHelpers/models/horarioG.model';
import { HorarioService } from './../../../moduloHelpers/services/horario.service';

import { Actividad } from '../../../moduloHelpers/models/actividad.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-horario',
  templateUrl: './demo-horario.component.html',
  styleUrls: ['./demo-horario.component.css']
})
export class DemoHorarioComponent implements OnInit {


  actividades: Actividad[];

  constructor(horarioService: HorarioService) {



    this.actividades = horarioService.obtenerTodasLasActividades();
    var hg = new HorarioG(this.actividades);

  
    console.log(hg.obtenerDiasSemanaHorario());

   }



  ngOnInit(): void {



  }

}
