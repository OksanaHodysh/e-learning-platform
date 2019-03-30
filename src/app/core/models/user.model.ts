interface UserFullName {
    first: string;
    last: string;
}

export interface User {
    id?: number;
    fakeToken?: string;
    name?: UserFullName;
    login: string;
    password?: string;
}
