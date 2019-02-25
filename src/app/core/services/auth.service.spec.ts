import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { LoggedInUser } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let login: string;
  let password: string;
  let storeKey: string;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    login = 'test@test.com';
    password = 'test777';
    storeKey = 'currentUser';

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: spy }
      ]
    });
    service = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  });

  beforeEach(() => {
    const store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => store[key] && JSON.parse(store[key]));
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
    service.login(login, password);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      storeKey,
      JSON.stringify(
        {
          login,
          password,
          token: `${login}${password}`.split('').join('-')
        }
      )
    );
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should return true for authenticated user', () => {
    service.login(login, password);
    service.isAuthenticated();
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false for unauthenticated user', () => {
    service.isAuthenticated();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return no data if user is not logged in', () => {
    expect(service.getUserInfo()).toBeUndefined();
  });

  it('should return user data for logged in', () => {
    service.login(login, password);
    expect(service.getUserInfo()).toBe(login);
  });

  it('should log user out', () => {
    service.login(login, password);
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith(storeKey);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
