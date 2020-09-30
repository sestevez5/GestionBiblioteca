import { Component, AfterViewInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexFill,
  ApexGrid,
  ApexResponsive
} from 'ng-apexcharts';

export interface DeviceSalesChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions
}

export type NetIncomeChartOptions = {
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
  fill: ApexFill;
  responsive: ApexResponsive[];
};

export interface SalesperformanceChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
}

export type MonthlysalesChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-device-sales',
  templateUrl: './device-sales.component.html',
  styleUrls: ['./device-sales.component.css']
})
export class DeviceSalesComponent implements AfterViewInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public DeviceSalesChartOptions: Partial<DeviceSalesChartOptions>;

  @ViewChild("chart") chart2: ChartComponent = Object.create(null);
  public NetIncomeChartOptions: Partial<NetIncomeChartOptions>;

  @ViewChild('chart') chart3: ChartComponent = Object.create(null);
  public SalesperformanceChartOptions: Partial<SalesperformanceChartOptions>;

  @ViewChild('chart') chart4: ChartComponent = Object.create(null);
  public MonthlysalesChartOptions: Partial<SalesperformanceChartOptions>;


  constructor() {
    this.DeviceSalesChartOptions = {
      series: [40, 12, 28, 60],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 250
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75px',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: 10
              },
              value: {
                show: false,
                color: '#99abb4',
              },
              total: {
                show: true,
                label: 'Variations',
                color: '#99abb4',
              }
            }
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0
      },
      legends: {
        show: false,
      },
      labels: ['Desktop', 'Mobile', 'Tablets', 'Others'],
      colors: ['#40c4ff', '#2961ff', '#ff821c', '#e9edf2'],
    };

    this.NetIncomeChartOptions = {
      series: [
        {
          name: 'Net Income',
          data: [5, 4, 3, 7, 5, 10, 3, 7, 2, 4]
        }
      ],
      chart: {
        height: 240,
        type: 'bar',
        fontFamily: 'Nunito Sans,sans-serif',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        colors: ['#2961ff'],
        opacity: 1,
      },
      stroke: {
        show: true,
        width: 7,
        colors: ["transparent"],
      },
      legend: {
        show: false,
      },
      grid: {
        show: true
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"
        ],
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        }
      },
      // responsive: [{
      //   breakpoint: 2300,
      //   options: {
      //     plotOptions: {
      //       bar: {
      //         columnWidth: '20%',
      //         barHeight: '20%',
      //       }
      //     }
      //   }
      // }]
    };

    this.SalesperformanceChartOptions = {
      series: [45, 15, 27],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 100
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60px',
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0
      },
      legends: {
        show: false,
      },
      labels: ['A', 'B', 'C'],
      colors: ['#40c4ff', '#2961ff', '#ff821c'],
    };

    this.MonthlysalesChartOptions = {
      series: [76],
      chart: {
        type: "radialBar",
        offsetY: -20,
        height: 200
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
              show: false,
              offsetY: -2,
              fontSize: "10px"
            }
          }
        }
      },
      fill: {
        type: "gradient",
        colors: ['#3285ff']
      },
      labels: ["Estimated Sales"]
    };
  }

  ngAfterViewInit() { }
}
