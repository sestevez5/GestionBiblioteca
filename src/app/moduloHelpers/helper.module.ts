import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargarImagenComponent } from './components/cargar-imagen-fichero/cargar-imagen-fichero.component'
import { DndDirective } from './directives/dnd.directive';
import {WebcamModule} from 'ngx-webcam';
import { CapturarImagenWebcamComponent } from './components/capturar-imagen-webcam/capturar-imagen-webcam.component';
import { ObtenerImagenComponent } from './components/obtener-imagen/obtener-imagen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorImagenComponent } from './components/editor-imagen/editor-imagen.component';





@NgModule({
  declarations: [
    CargarImagenComponent,
    DndDirective,
    CapturarImagenWebcamComponent,
    ObtenerImagenComponent,
    EditorImagenComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    WebcamModule,
    NgbModule
  ],
  exports: [
    CargarImagenComponent,
    DndDirective,
    CapturarImagenWebcamComponent,
    ObtenerImagenComponent
  ]
})
export class HelperModule { }
