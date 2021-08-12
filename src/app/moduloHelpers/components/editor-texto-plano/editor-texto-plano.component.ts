import { Target } from 'angular-feather/icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-texto-plano',
  templateUrl: './editor-texto-plano.component.html',
  styleUrls: ['./editor-texto-plano.component.css']
})
export class EditorTextoPlanoComponent implements OnInit {

  @Input() textoPorDefecto = '';
  @Output() textoSalida : EventEmitter<string> = new EventEmitter();

  constructor() {  }

  ngOnInit(): void {
    this.textoSalida.emit(this.textoPorDefecto);
  }

  onChangeEvent(cadena: any) {
    this.textoSalida.emit(cadena.target.value);
  }

}
