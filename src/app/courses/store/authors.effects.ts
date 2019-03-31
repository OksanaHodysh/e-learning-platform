import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { CourseService } from '../services/course.service';
import { allCoursesLoaded } from './courses.selectors';
import { AuthorsActionsEnum, LoadAuthors, LoadAuthorsFail, LoadAuthorsSuccess } from './authors.actions';
import { AppState } from '../../store/app.reducers';
import { HttpErrorResponse } from '@angular/common/http';
import { allAuthorsLoaded } from './authors.selectors';

@Injectable()
export class AuthorsEffects {
  @Effect()
  public loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAuthors>(AuthorsActionsEnum.LoadAuthors),
    withLatestFrom(this.store.pipe(select(allAuthorsLoaded))),
    filter(([action, authorsLoaded]) => !authorsLoaded),
    mergeMap(() => this.courseService.getAuthors()),
    map((authors) => new LoadAuthorsSuccess(authors)),
    catchError(({error}: HttpErrorResponse) => of(new LoadAuthorsFail(error)))
  );

  @Effect({ dispatch: false })
  public loadAuthorsFail$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAuthorsFail>(AuthorsActionsEnum.LoadAuthorsFail),
    tap(({message}: LoadAuthorsFail) => console.log(message))
  );

  public constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private courseService: CourseService
  ) {}
}
