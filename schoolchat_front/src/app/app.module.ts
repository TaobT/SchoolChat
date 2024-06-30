import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrimengModule } from './primeng/primeng.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
//Componentes
import { JoinServerComponent } from './componentes/join-server/join-server.component';
import { ChatComponent } from './componentes/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    JoinServerComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PrimengModule,
    BrowserAnimationsModule
  ],
  exports: [
    PrimengModule,
    JoinServerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
