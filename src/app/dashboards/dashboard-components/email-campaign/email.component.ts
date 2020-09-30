import { Component, ViewChild } from '@angular/core';
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

export interface mEmailChartOptions {
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
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public mEmailChartOptions: Partial<mEmailChartOptions>;

  constructor() {
    this.mEmailChartOptions = {
      series: [45, 15, 27, 18],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 280
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
                label: 'Ratio',
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
      labels: ['Open Ratio', 'Clicked Ratio', 'Un-Open Ratio', 'Bounced Ratio'],
      colors: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb'],

    };

  }
}
