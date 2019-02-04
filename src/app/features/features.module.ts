import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesModule,
    LoginModule
  ],
  exports: [
    CoursesModule,
    LoginModule
  ]
})
export class FeaturesModule { }
