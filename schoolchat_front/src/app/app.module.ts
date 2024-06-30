import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrimengModule } from './primeng/primeng.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { JoinServerComponent } from './componentes/join-server/join-server.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { CompleteRegistrationComponent } from './componentes/complete-registration/complete-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    JoinServerComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CompleteRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    PrimengModule,
    JoinServerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
