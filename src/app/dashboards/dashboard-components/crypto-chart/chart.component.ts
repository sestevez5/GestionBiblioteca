import { Component, AfterViewInit, ViewChild } from '@angular/core';
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


export type bitcoinChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  fill: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class CryptoChartComponent implements AfterViewInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public bitcoinChartOptions: Partial<bitcoinChartOptions>;
  constructor() {
    this.bitcoinChartOptions = {
      series: [
        {
          name: 'Ripple',
          data: [0, 15, 15, 38, 8, 40, 20, 100, 70]
        },
        {
          name: 'Ethereum',
          data: [0, 35, 30, 60, 20, 80, 50, 180, 150]
        },
        {
          name: 'Bitcoin',
          data: [0, 80, 40, 100, 30, 150, 80, 270, 250]
        }
      ],
      chart: {
        height: 350,
        type: 'area',
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      fill: {
        type: "solid",
        colors: ['#ffffff', '#86d5f9', '#2052de'],
        opacity: 1
      },
      colors: ['#ffffff', '#86d5f9', '#2052de'],
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
      },
      xaxis: {
        type: 'category',
        categories: [
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018'
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

  ngAfterViewInit() {
  }
}
