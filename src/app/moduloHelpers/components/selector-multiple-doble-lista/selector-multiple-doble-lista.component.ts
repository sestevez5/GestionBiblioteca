import { Component, OnInit, Input } from '@angular/core';
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
export class SelectorMultipleDobleListaComponent implements OnInit {

  @Input() items: any[];
  @Input() campos: any;

  public camposItems: {
    identificador: null,
    imagen: null,
    texto: null,
    leyenda: null,
  }

  constructor() { }

  ngOnInit(): void {

    this.items.forEach(item => {
      return {...item, seleccionado:false, marcado: false}
    }

    )
  }

  onSeleccionar(item: any) {
    console.log("Seleccionado elemento: ", item.nombre);
    const id = this.items.indexOf(item);
    this.items[id].seleccionado = true;
    this.items[id].marcado = false;


  }

  onDeseleccionar(item: any) {
    console.log("DesSeleccionado elemento: ", item.nombre);
    const id = this.items.indexOf(item);
    this.items[id].seleccionado = false;
    this.items[id].marcado = false;
  }


  onToggleMarcar(item: any) {
    console.log("toggle elemento: ", item.nombre);
    const id = this.items.indexOf(item);
    this.items[id].marcado = !this.items[id].marcado;

  }

  onSeleccionarMarcados() {

    this.items.filter(item => !item.seleccionado && item.marcado).forEach(
      item => {
        item.seleccionado = true;
        item.marcado = false;
      }
      )

  }

  onDeseleccionarMarcados() {
    this.items.filter(item => item.seleccionado && item.marcado).forEach(
      item => {
        item.seleccionado = false;
        item.marcado = false;
      }
      )

  }


  itemsSeleccionados() {
    return this.items.filter(item => !!item.seleccionado);
  }

  itemsNoSeleccionados() {
    return this.items.filter(item => !item.seleccionado);
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
