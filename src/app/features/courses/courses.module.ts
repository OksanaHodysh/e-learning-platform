import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class CoursesModule { }
