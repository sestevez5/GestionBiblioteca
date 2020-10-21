import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargarImagenComponent } from './components/cargar-imagen/cargar-imagen.component'
import { DndDirective } from './directives/dnd.directive'



@NgModule({
  declarations: [
    CargarImagenComponent,
    DndDirective
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    CargarImagenComponent,
    DndDirective
  ]
})
export class HelperModule { }
