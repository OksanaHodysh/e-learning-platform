import { createSelector } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';

export const selectLoginState = (state: AppState) =>  state.login;

export const authenticated = createSelector(
  selectLoginState,
  ({isAuthenticated}) => isAuthenticated
);

export const userLogin = createSelector(
  selectLoginState,
  ({userData}) => userData
);
