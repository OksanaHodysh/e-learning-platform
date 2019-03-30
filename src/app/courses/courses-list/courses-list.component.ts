import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Course } from '../course.model';
import { FilterPipe } from '../pipes/filter.pipe';
import { CourseService } from '../services/course.service';
import { CoursesState } from '../store/courses.reducer';
import { AppState } from '../../store/app.reducers';
import { Load } from '../store/courses.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses: Array<Course> = [];
  public courses$: Observable<CoursesState>;
  public searchForm: FormControl;
  public limit: number;
  public step: number;
  public isLastPage = false;

  constructor(
    private filterPipe: FilterPipe,
    private courseService: CourseService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.courses$ = this.store.select('courses');
    this.store.dispatch(new Load());
    this.courses$.subscribe((state) => console.log(state));
    this.step = 5;
    this.limit = this.step;
    this.searchForm = new FormControl();
    this.searchForm.valueChanges.pipe(
      map((text) => text.length >= 3 ? text : ''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((courseName) => (
        this.courseService.getCourses(courseName, this.step)
      ))
    ).subscribe((data) => {
      this.limit = this.step;
      this.isLastPage = false;
      this.setCourses(data);
    });

    this.searchForm.setValue('');
  }

  public deleteCourse(courseId: number): void {
    const deletionConfirmed = confirm('Do you really want to delete this course?');
    if (deletionConfirmed) {
      this.courseService.removeCourse(courseId).pipe(
        switchMap(() => (
          this.courseService.getCourses(this.searchForm.value, this.limit)
        ))
      ).subscribe(
        (data) => this.setCourses(data),
        () => console.log('Something went wrong. Failed to delete selected course.')
      );
    }
  }

  public editCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  public loadMore(): void {
      this.limit += this.step;
      this.courseService.getCourses(this.searchForm.value, this.limit)
        .subscribe(
          (data) => this.setCourses(data),
          (error) => console.log(error)
        );
  }

  public setCourses(courses: Array<Course>): void {
    if (
      courses.length < this.limit ||
      (this.courses.length && this.courses[this.courses.length - 1].id) === courses[courses.length - 1].id
    ) {
      this.isLastPage = true;
    }
    this.courses = courses;
  }
}
