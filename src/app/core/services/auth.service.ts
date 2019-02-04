import { Injectable } from '@angular/core';
import { LoggedInUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = null;
  private user: LoggedInUser = null;

  constructor() { }

  public login(email: string, password: string): void {
    this.token = `${email}${password}`.split('').join('-');
    this.user = {
      email,
      password,
      token: this.token
    };
    localStorage.setItem('currentUser', JSON.stringify(this.user));
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.token = null;
    this.user = null;
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  public getUserInfo(): string {
    return this.user && this.user.email;
  }
}
