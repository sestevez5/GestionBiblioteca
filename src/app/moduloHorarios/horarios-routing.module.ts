import { MostrarActividadComponent } from './components/mostrar-actividad/mostrar-actividad.component';
import { NuevaEditarActividadComponent } from './containers/nueva-editar-actividad/nueva-editar-actividad.component';
import { GestionarActividadComponent } from './containers/gestionar-actividad/gestionar-actividad.component';
import { GestionHorarioComponent } from './containers/gestion-horario/gestion-horario.component';
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
      { path: 'index', component: GestionHorarioComponent },
      { path: 'mostrarActividad/:id', component: MostrarActividadComponent },
      { path: 'editarActividad/:id', component: MostrarActividadComponent },
      { path: 'nuevaActividad', component: MostrarActividadComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }







