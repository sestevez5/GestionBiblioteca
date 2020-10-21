import { RegistroComponent } from './moduloAuth/components/registro/registro.component';
import { LoginComponent } from './moduloAuth/components/login/login.component';

import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: "full"},
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },

    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
        {
          path: 'libros',
          loadChildren:
              () => import('./moduloLibros/libros-routing.module').then(m => m.LibrosRoutingModule)
        },
        {
          path: 'lectores',
          loadChildren:
              () => import('./moduloLectores/lectores-routing.module').then(m => m.LectoresRoutingModule)
        }
    ]
},


  {
      path: '',
      component: BlankComponent,
      children: [
          {
              path: 'authentication',
              loadChildren:
                  () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
          }
      ]
  },
  { path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },

    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
