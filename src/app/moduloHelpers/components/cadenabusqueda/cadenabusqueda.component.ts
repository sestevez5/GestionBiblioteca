import { skip, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cadenabusqueda',
  templateUrl: './cadenabusqueda.component.html',
  styleUrls: ['./cadenabusqueda.component.css']
})
export class CadenabusquedaComponent implements OnInit {

  // Gestionamos el cambio de la subcadena para filtrar a través de un observable que emite un valor cada vez que cambia.
  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }

  @Input() tiempoEspera: number = 700;
  @Input() textoIndicativo: string = 'Buscar';
  @Output() cadenaBusqueda = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {

    this._textoFiltro
      .pipe(
        skip(1), // El primer valor del cuadro de texto queremos omitirlo.
        debounceTime(this.tiempoEspera),
        distinctUntilChanged()
      )
      .subscribe(
        val => this.cadenaBusqueda.emit(val));
  }



}
