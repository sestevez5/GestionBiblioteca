import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';

import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';




@NgModule({
  declarations: [ListaLibrosComponent],
  imports: [
    CommonModule,
    LibrosRoutingModule
  ]
})
export class LibrosModule { }
