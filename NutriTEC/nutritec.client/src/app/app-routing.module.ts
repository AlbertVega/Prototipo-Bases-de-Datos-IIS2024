import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionistLoginComponent } from './components/nutritionist-login/nutritionist-login.component';

const routes: Routes = [
  { path: 'nutritionist-login', component: NutritionistLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
