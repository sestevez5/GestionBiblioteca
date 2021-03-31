import { parametrosGrafico } from './../parametrosGrafico.model';
import { DiaSemana } from './../diaSemana.model';
import * as d3 from 'd3';

export class Parametros {
  static diasSemana: DiaSemana[] = [
    { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
    { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
    { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
    { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
    { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
    { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
    { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },
  ];
  static parametrosGrafico: parametrosGrafico = {

    parametrosHorario: undefined,

    // Parámetros generales
    grafico: {
      anchoGrafico: undefined,
      altoGrafico: undefined,
      colorGrafico: 'white',
      margenGrafico: {
        margenInferiorGrafico:     3,
        margenDerechoGrafico:      3,
        margenSuperiorGrafico:     5,
        margenIzquierdoGrafico:    5,
      },
    },

    panelHorario: {
      altoPanelHorario:     undefined,
      colorPanelHorario:    '#ffffff',
      anchoPanelHorario:    undefined
    },

    panelDiaSemana: {
      colorPanelDiaSemana: '#111111',
    },

    panelSesiones: {

      margenLateral: 0,
      altoCabecera: 11,
      anchoSesion: undefined,
      colorCabecera:'#ffffff',
      colorCuerpo:'#eeeeee'

    },

    escalas: {
      escalaVertical: undefined,
      escalaHorizontal: undefined
    },

    actividades: {
      tamanyoTexto: '12'
    }

  }




}
