import { entidadesHorarioEffects } from './store/entidadesHorario/entidadesHorario.effects';


import { actividadesEffects } from './store/actividades/actividades.effects';
import { HorariosRoutingModule } from './horarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import the new component

import { GestionActividadesComponent } from './containers/gestion-actividades/gestion-actividades.component';
import { PanelHorarioComponent } from './components/panel-horario/panel-horario.component';

// NGRX
import { ModuloHorarioFeaturekey, ModuloHorarioReducers } from './store/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { HelperModule } from '../moduloHelpers/helper.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectorEntidadesComponent } from './containers/selector-entidades/selector-entidades.component';
import { MostrarActividadComponent } from './containers/mostrar-actividad/mostrar-actividad.component';


@NgModule({
  imports: [
    CommonModule,
    HorariosRoutingModule,
    StoreModule.forFeature(ModuloHorarioFeaturekey, ModuloHorarioReducers),
    EffectsModule.forFeature([actividadesEffects, entidadesHorarioEffects]),
    HelperModule,
    NgbModule

  ],
  declarations: [

    GestionActividadesComponent,
    PanelHorarioComponent,
    SelectorEntidadesComponent,
    MostrarActividadComponent

  ],
})
export class HorariosModule { }
