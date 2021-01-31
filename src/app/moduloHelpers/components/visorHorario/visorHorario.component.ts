import { Observable } from 'rxjs';
import { ContenidoActividad } from './../../models/contenidoActividad.model';
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
  horarioG: HorarioG;
  evento$: Observable<ActividadG>;

  constructor() { }

  ngOnInit(): void {

    this.horarioG = new HorarioG('div#horario', this.Actividades);
    this.evento$ = this.horarioG.eventos$;
    this.evento$.subscribe(
      evento => console.log('se ha seleccionado la actividad: ', evento.idActividad)
    )



  }

  onActualizar() {

    const a = new Actividad();
    a.idActividad = '3'
    a.sesion = { horaInicio: '06:59am', horaFin: '12:30pm', diaSemana: 'M' }
    a.contenido = { contenido: 'prueba' }

    const ar = [];
    ar.push(a);
    this.horarioG.anyadirActualizarActividades(ar);


  }




  }










