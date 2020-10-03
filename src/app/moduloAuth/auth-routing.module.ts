import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { } from './components/login/login.component';


const routes: Routes = [
   //{path:'', component: LoginComponent}
];

@NgModule({
  //imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
