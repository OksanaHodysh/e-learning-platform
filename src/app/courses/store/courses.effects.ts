import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { CoursesActionsEnum, LoadCourse, LoadCourses, LoadCoursesSuccess, LoadCourseSuccess } from './courses.actions';
import { CourseService } from '../services/course.service';
import { AppState } from '../../store/app.reducers';
import { allCoursesLoaded } from './courses.selectors';

@Injectable()
export class CoursesEffects {
    @Effect()
    public loadCourses$: Observable<Action> = this.actions$.pipe(
        ofType<LoadCourses>(CoursesActionsEnum.LoadCourses),
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        filter(([action, coursesLoaded]) => !coursesLoaded),
        mergeMap(([action, coursesLoaded]) => this.courseService.getCourses('', 5)),
        map((courses) => new LoadCoursesSuccess(courses))
    );

    @Effect()
    public loadCourse$: Observable<Action> = this.actions$.pipe(
      ofType<LoadCourse>(CoursesActionsEnum.LoadCourse),
      mergeMap(({courseId}) => this.courseService.getCourseById(courseId)),
      map((course) => new LoadCourseSuccess(course))
    );

    public constructor(
        private actions$: Actions,
        private courseService: CourseService,
        private store: Store<AppState>
    ) {}
}
