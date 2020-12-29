import { NuevoEditarLibroComponent } from './components/nuevo-editar-libro/nuevo-editar-libro.component';
import { IndexSubsistemaComponent } from './../shared/components/index-subsistema/index-subsistema.component';
import { IndexLibrosComponent } from './components/index-libros/index-libros.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: "full"},
  {
    path: '',
    component: IndexSubsistemaComponent,
    data: { nombreSubsistema: 'Gestión de libros' },
    children: [
      { path: '', redirectTo: 'index', pathMatch: "full" },
      { path: 'index', component: IndexLibrosComponent },
      { path: 'nuevoLibro', component: NuevoEditarLibroComponent },
      { path: 'editarLibro', component: NuevoEditarLibroComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
