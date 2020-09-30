import { Component, AfterViewInit, ViewChild } from '@angular/core';
// import * as c3 from 'c3';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
export interface pollChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions
}

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements AfterViewInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public pollChartOptions: Partial<pollChartOptions>;

  constructor() {
    this.pollChartOptions = {
      series: [30, 15, 27, 18, 45],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 180
      },
      plotOptions: {
        pie: {
          donut: {
            size: '73px',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: 10
              },
              value: {
                show: false,
                color: '#99abb4',
              },
              total: {
                show: true,
                label: 'Ans : A',
                color: '#99abb4',
              }
            }
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0
      },
      legends: {
        show: false,
      },
      labels: ['A', 'B', 'C', 'D', 'None'],
      colors: ['#40c4ff', '#2961ff', '#ff821c', '#4CAF50', '#e9edf2'],

    };

  }

  ngAfterViewInit() {
  }
}
