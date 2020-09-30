import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';

export type salesChartOptions = {
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
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor() {
    this.salesChartOptions = {
      series: [
        {
          name: 'Ipad',
          data: [0, 300, 100, 200, 1200, 100, 500, 100]
        },
        {
          name: 'Iphone',
          data: [0, 500, 600, 800, 2800, 900, 800, 2200]
        }
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        height: 250,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 3,
        strokeColors: 'transparent',
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      colors: ['#2962ff', '#4fc3f7'],
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'category',
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep'
        ],
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }
}
