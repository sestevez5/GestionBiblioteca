import { UsuarioAutenticadoGuard } from './moduloAuth/guards/usuarioAutenticado.guard';
import { ListaUsuariosComponent } from './moduloAuth/components/lista-usuarios/lista-usuarios.component';
import { RegistroComponent } from './moduloAuth/components/registro/registro.component';
import { LoginComponent } from './moduloPrincipal/components/login/login.component';

import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { IndexComponent } from './moduloPrincipal/components/index/index.component';
import { IndexSubsistemaComponent } from './shared/components/index-subsistema/index-subsistema.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,

    children: [
      { path: '', redirectTo: '/index', pathMatch: "full" },
      { path: 'index', component: IndexComponent },

      // -------------------------------------------
      // Gestión de usuarios. Incluye login
      // -------------------------------------------
      {
        path: 'login',
        component: IndexSubsistemaComponent,
        data: { nombreSubsistema: 'Autenticación' },
        children: [
          { path: '', redirectTo: 'login', pathMatch: "full" },
         // { path: 'index', component: ListaUsuariosComponent, canActivate: [UsuarioAutenticadoGuard]},
          { path: 'login', component: LoginComponent },
          //{ path: 'crearUsuario', component: RegistroComponent },
          // { path: 'editarUsuario/:id', component: RegistroComponent },
          // { path: 'visualizarUsuario/:id', component: RegistroComponent },
        ]
      },

      //-------------------------------------------
      // Gestión de libros
      //-------------------------------------------
      { path: 'usuarios', loadChildren: () => import('./moduloAuth/auth.module').then(m => m.AuthModule)},
      { path: 'libros',   loadChildren: () => import('./moduloLibros/libros.module').then(m => m.LibrosModule)},
      { path: 'lectores', loadChildren: () => import('./moduloLectores/lectores-routing.module').then(m => m.LectoresRoutingModule)}
    ]
  },

  {
    path: '**',
    redirectTo: 'authentication/404'
  }

];
