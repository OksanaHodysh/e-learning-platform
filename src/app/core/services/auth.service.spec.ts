import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LoggedInUser } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let email: string;
  let password: string;
  let storeKey: string;

  beforeEach(() => {
    email = 'test@test.com';
    password = 'test777';
    storeKey = 'currentUser';

    TestBed.configureTestingModule({
      providers: [
        AuthService
      ]
    });
    service = TestBed.get(AuthService);
  });

  beforeEach(() => {
    const store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => store[key]);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: LoggedInUser): void => {
      store[key] = JSON.stringify(value);
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user data to local storage', () => {
    service.login(email, password);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      storeKey,
      JSON.stringify(
        {
          email,
          password,
          token: `${email}${password}`.split('').join('-')
        }
      )
    );
  });

  it('should return true for authenticated user', () => {
    service.login(email, password);
    service.isAuthenticated();
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false for unauthenticated user', () => {
    service.isAuthenticated();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return no data if user is not logged in', () => {
    expect(service.getUserInfo()).toBe(null);
  });

  it('should return user data for logged in', () => {
    service.login(email, password);
    expect(service.getUserInfo()).toBe(email);
  });

  it('should log user out', () => {
    service.login(email, password);
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith(storeKey);
  });
});
