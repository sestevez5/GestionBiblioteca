import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexMarkers
} from 'ng-apexcharts';


export interface COChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  xaxis: ApexXAxis,
  yaxis: ApexYAxis,
  markers: ApexMarkers,
  grid: ApexGrid
}

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './co.component.html'
})
export class CamoverComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public COChartOptions: Partial<COChartOptions>;

  constructor() {
    this.COChartOptions = {
      series: [{
        name: 'Last Month',
        data: [3, 8, 2, 3, 2, 5, 6, 8],
      },
      {
        name: "Current Month",
        data: [7, 6, 5, 8, 6, 7, 2, 1],
      }],
      chart: {
        type: 'area',
        height: 170,
        fontFamily: 'Nunito Sans,sans-serif',
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      markers: {
        size: 3,
        strokeWidth: 3,
        strokeColors: "transparent",
      },
      colors: ["#2962FF", "#4fc3f7"],
      xaxis: {
        labels: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
        theme: "dark",
      },
      legends: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }
}
