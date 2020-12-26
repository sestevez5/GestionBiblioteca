import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';

import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { IndexLibrosComponent } from './components/index-libros/index-libros.component';




@NgModule({
  declarations: [ListaLibrosComponent, IndexLibrosComponent],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    StoreModule.forFeature('libros', reducers)
  ]
})
export class LibrosModule { }
