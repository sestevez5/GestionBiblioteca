import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-obtener-imagen',
  templateUrl: './obtener-imagen.component.html',
  styleUrls: ['./obtener-imagen.component.css']
})
export class ObtenerImagenComponent  {

  constructor() { }

  @Output() imagenProcesadaEvent = new EventEmitter<string>();

  imagenAProcesar = '';



  onObtenerImagen(imagen: string) {
    this.imagenAProcesar = imagen;
  }

  onImagenProcesada(imagenProcesada: string) {
    this.imagenProcesadaEvent.emit(imagenProcesada);
  }



}
