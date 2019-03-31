import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { LoginActionsEnum, Login, LoginSuccess, Logout, LoginFail, GetUser } from './login.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../core/models/user.model';

@Injectable()
export class LoginEffects {
    @Effect()
    public login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(LoginActionsEnum.Login),
        mergeMap(({login, password}: Login) => this.authService.logIn(login, password).pipe(
          map(({token}) => new LoginSuccess(login, token)),
          catchError(({error}: HttpErrorResponse) => of(new LoginFail(error)))
        ))
    );

    @Effect({ dispatch: false })
    public loginSuccess$: Observable<Action> = this.actions$.pipe(
      ofType<LoginSuccess>(LoginActionsEnum.LoginSuccess),
      tap(({token}: LoginSuccess) => {
          localStorage.setItem('currentUser', token);
          this.router.navigate(['/courses']);
      })
    );

    @Effect({ dispatch: false })
    public loginFail$: Observable<Action> = this.actions$.pipe(
      ofType<LoginFail>(LoginActionsEnum.LoginFail),
      tap(({errorMessage}: LoginFail) => console.log(errorMessage))
    );

    @Effect({ dispatch: false })
    public logout$: Observable<Action> = this.actions$.pipe(
        ofType<Logout>(LoginActionsEnum.Logout),
        tap(() => {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        })
    );

    @Effect()
    public getUser$: Observable<Action> = this.actions$.pipe(
        ofType<GetUser>(LoginActionsEnum.GetUser),
        mergeMap(() => this.authService.getUserInfo().pipe(
          map(({login}: User) => new LoginSuccess(login, this.authService.getAuthToken())),
          catchError(() => of(new Logout()))
        ))
    );

    @Effect()
    public init$ = defer((): Observable<Action> => {
      const token = this.authService.getAuthToken();

      if (token) {
        return of(new GetUser());
      } else {
        return of(new Logout());
      }
    });

    public constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}
}
