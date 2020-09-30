import { Component, AfterViewInit, ViewChild } from '@angular/core';
// import * as c3 from 'c3';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexTheme,
  ApexXAxis,
  ApexYAxis,
  ApexGrid
} from 'ng-apexcharts';

export type realdataChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
};

@Component({
  selector: 'app-realdata',
  templateUrl: './realdata.component.html',
  styleUrls: ['./realdata.component.css']
})
export class RealdataComponent implements AfterViewInit {

  @ViewChild("chart") chart2: ChartComponent = Object.create(null);
  public realdataChartOptions: Partial<realdataChartOptions>;

  constructor() {

    this.realdataChartOptions = {
      series: [
        {
          name: 'Site A',
          data: [0, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8]
        },
        {
          name: 'Site B',
          data: [1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      stroke: {
        curve: 'smooth',
        width: '1',
      },
      colors: ['#2961ff', '#ff821c'],
      legend: {
        show: false,
      },
      grid: {
        show: true
      },
      xaxis: {
        labels: {
          show: true
        }
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      tooltip: {
        theme: 'dark'
      }
    };

  }

  ngAfterViewInit() {
  }
}
