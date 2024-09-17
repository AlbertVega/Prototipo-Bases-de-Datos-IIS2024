import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionistLoginComponent } from './components/nutritionist-login/nutritionist-login.component';
import { NutritionistRegisterComponent } from './components/nutritionist-register/nutritionist-register.component';

const routes: Routes = [
  { path: 'nutritionist-login', component: NutritionistLoginComponent },
  { path: 'nutritionist-register', component: NutritionistRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
