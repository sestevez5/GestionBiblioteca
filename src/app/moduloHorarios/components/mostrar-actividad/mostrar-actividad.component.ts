import { Actividad } from './../../models/actividad.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-actividad',
  templateUrl: './mostrar-actividad.component.html',
  styleUrls: ['./mostrar-actividad.component.css']
})
export class MostrarActividadComponent implements OnInit {

  @Input() actividad: Actividad;

  constructor() { }

  ngOnInit(): void {

  }

}
