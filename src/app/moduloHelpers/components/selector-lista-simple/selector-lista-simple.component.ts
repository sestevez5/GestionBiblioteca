import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, first, skip } from 'rxjs/operators';


@Component({
  selector: 'app-selector-lista-simple',
  templateUrl: './selector-lista-simple.component.html',
  styleUrls: ['./selector-lista-simple.component.css']
})
export class SelectorListaSimpleComponent implements OnInit {

  @Input() items: any[];
  @Input() camposConfig: camposSelectorSimple;
  @Output() SeleccionItems: EventEmitter<any> = new EventEmitter();

  // Gestionamos el cambio de la subcadena para filtrar a través de un observable que emite un valor cada vez que cambia.
  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }
  constructor() { }

  ngOnInit(): void {

    this._textoFiltro
      .pipe(
        skip(1), // El primer valor del cuadro de texto queremos omitirlo.
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe(
        val => console.log(val)
    )

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
