import { Component, ViewChild } from "@angular/core";

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
  ApexMarkers,
  ApexFill,
  ApexPlotOptions
} from 'ng-apexcharts';


export interface CampaignStatsChartOptions {
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
  grid: ApexGrid,
  fill: ApexFill,
  plotOptions: ApexPlotOptions
}

@Component({
  selector: "app-cam-stats",
  templateUrl: "./cam-stats.component.html",
  styleUrls: ["./cam-stats.component.css"],
})
export class CamStatsComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public CampaignStatsChartOptions: Partial<CampaignStatsChartOptions>;

  constructor() {
    this.CampaignStatsChartOptions = {
      series: [{
        name: 'Wallet Balance',
        data: [5, 4, 3, 7, 5, 10, 3, 5, 4, 3, 7, 10],
      },
      {
        name: "Referral Earnings",
        data: [2, 6, 5, 3, 4, 9, 6, 7, 3, 8, 10, 6],
      }],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          barHeight: '45%',
        }
      },
      chart: {
        type: 'bar',
        stacked: true,
        height: 250,
        fontFamily: 'Nunito Sans,sans-serif',
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
      fill: {
        type: "solid",
        opacity: 1,
        colors: ["#2962FF", "#4fc3f7"],
      },
      xaxis: {
        type: 'category',
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
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
        x: {
          format: "dd/MM/yy HH:mm",
        },
        theme: "dark",
      },
      legends: {
        show: false,
      },
      grid: {
        show: true,
      },
    };
  }
}
