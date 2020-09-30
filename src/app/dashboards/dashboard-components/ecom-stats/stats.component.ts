import { Component, AfterViewInit, ViewChild } from '@angular/core';

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

export type earningboxChartOptions = {
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
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements AfterViewInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public earningboxChartOptions: Partial<earningboxChartOptions>;

  constructor() {
    this.earningboxChartOptions = {
      series: [
        {
          name: 'Earnings',
          data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8]
        }
      ],
      chart: {
        type: 'area',
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false,
        },
        height: 90,
        sparkline: { enabled: true },
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      colors: ['#4fc3f7'],
      legend: {
        show: false,
      },
      grid: {
        show: false
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
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
