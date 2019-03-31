import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

interface AuthToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly API_URL = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  public getAuthToken(): string {
    return localStorage.getItem('currentUser');
  }

  public logIn(login: string, password: string): Observable<{token: string}> {
    return this.http.post<AuthToken>(`${this.API_URL}/auth/login`, {login, password});
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/auth/userinfo`, null);
  }
}
