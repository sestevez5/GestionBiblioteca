import { Libro } from './../../models/libro.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {

  @Input()  libros: Libro[];
  @Output() editarLibro: EventEmitter<Libro> = new EventEmitter();
  @Output() borrarLibro: EventEmitter<Libro> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  OnEditar(libro: Libro) {
    this.editarLibro.emit(libro);
  }

  OnBorrar(libro: Libro) {
    this.borrarLibro.emit(libro);
  }

}
