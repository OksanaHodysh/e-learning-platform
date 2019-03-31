import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    ActionFail,
    CoursesActionsEnum,
    DeleteCourse,
    DeleteCourseSuccess,
    EditCourse,
    LoadCourse,
    LoadCourses,
    LoadCoursesSuccess,
    LoadCourseSuccess
} from './courses.actions';
import { CourseService } from '../services/course.service';
import { AppState } from '../../store/app.reducers';
import { allCoursesLoaded } from './courses.selectors';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginActionsEnum, LoginFail } from '../../login/store/login.actions';

@Injectable()
export class CoursesEffects {
    @Effect()
    public loadCourses$: Observable<Action> = this.actions$.pipe(
        ofType<LoadCourses>(CoursesActionsEnum.LoadCourses),
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        filter(([action, coursesLoaded]) => !coursesLoaded),
        mergeMap(() => this.courseService.getCourses()),
        map((courses) => new LoadCoursesSuccess(courses))
    );

    @Effect()
    public loadCourse$: Observable<Action> = this.actions$.pipe(
      ofType<LoadCourse>(CoursesActionsEnum.LoadCourse),
      mergeMap(({courseId}) => this.courseService.getCourseById(courseId)),
      map((course) => new LoadCourseSuccess(course))
    );

    @Effect()
    public deleteCourse$: Observable<Action> = this.actions$.pipe(
      ofType<DeleteCourse>(CoursesActionsEnum.DeleteCourse),
      mergeMap(({courseId}) => this.courseService.removeCourse(courseId).pipe(
        map(() => new DeleteCourseSuccess(courseId)),
        catchError(({error}: HttpErrorResponse) => of(new ActionFail(error)))
        )
      )
    );

    @Effect({ dispatch: false })
    public editCourse$: Observable<Action> = this.actions$.pipe(
      ofType<EditCourse>(CoursesActionsEnum.EditCourse),
      tap(({courseId}: EditCourse) => this.router.navigate(['/courses', courseId]))
    );

    @Effect({ dispatch: false })
    public actionFail$: Observable<Action> = this.actions$.pipe(
      ofType<ActionFail>(CoursesActionsEnum.ActionFail),
      tap(({message}: ActionFail) => console.log(message))
    );

    public constructor(
        private actions$: Actions,
        private courseService: CourseService,
        private store: Store<AppState>,
      private router: Router
    ) {}
}
