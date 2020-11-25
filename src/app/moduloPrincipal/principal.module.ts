import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '../shared/spinner.component';
import { PrincipalReducers } from './store/reducers/index';


import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    SpinnerComponent,
    AppComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(PrincipalReducers.principalFeatureKey, PrincipalReducers.principalReducer)
  ]
})


export class PrincipalModule {

  static forRoot(): ModuleWithProviders<PrincipalModule> {
    return {
      ngModule: PrincipalModule
    }

    }

}
