import { Action } from '@ngrx/store';

import { Author } from '../models/author.model';

export enum AuthorsActionsEnum {
  LoadAuthors = '[Courses] Load Authors',
  LoadAuthorsFail = '[Courses] Load Authors Fail',
  LoadAuthorsSuccess = '[Courses] Load Authors Success'
}

export class LoadAuthors implements Action {
  public readonly type = AuthorsActionsEnum.LoadAuthors;
}

export class LoadAuthorsFail implements Action {
  public readonly type = AuthorsActionsEnum.LoadAuthorsFail;

  public constructor(public message: string) {}
}

export class LoadAuthorsSuccess implements Action {
  public readonly type = AuthorsActionsEnum.LoadAuthorsSuccess;

  public constructor(public authors: Array<Author>) {}
}

export type AuthorsAction = LoadAuthors | LoadAuthorsFail | LoadAuthorsSuccess;
