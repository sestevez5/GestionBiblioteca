import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-capturar-imagen-webcam',
  templateUrl: './capturar-imagen-webcam.component.html',
  styleUrls: ['./capturar-imagen-webcam.component.css']
})
export class CapturarImagenWebcamComponent {

  @Output() imagenCamaraEvent = new EventEmitter<string>();

  capturandoImagen = false;
  imagenCapturada = false;

  // Observable que recibe la camara para solicitarle una captura.
  private lanzarCaptura: Subject<void> = new Subject<void>();

  // Una vez que la imagen es capturada, procesamos el objeto devuelto.
  onCapturadaImagen(eventoImagenCapturada: WebcamImage) {
    const imagen = eventoImagenCapturada.imageAsBase64;
    this.imagenCamaraEvent.emit('data:png;base64, '+imagen);
    this.capturandoImagen = false;
    this.imagenCapturada = true;
  }

  onHabilitarProcesoCaptura() {
    this.capturandoImagen = true;
    this.imagenCapturada = false;
  }

  onIniciarCaptura() {
    this.lanzarCaptura.next();
  }

  public get lanzarCapturaAsObservable(): Observable<void> {
    return this.lanzarCaptura.asObservable();
  }

}
