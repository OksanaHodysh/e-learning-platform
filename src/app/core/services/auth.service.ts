import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, EMPTY, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

interface AuthToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token = localStorage.getItem('currentUser');
  public readonly API_URL = 'http://localhost:3004';
  private userData$ = new BehaviorSubject<string>(null);

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  public get userEmail(): Observable<string> {
    return this.userData$.asObservable();
  }

  public login(login: string, password: string): void {
    this.http.post<AuthToken>(`${this.API_URL}/auth/login`, {login, password})
      .subscribe(
        ({token}) => {
          this.token = token;
          localStorage.setItem('currentUser', token);
          this.userData$.next(login);
          this.router.navigate(['/courses']);
        },
        () => console.log('No user found with such login and/or password.'));
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.userData$.next(null);
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getAuthToken(): string {
    return this.token;
  }

  public getUserInfo(): Subscription {
    if (this.isAuthenticated()) {
      return this.http.post<User>(`${this.API_URL}/auth/userinfo`, null)
        .pipe(map(({login}) => login))
        .subscribe((data) => this.userData$.next(data));
    }
  }
}
