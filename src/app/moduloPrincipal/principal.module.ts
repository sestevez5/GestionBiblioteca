import { HttpClientModule } from '@angular/common/http';
import { HelperModule } from './../moduloHelpers/helper.module';
import { LoginEffects } from './store/login/login.effects';
import { EffectsModule } from '@ngrx/effects';

// MÓDULOS ANGULAR
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// COMPONENTES PLANTILLA
import { SpinnerComponent } from '../shared/spinner.component';
import { SelectorMultipleDobleListaComponent } from '../moduloHelpers/components/selector-multiple-doble-lista/selector-multiple-doble-lista.component';

// COMPONENTES APLICACIÓN
import { AppComponent } from './components/app/app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent} from './components/login/login.component';

// MÓDULOS FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';

// STORE
import { StoreModule } from '@ngrx/store';
import { ModuloPrincipalFeaturekey, ModuloPrincipalReducers } from './store/index';
import { DemoSelectorMultipleDobleListaComponent } from './components/demo-selector-multiple-doble-lista/demo-selector-multiple-doble-lista.component';
import { DemoHorarioComponent } from './components/demo-horario/demo-horario.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    AppComponent,
    IndexComponent,
    LoginComponent,
    DemoSelectorMultipleDobleListaComponent,
    DemoHorarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HelperModule,
    HttpClientModule,

    // Módulos relativos a firebase2
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,


    StoreModule.forFeature(ModuloPrincipalFeaturekey, ModuloPrincipalReducers),
    EffectsModule.forFeature([LoginEffects])
  ]
})

export class PrincipalModule {

  static forRoot(): ModuleWithProviders<PrincipalModule> {
    return {
      ngModule: PrincipalModule
    }

    }

}
