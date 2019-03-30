import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';

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
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: User): void => {
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
    service.logIn(login, password);
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

  it('should return no data if user is not logged in', () => {
    expect(service.getUserInfo()).toBeUndefined();
  });

  it('should return user data for logged in', () => {
    service.logIn(login, password);
    expect(service.getUserInfo()).toBeDefined();
  });
});
