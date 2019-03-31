import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { AppState } from '../../store/app.reducers';
import { DeleteCourse, EditCourse, LoadCourses } from '../store/courses.actions';
import { FormControl } from '@angular/forms';
import { selectCourses, selectSearchedCourses } from '../store/courses.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses: Array<Course> = [];
  public step = 5;
  public limit = this.step;
  public page$ = new BehaviorSubject(this.limit);
  public pageSize$: Observable<number>;
  public searchResults$: Observable<Array<Course>>;
  public courses$: Observable<Array<Course>>;
  public searchForm: FormControl;
  public isLastPage = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadCourses());
    this.step = 5;
    this.limit = this.step;
    this.searchForm = new FormControl('');
    this.searchResults$ = this.searchForm.valueChanges.pipe(
      map((text) => text.length >= 3 ? text : ''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((courseName) => (
        this.store.pipe(
          select(selectSearchedCourses(courseName))
        )
      )),
      tap(() => {
        this.limit = this.step;
        this.page$.next(this.limit);
        this.isLastPage = false;
      })
    );
    this.pageSize$ = this.page$.asObservable();
    this.courses$ = combineLatest(this.searchResults$, this.pageSize$).pipe(
      map(([searchResults, limit]) => {
        if (searchResults.length <= limit) {
          this.isLastPage = true;
        }
        return searchResults.slice(0, limit);
      })
    );

    this.courses$.subscribe((data) => {
      this.courses = data;
    });

    this.searchForm.setValue('');
  }

  public editCourse(courseId: number): void {
    this.store.dispatch(new EditCourse(courseId));
  }

  public deleteCourse(courseId: number): void {
    const deletionConfirmed = confirm('Do you really want to delete this course?');
    if (deletionConfirmed) {
      this.store.dispatch(new DeleteCourse(courseId));
    }
  }

  public loadMore(): void {
    this.limit += this.step;
    this.page$.next(this.limit);
  }
}
