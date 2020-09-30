import { Component, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ApexTheme,
  ApexResponsive
} from "ng-apexcharts";


export type ToplocationsChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  colors: string[];
  theme: ApexTheme;
  responsive: ApexResponsive[];
};

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

@Component({
  selector: 'app-top-locations',
  templateUrl: './top-locations.component.html',
  styleUrls: ['./top-locations.component.css']
})
export class ToplocationsComponent {
  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public ToplocationsChartOptions: Partial<ToplocationsChartOptions>;

  constructor() {
    this.ToplocationsChartOptions = {
      series: [
        {
          name: "Countries",
          data: [44, 55, 41, 37, 22, 43, 21]
        },
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
          startingShape: 'flat',
          endingShape: 'flat',
        }
      },
      colors: ['#2962ff', '#4fc3f7', '#212529', '#f62d51', '#ffbc34', '#36bea6', '#c7cace'],
      fill: {
        type: "solid",
        opacity: 1,
        colors: ['#2962ff', '#4fc3f7', '#212529', '#f62d51', '#ffbc34', '#36bea6', '#c7cace'],
      },
      xaxis: {
        categories: [
          "Italy", "USA", "Germany", "India", "France", "Spain", "Alegeria", "Australia"
        ],
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: false,
        },
      },
      legend: {
        show: false
      },
      responsive: [{
        options: {
          breakpoint: 1200,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
              startingShape: 'flat',
              endingShape: 'flat',
            }
          },
        }
      }]
    };
  }
}
