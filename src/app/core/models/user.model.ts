interface User {
    first: string;
    last: string;
}

export interface LoggedInUser {
    id: number;
    fakeToken: string;
    name: User;
    login: string;
    password: string;
}
