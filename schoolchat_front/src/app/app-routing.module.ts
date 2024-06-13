import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinServerComponent } from './componentes/join-server/join-server.component';

const routes: Routes = [
  { path: 'join-server', component: JoinServerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
