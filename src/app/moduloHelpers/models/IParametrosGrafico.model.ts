export interface IParametrosGrafico {

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
