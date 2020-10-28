import { Component, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cargar-imagen-fichero',
  templateUrl: './cargar-imagen-fichero.component.html',
  styleUrls: ['./cargar-imagen-fichero.component.css']
})

export class CargarImagenComponent {

  @Output() imagenFicheroEvent = new EventEmitter<string>();
  // propiedades

  imagenObtenida = false;

  mensajeError: string | null = null;

  constructor() {}

  onArrastrarFicheros(event: any) {
    const file: File = event[0];
    this.cargarImagen(file);
  }  // fin onArrastrarFicheros($event)

  onSeleccionFicheros(event: any) {
    const file:File = event.target.files[0];
    this.cargarImagen(file);
  }

  // -------------------------------------------------------
  // Eventos editor
  // -------------------------------------------------------
  onImagenRecortada(imagen: string) {

    this.imagenFicheroEvent.emit(imagen);
  }

  // Funciones Auxiliares
  cargarImagen(file: File) {

    if (file.type === 'image/png' || file.type === 'image/jpeg' ) {
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onloadend = this.ConvertirImagenEnBase64.bind(this);
      this.mensajeError = '';
    } else {
      this.imagenObtenida = false;
      this.mensajeError = 'Solo se admiten imágenes en formato "jpg" o "png"';
    }
  }

  ConvertirImagenEnBase64(event: any): any {
    const imagen = 'data:' + event.type + ';base64, ' + btoa(event.target.result.toString());
    this.imagenObtenida = true;
    this.imagenFicheroEvent.emit(imagen);
  }

}
