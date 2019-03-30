import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoginState } from './login.reducer';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const authenticated = createSelector(
  selectLoginState,
  ({isAuthenticated}) => isAuthenticated
);

export const userLogin = createSelector(
  selectLoginState,
  ({userData}) => userData
);
