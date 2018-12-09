import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class CoursesModule { }
