import { LibrosService } from './services/libros.service';
// MÓDULOS ANGULAR
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// ELEMENTOS PROPIOS DEL MÓDULO

// Componentes
import { NuevoEditarLibroComponent } from './components/nuevo-editar-libro/nuevo-editar-libro.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { gestionLibrosComponent } from './containers/gestionLibros/gestionLibros.component';

// Routing
import { LibrosRoutingModule } from './libros-routing.module';
import { LibrosEffects } from './store/libros.effects';

// MODULOS DE LA APLICACIÓN
import { HelperModule } from '../moduloHelpers/helper.module';

// MÓDULOS DE TERCEROS
import { ModalModule } from 'ngb-modal';
import { FeatherModule } from 'angular-feather';

// NGRX
import { ModuloLibrosFeaturekey, ModuloLibrosReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// MÓDULOS FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../environments/environment';


@NgModule({
  declarations: [
    ListaLibrosComponent,
    NuevoEditarLibroComponent,
    gestionLibrosComponent
   ],
  imports: [
    HelperModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LibrosRoutingModule,
    FeatherModule,
    StoreModule.forFeature(ModuloLibrosFeaturekey, ModuloLibrosReducers),
    EffectsModule.forFeature([LibrosEffects]),
    // Módulos relativos a firebase2
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ModalModule
  ],
  exports: [],
  providers: [LibrosService]
})
export class LibrosModule {

  static forRoot(): ModuleWithProviders<LibrosModule> {
    return {
      ngModule: LibrosModule,
      providers: [LibrosService]
    }

    }

}
