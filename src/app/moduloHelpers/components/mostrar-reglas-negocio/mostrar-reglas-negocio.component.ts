import { ReglaNegocio } from './../../models/reglaNegocio';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-reglas-negocio',
  templateUrl: './mostrar-reglas-negocio.component.html',
  styleUrls: ['./mostrar-reglas-negocio.component.css']
})
export class MostrarReglasNegocioComponent implements OnInit {

  @Input() reglasNegocio: ReglaNegocio[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
