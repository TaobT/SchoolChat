import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinServerComponent } from './componentes/join-server/join-server.component';
import { ChatComponent } from "./componentes/chat/chat.component";

const routes: Routes = [
  { 
    path: 'join-server', 
    component: JoinServerComponent 
  },
  { 
    path: 'chat', 
    component: ChatComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
