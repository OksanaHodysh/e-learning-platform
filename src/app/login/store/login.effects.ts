import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { LoginActionsEnum, Login, LoginSuccess, SetToken } from './login.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
    @Effect()
    public login$: Observable<Action> = this.actions$.pipe(
        ofType(LoginActionsEnum.Login),
        map(({login, password}: Login) => ({login, password})),
        switchMap(({login, password}) => this.authService.login2(login, password)),
        mergeMap(({token}) => [
            new SetToken(token),
            new LoginSuccess()
        ])
    );

    @Effect({ dispatch: false })
    public logout$: Observable<Action> = this.actions$.pipe(
        ofType(LoginActionsEnum.Logout),
        tap(() => this.router.navigate(['/login']))
    );

    public constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}
}
