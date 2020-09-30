import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTooltip,
  ApexTheme,
  ApexFill,
  ApexPlotOptions,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

export type WalletChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};
export type EarningChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};

export type SalesChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfocardComponent {

  @ViewChild("Walletchart") chart: ChartComponent = Object.create(null);
  public WalletChartOptions: Partial<WalletChartOptions>;

  @ViewChild("Earningchart") chart2: ChartComponent = Object.create(null);
  public EarningChartOptions: Partial<EarningChartOptions>;

  @ViewChild("SalesChartOptions") chart3: ChartComponent = Object.create(null);
  public SalesChartOptions: Partial<SalesChartOptions>;

  constructor() {
    /***********************/
    /* Wallet chart */
    /************************/

    this.WalletChartOptions = {
      series: [
        {
          name: 'Balance',
          data: [5500, 6000, 3800, 5200, 3600, 4000, 3567]
        },
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: "line",
        height: "70",
        toolbar: {
          show: false,
        },
        sparkline: { enabled: true },
      },

      colors: ['#4fc3f7'],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      tooltip: {
        theme: "dark",
      },
    }
    /***********************/
    /* Earning chart */
    /************************/
    this.EarningChartOptions = {
      series: [
        {
          name: 'Earning stats',
          data: [20, 55, 44, 30, 61, 48, 20]
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
      fill: {
        colors: ['#2962ff'],
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
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetX: 0,
          offsetY: -50,
        },
      }
    }

    /***********************/
    /* Sales chart */
    /************************/
    this.SalesChartOptions = {
      series: [76],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: "radialBar",
        offsetY: -20,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: "10px"
            }
          }
        }
      },
      fill: {
        colors: ['rgb(126, 116, 251)']
      },
      labels: ["Estimated Sales"]
    };
  }

}

