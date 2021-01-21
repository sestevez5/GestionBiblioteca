import { Component, Input, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model'
import * as d3 from 'd3';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  @Input() Actividades: Actividad[];



  constructor() { }

  ngOnInit(): void {


  }



}
