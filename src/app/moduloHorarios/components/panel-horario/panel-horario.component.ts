import { ActividadG } from '../../models/actividadG.model';
import { Observable } from 'rxjs';
import { HorarioG } from '../../models/horarioG.model';
import { Component, Input, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model';

@Component({
  selector: 'app-panel-horario',
  templateUrl: './panel-horario.component.html',
  styleUrls: ['./panel-horario.component.css']
})
export class PanelHorarioComponent implements OnInit {


  @Input() Actividades: Actividad[];
  horarioG: HorarioG;
  evento$: Observable<ActividadG>;

  constructor() { }

  ngOnInit(): void {

    this.horarioG = new HorarioG('div#horario', this.Actividades);
    this.evento$ = this.horarioG.eventos$;



  }

  onActualizar() {

    const a = new Actividad();
    a.idActividad = '3'
    a.sesion = { idSesion:'1', horaInicio: '06:59am', horaFin: '12:30pm', diaSemana: 'M' }
    a.contenido = { contenido: 'prueba' }

    const ar = [];
    ar.push(a);
    this.horarioG.anyadirActualizarActividades(ar);


  }
}
