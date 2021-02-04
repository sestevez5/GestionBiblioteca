import { GestionActividadesComponent } from './containers/gestion-actividades/gestion-actividades.component';
import { IndexSubsistemaComponent } from './../shared/components/index-subsistema/index-subsistema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: "full"},
  {
    path: '',
    component: IndexSubsistemaComponent,
    data: { nombreSubsistema: 'Gestión de Horarios' },
    children: [
      { path: '', redirectTo: 'index', pathMatch: "full" },
      { path: 'index', component: GestionActividadesComponent  },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }







