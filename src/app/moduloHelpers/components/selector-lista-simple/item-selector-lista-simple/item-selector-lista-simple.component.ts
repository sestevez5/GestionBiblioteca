
import { Component, Input, OnInit } from '@angular/core';
import { camposSelectorSimple } from '../selector-lista-simple.component';

@Component({
  selector: 'app-item-selector-lista-simple',
  templateUrl: './item-selector-lista-simple.component.html',
  styleUrls: ['./item-selector-lista-simple.component.css']
})
export class ItemSelectorListaSimpleComponent implements OnInit {

  @Input() camposConfig: camposSelectorSimple;
  @Input() marcado = false;
  @Input() item: any;


  constructor() { }

  ngOnInit(): void {


  }

}


