import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { ReporteCobroComponent } from './components/admin-view/reporte-cobro/reporte-cobro.component';
import { NutritionistLoginComponent } from './components/nutritionist-login/nutritionist-login.component';
import { NutritionistRegisterComponent } from './components/nutritionist-register/nutritionist-register.component';
import { NutritionistViewComponent } from './components/nutritionist-view/nutritionist-view.component';
import { GestionProductoComponent } from './components/nutritionist-view/gestion-producto/gestion-producto.component';
import { AsociacionClienteComponent } from './components/nutritionist-view/asociacion-cliente/asociacion-cliente.component';


const routes: Routes = [
  { path: 'client-login', component: ClientLoginComponent },
  { path: 'client-register', component: ClientRegisterComponent },
  { path: 'client-view', component: ClientViewComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin-view', component: AdminViewComponent,
    children: [
      { path: 'reporte-cobro', component: ReporteCobroComponent }
    ]
  },
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
