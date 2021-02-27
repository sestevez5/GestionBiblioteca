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

@NgModule({
  imports: [
    CommonModule,
    HorariosRoutingModule,
    StoreModule.forFeature(ModuloActividadesFeaturekey, ModuloActividadesReducers),
    EffectsModule.forFeature([actividadesEffects])

  ],
  declarations: [

    GestionActividadesComponent,
    PanelHorarioComponent
  ],
})
export class HorariosModule { }
