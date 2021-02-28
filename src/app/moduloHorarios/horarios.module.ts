import { actividadesEffects } from './store/actividades.effects';
import { HorariosRoutingModule } from './horarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import the new component

import { GestionActividadesComponent } from './containers/gestion-actividades/gestion-actividades.component';
import { PanelHorarioComponent } from './components/panel-horario/panel-horario.component';

// NGRX
import { ModuloActividadesFeaturekey, ModuloActividadesReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { HelperModule } from '../moduloHelpers/helper.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectorEntidadesComponent, EnumToArrayPipe } from './containers/selector-entidades/selector-entidades.component';
import { MostrarActividadComponent } from './containers/mostrar-actividad/mostrar-actividad.component';


@NgModule({
  imports: [
    CommonModule,
    HorariosRoutingModule,
    StoreModule.forFeature(ModuloActividadesFeaturekey, ModuloActividadesReducers),
    EffectsModule.forFeature([actividadesEffects]),
    HelperModule,
    NgbModule

  ],
  declarations: [

    GestionActividadesComponent,
    PanelHorarioComponent,
    SelectorEntidadesComponent,
    EnumToArrayPipe,
    MostrarActividadComponent

  ],
})
export class HorariosModule { }
