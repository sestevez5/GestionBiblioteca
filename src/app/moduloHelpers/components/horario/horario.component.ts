import { DiaSemana } from './../../models/diaSemana.model';
import { reducers } from './../../../reducers/app.reducer';
import { HorarioG } from './../../models/horarioG.model';
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

  private parametrosGrafico: IParametrosGrafico = {

    // Parámetros generales
    grafico: {
      colorGrafico: 'red',

      anchoGrafico:       1200,
      altoGrafico:        400,

      margenGrafico: {
        margenInferiorGrafico:     30,
        margenDerechoGrafico:      30,
        margenSuperiorGrafico:     30,
        margenIzquierdoGrafico:    50,
      }
    },

    panelHorario: {
      altoPanelHorario:     undefined,
      colorPanelHorario:    'blue',
      anchoPanelHorario:    undefined,
      posXPanelHorario:     undefined,
      posYPanelHorario:     undefined
    },

    panelDiaSemana: {
      colorPanelDiaSemana: 'yellow',
    },

    escalas: {
      escalaVertical: undefined,
      escalaHorizontal: undefined
    }

  }



  constructor() { }

  ngOnInit(): void {

    this.generarGraficoHorario(this.Actividades, 'div#horario');

  }

  generarGraficoHorario(actividades: Actividad[], elementoDom: string) {

    // PASO 0: GENERAR LA ESTRUCTURA DE DATOS A PARTIR DE LAS ACTIVIDADES:
    // Antes de cualquier construcción es necesario definir los parámetros.
    // Algunos de ellos dependen de los datos a visualizar
    var datos = new HorarioG(actividades);

    // PASO 1: Establecimiento de parámetros:
    // Antes de cualquier construcción es necesario definir los parámetros.
    // Algunos de ellos dependen de los datos a visualizar
    const param: IParametrosGrafico = this.inicializarParametros(datos);

    //PASO 3: Añadir el svg que contendrá el gráfico
    const svg = this.anyadirSvg(elementoDom, param);

    //PASO 4: Añadir el panel que mostrará el horario.
    const panelHorario = this.anyadirPanelHorario(svg, param);

    //PASO 5: Añadir las franjas de cada día de la semana
    //devolverá los elementos que representan a cada día de la semana
    const panelesDiasSemana = this.anyadirPanelesDiasSemana(panelHorario, param, datos);

    //PASO 6: Añadir las actividades a cada día de la semana.



  }

  anyadirPanelesDiasSemana(elementoDOM: any, param: IParametrosGrafico, datos: HorarioG) {

    const aux = elementoDOM.selectAll('g#panelDiaSemana').data(datos.obtenerDiasSemanaHorario());
    const panelesDiasSemana = aux.enter().append('g');

    panelesDiasSemana.merge(aux)
      .attr('id', (d: DiaSemana) => 'panelDiaSemana_' + d.codigo)
      .attr('class', 'panelDiaSemana')

    panelesDiasSemana
      .append('rect')
      .attr('id', (d: DiaSemana) => 'fondDiaSemana_' + d.codigo)
      .attr('class', 'fondoDiaSemana')
      .attr('fill', param.panelDiaSemana.colorPanelDiaSemana)
      .attr('x', (d: DiaSemana) => param.escalas.escalaHorizontal?param.escalas.escalaHorizontal(d.denominacionLarga):0)
      .attr('width', param.escalas.escalaHorizontal?.bandwidth)
      .attr('height', param.panelHorario.altoPanelHorario)

    panelesDiasSemana.exit().remove();

    return panelesDiasSemana;
  }

  anyadirPanelHorario(svg: any, param: IParametrosGrafico) {

    const panelHorario = svg.append('g')
      .attr('id', 'panelHorario')
      .attr('transform', `translate(${param.grafico.margenGrafico.margenIzquierdoGrafico},${param.grafico.margenGrafico.margenSuperiorGrafico})`)

    panelHorario.append('rect')
      .attr('id', 'fondoPanelHorario')
      .attr('width', param.panelHorario.anchoPanelHorario)
      .attr('height', param.panelHorario.altoPanelHorario)
      .attr('fill', param.panelHorario.colorPanelHorario);

    panelHorario.append('g')
      .attr('class', 'ejeX')
      .call(d3.axisTop(param.escalas.escalaHorizontal as d3.ScaleBand<string>))

    var ejeY = d3.axisLeft(param.escalas.escalaVertical);





    ejeY.tickFormat(function(d){ return d3.timeFormat('')(d)});

    ejeY.ticks(d3.timeMinute.every(60));

    panelHorario.append('g')
      .attr('class', 'ejeY')
      .call(ejeY)

    return panelHorario;

  }


  anyadirSvg(elementoDom: string, param: IParametrosGrafico) {
    const svg = d3.select(elementoDom).append('svg');

    svg
      .attr('width', param.grafico.anchoGrafico)
      .attr('height', param.grafico.altoGrafico)

    svg.append('rect')
      .attr('width', '100%')
      .attr('height','100%')
      .attr('id', 'fondografico')
      .attr('fill', param.grafico.colorGrafico)



    return svg;
  }

  inicializarParametros(datos: HorarioG) {

    const param = this.parametrosGrafico;

    // Establecer dimensiones del panel que contiene las barras.
    param.panelHorario.anchoPanelHorario = param.grafico.anchoGrafico - param.grafico.margenGrafico.margenIzquierdoGrafico - param.grafico.margenGrafico.margenDerechoGrafico;
    param.panelHorario.altoPanelHorario = param.grafico.altoGrafico - param.grafico.margenGrafico.margenInferiorGrafico - param.grafico.margenGrafico.margenSuperiorGrafico;
    param.panelHorario.posXPanelHorario = param.grafico.margenGrafico.margenIzquierdoGrafico;
    param.panelHorario.posYPanelHorario = param.grafico.margenGrafico.margenSuperiorGrafico;

    // Establecer escala horizontal: Serán bandas que identifiquen a los días de la semana
    param.escalas.escalaHorizontal = d3.scaleBand()
      .domain(datos.obtenerDiasSemanaHorario().map(ds=> ds.denominacionLarga))
      .range([0, param.panelHorario.anchoPanelHorario])
      .paddingInner(0.01)
      .paddingOuter(0.01);

    // Establecer escala vertical:

    console.log('minimo en tiempo: ', datos.minimoIntervaloTemporal());
    console.log('máximo en tiempo: ', datos.maximoIntervaloTemporal());


    param.escalas.escalaVertical = d3.scaleTime()
      .domain([datos.minimoIntervaloTemporal(), datos.maximoIntervaloTemporal()])
      .range([0, param.panelHorario.altoPanelHorario])

    return this.parametrosGrafico;

  }




}


interface IParametrosGrafico {

  // Parámetros del gráfico, en general.
  grafico: {
    colorGrafico: string;
    anchoGrafico:     number;
    altoGrafico: number;
    margenGrafico: {
      margenIzquierdoGrafico:  number;
      margenDerechoGrafico:    number;
      margenSuperiorGrafico:   number;
      margenInferiorGrafico:   number;
    };
  }

  panelHorario: {
    anchoPanelHorario: number | undefined;
    altoPanelHorario: number | undefined;
    posXPanelHorario: number | undefined;
    posYPanelHorario: number | undefined;
    colorPanelHorario: string;
  }

  panelDiaSemana: {
    colorPanelDiaSemana: string;
  }
  escalas: {
    escalaVertical: any;
    escalaHorizontal: any;
  }


}
