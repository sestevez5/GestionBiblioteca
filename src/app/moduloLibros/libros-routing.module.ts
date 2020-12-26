import { IndexLibrosComponent } from './components/index-libros/index-libros.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path:'', component:IndexLibrosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
