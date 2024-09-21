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

@NgModule({
  declarations: [
    AppComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    ClientViewComponent,
    ClientSidenavComponent,
    ClientBodyComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
