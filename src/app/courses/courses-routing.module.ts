import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseEditorComponent } from './course-editor/course-editor.component';
import { CoursesHomeComponent } from './courses-home/courses-home.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';

const coursesRoots = {
  default: '',
  courses: 'courses',
  coursesNew: 'new',
  coursesId: ':id'
};

const routes: Routes = [
  {
    path: coursesRoots.courses,
    component: CoursesHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: coursesRoots.default,
        component: CoursesListComponent
      },
      {
        path: coursesRoots.coursesNew,
        component: CourseEditorComponent
      },
      {
        path: coursesRoots.coursesId,
        component: CourseEditorComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoursesRoutingModule { }
