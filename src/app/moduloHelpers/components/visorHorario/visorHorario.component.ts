import { ActividadG } from '../../models/actividadG.model';
import { IParametrosGrafico } from '../../models/IParametrosGrafico.model';
import { DiaSemana } from '../../models/diaSemana.model';
import { reducers } from '../../../reducers/app.reducer';
import { HorarioG } from '../../models/horarioG.model';
import { Component, Input, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model'
import * as d3 from 'd3';

@Component({
  selector: 'app-visor-horario',
  templateUrl: './visorHorario.component.html',
  styleUrls: ['./visorHorario.component.css']
})
export class VisorHorarioComponent implements OnInit {

  @Input() Actividades: Actividad[];
  horarioG: HorarioG

  constructor() { }

  ngOnInit(): void {

    this.horarioG = new HorarioG('div#horario',this.Actividades);

  }








}

