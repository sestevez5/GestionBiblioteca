import { RegistroComponent } from '../moduloAuth/components/registro/registro.component';
import { LoginComponent } from '../moduloAuth/components/login/login.component';

import { Routes } from '@angular/router';

import { FullComponent } from '../layouts/full/full.component';
import { BlankComponent } from '../layouts/blank/blank.component';
import { IndexComponent } from './components/index/index.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/index', pathMatch: "full"},
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'index', component: IndexComponent },

      {
        path: 'libros',
        loadChildren:
            () => import('../moduloLibros/libros-routing.module').then(m => m.LibrosRoutingModule)
      },
      {
        path: 'lectores',
        loadChildren:
            () => import('../moduloLectores/lectores-routing.module').then(m => m.LectoresRoutingModule)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'authentication/404'
  }

];
