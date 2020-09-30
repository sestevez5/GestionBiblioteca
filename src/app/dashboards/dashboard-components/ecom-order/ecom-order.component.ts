import { Component, AfterViewInit, ViewChild } from '@angular/core';

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
export interface ecomorderChartOptions {
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
  selector: 'app-ecom-order',
  templateUrl: './ecom-order.component.html',
  styleUrls: ['./ecom-order.component.css']
})
export class EcomorderComponent implements AfterViewInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public ecomorderChartOptions: Partial<ecomorderChartOptions>;

  constructor() {
    this.ecomorderChartOptions = {
      series: [65, 15, 17],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 265
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
                label: 'Orders',
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
      labels: ['Success', 'Pending', 'Failed'],
      colors: ['#40c4ff', '#2961ff', '#ff821c'],

    };

  }

  ngAfterViewInit() {
  }
}
