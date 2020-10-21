import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cargar-imagen',
  templateUrl: './cargar-imagen.component.html',
  styleUrls: ['./cargar-imagen.component.css']
})

export class CargarImagenComponent {

  // propiedades
  files: any[] = [];  // Colección de ficheros (preparado para más de uno)
  imagenBase64= '';
  imagenModificadaEvent: any = '';
  imagenRecortada: any = '';



  constructor() {}


  onArrastrarFicheros(event: any) {


    console.log("has pulsado fichero onArrastrarFicheros: ", event);
    const reader: FileReader = new FileReader()

    

    for (const item of event) {
      this.imagenModificadaEvent = event
      reader.readAsBinaryString(item);
      reader.onloadend = this.aux.bind(this);
    }
  }  // fin onArrastrarFicheros($event)

  onSeleccionFicheros(event: any) {

    this.imagenModificadaEvent = event.target.files[0];
    console.log("has pulsado fichero onSeleccionFicheros: ", event.target.files);

  }

  aux(event: any): any {
    this.imagenBase64= 'data:image/png;base64, ' + btoa(event.target.result.toString());
  }



  onImagenRecortada(event: ImageCroppedEvent) {
    this.imagenRecortada = event.base64;
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
