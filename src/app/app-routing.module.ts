import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { LoginComponent } from './features/login/login/login.component';
import { CourseEditorComponent } from './features/courses/course-editor/course-editor.component';

enum AppRoots {
  Courses = 'courses',
  Login = 'login',
  Edit = 'edit'
}

const routes: Routes = [
  { path: AppRoots.Courses, component: CoursesListComponent },
  { path: AppRoots.Login, component: LoginComponent },
  { path: AppRoots.Edit, component: CourseEditorComponent},
  { path: '**', redirectTo: AppRoots.Courses }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
