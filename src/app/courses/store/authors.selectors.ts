import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthorsState, selectAll } from './authors.reducer';

export const selectAuthorsState = createFeatureSelector<AuthorsState>('authors');

export const selectAuthors = createSelector(
  selectAuthorsState,
  selectAll
);

export const allAuthorsLoaded = createSelector(
  selectAuthorsState,
  (({authorsLoaded}) => authorsLoaded)
);
