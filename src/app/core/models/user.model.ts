import { AppUser } from './app-user.model';

export class User implements AppUser {
    id: number;
    firstName: string;
    lastName: string;
}
