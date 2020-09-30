import { Component, AfterViewInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexTheme,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexFill,
  ApexStroke,
  ApexPlotOptions
} from 'ng-apexcharts';


export type totalvisitsChartOptions = {
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
  fill: ApexFill
};

export type salesratioChartOptions = {
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

export interface orderstatsChartOptions {
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

// import * as c3 from 'c3';

@Component({
  selector: 'app-mix-stats',
  templateUrl: './mix-stats.component.html',
  styleUrls: ['./mix-stats.component.css']
})
export class MixstatsComponent implements AfterViewInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public totalvisitsChartOptions: Partial<totalvisitsChartOptions>;

  @ViewChild("chart") chart2: ChartComponent = Object.create(null);
  public salesratioChartOptions: Partial<salesratioChartOptions>;

  @ViewChild('chart') chart3: ChartComponent = Object.create(null);
  public orderstatsChartOptions: Partial<orderstatsChartOptions>;

  constructor() {
    this.totalvisitsChartOptions = {
      series: [
        {
          name: 'Earnings',
          data: [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10, 12, 10]
        }
      ],
      chart: {
        height: 60,
        type: 'bar',
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        colors: ['#4fc3f7'],
        opacity: 1,
      },
      stroke: {
        show: true,
        width: 7,
        colors: ["transparent"],
      },
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
        theme: 'dark',
        x: {
          show: false
        }
      }
    };

    this.salesratioChartOptions = {
      series: [
        {
          name: 'sales ratio',
          data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8]
        }
      ],
      chart: {
        height: 60,
        type: 'area',
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true
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
        width: '2',
      },
      colors: ['#2961ff'],
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

    this.orderstatsChartOptions = {
      series: [45, 15, 27],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 135
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60px',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: 0
              },
              value: {
                show: false,
                color: '#99abb4',
              },
              total: {
                show: true,
                label: '75%',
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
      labels: ['Success', 'Failed', 'Pending'],
      colors: ['#40c4ff', '#2961ff', '#ff821c'],

    };
  }

  ngAfterViewInit() {
  }
}
