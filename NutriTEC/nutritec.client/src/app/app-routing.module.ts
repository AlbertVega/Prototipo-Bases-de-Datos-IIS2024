import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionistLoginComponent } from './components/nutritionist-login/nutritionist-login.component';
import { NutritionistRegisterComponent } from './components/nutritionist-register/nutritionist-register.component';
import { NutritionistViewComponent } from './components/nutritionist-view/nutritionist-view.component';
import { GestionProductoComponent } from './components/nutritionist-view/gestion-producto/gestion-producto.component';
import { AsociacionClienteComponent } from './components/nutritionist-view/asociacion-cliente/asociacion-cliente.component';

const routes: Routes = [
  { path: 'nutritionist-login', component: NutritionistLoginComponent },
  { path: 'nutritionist-register', component: NutritionistRegisterComponent },
  {
    path: 'nutritionist-view', component: NutritionistViewComponent,
    children: [
      { path: 'gestion-producto', component: GestionProductoComponent },
      { path: 'asociacion-cliente', component: AsociacionClienteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
