import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-selector-multiple-doble-lista',
  templateUrl: './item-selector-multiple-doble-lista.component.html',
  styleUrls: ['./item-selector-multiple-doble-lista.component.css']
})
export class ItemSelectorMultipleDobleListaComponent implements OnInit {

  @Input() texto: string;
  @Input() leyenda: string;
  @Input() imagen: string;
  @Input() color: string;
  @Input() marcado = false;
  constructor() { }

  ngOnInit(): void {
  }

}
