import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTooltip,
  ApexTheme,
  ApexFill,
  ApexPlotOptions
} from 'ng-apexcharts';

export type Revenue2ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
  plotOptions: ApexPlotOptions
};
export type Pageview2ChartOptions = {
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
  selector: 'app-revenue-views',
  templateUrl: './revenue-views.component.html'
})
export class RevenueviewsComponent {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public Revenue2ChartOptions: Partial<Revenue2ChartOptions>;

  @ViewChild("chart2") chart2: ChartComponent = Object.create(null);
  public Pageview2ChartOptions: Partial<Pageview2ChartOptions>;

  constructor() {
    /***********************/
    /* Revenue chart */
    /************************/
    this.Revenue2ChartOptions = {
      series: [
        {
          name: 'Revenue stats',
          data: [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10]
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: '70%',
        }
      },
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'bar',
        height: 80,
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
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetX: 0,
          offsetY: -50,
        },
      }
    }

    /***********************/
    /* pageview chart */
    /************************/
    this.Pageview2ChartOptions = {
      series: [
        {
          name: 'Page views',
          data: [28, 40, 36, 52, 38, 60, 55]
        },
      ],
      chart: {
        type: "area",
        fontFamily: 'Nunito Sans,sans-serif',
        height: "70",
        toolbar: {
          show: false,
        },
        sparkline: { enabled: true },
      },
      fill: {
        type: "solid",
        colors: ['#fff'],
        opacity: 0.4
      },
      colors: ['#fff'],
      stroke: {
        curve: "straight",
        width: 0,
      },
      tooltip: {
        theme: "dark",
      },
    }
  }

}
