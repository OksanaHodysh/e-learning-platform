import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoggedInUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = null;
  private user: LoggedInUser = null;

  constructor(private router: Router) { }

  public login(email: string, password: string): void {
    this.token = `${email}${password}`.split('').join('-');
    this.user = {
      email,
      password,
      token: this.token
    };
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.router.navigate(['/courses']);
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.token = null;
    this.user = null;
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  public getUserInfo(): string {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser && JSON.parse(currentUser).email;
  }
}
