import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { LoginState, loginReducer } from '../login/store/login.reducer';
import { RouterStateUrl } from './custom-serializer';
import { environment } from '../../environments/environment';

export interface AppState {
    login: LoginState;
    router: RouterReducerState<RouterStateUrl>;
}


export const reducers: ActionReducerMap<AppState> = {
    login: loginReducer,
    router: routerReducer
};

export const metaReducers: Array<MetaReducer<AppState>> = !environment.production ?
    [storeFreeze] :
    [];

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
