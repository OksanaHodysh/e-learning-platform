import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { CourseEditorComponent } from './course-editor/course-editor.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaintBorderDirective } from './directives/paint-border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CourseService } from './services/course.service';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DurationCalculatorComponent } from './duration-calculator/duration-calculator.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesHomeComponent } from './courses-home/courses-home.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CourseEditorComponent,
    BreadcrumbsComponent,
    PaintBorderDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    DatePickerComponent,
    DurationCalculatorComponent,
    CoursesHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesListComponent
  ],
  providers: [
    FilterPipe,
    CourseService
  ]
})
export class CoursesModule { }
