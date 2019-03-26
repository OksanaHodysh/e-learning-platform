import { Action } from '@ngrx/store';

export enum LoginActionsEnum {
    Login = '[Login] Login',
    LoginSuccess = '[Login] Login Success',
    LoginFail = '[Login] Login Fail',
    Logout = '[Login] Logout',
    SetToken = '[Login] Set Token'
}

export class Login implements Action {
    public readonly type = LoginActionsEnum.Login;

    public constructor(public login: string, public password: string) {}
}

export class LoginSuccess implements Action {
    public readonly type = LoginActionsEnum.LoginSuccess;
}

export class LoginFail implements Action {
    public readonly type = LoginActionsEnum.LoginFail;

    public constructor(public errorMessage: string) {}
}

export class Logout implements Action {
    public readonly type = LoginActionsEnum.Logout;
}

export class SetToken implements Action {
    public readonly type = LoginActionsEnum.SetToken;

    public constructor(public token: string) {}
}

export type LoginAction = Login | LoginSuccess | LoginFail | Logout | SetToken;
