import { HorariosRoutingModule } from './horarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import the new component
import { XComponent } from './components/x/x.component';
import { YComponent } from './components/y/y.component';
import { GestionActividadesComponent } from './containers/gestion-actividades/gestion-actividades.component';
import { PanelHorarioComponent } from './components/panel-horario/panel-horario.component';

@NgModule({
  imports: [
    CommonModule,
    HorariosRoutingModule
  ],
  declarations: [
    XComponent,
    YComponent,
    GestionActividadesComponent,
    PanelHorarioComponent
  ],
})
export class HorariosModule { }
