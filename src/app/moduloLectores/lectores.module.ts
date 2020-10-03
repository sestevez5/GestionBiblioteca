import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LectoresRoutingModule } from './lectores-routing.module';
import { ListaLectoresComponent } from './components/lista-lectores/lista-lectores.component';


@NgModule({
  declarations: [ListaLectoresComponent],
  imports: [
    CommonModule,
    LectoresRoutingModule
  ]
})
export class LectoresModule { }
