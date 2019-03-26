import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { CoursesActionsEnum, Load, LoadSuccess } from './courses.actions';
import { CourseService } from '../services/course.service';

@Injectable()
export class CoursesEffects {
    @Effect()
    public load$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionsEnum.Load),
        switchMap((action: Load) => this.courseService.getCourses('', 5)),
        map((courses) => new LoadSuccess(courses))
    );

    public constructor(
        private actions$: Actions,
        private courseService: CourseService
    ) {}
}
