import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { AuthenticationGuard } from './authenticationguard.service';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'sign_in' , component: LoginComponent },
  {path: 'register' , component: RegisterComponent },
  {path: 'dashboard' , component: DeshboardComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
