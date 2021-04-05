
import { entidadesHorarioEffects } from './store/entidadesHorario/entidadesHorario.effects';


import { actividadesEffects } from './store/actividades/actividades.effects';
import { HorariosRoutingModule } from './horarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import the new component


// NGRX
import { ModuloHorarioFeaturekey, ModuloHorarioReducers } from './store/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { HelperModule } from '../moduloHelpers/helper.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectorEntidadesComponent } from './containers/selector-entidades/selector-entidades.component';
import { GestionarActividadComponent } from './containers/gestionar-actividad/gestionar-actividad.component';
import { SelectorSemanasComponent } from './containers/selector-semanas/selector-semanas.component';
import { FormsModule } from '@angular/forms';
import { NuevaEditarActividadComponent } from './containers/nueva-editar-actividad/nueva-editar-actividad.component';
import { SelectorTipoEntidadComponent } from './containers/selector-tipo-entidad/selector-tipo-entidad.component';
import { SelectorPlantillasComponent } from './containers/selector-plantillas/selector-plantillas.component';
import { MostrarActividadesComponent } from './containers/mostrar-actividades/mostrar-actividades.component';
import { CabeceraEntidadHorarioComponent } from './containers/cabecera-entidad-horario/cabecera-entidad-horario.component';
import { GestionHorarioComponent } from './containers/gestion-horario/gestion-horario.component';
import { MostrarActividadComponent } from './components/mostrar-actividad/mostrar-actividad.component';



@NgModule({
  imports: [
    CommonModule,
    HorariosRoutingModule,
    StoreModule.forFeature(ModuloHorarioFeaturekey, ModuloHorarioReducers),
    EffectsModule.forFeature([actividadesEffects, entidadesHorarioEffects]),
    HelperModule,
    NgbModule,
    FormsModule,

  ],
  declarations: [
    GestionHorarioComponent,
    SelectorEntidadesComponent,
    GestionarActividadComponent,
    SelectorSemanasComponent,
    NuevaEditarActividadComponent,
    SelectorTipoEntidadComponent,
    SelectorPlantillasComponent,
    MostrarActividadesComponent,
    CabeceraEntidadHorarioComponent,
    MostrarActividadComponent
  ],
})
export class HorariosModule { }
