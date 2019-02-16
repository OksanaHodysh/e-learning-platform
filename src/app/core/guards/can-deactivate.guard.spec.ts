import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { CanDeactivateGuard } from './can-deactivate.guard';
import { CanComponentDeactivate } from './can-deactivate.guard';

class MockComponent implements CanComponentDeactivate {
  returnValue: boolean;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.returnValue;
  }
}

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;
  let mockComponent: MockComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanDeactivateGuard
      ]
    });

    guard = TestBed.get(CanDeactivateGuard);
    mockComponent = new MockComponent();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call canDecativate method on component if it exists', () => {
    mockComponent.returnValue = true;
    expect(guard.canDeactivate(mockComponent)).toBe(true);
  });
});
