import { Params } from '@angular/router';
import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { CoursesState, coursesReducer } from '../courses/store/courses.reducer';
import { LoginState, loginReducer } from '../login/store/login.reducer';
import { environment } from '../../environments/environment';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface AppState {
    courses: CoursesState;
    login: LoginState;
    router: RouterReducerState<RouterStateUrl>;
}


export const reducers: ActionReducerMap<AppState> = {
    courses: coursesReducer,
    login: loginReducer,
    router: routerReducer
};

export const metaReducers: Array<MetaReducer<AppState>> = !environment.production ?
    [storeFreeze] :
    [];

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
