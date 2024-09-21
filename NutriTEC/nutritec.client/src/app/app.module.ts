import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutritionistLoginComponent } from './components/nutritionist-login/nutritionist-login.component';
import { NutritionistRegisterComponent } from './components/nutritionist-register/nutritionist-register.component';
import { NutritionistViewComponent } from './components/nutritionist-view/nutritionist-view.component';
import { NutritionistBodyComponent } from './components/nutritionist-view/nutritionist-body/nutritionist-body.component';
import { NutritionistSidenavComponent } from './components/nutritionist-view/nutritionist-sidenav/nutritionist-sidenav.component';
import { GestionProductoComponent } from './components/nutritionist-view/gestion-producto/gestion-producto.component';
import { AsociacionClienteComponent } from './components/nutritionist-view/asociacion-cliente/asociacion-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    NutritionistLoginComponent,
    NutritionistRegisterComponent,
    NutritionistViewComponent,
    NutritionistBodyComponent,
    NutritionistSidenavComponent,
    GestionProductoComponent,
    AsociacionClienteComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
