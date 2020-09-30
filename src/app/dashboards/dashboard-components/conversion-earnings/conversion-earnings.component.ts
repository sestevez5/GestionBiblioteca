import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexFill,
  ApexTheme,
  ApexXAxis,
  ApexYAxis,
  ApexGrid
} from 'ng-apexcharts';


export interface conversionChartOptions {
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

export type activeusercardChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};

export type earningChartOptions = {
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
  selector: 'app-conversion-earnings',
  templateUrl: './conversion-earnings.component.html',
  styleUrls: ['./conversion-earnings.component.css']
})
export class ConversionEarningsComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public conversionChartOptions: Partial<conversionChartOptions>;

  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions: Partial<activeusercardChartOptions>;

  @ViewChild("chart") chart2: ChartComponent = Object.create(null);
  public earningChartOptions: Partial<earningChartOptions>;

  constructor() {
    this.conversionChartOptions = {
      series: [85, 15],
      chart: {
        type: 'donut',
        height: 230,
        fontFamily: 'Nunito Sans,sans-serif',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '90px',
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
                label: 'Conversation',
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
      labels: ['Conversation', 'other'],
      colors: ['#2961ff', '#dadada'],

    };

    // active users
    this.activeusercardChartOptions = {
      series: [
        {
          name: '',
          data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3, 0.5, 1.2, 1.0, 0.4, 0.9]
        },
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'bar',
        height: 110,
        sparkline: {
          enabled: true
        }
      },
      fill: {
        colors: ['#fff'],
        opacity: 1,

      },
      stroke: {
        show: true,
        width: 7,
        colors: ["transparent"],
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
        marker: {
          show: false,
        },
        x: {
          show: false
        },
      }
    }

    // 3
    this.earningChartOptions = {
      series: [
        {
          name: 'Earnings',
          data: [0, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8]
        }
      ],
      chart: {
        height: 145,
        type: 'line',
        fontFamily: 'Nunito Sans,sans-serif',
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
        width: '1',
      },
      colors: ['#fff'],
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

}
