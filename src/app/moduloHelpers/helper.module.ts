import { ItemSelectorListaSimpleComponent } from './components/selector-lista-simple/item-selector-lista-simple/item-selector-lista-simple.component';
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
import { ConfirmacionAccionUsuarioComponent } from './components/confirmacion-accion-usuario/confirmacion-accion-usuario.component';

import { ModalModule } from 'ngb-modal';
import { SelectorMultipleDobleListaComponent } from './components/selector-multiple-doble-lista/selector-multiple-doble-lista.component';
import { ItemSelectorMultipleDobleListaComponent } from './components/selector-multiple-doble-lista/item-selector-multiple-doble-lista/item-selector-multiple-doble-lista.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { VisorHorarioComponent } from './components/visorHorario/visorHorario.component';
import { SelectorListaSimpleComponent } from './components/selector-lista-simple/selector-lista-simple.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CargarImagenComponent,
    DndDirective,
    CapturarImagenWebcamComponent,
    ObtenerImagenComponent,
    EditorImagenComponent,
    ConfirmacionAccionUsuarioComponent,
    SelectorMultipleDobleListaComponent,
    ItemSelectorMultipleDobleListaComponent,
    ItemSelectorListaSimpleComponent,
    VisorHorarioComponent,
    SelectorListaSimpleComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    WebcamModule,
    NgbModule,
    ModalModule,
    DragDropModule,
    FormsModule

  ],
  exports: [
    CargarImagenComponent,
    DndDirective,
    CapturarImagenWebcamComponent,
    ObtenerImagenComponent,
    ConfirmacionAccionUsuarioComponent,
    SelectorMultipleDobleListaComponent,
    VisorHorarioComponent,
    SelectorListaSimpleComponent
  ]
})
export class HelperModule { }
