import { DemoSelectorMultipleDobleListaComponent } from './moduloPrincipal/components/demo-selector-multiple-doble-lista/demo-selector-multiple-doble-lista.component';
import { UsuarioAutenticadoGuard } from './moduloAuth/guards/usuarioAutenticado.guard';
import { RegistroComponent } from './moduloAuth/components/nuevo-editar-usuario/nuevo-editar-usuario.component';
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
      { path: 'demo', component: DemoSelectorMultipleDobleListaComponent },
      // { path: 'horario', component: DemoHorarioComponent },


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
      { path: 'lectores', loadChildren: () => import('./moduloLectores/lectores.module').then(m => m.LectoresModule) },
      { path: 'horarios', loadChildren: () => import('./moduloHorarios/horarios.module').then(m => m.HorariosModule) }
    ]
  },

  {
    path: '**',
    redirectTo: 'authentication/404'
  }

];
