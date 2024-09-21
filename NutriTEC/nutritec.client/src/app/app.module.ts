import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { ClientSidenavComponent } from './components/client-view/client-sidenav/client-sidenav.component';
import { ClientBodyComponent } from './components/client-view/client-body/client-body.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminBodyComponent } from './components/admin-view/admin-body/admin-body.component';
import { AdminSidenavComponent } from './components/admin-view/admin-sidenav/admin-sidenav.component';
import { ReporteCobroComponent } from './components/admin-view/reporte-cobro/reporte-cobro.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    ClientViewComponent,
    ClientSidenavComponent,
    ClientBodyComponent,
    AdminLoginComponent,
    AdminViewComponent,
    AdminBodyComponent,
    AdminSidenavComponent,
    ReporteCobroComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }