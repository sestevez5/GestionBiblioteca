import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector-lista-simple',
  templateUrl: './selector-lista-simple.component.html',
  styleUrls: ['./selector-lista-simple.component.css']
})
export class SelectorListaSimpleComponent implements OnInit {

  @Input() items: any[];
  @Input() camposConfig: camposSelectorSimple;
  @Output() SeleccionItems: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onSeleccionar(item: any) {
    const id = this.items.indexOf(item);


    for (let index = 0; index < this.items.length; index++) {
      index === id ? this.items[index].seleccionado = true : this.items[index].seleccionado = false;
    }
    this.SeleccionItems.emit(this.itemsSeleccionados());

  }

  itemsSeleccionados() {
    return this.items.filter(item => !!item.seleccionado);
  }

}

export interface camposSelectorSimple {
  texto: string;
  leyenda: string;
  imagen: string;
  color: string;
}
