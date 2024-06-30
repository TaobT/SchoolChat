import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinServerComponent } from './componentes/join-server/join-server.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginComponent } from './componentes/login/login.component';
import { CompleteRegistrationComponent } from './componentes/complete-registration/complete-registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'complete-registration', component: CompleteRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join-server', component: JoinServerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
