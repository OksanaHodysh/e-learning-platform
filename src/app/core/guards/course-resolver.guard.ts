import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { Course } from '../../courses/models/course.model';
import { AppState } from '../../store/app.reducers';
import { selectCourseById } from '../../courses/store/courses.selectors';
import { LoadCourse } from '../../courses/store/courses.actions';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverGuard implements Resolve<Course> {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Course> | Observable<never> | Course {
      const id = parseInt(route.paramMap.get('id'), 10);
      return this.store.pipe(
        select(selectCourseById(id)),
        tap((course) => {
          if (!course) {
            this.store.dispatch(new LoadCourse(id));
          }
        }),
        filter((course) => !!course),
        take(1)
      );
  }
}
