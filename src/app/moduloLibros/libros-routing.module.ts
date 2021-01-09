import { gestionLibrosComponent } from './containers/gestionLibros/gestionLibros.component';
import { NuevoEditarLibroComponent } from './components/nuevo-editar-libro/nuevo-editar-libro.component';
import { IndexSubsistemaComponent } from './../shared/components/index-subsistema/index-subsistema.component';
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
      { path: 'index', component: gestionLibrosComponent },
      { path: 'crearLibro', component: NuevoEditarLibroComponent },
      { path: 'editarLibro/:id', component: NuevoEditarLibroComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
