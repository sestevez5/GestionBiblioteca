import { Component, Input, OnInit } from '@angular/core';
import { camposSelectorDoble } from '../selector-multiple-doble-lista.component';

@Component({
  selector: 'app-item-selector-multiple-doble-lista',
  templateUrl: './item-selector-multiple-doble-lista.component.html',
  styleUrls: ['./item-selector-multiple-doble-lista.component.css']
})
export class ItemSelectorMultipleDobleListaComponent implements OnInit {

  @Input() camposConfig: camposSelectorDoble;
  @Input() marcado = false;
  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

}


