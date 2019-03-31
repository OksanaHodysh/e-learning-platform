import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    ActionFail, CancelEditCourse,
    CoursesActionsEnum, CreateCourse, CreateCourseSuccess,
    DeleteCourse,
    DeleteCourseSuccess,
    EditCourse,
    LoadCourse,
    LoadCourses,
    LoadCoursesSuccess,
    LoadCourseSuccess,
    UpdateCourse,
    UpdateCourseSuccess
} from './courses.actions';
import { CourseService } from '../services/course.service';
import { AppState } from '../../store/app.reducers';
import { allCoursesLoaded } from './courses.selectors';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CoursesEffects {
    @Effect()
    public loadCourses$: Observable<Action> = this.actions$.pipe(
        ofType<LoadCourses>(CoursesActionsEnum.LoadCourses),
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        filter(([action, coursesLoaded]) => !coursesLoaded),
        mergeMap(() => this.courseService.getCourses()),
        map((courses) => new LoadCoursesSuccess(courses)),
        catchError(({error}: HttpErrorResponse) => of(new ActionFail(error)))
    );

    @Effect()
    public loadCourse$: Observable<Action> = this.actions$.pipe(
      ofType<LoadCourse>(CoursesActionsEnum.LoadCourse),
      mergeMap(({courseId}) => this.courseService.getCourseById(courseId)),
      map((course) => new LoadCourseSuccess(course)),
      catchError(({error}: HttpErrorResponse) => of(new ActionFail(error)))
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

    @Effect()
    public updateCourse$: Observable<Action> = this.actions$.pipe(
      ofType<UpdateCourse>(CoursesActionsEnum.UpdateCourse),
      mergeMap(({course}) => this.courseService.updateCourse(course).pipe(
        map(() => new UpdateCourseSuccess(course)),
        catchError(({error}: HttpErrorResponse) => of(new ActionFail(error)))
        )
      )
    );

    @Effect()
    public createCourse$: Observable<Action> = this.actions$.pipe(
      ofType<CreateCourse>(CoursesActionsEnum.CreateCourse),
      mergeMap(({course}) => this.courseService.createCourse(course).pipe(
        map(() => new CreateCourseSuccess(course)),
        catchError(({error}: HttpErrorResponse) => of(new ActionFail(error)))
        )
      )
    );

    @Effect({ dispatch: false })
    public updateCourseSuccess$: Observable<Action> = this.actions$.pipe(
      ofType<UpdateCourseSuccess>(CoursesActionsEnum.UpdateCourseSuccess),
      tap(() => this.router.navigate(['/courses']))
    );

    @Effect({ dispatch: false })
    public createCourseSuccess$: Observable<Action> = this.actions$.pipe(
      ofType<CreateCourseSuccess>(CoursesActionsEnum.CreateCourseSuccess),
      tap(() => this.router.navigate(['/courses']))
    );

    @Effect({ dispatch: false })
    public editCourse$: Observable<Action> = this.actions$.pipe(
      ofType<EditCourse>(CoursesActionsEnum.EditCourse),
      tap(({courseId}: EditCourse) => this.router.navigate(['/courses', courseId]))
    );

    @Effect({ dispatch: false })
    public cancelEditCourse$: Observable<Action> = this.actions$.pipe(
      ofType<CancelEditCourse>(CoursesActionsEnum.CancelEditCourse),
      tap(() => this.router.navigate(['/courses']))
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
