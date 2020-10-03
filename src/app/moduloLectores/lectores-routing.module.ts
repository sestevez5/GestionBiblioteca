import { ListaLectoresComponent } from './components/lista-lectores/lista-lectores.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path:'', component: ListaLectoresComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LectoresRoutingModule { }
