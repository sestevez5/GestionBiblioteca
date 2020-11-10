import { HelperModule } from '../moduloHelpers/helper.module';
// Módulos angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


// Módulos Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

// modulos ngrx
import { StoreModule } from '@ngrx/store';

// componentes propios de la aplicación
import { AuthService } from './services/auth.service';
import { AuthReducers } from './store/reducers/index';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component'

import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/effects/index';

import { ModalModule } from 'ngb-modal';





@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    HelperModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(AuthReducers.authFeatureKey, AuthReducers.authReducer),
    EffectsModule.forFeature([AuthEffects.AuthEffects]),


    // Módulos relativos a firebase2
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    ModalModule

  ],
  exports: [LoginComponent],
  providers: [AuthService]

})


export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    }

    }

}
