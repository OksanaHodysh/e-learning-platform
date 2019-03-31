import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
import { AuthorsSelectComponent } from './authors-select/authors-select.component';
import { AuthorsEffects } from './store/authors.effects';
import { CoursesEffects } from './store/courses.effects';
import { authorsReducer } from './store/authors.reducer';
import { coursesReducer } from './store/courses.reducer';
import { FilterAuthorsPipe } from './pipes/filter-authors.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';

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
    CoursesHomeComponent,
    AuthorsSelectComponent,
    FilterAuthorsPipe,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    StoreModule.forFeature('courses', coursesReducer),
    StoreModule.forFeature('authors', authorsReducer),
    EffectsModule.forFeature([CoursesEffects, AuthorsEffects])
  ],
  exports: [
    CoursesListComponent
  ],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
