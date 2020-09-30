import { Component, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexTheme
} from 'ng-apexcharts';

export interface EmailChartOptions {
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
export interface userChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions
  markers: any;
}


@Component({
  selector: 'app-active-visit',
  templateUrl: './active-visit.component.html',
  styleUrls: ['./active-visit.component.css']
})
export class ActivevisitComponent {
  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public EmailChartOptions: Partial<EmailChartOptions>;

  @ViewChild('userChartOptions') chart2: ChartComponent = Object.create(null);
  public userChartOptions: Partial<userChartOptions>;

  constructor() {
    this.EmailChartOptions = {
      series: [45, 15, 27, 18],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 270
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
                label: 'Visits',
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
      labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
      colors: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb'],

    };


    /***********************/
    /* Active user chart */
    /************************/
    this.userChartOptions = {
      series: [
        {
          name: 'Active Users',
          data: [20, 55, 44, 30, 61, 48, 20, 20, 55, 44, 30, 61, 48, 20]
        },
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'bar',
        height: '50',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '10%',
          barHeight: '10%',
        }
      },
      fill: {
        colors: ['#2962ff'],
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
        }
      }
    }
  }

}
