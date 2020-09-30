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
  ApexGrid,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
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
  fill: ApexFill;
  grid: ApexGrid;
};

@Component({
  selector: 'app-realtime-visit',
  templateUrl: './realtime-visit.component.html',
  styleUrls: ['./realtime-visit.component.css']
})
export class RealtimevisitComponent {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Site A',
          data: [30, 400, 100, 400, 150, 275, 135, 200, 218]
        },
        {
          name: 'Site B',
          data: [130, 340, 200, 350, 250, 130, 189, 135, 258]
        }
      ],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        height: 350,
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
        strokeColors: "transparent"
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      colors: ['#2962ff', '#4fc3f7'],
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.7
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
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
          'Sep',
          'Oct'
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
