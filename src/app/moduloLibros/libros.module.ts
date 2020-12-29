import { ModuloLibrosFeaturekey, ModuloLibrosReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';

import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { IndexLibrosComponent } from './components/index-libros/index-libros.component';
import { EffectsModule } from '@ngrx/effects';
import { LibrosEffects } from './store/libros.effects';
import { NuevoEditarLibroComponent } from './components/nuevo-editar-libro/nuevo-editar-libro.component';




@NgModule({
  declarations: [ListaLibrosComponent, IndexLibrosComponent, NuevoEditarLibroComponent],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    StoreModule.forFeature(ModuloLibrosFeaturekey, ModuloLibrosReducers),
    EffectsModule.forFeature([LibrosEffects])
  ]
})
export class LibrosModule { }
