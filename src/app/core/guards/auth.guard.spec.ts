import { TestBed, async } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    const authService = jasmine.createSpyObj('AuthService', [
      'isAuthenticated'
    ]);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authService},
        { provide: Router, useValue: router }
      ]
    });
  });

  beforeEach(() => {
    guard = TestBed.get(AuthGuard);
    authSpy = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  //
  // it('should be able to hit the route when user is logged in', () => {
  //   authSpy.isAuthenticated.and.returnValue(true);
  //
  //   expect(guard.canActivate(null, mockSnapshot)).toBe(true);
  // });
  //
  // it('not be able to hit route when user is not logged in', () => {
  //   authSpy.isAuthenticated.and.returnValue(false);
  //
  //   const result = guard.canActivate(null, mockSnapshot);
  //
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  //   expect(result).toBe(false);
  // });
});
