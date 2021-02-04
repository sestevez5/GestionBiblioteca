import { HorariosRoutingModule } from './horarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import the new component

import { GestionActividadesComponent } from './containers/gestion-actividades/gestion-actividades.component';
import { PanelHorarioComponent } from './components/panel-horario/panel-horario.component';

@NgModule({
  imports: [
    CommonModule,
    HorariosRoutingModule
  ],
  declarations: [

    GestionActividadesComponent,
    PanelHorarioComponent
  ],
})
export class HorariosModule { }
