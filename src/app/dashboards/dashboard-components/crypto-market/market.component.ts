import { Component, ViewChild } from '@angular/core';

declare var require: any;
const data: any = require('./crypto.json');

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html'
})
export class MarketComponent {
  rows:any = [];
  temp:any[] = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: '#' },
    { prop: 'Currency' },
    { prop: 'Price' },
    { prop: 'MarketCap' },
    { prop: 'Volume 1D' },
    { prop: 'Change % (1D)' },
    { prop: 'Change % (1W)' }
  ];

  @ViewChild(MarketComponent) table: MarketComponent=Object.create(null);
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp:any[] = this.temp.filter(function(d) {
      return d.Currency.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
}
