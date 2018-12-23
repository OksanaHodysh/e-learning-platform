import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';

enum AppRoots {
  Courses = 'courses'
}

const routes: Routes = [
  { path: AppRoots.Courses, component: CoursesListComponent },
  { path: '**', redirectTo: AppRoots.Courses }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
