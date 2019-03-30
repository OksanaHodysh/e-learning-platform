import { Action } from '@ngrx/store';

export enum LoginActionsEnum {
    Login = '[Login] Login',
    LoginSuccess = '[Login] Login Success',
    LoginFail = '[Login] Login Fail',
    Logout = '[Login] Logout',
    GetUser = '[Login] Get User',
}

export class Login implements Action {
    public readonly type = LoginActionsEnum.Login;

    public constructor(public login: string, public password: string) {}
}

export class LoginSuccess implements Action {
    public readonly type = LoginActionsEnum.LoginSuccess;

    public constructor(public userData: string, public token: string) {}
}

export class LoginFail implements Action {
    public readonly type = LoginActionsEnum.LoginFail;

    public constructor(public errorMessage: string) {}
}

export class Logout implements Action {
    public readonly type = LoginActionsEnum.Logout;
}

export class GetUser implements Action {
    public readonly type = LoginActionsEnum.GetUser;
}

export type LoginAction = Login |
  LoginSuccess |
  LoginFail |
  Logout |
  GetUser;
