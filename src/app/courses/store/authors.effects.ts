import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { CourseService } from '../services/course.service';
import { allCoursesLoaded } from './courses.selectors';
import { AuthorsActionsEnum, LoadAuthors, LoadAuthorsSuccess } from './authors.actions';
import { AppState } from '../../store/app.reducers';

@Injectable()
export class AuthorsEffects {
  @Effect()
  public loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAuthors>(AuthorsActionsEnum.LoadAuthors),
    withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
    filter(([action, authorsLoaded]) => !authorsLoaded),
    mergeMap(([action, authorsLoaded]) => this.courseService.getAuthors()),
    map((authors) => new LoadAuthorsSuccess(authors))
  );

  public constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private courseService: CourseService
  ) {}
}
