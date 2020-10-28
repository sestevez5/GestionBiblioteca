import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-editor-imagen',
  templateUrl: './editor-imagen.component.html',
  styleUrls: ['./editor-imagen.component.css']
})
export class EditorImagenComponent implements OnInit {

  @Input() imagenOriginal: string;
  @Output() imagenRecortadaEvent = new EventEmitter<string>();
  imagenRecortada='';


  constructor() {
    this.imagenOriginal = '';
  }

  ngOnInit(): void {
  }

  // -------------------------------------------------------
  // Eventos cropper
  // -------------------------------------------------------
  onImagenRecortada(event: ImageCroppedEvent) {

    if (event.base64) {
      this.imagenRecortada = event.base64;
      this.imagenRecortadaEvent.emit(event.base64);
    }
  }

  onImagenCargada() {
    // show cropper
  }

  onCortadorListo() {
    // cropper ready
  }

  onCargaErronea() {
    // show message
  }

}
