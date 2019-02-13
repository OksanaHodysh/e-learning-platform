import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const AppRoots = {
  default: '',
  courses: 'courses',
  login: 'login'
};

const routes: Routes = [
  { path: AppRoots.login, component: LoginComponent },
  { path: AppRoots.default, redirectTo: AppRoots.courses, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
