import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTooltip,
  ApexTheme,
  ApexFill
} from 'ng-apexcharts';


export type CryptocardChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html'
})
export class CryptoComponent {

  @ViewChild("cryptocardchart") chart: ChartComponent = Object.create(null);
  public CryptocardChartOptions: Partial<CryptocardChartOptions>;


  constructor() {
    /***********************/
    /* Revenue chart */
    /************************/
    this.CryptocardChartOptions = {
      series: [
        {
          name: '',
          data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3]
        },
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'bar',
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      fill: {
        colors: ['#fff'],
        opacity: 0.7,

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
  }
}
