import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from './courses/courses.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesModule
  ],
  exports: [
    CoursesModule
  ]
})
export class FeaturesModule { }
