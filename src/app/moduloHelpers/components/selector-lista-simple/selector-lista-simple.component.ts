import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';


@Component({
  selector: 'app-selector-lista-simple',
  templateUrl: './selector-lista-simple.component.html',
  styleUrls: ['./selector-lista-simple.component.css']
})
export class SelectorListaSimpleComponent implements OnChanges {

  @Input() items: any[];
  @Input() camposConfig: camposSelectorSimple;
  @Input() anyadirBuscador = true;
  @Input() colorSeleccion = '';
  @Output() SeleccionItems: EventEmitter<any> = new EventEmitter();

  cadenaFiltro: string = '';
  itemsFiltrados: any[];
  // itemSeleccionado: any;

  @Input() itemSeleccionado: any;

  ngOnChanges() {
    this.filtrarItems('');
  }

  onSeleccionar(item: any) {
    this.SeleccionItems.emit(item);
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
      )
    } else this.itemsFiltrados = this.items;




  }
}

export interface camposSelectorSimple {
  texto: string;
  leyenda: string;
  imagen: string;
  color: string;
}


