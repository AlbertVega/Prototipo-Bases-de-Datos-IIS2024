import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { ReporteCobroComponent } from './components/admin-view/reporte-cobro/reporte-cobro.component';

const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin-view', component: AdminViewComponent,
    children: [
      { path: 'reporte-cobro', component: ReporteCobroComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
