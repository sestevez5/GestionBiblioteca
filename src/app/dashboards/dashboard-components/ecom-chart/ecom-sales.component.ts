import { Component, AfterViewInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexTheme,
  ApexXAxis,
  ApexYAxis,
  ApexGrid
} from 'ng-apexcharts';

export interface productsalesChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions,
  grid: ApexGrid,
  fill: ApexFill,
  xaxis: ApexXAxis,
  yaxis: ApexYAxis,
  theme: ApexTheme
}

@Component({
  selector: 'app-ecom-sales',
  templateUrl: './ecom-sales.component.html',
  styleUrls: ['./ecom-sales.component.css']
})
export class EcomSalesComponent implements AfterViewInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public productsalesChartOptions: Partial<productsalesChartOptions>;

  constructor() {
    this.productsalesChartOptions = {
      series: [
        {
          name: "Site A",
          type: "column",
          data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
        },
        {
          name: "Site B",
          type: "column",
          data: [1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3],
        },
      ],
      chart: {
        type: 'line',
        height: 400,
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false,
        },
        stacked: false,
      },
      tooltip: {
        fillSeriesColor: false,
        theme: "dark"
      },
      dataLabels: {
        enabled: false,
      },
      legends: {
        show: false,
      },
      labels: ['Day', 'Month'],
      plotOptions: {
        bar: {
          columnWidth: "25%",
        },
      },
      colors: ['#2962FF', '#4fc3f7'],
      fill: {
        type: "solid",
        colors: ['#2962FF', '#4fc3f7'],
        opacity: 1
      },
      stroke: {
        width: 0,
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
        borderColor: "rgba(0,0,0,0.1)",
      },
      xaxis: {
        categories: [
          0,
          2,
          4,
          6,
          8,
          10,
          12,
          14,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
        ],
        labels: {
          show: true,
          style: {
            colors: [
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
              "#99abb4",
            ],
            fontSize: "12px",
            fontFamily: "'Nunito Sans', sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#99abb4",
            fontSize: "12px",
            fontFamily: "'Nunito Sans', sans-serif",
          },
        },
      },
    };
  }

  ngAfterViewInit() {
  }
}
