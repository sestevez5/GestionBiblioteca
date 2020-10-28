import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-obtener-imagen',
  templateUrl: './obtener-imagen.component.html',
  styleUrls: ['./obtener-imagen.component.css']
})
export class ObtenerImagenComponent  {

  constructor() { }

  @Output() imagenProcesadaEvent = new EventEmitter<string>();


  imagenOriginal = '';

  onObtenerImagen(imagen: string) {
    this.imagenOriginal = imagen;
  }

  onImagenProcesada(imagenProcesada: string) {
    this.imagenProcesadaEvent.emit(imagenProcesada);
  }

}
