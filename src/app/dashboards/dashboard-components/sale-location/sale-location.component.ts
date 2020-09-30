import { Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";


export type saleslocationchartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-sale-location',
  templateUrl: './sale-location.component.html',
  styleUrls: ['./sale-location.component.css']
})
export class SalelocationComponent {

  @ViewChild("saleslocationchartOptions") chart: ChartComponent = Object.create(null);
  public saleslocationchartOptions: Partial<saleslocationchartOptions>;

  constructor() {

    this.saleslocationchartOptions = {
      series: [
        {
          name: "Total",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Product Sold",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Net Profit",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        fontFamily: 'Nunito Sans,sans-serif',
        height: 330,
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          startingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
      },
      fill: {
        opacity: 1,
        type: "solid",
        colors: ['#2962ff', '#4fc3f7', '#c7cace']
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: false
        }
      }
    };
  }
}
