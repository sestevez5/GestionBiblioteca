import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';


@Component({
  selector: 'app-selector-lista-simple',
  templateUrl: './selector-lista-simple.component.html',
  styleUrls: ['./selector-lista-simple.component.css']
})
export class SelectorListaSimpleComponent implements OnInit, OnChanges {

  @Input() items: any[];
  @Input() camposConfig: camposSelectorSimple;
  @Output() SeleccionItems: EventEmitter<any> = new EventEmitter();

  cadenaFiltro: string = '';

  itemsFiltrados: any[];


  constructor() {

  }

  ngOnChanges() {

     this.filtrarItems('');
  }


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

// var cadenaParaFiltro = nuevoUsuario.nombre +
// '~' + nuevoUsuario.primerApellido +
// '~' + nuevoUsuario.segundoApellido +
// '~' + nuevoUsuario.email;




// let incluirRegistro = true;

// var subcadena;

// if (fou && fou.contieneSubcadena) subcadena = this.normalizarCadena(fou.contieneSubcadena)


// // Se desestima si hay una subcadena que debe contener y no la contiene.
// if (subcadena && cadenaParaFiltro.indexOf(subcadena) === -1) { incluirRegistro = false }

// // Se desestima si se piden usuarios de alta y el usuario no está de alta
// if (fou && fou.SoloUsuariosDeAlta && nuevoUsuario.FechaBaja) { incluirRegistro = false }

// if (incluirRegistro) { usuarios.push(nuevoUsuario); }
