import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-selector-multiple-doble-lista',
  templateUrl: './selector-multiple-doble-lista.component.html',
  styleUrls: ['./selector-multiple-doble-lista.component.css']
})
export class SelectorMultipleDobleListaComponent implements OnInit, OnChanges {

  @Input() items: any[];
  @Input() itemsPreseleccionados: any[];
  @Input() camposConfig: camposSelectorDoble;
  @Output() SeleccionItems: EventEmitter<any[]> = new EventEmitter();



  constructor() { }

  ngOnChanges() {
    console.log('change');
    this.itemsPreseleccionados?.forEach(itemPreseleccionado => {

      this.items.filter(item => item === itemPreseleccionado).forEach(
        item => this.onSeleccionar(item)
      )
    }

    );

  }
  ngOnInit(): void {

    console.log('init docentes');

    this.items?.forEach(item => {
      return { ...item, seleccionado: false, marcado: false }
    });



    console.log('items seleccionados:', this.itemsSeleccionados());
  }

  onSeleccionar(item: any) {
    const id = this.items.indexOf(item);
    this.items[id].seleccionado = true;
    this.items[id].marcado = false;

    this.SeleccionItems.emit(this.itemsSeleccionados());

  }

  onDeseleccionar(item: any) {

    const id = this.items.indexOf(item);
    this.items[id].seleccionado = false;
    this.items[id].marcado = false;

    this.SeleccionItems.emit(this.itemsSeleccionados());
  }


  onToggleMarcar(item: any) {
    const id = this.items.indexOf(item);
    this.items[id].marcado = !this.items[id].marcado;

  }

  onSeleccionarMarcados() {

    this.items.filter(item => !item.seleccionado && item.marcado).forEach(
      item => {
        item.seleccionado = true;
        item.marcado = false;
      }
    );

    this.SeleccionItems.emit(this.itemsSeleccionados());



  }

  onDeseleccionarMarcados() {
    this.items.filter(item => item.seleccionado && item.marcado).forEach(
      item => {
        item.seleccionado = false;
        item.marcado = false;
      }
    );

    this.SeleccionItems.emit(this.itemsSeleccionados());

  }


  itemsSeleccionados() {
    return this.items.filter(item => !!item.seleccionado);
  }

  itemsNoSeleccionados() {
    return this.items.filter(item => !item.seleccionado);
  }

  hayItemsSeleccionadosMarcados() {
    return this.items.filter(item => !!item.seleccionado && !!item.marcado).length != 0;
  }

  hayItemsNoSeleccionadosMarcados() {
    return this.items.filter(item => !item.seleccionado && !!item.marcado).length != 0;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


}


export interface camposSelectorDoble {
  texto: string;
  leyenda: string;
  imagen: string;
  color: string;
}
