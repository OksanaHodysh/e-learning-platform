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
                isAuthenticated: true,
                token: action.token,
                userData: action.userData
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

        default: {
            return state;
        }
    }
}
