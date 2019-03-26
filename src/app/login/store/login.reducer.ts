import { LoginAction, LoginActionsEnum } from './login.actions';

export interface LoginState {
    isAuthenticated: boolean;
    token: string;
    userData: string;
}

const initialState: LoginState = {
    isAuthenticated: false,
    token: null,
    userData: null
};

export function loginReducer(
    state = initialState,
    action: LoginAction
): LoginState {
    switch (action.type) {

        case LoginActionsEnum.LoginSuccess: {
            return {
                ...state,
                isAuthenticated: true
            };
        }

        case LoginActionsEnum.Logout: {
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userData: null
            };
        }

        case LoginActionsEnum.SetToken: {
            return {
                ...state,
                token: action.token
            };
        }

        default: {
            return state;
        }
    }
}
