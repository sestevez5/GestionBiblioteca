import { IParametrosGrafico } from './IParametrosGrafico.model';
import { DiaSemana } from '../models/diaSemana.model';
import { ActividadG, EstadoActividad } from './actividadG.model';
import { Actividad } from './actividad.model';
import * as d3 from 'd3';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { act } from '@ngrx/effects';

export class HorarioG {

  elementoRaiz: any;
  svg: any;

  static diasSemana: DiaSemana[] = [
    { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
    { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
    { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
    { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
    { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
    { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
    { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },

  ];

  params: IParametrosGrafico = {

    parametrosHorario: {
      horaMinima: '07:00am',
      horaMaxima: '14:00pm',
      diasSemanaHabiles: ['L','M','X','V']

    },

    // Parámetros generales
    grafico: {
      colorGrafico:   'white',

      anchoGrafico:       600,
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

  public static convertirCadenaHoraEnTiempo: any = d3.timeParse("%I:%M%p");
  public static convertirTiempoEnCadenaHora: any = d3.timeFormat("%I:%M%p")

  actividadesG: ActividadG[] = [];

  constructor(elementoRaiz: string, actividades?: Actividad[]) {

    this.elementoRaiz = elementoRaiz;
    this.generarGrafico();
    if (actividades) this.anyadirActualizarActividades(actividades);


  }

  anyadirActualizarActividades(actividades: Actividad[]) {

    const ActividadesNuevas: Actividad[] = actividades.filter(act => !this.actividadesG.map(actG => actG.idActividad).includes(act.idActividad));
    const ActividadesModificadas: Actividad[] = actividades.filter(act => this.actividadesG.map(actG => actG.idActividad).includes(act.idActividad));

    ActividadesNuevas.forEach(
      act => {
        const nuevaActividadG = new ActividadG(act);
        nuevaActividadG.estado = EstadoActividad.NUEVA
        this.actividadesG.push(nuevaActividadG)
      }
    );

        //Procedemos a modificar las actividades.
    ActividadesModificadas.forEach(
      act =>
           this.actividadesG.filter(actG => actG.idActividad === act.idActividad)
          .map(actG => {
            actG.actualizarActividad(act);
            actG.estado = EstadoActividad.MODIFICADA
          }
          )
    );

    const actividadesGNuevas = this.actividadesG.filter(actG => actG.estado === EstadoActividad.NUEVA);
    const actividadesGModificadas = this.actividadesG.filter(actG => actG.estado === EstadoActividad.MODIFICADA);

    // Calcula el ancho de la actifidad en función de las actividades que cubre.
    this.calcularFactorAnchoActividadesG(this.actividadesG.filter(actG => (actG.estado === EstadoActividad.NUEVA) || this.actividadesG.filter(actG => actG.estado === EstadoActividad.ELIMINADA)));

    this.actualizarPanelesActividades();
  }

  borrarActividades(idActividades: string[]) {

    this.actividadesG.filter(actG => idActividades.includes(actG.idActividad)).
    map(actG => actG.estado = EstadoActividad.ELIMINADA)
    this.actualizarPanelesActividades();

  }

  calcularFactorAnchoActividadesG(actsG: ActividadG[]) {
    actsG.forEach(
      actG => {

        const actividadesCubiertas = this.actividadesCubiertasPor(actG);

        if (actividadesCubiertas && actG) {

          actG.nivelAncho = d3.max(actividadesCubiertas.map(act => act.nivelAncho)) as number + 1;
        }

      }
      )

  }
  public obtenerDiasSemanaHorario(): DiaSemana[] {

    return HorarioG.diasSemana.filter((ds: DiaSemana) => this.params.parametrosHorario.diasSemanaHabiles.includes(ds.codigo) );

  }
  public obtenerActividadesDiaSemana(ds: string): ActividadG[] {

    return this.actividadesG.filter(act => act.sesion.diaSemana === ds);

  }
  public actividadesCubiertasPor(actividad: ActividadG): ActividadG[] {

    return this.actividadesG.filter(
      act =>
        act.sesion.diaSemana === actividad.sesion.diaSemana
        && HorarioG.convertirCadenaHoraEnTiempo(act.sesion.horaInicio) <= HorarioG.convertirCadenaHoraEnTiempo(actividad.sesion.horaInicio)
        && HorarioG.convertirCadenaHoraEnTiempo(act.sesion.horaFin) >= HorarioG.convertirCadenaHoraEnTiempo(actividad.sesion.horaFin)
    )



  }
  public minimoIntervaloTemporal(): Date {
    return HorarioG.convertirCadenaHoraEnTiempo(this.params.parametrosHorario.horaMinima);
  }
  public maximoIntervaloTemporal() {
    return HorarioG.convertirCadenaHoraEnTiempo(this.params.parametrosHorario.horaMaxima);
  }
  private compare(a: Actividad, b: Actividad): number {

    const codigosDiasSemana = HorarioG.diasSemana.map(ds => ds.codigo);

    if (codigosDiasSemana.indexOf(a.sesion.diaSemana) < codigosDiasSemana.indexOf(b.sesion.diaSemana))      return -1
    else if (codigosDiasSemana.indexOf(a.sesion.diaSemana) > codigosDiasSemana.indexOf(b.sesion.diaSemana)) return 1
    else {

      if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) < HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) return -1
      else if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) > HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) return 1
      else if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) == HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) {

        if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaFin) < HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) return -1
        else if (HorarioG.convertirCadenaHoraEnTiempo(a.sesion.horaFin) > HorarioG.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) return 1
        else return 0;

      } else return 0;

    }
  } // Fin compare
  public obtenerHorasInicionHorasFin(): Date[] {
     return this.actividadesG.reduce(
       function (colecAnterior: Date[], actividadActual) {
         return colecAnterior.concat([HorarioG.convertirCadenaHoraEnTiempo(actividadActual.sesion.horaInicio), HorarioG.convertirCadenaHoraEnTiempo(actividadActual.sesion.horaFin)]);
      },
      []
      )
  }



  //----------------------------------------------------------------------------------------------------------
  // RENDERIZADO DEL HORARIO
  //----------------------------------------------------------------------------------------------------------
  generarGrafico() {

    this.inicializarParametros();

    this.svg = this.anyadirSvg();

    this.anyadirPanelHorario();

    this.anyadirPanelesDiasSemana();

  }

   private inicializarParametros() {

    const param = this.params;

    // Establecer dimensiones del panel que contiene las barras.
    param.panelHorario.anchoPanelHorario = param.grafico.anchoGrafico - param.grafico.margenGrafico.margenIzquierdoGrafico - param.grafico.margenGrafico.margenDerechoGrafico;
    param.panelHorario.altoPanelHorario = param.grafico.altoGrafico - param.grafico.margenGrafico.margenInferiorGrafico - param.grafico.margenGrafico.margenSuperiorGrafico;
    param.panelHorario.posXPanelHorario = param.grafico.margenGrafico.margenIzquierdoGrafico;
    param.panelHorario.posYPanelHorario = param.grafico.margenGrafico.margenSuperiorGrafico;

    // Establecer escala horizontal: Serán bandas que identifiquen a los días de la semana
    param.escalas.escalaHorizontal = d3.scaleBand()
      .domain(this.obtenerDiasSemanaHorario().map(ds=> ds.denominacionLarga))
      .range([0, param.panelHorario.anchoPanelHorario])
      .paddingInner(0.01)
      .paddingOuter(0.01);

    // Establecer escala vertical:
    param.escalas.escalaVertical = d3.scaleTime()
      .domain([this.minimoIntervaloTemporal(), this.maximoIntervaloTemporal()])
      .range([0, param.panelHorario.altoPanelHorario])

  }

  private anyadirSvg()
  {
    //-------------------------------------------------
    // Definición del SVG
    //-------------------------------------------------
    const svg = d3.select(this.elementoRaiz).append('svg');

    svg
      .attr('width', this.params.grafico.anchoGrafico)
      .attr('height', this.params.grafico.altoGrafico)

    //-------------------------------------------------
    // Definición del rectángulo
    //-------------------------------------------------
    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('id', 'fondografico')
      .attr('fill', this.params.grafico.colorGrafico)
      .attr('rx', '10')
      .attr('ry', '10')


    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return svg;

  }

  private anyadirPanelHorario() {

    //-------------------------------------------------
    // Definición del panel
    //-------------------------------------------------
    const panelHorario = this.svg.append('g')
      .attr('id', 'panelHorario')
      .attr('transform', `translate(${this.params.grafico.margenGrafico.margenIzquierdoGrafico},${this.params.grafico.margenGrafico.margenSuperiorGrafico})`)

    //-------------------------------------------------
    // Rectángulo asociado
    //-------------------------------------------------
    panelHorario.append('rect')
      .attr('id', 'fondoPanelHorario')
      .attr('width', this.params.panelHorario.anchoPanelHorario)
      .attr('height', this.params.panelHorario.altoPanelHorario)
      .attr('fill', this.params.panelHorario.colorPanelHorario);

    //-------------------------------------------------
    // Adicón del eje X
    //-------------------------------------------------
    var ejeX = d3.axisTop(this.params.escalas.escalaHorizontal as d3.ScaleBand<string>);

    panelHorario.append('g')
      .attr('class', 'ejeX')
      .call(ejeX);

    //-------------------------------------------------
    // Adición del eje Y
    //-------------------------------------------------
    var ejeY = d3.axisLeft(this.params.escalas.escalaVertical);

    ejeY.ticks(d3.timeMinute.every(60))


    panelHorario.append('g')
      .attr('class', 'ejeY')
      .attr('stroke', '#aaa')

      .call(ejeY)
      .select('path')
      .attr('stroke','#fff')

    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return panelHorario;

  }

  private anyadirPanelesDiasSemana() {

    //-------------------------------------------------
    // Definición del panel
    //-------------------------------------------------
    const aux: any = d3.select('g#panelHorario').selectAll('g#panelDiaSemana').data(this.obtenerDiasSemanaHorario());
    const panelesDiasSemana = d3.select('g#panelHorario').selectAll('g#panelDiaSemana').data(this.obtenerDiasSemanaHorario()).enter().append('g');

    panelesDiasSemana.merge(aux)
      .attr('id', (d: DiaSemana) => d.codigo)
      .attr('class', 'panelDiaSemana')
      .attr('transform', (d: DiaSemana) => `translate(${this.params.escalas.escalaHorizontal ? this.params.escalas.escalaHorizontal(d.denominacionLarga) : 0},0)`);

    panelesDiasSemana.exit().remove();



    //-------------------------------------------------
    // Rectángulo asociado
    //-------------------------------------------------
    panelesDiasSemana
      .append('rect')
      .attr('id', (d: DiaSemana) => 'fondDiaSemana_' + d.codigo)
      .attr('class', 'fondoDiaSemana')
      .attr('fill', this.params.panelDiaSemana.colorPanelDiaSemana)
      .attr('width', this.params.escalas.escalaHorizontal?.bandwidth)
      .attr('height', this.params.panelHorario.altoPanelHorario as number)


    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return panelesDiasSemana;

  }

  private actualizarPanelesActividades() {

    // GESTION DE CREACIÓN Y ACTUALIZACION DE ACTIVIDADES.
    const panelesARenderizar: { panel: any, actividadG: ActividadG }[] = [];

    // Nuevas actividades
    d3.selectAll('g.panelDiaSemana').nodes().forEach(
      (nodo: any) => this.actividadesG
        .filter(actG => actG.sesion.diaSemana === nodo['id'] && actG.estado === EstadoActividad.NUEVA)
        .forEach(actG => panelesARenderizar.push({ panel: d3.select('g#' + nodo['id']).append('g').attr('class','panelActividad').attr('id', 'act'+actG.idActividad), actividadG: actG }))
    );

    // Actualizaciones de actividades
    this.actividadesG
      .filter(actG => actG.estado === EstadoActividad.MODIFICADA)
      .forEach( actG => panelesARenderizar.push({ panel: d3.selectAll('g.panelActividad').select('g#act' + actG.idActividad), actividadG: actG }));

    // Renderizado de actividades
    this.renderizarActividades(panelesARenderizar);


    // GESTION DE BORRADOS
    this.actividadesG
      .filter(actG => actG.estado === EstadoActividad.ELIMINADA)
      .forEach(actG => {
        this.svg.select('g#act' + actG.idActividad).select('rect').attr('height', 30).remove();
        }
    );

    this.actividadesG = this.actividadesG.filter(actG => actG.estado !== EstadoActividad.ELIMINADA);

    // Una vez procesados todos los cambios las desmarcamos
    this.actividadesG.map(actG => actG.estado = EstadoActividad.SINCAMBIOS);

  }


  //----------------------------------------------------------------------------------------------------------
  // MANTENIMIENTO GRÁFICO DE ACTIVIDADES
  //----------------------------------------------------------------------------------------------------------
  renderizarActividades(panelesARenderizar: { panel: any, actividadG: ActividadG }[]) {

    panelesARenderizar.forEach(
      paa => {
        paa.panel.attr('transform', `translate(0,${this.params.escalas.escalaVertical(HorarioG.convertirCadenaHoraEnTiempo(paa.actividadG.sesion.horaInicio))})`);
        paa.panel.append('rect')
       .attr('width', 10)
       .attr('height', 10)
       .attr('fill', 'red')
      }
    )

  } // Fin renderizarActividades

}
