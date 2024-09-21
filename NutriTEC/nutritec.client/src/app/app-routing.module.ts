import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { ClientViewComponent } from './components/client-view/client-view.component';

const routes: Routes = [
  { path: 'client-login', component: ClientLoginComponent },
  { path: 'client-register', component: ClientRegisterComponent },
  { path: 'client-view', component: ClientViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
