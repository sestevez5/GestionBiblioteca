import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';


@Component({
  selector: 'app-selector-lista-simple',
  templateUrl: './selector-lista-simple.component.html',
  styleUrls: ['./selector-lista-simple.component.css']
})
export class SelectorListaSimpleComponent implements OnInit, OnChanges {

  @Input() modelo: 'lista' | 'celdas' = 'lista'
  @Input() items: any[];
  @Input() camposConfig: camposSelectorSimple;
  @Input() anyadirBuscador = true;
  @Input() colorSeleccion:string = '';
  @Input() itemSeleccionadoPorDefecto: any;

  @Input() admiteSeleccionInterna: boolean = true;
  @Output() SeleccionItems: EventEmitter<any> = new EventEmitter();

  cadenaFiltro: string = '';
  itemsFiltrados: any[];
  itemSeleccionado: any;


  ngOnInit() {

    this.itemsFiltrados = this.items;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.items) {
      this.filtrarItems('');
    }



    if (changes.itemSeleccionadoPorDefecto && this.itemSeleccionadoPorDefecto) {
      this.items.filter(item => item === this.itemSeleccionadoPorDefecto)
        .forEach(item => this.itemSeleccionado = item);
    }
  }

  onSeleccionar(item: any) {
    if (this.admiteSeleccionInterna) {
      if (item === this.itemSeleccionado) {
        this.itemSeleccionado = null;
      }
      else {
        this.itemSeleccionado = item;
      }

      this.SeleccionItems.emit(this.itemSeleccionado);

    }

  }

  OnChangeCadenaBusqueda(cadena: string) {


    this.filtrarItems(cadena);
  }


  private filtrarItems(cadena: string) {

    
    if (cadena && cadena.length > 0) {

      this.itemsFiltrados = this.items.filter(
        item => {
          const cadenaParaFiltro = item[this.camposConfig.texto] + '~' + item[this.camposConfig.leyenda];
          return (cadenaParaFiltro.indexOf(cadena) !== -1);
        }
      );



    }
    else {
      this.itemsFiltrados = this.items;
    }


  }
}

export interface camposSelectorSimple {
  texto: string;
  leyenda: string;
  imagen: string;
  color: string;
}


