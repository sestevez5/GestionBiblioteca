import { ActividadG } from './../../models/actividadG.model';
import { IParametrosGrafico } from './../../models/IParametrosGrafico.model';
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

  constructor() { }

  ngOnInit(): void {
    this.generarGraficoHorario(this.Actividades, 'div#horario')
  }



  generarGraficoHorario(actividades: Actividad[], elementoDom: string) {

    // PAS01: Crear la estructura de datos.
    var datos = new HorarioG(actividades);

    // PASO 2: Establecer parámetros
    const param: IParametrosGrafico = this.inicializarParametros(datos);

    // PASO 3: Añadir el svg que contendrá el gráfico
    const svg = this.anyadirSvg(elementoDom, param);

    // PASO 4: Añadir el panel que mostrará el horario.
    const panelHorario = this.anyadirPanelHorario(svg, param);

    // PASO 5: Añadir las franjas de cada día de la semana
    //devolverá los elementos que representan a cada día de la semana
    this.anyadirPanelesDiasSemana(panelHorario, param, datos);

    // PASO 6: Añadir las actividades a cada día de la semana.
    this.anyadirPanelesActividades(param, datos);



  }

  private inicializarParametros(datos: HorarioG) {

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

  private anyadirSvg(elementoDom: string, param: IParametrosGrafico) {
    //-------------------------------------------------
    // Definición del SVG
    //-------------------------------------------------
    const svg = d3.select(elementoDom).append('svg');
    svg
      .attr('width', param.grafico.anchoGrafico)
      .attr('height', param.grafico.altoGrafico)

    //-------------------------------------------------
    // Definición del rectángulo
    //-------------------------------------------------
    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('id', 'fondografico')
      .attr('fill', param.grafico.colorGrafico);

    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return svg;

  }

  private anyadirPanelHorario(svg: any, param: IParametrosGrafico) {

    //-------------------------------------------------
    // Definición del panel
    //-------------------------------------------------
    const panelHorario = svg.append('g')
      .attr('id', 'panelHorario')
      .attr('transform', `translate(${param.grafico.margenGrafico.margenIzquierdoGrafico},${param.grafico.margenGrafico.margenSuperiorGrafico})`)

    //-------------------------------------------------
    // Rectángulo asociado
    //-------------------------------------------------
    panelHorario.append('rect')
      .attr('id', 'fondoPanelHorario')
      .attr('width', param.panelHorario.anchoPanelHorario)
      .attr('height', param.panelHorario.altoPanelHorario)
      .attr('fill', param.panelHorario.colorPanelHorario);

    //-------------------------------------------------
    // Adicón del eje X
    //-------------------------------------------------
    var ejeX = d3.axisTop(param.escalas.escalaHorizontal as d3.ScaleBand<string>);

    panelHorario.append('g')
      .attr('class', 'ejeX')
      .call(ejeX);

    //-------------------------------------------------
    // Adición del eje Y
    //-------------------------------------------------
    var ejeY = d3.axisLeft(param.escalas.escalaVertical);

    ejeY.ticks(d3.timeMinute.every(60))


    panelHorario.append('g')
      .attr('class', 'ejeY')
      .attr('stroke','#aaa')
      .call(ejeY)
      .select('path')
      .attr('stroke','#fff')

    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return panelHorario;

  }

  private anyadirPanelesDiasSemana(elementoDOM: any, param: IParametrosGrafico, datos: HorarioG) {

    //-------------------------------------------------
    // Definición del panel
    //-------------------------------------------------
    const aux = elementoDOM.selectAll('g#panelDiaSemana').data(datos.obtenerDiasSemanaHorario());
    const panelesDiasSemana = elementoDOM.selectAll('g#panelDiaSemana').data(datos.obtenerDiasSemanaHorario()).enter().append('g');

    panelesDiasSemana.merge(aux)
      .attr('id', (d: DiaSemana) => d.codigo)
      .attr('class', 'panelDiaSemana');

    panelesDiasSemana.exit().remove();

    //-------------------------------------------------
    // Rectángulo asociado
    //-------------------------------------------------
    panelesDiasSemana
      .append('rect')
      .attr('id', (d: DiaSemana) => 'fondDiaSemana_' + d.codigo)
      .attr('class', 'fondoDiaSemana')
      .attr('fill', param.panelDiaSemana.colorPanelDiaSemana)
      .attr('x', (d: DiaSemana) => param.escalas.escalaHorizontal?param.escalas.escalaHorizontal(d.denominacionLarga):0)
      .attr('width', param.escalas.escalaHorizontal?.bandwidth)
      .attr('height', param.panelHorario.altoPanelHorario)


    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return panelesDiasSemana;

  }

  private anyadirPanelesActividades( param: IParametrosGrafico, datos: HorarioG) {

    datos.obtenerDiasSemanaHorario().forEach(
      ds => {
        this.anyadirPanelesActividadesDiaSemana(ds, datos);
      }
    )

  }

  private anyadirPanelesActividadesDiaSemana(ds: DiaSemana, datos: HorarioG) {


    //-------------------------------------------------
    //Definición del panel
    //-------------------------------------------------
    const aux1: any = d3.select('g#' + ds.codigo);
    const aux = aux1.selectAll('g#panelActividad').data(datos.obtenerActividadesDiaSemana(ds.codigo));
    const panelesActividad = aux.enter().append('g');

    panelesActividad.merge(aux)
      .attr('id', (d: ActividadG) => d.idActividad)
      .attr('class', 'panelActividad');

    panelesActividad.exit().remove();

    const actividadesDiaSemana = d3.select('g#' + ds.codigo);


  }

  private parametrosGrafico: IParametrosGrafico = {

    // Parámetros generales
    grafico: {
      colorGrafico:   'white',

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
      colorPanelHorario:    '#D7DBDD',
      anchoPanelHorario:    undefined,
      posXPanelHorario:     undefined,
      posYPanelHorario:     undefined
    },

    panelDiaSemana: {
      colorPanelDiaSemana: '#F2F3F4',
    },

    escalas: {
      escalaVertical: undefined,
      escalaHorizontal: undefined
    }

  }



}

