import { RegistroComponent } from './components/nuevo-editar-usuario/nuevo-editar-usuario.component';
import { gestionUsuariosComponent } from './containers/gestionUsuarios/gestionUsuarios.component';
import { IndexSubsistemaComponent } from '../shared/components/index-subsistema/index-subsistema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioAutenticadoGuard } from './guards/usuarioAutenticado.guard';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: "full"},
  {
    path: '',
    component: IndexSubsistemaComponent,
    data: { nombreSubsistema: 'Gestión de usuarios' },
    children: [
      { path: '', redirectTo: 'index', pathMatch: "full" },
      { path: 'index', component: gestionUsuariosComponent, canActivate: [UsuarioAutenticadoGuard] },
           // { path: 'index', component: ListaUsuariosComponent, canActivate: [UsuarioAutenticadoGuard]},
           { path: 'crearUsuario', component: RegistroComponent },
            { path: 'editarUsuario/:id', component: RegistroComponent },
           // { path: 'visualizarUsuario/:id', component: RegistroComponent },
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
