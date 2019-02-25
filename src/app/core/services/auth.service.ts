import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggedInUser } from '../models/user.model';

interface AuthToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token = localStorage.getItem('currentUser');
  public readonly API_URL = 'http://localhost:3004';

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  public login(login: string, password: string): void {
    this.http.post<AuthToken>(`${this.API_URL}/auth/login`, {login, password})
      .subscribe(
        ({token}) => {
          this.token = token;
          localStorage.setItem('currentUser', token);
          this.router.navigate(['/courses']);
        },
        () => console.log('No user found with such login and/or password.'));
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.token = null;
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getAuthToken(): string {
    return this.token;
  }

  public getUserInfo(): Observable<string> {
    return this.isAuthenticated() ?
      this.http.post<LoggedInUser>(`${this.API_URL}/auth/userinfo`, null)
        .pipe(map(({login}) => login)) :
      EMPTY;
  }
}
